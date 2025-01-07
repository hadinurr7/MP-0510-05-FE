"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { MdOutlineEmail } from "react-icons/md";
import { ForgotPasswordSchema } from "./schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";

const ForgotPasswordPage = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
    },
  });

  return (
    <main className="container mx-auto h-screen w-screen flex justify-center pt-20">
      <div className="h-full w-full">
        <div className="flex h-full w-full justify-center">
          <Card className="w-[500px] items-center border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-xl">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full items-center gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email<span className="text-red-600">*</span></Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <MdOutlineEmail className="text-gray-500" size={20} />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1 border-none p-2 outline-none focus:outline-none focus:ring-0"
                        required
                      />
                    </div>
                    {!!formik.touched.email && !!formik.errors.email ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="mt-4 w-full rounded-l-2xl rounded-r-2xl bg-registerButton p-6 hover:bg-indigo-900"
                      disabled={isPending}
                    >
                      {isPending ? "Loading..." : "Submit"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
