"use client";

import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { useState } from "react";
import { createVoucherSchema } from "./schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEventsByUser from "@/hooks/api/event/useGetEventByUser";
import { Label } from "@/components/ui/label";
import { DateInput } from "../../components/DateInput";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/app/components/LoadingScreen";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import InputField from "@/components/ui/InputField";

const CreateVoucherPage = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: eventsData, error } = useGetEventsByUser();
  const events = Array.isArray(eventsData) ? eventsData : [];

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  const formik = useFormik({
    initialValues: {
      voucherCode: "",
      name: "",
      qty: 0,
      value: 0,
      validUntill: "",
      eventId: "",
    },
    validationSchema: createVoucherSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        eventId: Number(values.eventId), // Ubah eventId ke angka
      };
      await createVoucher(payload);
    },
  });

  return (
    <div className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Create Voucher</h1>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <InputField
              htmlFor="voucherCode"
              label="Voucher Code"
              type="text"
              placeholder="Voucher Code"
              onChange={formik.handleChange}
              value={formik.values.voucherCode}
              onBlur={formik.handleBlur}
            />
            {formik.touched.voucherCode && formik.errors.voucherCode && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.voucherCode}
              </p>
            )}
          </div>

          <div>
            <InputField
              htmlFor="qty"
              label="Quantity"
              type="number"
              placeholder="0"
              onChange={formik.handleChange}
              value={formik.values.qty}
              onBlur={formik.handleBlur}
            />
            {formik.touched.qty && formik.errors.qty && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.qty}</p>
            )}
          </div>

          <div>
            <InputField
              htmlFor="value"
              label="Value"
              type="number"
              placeholder="0"
              onChange={formik.handleChange}
              value={formik.values.value}
              onBlur={formik.handleBlur}
            />
            {formik.touched.value && formik.errors.value && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.value}</p>
            )}
          </div>

          <div className="col-span-2">
            <Label
              htmlFor="expiredDate"
              className="mb-1 pr-5 text-sm font-medium"
            >
              Expired Date
            </Label>
            <DateInput
              value={formik.values.validUntill}
              onChange={(date) => formik.setFieldValue("validUntill", date)}
            />
            {formik.touched.validUntill && formik.errors.validUntill && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.validUntill}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <Label htmlFor="eventId" className="mb-1 text-sm font-medium">
              Select Event
            </Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("eventId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Events</SelectLabel>
                  {events?.map((event) => (
                    <SelectItem key={event.id} value={String(event.id)}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.eventId && formik.errors.eventId && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.eventId}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => setIsDialogOpen(true)}
            className="w-full bg-blue-500 font-medium hover:bg-blue-600"
          >
            {isPending ? (
              <div className="w-screen h-screen">
                <LoadingScreen />
                <span className="ml-2">Please wait</span>
              </div>
            ) : (
              "Create Voucher"
            )}
          </Button>
        </div>
      </form>

      <ModalConfirmation
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Create Vouchers?"
        description="Please check all detail before submit."
        onConfirm={formik.handleSubmit}
        confirmText="Yes"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CreateVoucherPage;
