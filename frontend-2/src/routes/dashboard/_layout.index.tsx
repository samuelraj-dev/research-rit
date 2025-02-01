import { createFileRoute } from '@tanstack/react-router'
import HomeFeature from '@/app/features/dashboard/home';

export const Route = createFileRoute('/dashboard/_layout/')({
  component: HomeFeature,
})
