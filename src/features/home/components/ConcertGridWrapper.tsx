// features/home/components/ConcertGridWrapper.tsx
import dynamic from 'next/dynamic';

const ConcertGrid = dynamic(() => import('./ConcertGrid'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default ConcertGrid;