// features/home/components/ConcertGrid.tsx
"use client";

import React, { useState, Suspense } from "react";
import ConcertCard from "./ConcertCard";
import Searchbar from "@/components/SearchBarDummy";

import { useDebounce } from "use-debounce";
import { Event } from "@/types/event";
import Link from "next/link";
import EventGridSkeleton from "@/features/events/components/Skeleton";

import useGetCategories from "@/hooks/api/event/useGetCategories";
import useGetCities from "@/hooks/api/event/useGetCities";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import useFormatRupiah from "@/hooks/api/event/useFormatRupiah";
import { Skeleton } from "@/components/ui/skeleton";

interface ConcertGridProps {
  searchQuery: string;
}


const ConcertGrid = ({ searchQuery }: ConcertGridProps) => {
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { data: categoriesData, isPending: isPendingCategories } =
    useGetCategories();
  const { data: citiesData, isPending: isPendingCity } = useGetCities();
  const { data: eventsData, isPending } = useGetEvents({
    page,
    categoryId: selectedCategory !== 0 ? selectedCategory : undefined,
    cityId: selectedCity !== 0 ? selectedCity : undefined,
    search: debouncedSearch,
  });

  const formatRupiah = useFormatRupiah();

  const handleSearch = (searchQuery: string) => {
    setIsResetting(true);
    setQuery(searchQuery);
    setPage(1);
    // Remove skeleton after a short delay
    setTimeout(() => setIsResetting(false), 500);
  };

  const handleCategoryChange = (e: React.MouseEvent, categoryId: number) => {
    e.preventDefault();
    setIsResetting(true);
    setSelectedCategory(categoryId);
    setPage(1);
    setTimeout(() => setIsResetting(false), 500);
  };

  const handleCityChange = (e: React.MouseEvent, cityId: number) => {
    e.preventDefault();
    setIsResetting(true);
    setSelectedCity(cityId);
    setPage(1);
    setTimeout(() => setIsResetting(false), 500);
  };

  if (isPending || isPendingCategories || isPendingCity || isResetting) {
    return (
      <div className="mx-10 mt-16">
        
        {/* <Searchbar onSearch={handleSearch} value={query} /> */}
        <div className="my-4 flex gap-3 overflow-x-auto">
          {/* Category buttons skeleton */}
          {[...Array(5)].map((_, index) => (
            <Skeleton key={`cat-${index}`} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <div className="my-4 flex gap-3 overflow-x-auto">
          {/* City buttons skeleton */}
          {[...Array(5)].map((_, index) => (
            <Skeleton key={`city-${index}`} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <EventGridSkeleton />
      </div>
    );
  }

  if (!eventsData || !categoriesData || !citiesData) {
    return <div className="py-10 text-center">No data available</div>;
  }

  const categories = categoriesData.data || [];
  const cities = citiesData.data || [];
  const events = eventsData.data || [];

  return (
    <div className="mx-10 mt-16">
      {/* <Searchbar onSearch={handleSearch} value={query} /> */}
      <p>{debouncedSearch}</p>
      <div className="my-4 flex gap-3 overflow-x-auto">
        <button
          onClick={(e) => handleCategoryChange(e, 0)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
            selectedCategory === 0
              ? "bg-indigo-600 text-white transition duration-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Category
        </button>

        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={(e) => handleCategoryChange(e, category.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              selectedCategory === category.id
                ? "bg-indigo-600 text-white transition duration-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="my-4 flex gap-3 overflow-x-auto">
        <button
          onClick={(e) => handleCityChange(e, 0)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
            selectedCity === 0
              ? "bg-indigo-600 text-white transition duration-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Cities
        </button>

        {cities.map((city: any) => (
          <button
            key={city.id}
            onClick={(e) => handleCityChange(e, city.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              selectedCity === city.id
                ? "bg-indigo-600 text-white transition duration-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event: Event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="block transition-opacity hover:opacity-80"
            >
              <ConcertCard
                name={event.name}
                thumbnail={event.thumbnail}
                date={event.startDate}
                price={formatRupiah(event.price)}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConcertGrid;
