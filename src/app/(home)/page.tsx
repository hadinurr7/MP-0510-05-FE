import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/features/home'), {
  ssr: false
});

export default function Home() {
  return <HomePage />;
}