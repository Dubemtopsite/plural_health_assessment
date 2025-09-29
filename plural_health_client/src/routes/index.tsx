import { Button, Card, Divider, PasswordInput, TextInput } from '@mantine/core'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@mantine/form'
import { yupResolver } from 'mantine-form-yup-resolver'
import type { LoginRequestModel } from '@/validator'
import { LoginValidator } from '@/validator'
import { useAppModalToast } from '@/hook/useModalToast'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { openModal } = useAppModalToast()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(LoginValidator),
  })

  const handleSubmit = (values: LoginRequestModel) => {
    try {
      if (values.email !== 'admin@plural-health.com') {
        throw new Error('Invalid Email or Password')
      }
      navigate({
        to: '/dashboard',
      })
    } catch (error) {
      openModal({
        title: 'Login Error',
        message: (error as Error).message || 'Something went wrong',
      })
    }
  }

  return (
    <section className="">
      <div className="flex items-center justify-center max-w-[450px] mx-auto mt-[10%]">
        <Card className="w-full" radius={10}>
          <div className="flex items-center justify-center text-center pb-4 pt-1">
            <h4 className="text-2xl font-semibold">Front Desk Staff Login</h4>
          </div>
          <Card.Section>
            <Divider />
          </Card.Section>
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            className="flex flex-col gap-3 pt-2 "
          >
            <TextInput
              label="Email"
              type="email"
              placeholder="Enter your email address"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                //  navigate("/account");
              }}
              className="mt-3 "
            >
              Login
            </Button>
          </form>
          <div className="pt-3 pb-2 flex flex-col gap-1 ">
            <p className="text-sm text-brand">
              <span className="font-semibold">Email:</span>{' '}
              admin@plural-health.com
            </p>
            <p className="text-sm text-brand">
              <span className="font-semibold">Password:</span> 123456
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
