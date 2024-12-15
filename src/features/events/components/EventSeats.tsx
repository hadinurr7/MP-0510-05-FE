// /features/events/EventSeats.tsx
import React, { useState } from 'react';

const EventSeats: React.FC = () => {
  const [seats, setSeats] = useState({ category: '', price: '', quantity: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSeats((prevSeats) => ({ ...prevSeats, [name]: value }));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Seats Category</label>
      <div className="flex space-x-4">
        <input
          type="text"
          name="category"
          value={seats.category}
          onChange={handleChange}
          placeholder="Category (e.g. VIP)"
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={seats.price}
          onChange={handleChange}
          placeholder="Price"
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="quantity"
          value={seats.quantity}
          onChange={handleChange}
          placeholder="Seats Quantity"
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default EventSeats;
