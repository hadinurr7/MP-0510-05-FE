// features/event/components/EditEventPage.tsx
"use client";

// ... other imports
import { formatISO } from "date-fns";
import { toast } from "react-toastify";
import { editEventSchema } from "./schema";
import { useFormik } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import useUpdateEvent from "@/hooks/api/event/useUpdateEvent";
import useGetCategories from "@/hooks/api/event/useGetCategories";
import useGetCities from "@/hooks/api/event/useGetCities";
import { useRouter } from "next/router";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import useGetEvent from "@/hooks/api/event/UseGetEvent";

interface EditEventPageProps {
  eventId: number;
}

const EditEventPage: FC<EditEventPageProps> = ({ eventId }) => {
  const router = useRouter();
  const { data: cities = [] } = useGetCities();
  const { data: categories = [] } = useGetCategories();
  const { data: event, isLoading: isLoadingEvent } = useGetEvent(eventId);
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  // Set initial values when event data is loaded
  useEffect(() => {
    if (event) {
      setSelectedImage(event.thumbnail || "");
      setSelectedCity(event.cityId.toString());
      setSelectedCategory(event.categoryId.toString());
    }
  }, [event]);

  const formik = useFormik({
    initialValues: {
      name: event?.name || "",
      description: event?.description || "",
      price: event?.price || 0,
      availableSeats: event?.availableSeats || 0,
      thumbnail: null,
      startDate: event?.startDate || "",
      endDate: event?.endDate || "",
      categoryId: event?.categoryId || 0,
      cityId: event?.cityId || 0,
    },
    enableReinitialize: true, // Important for updating form when event data loads
    validationSchema: editEventSchema,
    onSubmit: async (values) => {
      try {
        await updateEvent(
          {
             eventId,
            ...values,
            startDate: formatISO(new Date(values.startDate)),
            endDate: formatISO(new Date(values.endDate)),
          },
        );

        router.push("/dashboard/events");
        toast.success("Event Updated Successfully");
      } catch (error) {
        toast.error("Failed to update event");
        console.error(error);
      }
    },
  });

  if (isLoadingEvent) {
    return <div>Loading...</div>;
  }

  // ... rest of the component (onChangeThumbnail, removeThumbnail, render)
};

export default EditEventPage;