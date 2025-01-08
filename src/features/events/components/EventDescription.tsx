// features/event/components/EventDescription.tsx
"use client";

import Markdown from "@/components/Markdown";
import { useState, useRef, useEffect } from "react";

interface EventDescriptionProps {
  description: string;
}

const EventDescription = ({ description }: EventDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        // Get line height and total height
        const lineHeight = parseInt(
          window.getComputedStyle(element).lineHeight,
        );
        const height = element.scrollHeight;

        // Calculate number of lines (approximately)
        const numberOfLines = height / lineHeight;

        // Set overflow state if more than 3 lines
        setIsOverflowing(numberOfLines > 3);
      }
    };

    checkOverflow();

    // Add resize listener
    window.addEventListener("resize", checkOverflow);

    // Cleanup
    return () => window.removeEventListener("resize", checkOverflow);
  }, [description]);

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Deskripsi</h2>
      <Markdown content={description} />

      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-600 hover:underline"
        >
          {isExpanded ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
        </button>
      )}
    </div>
  );
};

export default EventDescription;
