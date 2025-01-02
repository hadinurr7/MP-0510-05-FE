// app/create-event/page.tsx
import dynamic from 'next/dynamic';

const CreateEventForm = dynamic(() => import('@/features/create-event/index'), {
  ssr: false
});

export default function CreateEventPage() {
  return <CreateEventForm />;
}