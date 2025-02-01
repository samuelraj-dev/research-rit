import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '@/app/features/dashboard/Layout'
import { isLoggedIn } from '@/libs/utils/auth'

export const Route = createFileRoute('/dashboard/_layout')({
  beforeLoad: async () => {
    
    if (!(await isLoggedIn())) {
      throw redirect({
        to: '/auth/login'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardLayout />
}