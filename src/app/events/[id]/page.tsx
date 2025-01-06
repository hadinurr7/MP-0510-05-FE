// app/events/[id]/page.tsx

import EventDetail from "@/features/events";

interface EventPageProps {
  params: {
    id: string;
  };
}

const EventPage = ({ params }: EventPageProps) => {
  return <EventDetail eventId={parseInt(params.id)} />;
};

export default EventPage;