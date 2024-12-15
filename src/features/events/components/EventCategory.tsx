// /features/events/EventCategory.tsx
import React, { useState } from 'react';

const EventCategory: React.FC = () => {
  const [category, setCategory] = useState('musik');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Event Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="musik">Musik</option>
        <option value="amal">Amal</option>
      </select>
    </div>
  );
};

export default EventCategory;
