import axios from 'axios'
import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import type { JSX } from 'react'
// import { useNavigate } from "react-router-dom";

interface LoginResponseModel {
  token: string
}

export const serverApiLink = () => {
  const host = window.location.hostname
  return `http://${host}:5278/api`
}

const axiosClient = axios.create({
  baseURL: serverApiLink(),
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

interface AuthAxiosContextValueModel {
  userLevel: number
  loginDetail: LoginResponseModel | null
  updateLoginDetail: (loginDetail: LoginResponseModel) => void
  logUserOut: () => void
}

const AuthAxiosContext = createContext<AuthAxiosContextValueModel>(
  null as unknown as AuthAxiosContextValueModel,
)

const AxiosInterceptorContext = ({ children }: { children: JSX.Element }) => {
  const [loginDetail, setLoginDetail, removeValue] =
    useLocalStorage<LoginResponseModel | null>({
      key: 'plural-health-auth',
      defaultValue: null,
    })

  const logUserOn401Error = async () => {
    removeValue()
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }

  useEffect(() => {
    const requestInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${loginDetail ? loginDetail.token : ''}`
        return config
      },
    )

    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        if (response.status === 401) {
          logUserOn401Error()
        }
        if (response.status === 200) {
          return response
        } else {
          return Promise.reject(new Error(response.data.message))
        }
      },
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.log('Logging user out from error block')
          }
          return Promise.reject(new Error(JSON.stringify(error.response.data)))
        } else if (error.request) {
          console.log(`Testing the request ${JSON.stringify(error)}`)
          return Promise.reject(
            new Error(
              'No internet connection. Please ensure you are connected to the internet',
            ),
          )
        } else {
          return Promise.reject(new Error('Something went wrong'))
        }
      },
    )

    // Cleanup function
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptor)
      axiosClient.interceptors.response.eject(responseInterceptor)
    }
  }, [loginDetail])

  const updateLoginDetail = (payload: LoginResponseModel) => {
    setLoginDetail(payload)
  }

  const contextValue = useMemo(
    () => ({
      loginDetail,
      updateLoginDetail,
      userLevel: 0,
      logUserOut: () => {
        logUserOn401Error()
      },
    }),
    [loginDetail],
  )

  return (
    <AuthAxiosContext.Provider value={contextValue}>
      {children}
    </AuthAxiosContext.Provider>
  )
}

export default axiosClient
export { AxiosInterceptorContext }

export const useAuthAxios = () => {
  return useContext(AuthAxiosContext)
}
