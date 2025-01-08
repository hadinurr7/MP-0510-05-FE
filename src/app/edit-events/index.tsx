import EditEventPage from '@/features/dashboard/events/edit-events'
import React from 'react'

interface EditEventPageProps {
  params: {
    eventId: number
  };

}

const index = ({ params }: EditEventPageProps) => {
  return <EditEventPage eventId={params.eventId}/>
}

export default index