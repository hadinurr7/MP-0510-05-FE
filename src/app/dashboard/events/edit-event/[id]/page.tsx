"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import useGetEvent from "@/hooks/api/event/UseGetEvent";
import LoadingScreen from "@/app/components/LoadingScreen";
import EditEventPage from "@/app/edit-events";

export default function EditEvent() {
  const { id } = useParams();
  
  // Validasi id untuk memastikan itu adalah angka yang valid
  const eventId = id ? parseInt(id as string) : NaN;

  if (isNaN(eventId)) {
    return <p>Invalid event ID</p>;  // Menampilkan pesan error jika eventId tidak valid
  }

  const { data: event, isLoading, isError } = useGetEvent(eventId);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <p>Error loading event data</p>; // Menampilkan pesan error jika gagal mengambil data
  }

  return <EditEventPage eventId={eventId} initialData={event} />;
}
