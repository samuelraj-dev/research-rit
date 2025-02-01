import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Settings coming soon!</div>
}
