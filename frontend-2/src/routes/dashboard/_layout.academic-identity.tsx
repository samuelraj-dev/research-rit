import AcademicIdentityFeature from '@/app/features/dashboard/academic-identity'
import { isAuthorized } from '@/libs/utils/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/academic-identity')({
  beforeLoad: async () => {
    
    if (!(await isAuthorized('research_paper:own_read'))) {
      // throw redirect({
      //   to: '/'
      // })
      throw window.location.href = '/'
    }
  },
  component: AcademicIdentityFeature
})