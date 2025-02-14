import LoginFeature from '@/app/features/auth/login'
import { isLoggedIn } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  beforeLoad: async () => {
    
    if ((await isLoggedIn())) {
      // throw redirect({
      //   to: '/dashboard'
      // })
      throw window.location.href = '/dashboard'
    }
  },
  component: LoginFeature,
})


