// components/EventSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const EventSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" /> {/* For image */}
      <Skeleton className="h-4 w-2/3" /> {/* For title */}
      <Skeleton className="h-4 w-1/3" /> {/* For date */}
      <Skeleton className="h-4 w-1/4" /> {/* For price */}
    </div>
  );
};

export const EventGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <EventSkeleton key={index} />
      ))}
    </div>
  );
};