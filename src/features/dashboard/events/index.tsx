"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorLoading from "@/app/components/ErrorLoading";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import useGetEventsByUser from "@/hooks/api/event/useGetEventByUser";

export default function EventListPage() {
  
  const { data: session } = useSession();
  const token = session?.user?.token;
  const {
    data,
    isPending: isPendingGet,
    error,
  } = useGetEventsByUser(token || "");

  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.filter((event) => {
      return (
        (event.name.toLowerCase() || "").includes(search.toLowerCase()) ||
        (event.city.toLowerCase() || "").includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleEditEvent = (eventId: string) => {
    // Navigate or open event edit page
    toast.success(`Editing event ${eventId}`);
  };

  if (isPendingGet) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <ErrorLoading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold">Event List</h1>
      <form className="mb-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full rounded-md border py-2 pl-4 pr-8"
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            type="button"
            className="bg-blue-500 font-medium hover:bg-blue-600"
          >
            Search
          </Button>
        </div>
      </form>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption>A list of events created by the organizer</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold text-black">
                Event Name
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                City
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Start Date
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                End Date
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No events found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="text-center">{event.name}</TableCell>
                  <TableCell className="text-center">{event.city}</TableCell>
                  <TableCell className="text-center">
                    {format(parseISO(event.startDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(parseISO(event.endDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <FaEllipsisV className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditEvent(event.id.toString())}>
                          Edit Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
