// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import useGetEventsByUser from "@/hooks/api/event/useGetEventByUser";
// import useGetAttendeesByEvent from "@/hooks/api/attendee/useGetAttendee";
// import { useSession } from "next-auth/react";



// const AttendancePage = () => {
//       const { data: session } = useSession();
//       const token = session?.user?.token;

//   const {
//     data: events,isLoading: isLoadingEvents, error: errorEvents,} = useGetEventsByUser();
//   const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

//   const {
//     data: attendees,
//     isLoading: isLoadingAttendees,
//     error: errorAttendees,
//   } = useGetAttendeesByEvent(selectedEventId || 0);

//   const handleEventChange = (value: string) => {
//     setSelectedEventId(Number(value));
//   };

//   const selectedEvent = events?.find((event) => event.id === selectedEventId);

//   const totalTicketsSold =
//     attendees?.reduce((acc, attendee) => acc + attendee.ticketCount, 0) || 0;
//   const totalRevenue =
//     attendees?.reduce((acc, attendee) => acc + attendee.totalPrice, 0) || 0;

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="mb-5 text-3xl font-bold">Event Attendees</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>Attendee List</CardTitle>
//           <CardDescription>View attendees for each event</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4">
//             <Select onValueChange={handleEventChange}>
//               <SelectTrigger className="w-[280px]">
//                 <SelectValue placeholder="Select an event" />
//               </SelectTrigger>
//               <SelectContent>
//                 {isLoadingEvents ? (
//                   <SelectItem value="loading" disabled>
//                     Loading...
//                   </SelectItem>
//                 ) : errorEvents ? (
//                   <SelectItem value="error" disabled>
//                     Error loading events
//                   </SelectItem>
//                 ) : (
//                   events?.map((event) => (
//                     <SelectItem key={event.id} value={event.id.toString()}>
//                       {event.title}
//                     </SelectItem>
//                   ))
//                 )}
//               </SelectContent>
//             </Select>
//           </div>
//           {isLoadingAttendees ? (
//             <p>Loading attendees...</p>
//           ) : errorAttendees ? (
//             <p>Error loading attendees: {errorAttendees.message}</p>
//           ) : attendees && attendees.length > 0 ? (
//             <Table>
//               <TableCaption>
//                 List of attendees for {selectedEvent?.title}
//               </TableCaption>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Attendee Name</TableHead>
//                   <TableHead>Ticket Quantity</TableHead>
//                   <TableHead>Total Price Paid</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {attendees.map((attendee) => (
//                   <TableRow key={attendee.id}>
//                     <TableCell>{attendee.name}</TableCell>
//                     <TableCell>{attendee.ticketCount}</TableCell>
//                     <TableCell>
//                       {attendee.totalPrice.toLocaleString("id-ID", {
//                         style: "currency",
//                         currency: "IDR",
//                       })}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           ) : (
//             <p>No attendees available for this event.</p>
//           )}
//           {selectedEvent && (
//             <div className="mt-4">
//               <p className="font-semibold">Event Summary:</p>
//               <p>Total Attendees: {attendees?.length || 0}</p>
//               <p>Total Tickets Sold: {totalTicketsSold}</p>
//               <p>
//                 Total Revenue:{" "}
//                 {totalRevenue.toLocaleString("id-ID", {
//                   style: "currency",
//                   currency: "IDR",
//                 })}
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AttendancePage;