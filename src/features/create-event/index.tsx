"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetCategories from "@/hooks/api/useGetCategories";
import useGetCities from "@/hooks/api/useGetCities";
import useCreateEvent, { CreateEventPayload } from "@/hooks/api/useCreateEvent";
import { useFormik } from "formik";
import { formatISO } from "date-fns";
import { Suspense } from 'react';

export default function CreateEvent() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  // Query Hooks
  const { data: categoriesResponse, isLoading: categoriesLoading } = useGetCategories();
  const { data: citiesResponse, isLoading: citiesLoading } = useGetCities();
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: 0,
      startDate: "",
      endDate: "",
      price: 0,
      cityId: 0,
      availableSeats: 0,
      thumbnail: null as File | null,
      userId: 1, // Sesuaikan dengan logic user yang sedang login
    },
    onSubmit: async (values) => {
      try {
        if (!values.thumbnail) {
          throw new Error("Thumbnail is required");
        }

        const payload: CreateEventPayload = {
          name: values.name,
          description: values.description,
          price: values.price,
          availableSeats: values.availableSeats,
          thumbnail: values.thumbnail,
          startDate: formatISO(new Date(values.startDate)),
          endDate: formatISO(new Date(values.endDate)),
          categoryId: values.categoryId,
          cityId: values.cityId,
          userId: values.userId
        };

        await createEvent(payload);
      } catch (error) {
        console.error("Submit error:", error);
      }
    },
  });

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    setSelectedImage("");
    formik.setFieldValue("thumbnail", null);
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  if (categoriesLoading || citiesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Event Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Event Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                name="categoryId"
                onValueChange={(value) => formik.setFieldValue("categoryId", Number(value))}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesResponse?.data?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="cityId" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Select
                onValueChange={(value) => formik.setFieldValue("cityId", Number(value))}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {citiesResponse?.data?.map((city: any) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                Available Seats
              </label>
              <Input
                id="availableSeats"
                name="availableSeats"
                type="number"
                placeholder="Available Seats"
                value={formik.values.availableSeats}
                onChange={formik.handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <Input
                ref={thumbnailRef}
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={onChangeThumbnail}
                required
                className="mt-1"
              />
              {selectedImage && (
                <div className="mt-2">
                  <img src={selectedImage} alt="Preview" className="max-w-xs" />
                  <Button onClick={removeThumbnail} variant="destructive" size="sm" className="mt-2">
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Suspense>
  );
}