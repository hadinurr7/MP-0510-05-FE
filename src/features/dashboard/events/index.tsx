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
import { FaSort, FaEllipsisV } from "react-icons/fa";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorLoading from "@/app/components/ErrorLoading";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import useGetEventsByUser from "@/hooks/api/event/useGetEventByUser";

export default function EventList() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const {
    data: events,
    isPending: isPendingGet,
    error,
  } = useGetEventsByUser( token || "" );
  
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const filteredAndSortedEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];

    const filtered = events.filter((event) => {
      return (
        (event.name.toLowerCase() || "").includes(search.toLowerCase()) ||
        (event.city.toLowerCase() || "").includes(search.toLowerCase()) ||
        (event.status.toLowerCase() || "").includes(search.toLowerCase())
      );
    });

    return filtered.sort((a, b) => {
      const aDate = parseISO(a.startDate);
      const bDate = parseISO(b.startDate);

      return sortDirection === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    });
  }, [events, search, sortDirection]);

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
    <div className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
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
          <TableCaption>A list of your events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold text-black">Thumbnail</TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={handleSort}
                  className="p-0 font-bold text-black"
                >
                  Event Name
                  {sortDirection === "asc" ? (
                    <FaSort className="ml-2 h-4 w-4 rotate-180" />
                  ) : (
                    <FaSort className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center font-bold text-black">Status</TableHead>
              <TableHead className="text-center font-bold text-black">City</TableHead>
              <TableHead className="text-center font-bold text-black">Start Date</TableHead>
              <TableHead className="text-center font-bold text-black">End Date</TableHead>
              <TableHead className="text-center font-bold text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="text-center">
                  <img
                    src={event.thumbnail}
                    alt={event.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-center">{event.name}</TableCell>
                <TableCell className="text-center">{event.status}</TableCell>
                <TableCell className="text-center">{event.city}</TableCell>
                <TableCell className="text-center">
                  {format(parseISO(event.startDate), "dd MMM yyyy HH:mm")}
                </TableCell>
                <TableCell className="text-center">
                  {format(parseISO(event.endDate), "dd MMM yyyy HH:mm")}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaEllipsisV className="h-5 w-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => toast.info("Edit Event")}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("View Participants")}>
                        Participants
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Create Ticket")}>
                        Create Ticket
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
