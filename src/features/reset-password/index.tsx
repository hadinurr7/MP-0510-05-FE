"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { ResetPasswordSchema } from "./schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useResetPassword from "@/hooks/api/auth/useResetPassword";

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { mutateAsync: ResetPassword, isPending } = useResetPassword(token);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,

    onSubmit: async (values) => {
      await ResetPassword(values);
    },
  });

  return (
    <main className="container mx-auto flex justify-center pt-20">
      <div className="h-full w-full">
        <div className="flex h-full w-full justify-center">
          <Card className="w-[500px] items-center border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full items-center gap-6">
                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="password">New Password</Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <Input
                        name="password"
                        type="password"
                        placeholder="New Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1 border-none p-2 outline-none focus:outline-none focus:ring-0"
                      />
                    </div>
                    {!!formik.touched.password && !!formik.errors.password ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1 border-none p-2 outline-none focus:outline-none focus:ring-0"
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="bg-transparent text-black shadow-none hover:bg-transparent focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <FaRegEye size={20} />
                        ) : (
                          <FaRegEyeSlash size={20} />
                        )}
                      </Button>
                    </div>
                    {!!formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 w-full rounded-l-2xl rounded-r-2xl bg-registerButton p-6 hover:bg-indigo-900"
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Reset Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
