"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import EventDescription from "./components/EventDescription";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import { Category } from "@/types/category";
import { City } from "@/types/city";
import useGetEvent from "@/hooks/api/event/UseGetEvent";
import useGetCategories from "@/hooks/api/event/useGetCategories";
import useGetCities from "@/hooks/api/event/useGetCities";

interface EventDetailProps {
  eventId: number;
}

const EventDetail = ({ eventId }: EventDetailProps) => {
  const router = useRouter();
  const { data: event, isLoading: eventLoading } = useGetEvent(eventId);
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: cities, isLoading: citiesLoading } = useGetCities();

  const isLoading = eventLoading || categoriesLoading || citiesLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="w-full h-[400px] rounded-lg mb-6" />
            <Skeleton className="w-full h-[200px] rounded-lg" />
          </div>
          <Skeleton className="w-full h-[500px] rounded-lg" />
        </div>
      </div>
    );
  }

  if (!event || !categories || !cities) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Error loading event details
        </h1>
      </div>
    );
  }

  const category = categories?.data?.find((category: Category) => category.id === event.categoryId);
  const city = cities?.data?.find((city: City) => city.id === event.cityId);
  const handleBuyTicket = () => {
    router.push(`/events/${eventId}/checkout`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="md:col-span-2">
          <img
            src={event.thumbnail}
            alt={event.name}
            className="w-full rounded-lg object-cover mb-6"
          />
          <EventDescription description={event.description} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
                <span>{new Date(event.startDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{new Date(event.startDate).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} WIB</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{city?.name || 'Location not available'}</span>
              </div>

              {category && (
                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {category.name}
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">Available Seats</p>
              <p className="font-medium">{event.availableSeats}</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Mulai Dari</p>
                <p className="text-xl font-bold">
                  Rp {event.price.toLocaleString('id-ID')}
                </p>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleBuyTicket}
                disabled={event.availableSeats === 0}
              >
                {event.availableSeats === 0 ? 'Sold Out' : 'Beli Sekarang'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
