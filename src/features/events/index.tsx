// /pages/index.tsx
"use client";

import React from "react";
import EventName from "./components/EventName";
import EventDescription from "./components/EventDescription";
import EventSeats from "./components/EventSeats";
import EventLocation from "./components/EventLocation";
import EventDate from "./components/EventDates";
import EventCategory from "./components/EventCategory";
import EventThumbnail from "./components/EventThumbnail";

const EventPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-center text-2xl font-semibold">Create Event</h1>
      <EventName />
      <EventDescription />
      <EventSeats />
      <EventLocation />
      <EventDate />
      <EventCategory />
      <EventThumbnail />
      <a
        href="/login"
        className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
      >
        Create Event
      </a>
    </div>
  );
};

export default EventPage;
