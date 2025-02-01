import ProfileFeature from '@/app/features/dashboard/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/profile')({
  component: ProfileFeature,
})