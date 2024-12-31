import React from 'react';

interface ConcertCardProps {
  name: string;
  thumbnail: string;
  date: string;
  price: string;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ name, thumbnail, date, price }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt={name} className="w-full h-56 object-cover" />
        <div className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-tr-md">
          <p>{date}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{price}</p>
        <button className="bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white px-4 py-2 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ConcertCard;