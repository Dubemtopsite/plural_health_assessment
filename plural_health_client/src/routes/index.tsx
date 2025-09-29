import { Card } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <section className="min-h-[100vh]">
      <div className="flex items-center justify-center max-w-[500px] mx-auto mt-[10%]">
        <Card className="w-full" radius={10}>
          <p>Paulex</p>
        </Card>
      </div>
    </section>
  )
}
