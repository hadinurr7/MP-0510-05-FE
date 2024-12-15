// /features/events/EventDescription.tsx
import React, { useState } from 'react';

const EventDescription: React.FC = () => {
  const [description, setDescription] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Event Description</label>
      <textarea
        id="description"
        value={description}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter event description"
      />
    </div>
  );
};

export default EventDescription;
