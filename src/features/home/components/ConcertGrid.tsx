// features/home/components/ConcertGrid.tsx
"use client";

import React, { useState, Suspense } from "react";
import ConcertCard from "./ConcertCard";
import useGetEvents from "@/hooks/api/useGetEvents";
import useFormatRupiah from "@/hooks/api/useFormatRupiah";
import useGetCategories from "@/hooks/api/useGetCategories";
import useGetCities from "@/hooks/api/useGetCities";
import { useDebounce } from "use-debounce";

const ConcertGrid = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [query, setQuery] = useState("");

  const [debouncedSearch] = useDebounce(query, 500);

  const onSearch = (query: string) => {
    setQuery(query);
  };

  const { data: categoriesData, isPending: isPendingCategories } = useGetCategories();
  const { data: citiesData, isPending: isPendingCity } = useGetCities();
  const { data: eventsData, isPending } = useGetEvents({
    page,
    categoryId: selectedCategory !== 0 ? selectedCategory : undefined,
    cityId: selectedCity !== 0 ? selectedCity : undefined,
    search: debouncedSearch
  });
  const formatRupiah = useFormatRupiah();

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleCityChange = (cityId: number) => {
    setSelectedCity(cityId);
    setPage(1);
  };

  if (isPending || isPendingCategories || isPendingCity) {
    return <div className="flex justify-center items-center min-h-[200px]">Loading...</div>;
  }

  if (!eventsData || !categoriesData || !citiesData) {
    return <div className="text-center py-10">No data available</div>;
  }

  const categories = categoriesData.data || [];
  const cities = citiesData.data || [];
  const events = eventsData.data || [];

  return (
    <div className="mx-10 mt-16">
      <Suspense fallback={<div>Loading filters...</div>}>
        <div className="my-4 flex gap-3 overflow-x-auto">
          <button
            onClick={() => handleCategoryChange(0)}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${
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
              onClick={() => handleCategoryChange(category.id)}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${
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
            onClick={() => handleCityChange(0)}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${
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
              onClick={() => handleCityChange(city.id)}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${
                selectedCity === city.id
                  ? "bg-indigo-600 text-white transition duration-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </Suspense>

      <Suspense fallback={<div>Loading events...</div>}>
        {events.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-lg text-gray-500">
              No events found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((concert: any, index: number) => (
              <ConcertCard
                key={concert.id || index}
                name={concert.name}
                thumbnail={concert.thumbnail}
                date={concert.startDate}
                price={formatRupiah(concert.price)}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ConcertGrid;