// /features/events/EventLocation.tsx
import React, { useState } from 'react';

const EventLocation: React.FC = () => {
  const [location, setLocation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Event Location</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter event location"
      />
    </div>
  );
};

export default EventLocation;
