import UploadPaperFeature from '@/app/features/dashboard/upload-paper'
import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/upload-paper')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('research_paper:own_write'))) {
      // throw redirect({
      //   to: '/'
      // })
      throw window.location.href = '/'
    }
  },
  component: UploadPaperFeature,
})
