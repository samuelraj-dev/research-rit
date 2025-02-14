import UsersFeature from '@/app/features/dashboard/manage-users'
import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/users')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('user:read'))) {
      // throw redirect({
      //   to: '/'
      // })
      throw window.location.href = '/'
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersFeature />
}
