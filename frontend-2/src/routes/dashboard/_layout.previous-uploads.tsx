import PreviousUploadsFeature from '@/app/features/dashboard/previous-uploads'
import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/previous-uploads')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('research_paper:own_read'))) {
      // throw redirect({
      //   to: '/'
      // })
      throw window.location.href = '/'
    }
  },
  component: PreviousUploadsFeature,
})