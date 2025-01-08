
"use client";
import React from "react";
import UpdateEventPage from "@/features/dashboard/events/edit-events"

interface EditEventPageProps {
  params: {
    eventId: string;
  };
}

const UpdateEvent = ({ params }: { params: { eventId: string } }) => {
  return <UpdateEventPage eventId={Number(params.eventId)} />;
};

export default UpdateEvent;
