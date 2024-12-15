// /features/events/EventThumbnail.tsx
import React, { useState } from 'react';

const EventThumbnail: React.FC = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setThumbnail(file);
  };

  return (
    <div className="mb-4">
      <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Event Thumbnail</label>
      <input
        id="thumbnail"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      {thumbnail && (
        <div className="mt-2">
          <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail preview" className="w-32 h-32 object-cover rounded-md" />
        </div>
      )}
    </div>
  );
};

export default EventThumbnail;
