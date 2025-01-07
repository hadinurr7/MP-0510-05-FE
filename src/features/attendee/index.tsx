"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import useGetEventsByUser from "@/hooks/api/event/useGetEventByUser";
import useGetAttendeesByEvent from "@/hooks/api/attendee/useGetAttendee";
import { toast } from "react-toastify";

const AttendancePage = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetEventsByUser(token || "");

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const {
    data: attendees,
    isLoading: isLoadingAttendees,
    error: errorAttendees,
  } = useGetAttendeesByEvent(selectedEventId ?? 0, token ||"");

  const handleEventChange = (value: string) => {
    const eventId = Number(value);
    if (eventId && events?.data.some((event) => event.id === eventId)) {
      setSelectedEventId(eventId);
    } else {
      toast.error("Invalid event selected or event not found");
      setSelectedEventId(null); // Reset selected event
    }
  };

  const totalTicketsSold =
    attendees?.reduce((acc, attendee) => acc + attendee.qty, 0) || 0;
  const totalRevenue =
    attendees?.reduce((acc, attendee) => acc + attendee.totalPrice, 0) || 0;

  const selectedEvent = events?.data.find(
    (event) => event.id === selectedEventId
  );

  if (selectedEventId && !selectedEvent) {
    toast.error("Event not found");
  }

  return (
    <div className="container mx-auto w-screen h-screen">
      <h1 className="mb-5 text-3xl font-bold">Event Attendees</h1>
      <Card>
        <CardHeader>
          <CardTitle>Attendee List</CardTitle>
          <CardDescription>View attendees for each event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={handleEventChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingEvents ? (
                  <SelectItem value="loading" disabled>
                    Loading events...
                  </SelectItem>
                ) : errorEvents ? (
                  <SelectItem value="error" disabled>
                    Error loading events
                  </SelectItem>
                ) : events?.data.length ? (
                  events?.data.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-events" disabled>
                    No events available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedEventId === null ? (
            <p>Please select an event to view attendees.</p>
          ) : isLoadingAttendees ? (
            <p>Loading attendees...</p>
          ) : errorAttendees ? (
            <p>Error loading attendees: {errorAttendees.message}</p>
          ) : attendees && attendees.length > 0 ? (
            <Table>
              <TableCaption>
                List of attendees for {selectedEvent?.name || "Selected Event"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Customer Email</TableHead>
                  <TableHead>Tickets Purchased</TableHead>
                  <TableHead>Total Price Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((attendee) => (
                  <TableRow key={attendee.email}>
                    <TableCell>{attendee.name}</TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell>{attendee.qty}</TableCell>
                    <TableCell>
                      {attendee.totalPrice.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No attendees available for this event.</p>
          )}

          {selectedEventId && attendees && (
            <div className="mt-4">
              <p className="font-semibold">Event Summary:</p>
              <p>Total Attendees: {attendees.length}</p>
              <p>Total Tickets Sold: {totalTicketsSold}</p>
              <p>
                Total Revenue:{" "}
                {totalRevenue.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;
