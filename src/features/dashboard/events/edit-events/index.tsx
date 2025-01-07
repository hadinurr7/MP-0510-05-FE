"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatISO } from "date-fns";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/RichTextEditor";

import useGetCities from "@/hooks/api/event/useGetCities";
import useGetCategories from "@/hooks/api/event/useGetCategories";
import { editEventSchema } from "./schema";
import useUpdateEvent from "@/hooks/api/event/useUpdateEvent";

interface EditEventPageProps {
  eventId: number;
  initialData: any;
}

const EditEventPage: FC<EditEventPageProps> = ({ eventId, initialData }) => {
  const router = useRouter();
  const { data: cities = [] } = useGetCities();
  const { data: categories = [] } = useGetCategories();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const [selectedImage, setSelectedImage] = useState<string>(
    initialData?.thumbnail || "",
  );
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      availableSeats: initialData?.availableSeats || 0,
      thumbnail: null,
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      categoryId: initialData?.categoryId || 0,
      cityId: initialData?.cityId || 0,
    },
    validationSchema: editEventSchema,
    onSubmit: async (values) => {
      try {
        await updateEvent({
          eventId,
          payload: {
            ...values,
            startDate: formatISO(new Date(values.startDate)),
            endDate: formatISO(new Date(values.endDate)),
          },
        });

        router.push("/dashboard/events");
        toast.success("Event Updated Successfully");
      } catch (error) {
        toast.error("Failed to update event");
        console.error(error);
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
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto items-center justify-center py-20">
      <div className="w-[1080px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-6">
            {selectedImage && (
              <div className="flex w-full justify-center">
                <div className="relative h-[480px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedImage}
                    alt="thumbnail"
                    fill
                    className="object-cover duration-100 hover:scale-105"
                  />
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label className="text-lg font-semibold">Thumbnail</Label>
              <div className="flex items-center gap-2">
                <Input
                  ref={thumbnailRef}
                  type="file"
                  accept="image/*"
                  onChange={onChangeThumbnail}
                />
                {selectedImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={removeThumbnail}
                    className="z-50 px-2 py-1"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
              {!!formik.touched.thumbnail && !!formik.errors.thumbnail ? (
                <p className="text-xs text-red-500">
                  {formik.errors.thumbnail}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                name
              </Label>
              <Input
                name="name"
                placeholder="Your event name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.name && !!formik.errors.name && (
                <p className="text-xs text-red-500">
                  {typeof formik.errors.name === "string"
                    ? formik.errors.name
                    : ""}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="availableSeats" className="text-lg font-semibold">
                Available Seats
              </Label>
              <Input
                type="number"
                name="availableSeats"
                placeholder="Ttoal seats of the event"
                value={formik.values.availableSeats}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.availableSeats &&
                !!formik.errors.availableSeats && (
                  <p className="text-xs text-red-500">
                    {typeof formik.errors.availableSeats === "string"
                      ? formik.errors.availableSeats
                      : ""}
                  </p>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price " className="text-lg font-semibold">
                Price
              </Label>
              <Input
                type="number"
                name="price"
                placeholder="Price of the ticket"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.price && !!formik.errors.price && (
                <p className="text-xs text-red-500">
                  {typeof formik.errors.price === "string"
                    ? formik.errors.price
                    : ""}
                </p>
              )}
            </div>
            <div className="flex w-full gap-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="startDate" className="text-lg font-semibold">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="datetime-local"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isUpdating}
                />
                {!!formik.touched.startDate && !!formik.errors.startDate && (
                  <p className="text-xs text-red-500">
                    {formik.errors.startDate as string}
                  </p>
                )}
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="endDate" className="text-lg font-semibold">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isUpdating}
                />
                {!!formik.touched.endDate && !!formik.errors.endDate && (
                  <p className="text-xs text-red-500">
                    {formik.errors.endDate as string}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cities" className="text-lg font-semibold">
                City
              </Label>
              <Select
                value={selectedCity}
                onValueChange={(value) => {
                  setSelectedCity(value);
                  formik.setFieldValue("cityId", Number(value)); // Update formik state
                }}
              >
                <SelectTrigger className="w-full text-black">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.data?.map((city: { id: number; name: string }) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!!formik.touched.cityId &&
                typeof formik.errors.cityId === "string" && (
                  <p className="text-xs text-red-500">{formik.errors.cityId}</p>
                )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categories" className="text-lg font-semibold">
                Categories
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  formik.setFieldValue("categoryId", Number(value));
                }}
              >
                <SelectTrigger className="w-full text-black">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.data?.map(
                      (category: { id: number; name: string }) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!!formik.touched.categoryId &&
                typeof formik.errors.categoryId === "string" && (
                  <p className="text-xs text-red-500">
                    {formik.errors.categoryId}
                  </p>
                )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-lg font-semibold">
                Description
              </Label>
              <RichTextEditor
                label="Event Description"
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
                setError={formik.setFieldError}
                setTouch={formik.setFieldTouched}
              />
            </div>

            <Button type="submit" disabled={isUpdating} className="mt-8 w-full">
              {isUpdating ? "Updating..." : "Update Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;