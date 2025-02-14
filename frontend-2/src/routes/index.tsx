import { isLoggedIn } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    if ((await isLoggedIn())) {
      // throw redirect({
      //   to: '/dashboard',
      // })
      throw window.location.href = '/dashboard'
    } else {
      // throw redirect({
      //   to: '/auth/login'
      // })
      throw window.location.href = '/auth/login'
    }
  },
})