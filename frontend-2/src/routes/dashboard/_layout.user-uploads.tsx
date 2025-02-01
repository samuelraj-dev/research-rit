import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/user-uploads')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('research_paper:read'))) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>User Uploads coming soon!</div>
}
