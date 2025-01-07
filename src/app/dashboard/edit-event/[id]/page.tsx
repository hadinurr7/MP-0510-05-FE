"use client";
import React from "react";
import UpdateEventPage from "@/features/dashboard/events/edit-events"

const UpdateEvent = ({ params }: { params: { id: string } }) => {
  return <UpdateEventPage eventId={Number(params.id)} />;
};

export default UpdateEvent;