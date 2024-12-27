"use client";

import React, { useState } from "react";
import ConcertCard from "./ConcertCard";
import useGetEvents from "@/hooks/api/useGetEvents";
import useFormatRupiah from "@/hooks/api/useFormatRupiah";
import useGetCategories from "@/hooks/api/useGetCategories";
import useGetCities from "@/hooks/api/useGetCities";

import { useDebounce } from "use-debounce";

const ConcertGrid= () => {
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [query, setQuery] = useState("");

  const [debouncedSearch] = useDebounce(query, 500);

  const onSearch = (query: string) => {
    setQuery(query);
  };

  const { data: categories } = useGetCategories();
  const { data: city } = useGetCities();
  const { data, isPending } = useGetEvents({
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

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  if (!data.data) {
    return <p>Data structure is incorrect</p>;
  }

  return (
    <div className="mx-10 mt-16">
      <input
        type="text"
        value={query}
        onChange={(e)=> onSearch(e.target.value)}
        placeholder="Search events..."
        className="w-full rounded-full border-2 border-gray-300 bg-[#F6F6F6] py-3 pl-4 pr-12 text-lg shadow-sm transition duration-300 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {/* Category Filter */}
      <div className="my-4 flex gap-3">
        <button
          onClick={() => handleCategoryChange(0)}
          className={`rounded-full px-4 py-2 text-sm ${
            selectedCategory === 0
              ? "bg-indigo-600 text-white transition duration-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Category
        </button>

        {categories.data.map((category: any) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`rounded-full px-4 py-2 text-sm ${
              selectedCategory === category.id
                ? "bg-indigo-600 text-white transition duration-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="my-4 flex gap-3">
        <button
          onClick={() => handleCityChange(0)}
          className={`rounded-full px-4 py-2 text-sm ${
            selectedCity === 0
              ? "bg-indigo-600 text-white transition duration-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Cities
        </button>

        {city.data.map((city: any) => (
          <button
            key={city.id}
            onClick={() => handleCityChange(city.id)}
            className={`rounded-full px-4 py-2 text-sm ${
              selectedCity === city.id
                ? "bg-indigo-600 text-white transition duration-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {data.data.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500">
            No events found 
          </p>
        </div>
      )}

      {data.data.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(data.data) ? (
            data.data.map((concert, index) => (
              <ConcertCard
                key={index}
                name={concert.name}
                image={concert.image}
                date={concert.startDate}
                price={formatRupiah(concert.price)}
              />
            ))
          ) : (
            <p>Data is not in correct format</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConcertGrid;
