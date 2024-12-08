import React from 'react';
import ConcertCard from './ConcertCard';

const concerts = [
    {
        name: 'Enrique Iglesias',
        image: '/enrique-iglesias.jpg',
        date: 'Manchester, Oct 17, 2024',
        price: 299.99,
      },
      {
        name: 'Ariana Grande',
        image: '/ariana-grande.jpg',
        date: 'London, Oct 22-24, 2024',
        price: 199.99,
      },
      {
        name: 'Enrique Iglesias',
        image: '/enrique-iglesias.jpg',
        date: 'Manchester, Oct 17, 2024',
        price: 299.99,
      },
      {
        name: 'Ariana Grande',
        image: '/ariana-grande.jpg',
        date: 'London, Oct 22-24, 2024',
        price: 199.99,
      },{
        name: 'Enrique Iglesias',
        image: '/enrique-iglesias.jpg',
        date: 'Manchester, Oct 17, 2024',
        price: 299.99,
      },
      {
        name: 'Ariana Grande',
        image: '/ariana-grande.jpg',
        date: 'London, Oct 22-24, 2024',
        price: 199.99,
      }
];

const ConcertGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 mx-10">
      {concerts.map((concert, index) => (
        <ConcertCard
          key={index}
          name={concert.name}
          image={concert.image}
          date={concert.date}
          price={concert.price}
        />
      ))}
    </div>
  );
};

export default ConcertGrid;