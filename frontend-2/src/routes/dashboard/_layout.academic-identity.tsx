import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/academic-identity')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('research_paper:own_read'))) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Academic Identity coming soon!</div>
}
