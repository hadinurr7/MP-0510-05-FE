// /features/events/EventDate.tsx
import React, { useState } from 'react';

const EventDate: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Event Dates</label>
      <div className="flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default EventDate;
