"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateEvent from "@/hooks/api/event/useUpdateEvent";
import { format } from "date-fns";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { updateEventSchema } from "./schema";
import LoadingScreen from "@/app/components/LoadingScreen";
import InputField from "@/components/ui/InputField";
import { DateInput } from "../../components/DateInput";
import RichTextEditor from "@/components/RichTextEditor";
import useGetEvent from "@/hooks/api/event/UseGetEvent";

interface EditEventPageProps {
  eventId: number;
}

const EditEventPage: React.FC<EditEventPageProps> = ({ eventId }) => {
  const { data: event, isLoading } = useGetEvent(eventId);
  const { mutateAsync: updateEvent, isPending } = useUpdateEvent();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string>(
    event?.thumbnail || "",
  );

  const thumbnailReff = useRef<HTMLInputElement>(null);

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

    if (thumbnailReff.current) {
      thumbnailReff.current.value = "";
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      thumbnail: null,
      city: "",
      price: 0,
      availableSeats: 0,
      startDate: "",
      endDate: "",
    },
    validationSchema: updateEventSchema,
    onSubmit: async (values) => {
      await updateEvent({
        id: eventId,
        payload: values,
      });
      router.push("/dashboard/my-events");
    },
  });

  useEffect(() => {
    if (event) {
      formik.setValues({
        name: event.name,
        category: event.categoryId.toString(),
        description: event.description,
        thumbnail: null,
        city: event.cityId.toString(),
        price: event.price,
        availableSeats: event.availableSeats,
        startDate: new Date(event.startDate).toISOString(),
        endDate: new Date(event.endDate).toISOString(),
      });
    }
  }, [event]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <InputField
                  htmlFor="name"
                  label="Event Title"
                  type="text"
                  placeholder="Event Title"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                {formik.touched.name && formik.errors.name ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-base text-slate-700">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border p-2"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="music">Music</option>
                  <option value="sport">Sport</option>
                  <option value="nightlife">Nightlife</option>
                </select>

                {formik.touched.category && formik.errors.category ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.category}
                  </div>
                ) : null}
              </div>

              <div className="col-span-2 space-y-2">
                <RichTextEditor
                  label="Description"
                  value={formik.values.description}
                  onChange={(value: string) =>
                    formik.setFieldValue("description", value)
                  }
                  setError={(field, value) => {
                    if (field === "description") {
                      formik.setFieldTouched("description", true);
                      formik.setFieldError("description", value);
                    }
                  }}
                  isTouch={formik.touched.description}
                  setTouch={() => formik.setFieldTouched("description", true)}
                />

                {formik.touched.description && formik.errors.description ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>

              <div className="col-span-2 space-y-2">
                <div className="relative h-32 w-32 border-2 border-red-400">
                  <Image
                    src={selectedImage}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>

                <InputField
                  htmlFor="thumbnail"
                  label="Thumbnail"
                  type="file"
                  ref={thumbnailReff}
                  accept="image/*"
                  onChange={onChangeThumbnail}
                />
                {selectedImage && (
                  <>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={removeThumbnail}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <InputField
                  htmlFor="city"
                  label="Address"
                  type="text"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />

                {formik.touched.city && formik.errors.city ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <InputField
                  htmlFor="availableSeat"
                  label="Available Seats"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.availableSeats}
                />

                {formik.touched.availableSeats &&
                formik.errors.availableSeats ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.availableSeats}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <InputField
                  htmlFor="price"
                  label="Price"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />

                {formik.touched.price && formik.errors.price ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-base text-slate-700">Start Time</Label>

                <div className="space-x-2 md:flex">
                  <DateInput
                    value={formik.values.startDate}
                    onChange={(date) => formik.setFieldValue("startDate", date)}
                  />

                  <Input
                    type="time"
                    value={
                      formik.values.startDate
                        ? format(formik.values.startDate, "HH:mm")
                        : ""
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = formik.values.startDate
                        ? new Date(formik.values.startDate)
                        : new Date();
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      formik.setFieldValue("startTime", newDate);
                    }}
                  />
                </div>

                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.startDate}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-base text-slate-700">End Time</Label>

                <div className="space-x-2 md:flex">
                  <DateInput
                    value={formik.values.endDate}
                    onChange={(date) => formik.setFieldValue("endDate", date)}
                  />

                  <Input
                    type="time"
                    value={
                      formik.values.endDate
                        ? format(formik.values.endDate, "HH:mm")
                        : ""
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = formik.values.endDate
                        ? new Date(formik.values.endDate)
                        : new Date();
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      formik.setFieldValue("endTime", newDate);
                    }}
                  />
                </div>

                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.endDate}
                  </div>
                ) : null}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600"
              disabled={isPending || !formik.isValid}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Event"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEventPage;
