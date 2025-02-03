import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'
import UserUploadsFeature from '@/app/features/dashboard/user-uploads'

export const Route = createFileRoute('/dashboard/_layout/user-uploads')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('research_paper:read'))) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: UserUploadsFeature,
})