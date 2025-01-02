import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonBlog = () => {
  return (
    <div>
      <div className="container mx-auto max-w-5xl border px-4">
        <section className="space-y-2">
          <Skeleton className="h-[22px] w-[10%] rounded-sm" />
          <Skeleton className="h-[30px] w-[40%] rounded-sm" />
          <Skeleton className="h-[22px] w-[20%] rounded-sm" />
          <Skeleton className="h-[200] rounded-sm md:h-[400px]" />
        </section>
      </div>
    </div>
  );
};

export default SkeletonBlog;
