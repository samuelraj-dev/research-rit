import { isLoggedIn } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    if ((await isLoggedIn())) {
      throw redirect({
        to: '/dashboard'
      })
    } else {
      throw redirect({
        to: '/auth/login'
      })
    }
  },
})