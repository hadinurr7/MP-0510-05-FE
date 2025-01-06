// features/event/components/EventDescription.tsx
"use client";

import { useState } from "react";

interface EventDescriptionProps {
  description: string;
}

const EventDescription = ({ description }: EventDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
      <div className={`prose max-w-none ${!isExpanded && 'line-clamp-3'}`}>
        {description}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:underline mt-2"
      >
        {isExpanded ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Lebih Banyak'}
      </button>
    </div>
  );
};

export default EventDescription;