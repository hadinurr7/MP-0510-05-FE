import React from 'react';

interface ConcertCardProps {
  name: string;
  image: string;
  date: string;
  price: number;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ name, image, date, price }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        <div className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-tr-md">
          <p>{date}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">${price.toFixed(2)}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ConcertCard;