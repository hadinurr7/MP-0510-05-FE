import { useEffect } from "react";
import { useParams } from "next/navigation";

import useGetEvent from "@/hooks/api/event/UseGetEvent";
import LoadingScreen from "@/app/components/LoadingScreen";
import EditEventPage from "@/app/edit-events";

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-500">{message}</p>
);

export default function EditEvent() {
  const { id } = useParams();

  const eventId = Number(id); // Konversi langsung ke angka
  if (isNaN(eventId)) {
    return <ErrorMessage message="Invalid event ID" />;
  }

  const { data: event, isLoading, isError } = useGetEvent(eventId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorMessage message="Error loading event data" />;

  return <EditEventPage eventId={eventId} initialData={event} />;
}
