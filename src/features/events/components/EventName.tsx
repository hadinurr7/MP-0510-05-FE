// /features/events/EventName.tsx
import React, { useState } from 'react';

const EventName: React.FC = () => {
  const [eventName, setEventName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
      <input
        id="eventName"
        type="text"
        value={eventName}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter event name"
      />
    </div>
  );
};

export default EventName;
