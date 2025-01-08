import EditEventPage from "@/features/dashboard/events/edit-events";
import React from "react";

interface EventPageProps {
  params: {
    id: string;
  };
}

const EditEvent = ({ params }: EventPageProps) => {
  return <EditEventPage eventId={parseInt(params.id)} />;
};

export default EditEvent;