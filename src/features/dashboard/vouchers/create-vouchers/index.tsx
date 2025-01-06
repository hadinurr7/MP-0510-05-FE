"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { createVoucherSchema } from "./schema";
import { Loader2 } from "lucide-react";
import useGetEventsByUser from "@/hooks/api/event/useGetEventByUser";
import { useSession } from "next-auth/react";
import InputField from "@/components/ui/InputField";
import { DateInput } from "../../components/DateInput";

const CreateVoucherPage = () => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher(token || "");
  const { data: events } = useGetEventsByUser(token || "");

  const formik = useFormik({
    initialValues: {
      voucherCode: "",
      qty: 0,
      value: 0,
      validUntil: "",
      eventId: "",
    },
    validationSchema: createVoucherSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        eventId: Number(values.eventId),
      };
      await createVoucher(payload);
    },
  });

  return (
    <main className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold">Create Voucher</h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="grid w-full grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
            <InputField
              htmlFor="voucherCode"
              label="Voucher Code"
              type="text"
              placeholder="Voucher Code"
              onChange={formik.handleChange}
              value={formik.values.voucherCode}
              onBlur={formik.handleBlur}
            />
            {formik.touched.voucherCode && formik.errors.voucherCode ? (
              <div className="text-sm text-red-600">
                {formik.errors.voucherCode}
              </div>
            ) : null}
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
            {formik.touched.qty && formik.errors.qty ? (
              <div className="text-sm text-red-600">{formik.errors.qty}</div>
            ) : null}
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
            {formik.touched.value && formik.errors.value ? (
              <div className="text-sm text-red-600">{formik.errors.value}</div>
            ) : null}
          </div>

          <div className="col-span-2 flex flex-col">
            <Label
              htmlFor="validUntil"
              className="mb-1 text-base text-slate-700"
            >
              Expired Date
            </Label>

            <DateInput
              value={formik.values.validUntil}
              onChange={(date) => formik.setFieldValue("validUntil", date)}
            />

            {formik.touched.validUntil && formik.errors.validUntil ? (
              <div className="text-sm text-red-600">
                {formik.errors.validUntil}
              </div>
            ) : null}
          </div>

          <div className="col-span-2">
            {" "}
            <Label htmlFor="eventId" className="mb-1 text-base text-slate-700">
              Select Event
            </Label>
            <Select
              onValueChange={(value) => {
                formik.setFieldValue("eventId", value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Events</SelectLabel>

                  {Array.isArray(events?.data) ? (
                    events?.data.map((event) => (
                      <SelectItem key={event.name} value={String(event.id)}>
                        {event.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div>No events available</div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.eventId && formik.errors.eventId ? (
              <div className="text-sm text-red-600">
                {formik.errors.eventId}
              </div>
            ) : null}
          </div>

          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 font-medium hover:bg-blue-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span className="ml-2">Please wait...</span>
                </>
              ) : (
                "Create Voucher"
              )}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateVoucherPage;
