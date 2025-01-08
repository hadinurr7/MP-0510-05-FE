import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="group relative h-full border-zinc-200 pb-14 transition-all duration-300 hover:shadow-xl sm:pb-16">
      <div className="relative h-[180px] w-full overflow-hidden sm:h-[200px]">
        <Image
          src={event.thumbnail}
          alt={`${event.name} thumbnail`}
          fill
          className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100%, (max-width: 768px) 50%, 25%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-md bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-200"
          >
            {event.categoryId}
          </Badge>
        </div>

        <div className="space-y-2">
          <h2 className="line-clamp-2 text-base font-bold leading-tight sm:text-lg">
            {event.name}
          </h2>
          <p className="text-xs text-zinc-600 sm:text-sm">
            {new Intl.DateTimeFormat("en-ID", {
              dateStyle: "full",
              timeStyle: "short",
              timeZone: "Asia/Jakarta",
            }).format(new Date(event.startDate))}
          </p>
          <p className="line-clamp-1 text-xs text-zinc-600 sm:text-sm">
            {event.cityId}
          </p>
          <p className="text-sm font-semibold sm:text-base">
            {event.price > 0
              ? event.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              : "Free"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;