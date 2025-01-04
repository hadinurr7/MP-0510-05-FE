"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { LuUserRoundPen } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { RegisterSchema } from "./schema";
import useOrganizerRegister from "@/hooks/api/auth/useOrganizerRegister";
import Link from "next/link";

export const RegisterOrganizerPage = () => {
  const { mutateAsync: register, isPending } = useOrganizerRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },

    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <main className="container mx-auto flex justify-center pt-20">
      <div className="h-full w-full">
        <div className="flex h-full w-full justify-center">
          <Card className="w-[500px] items-center border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Register as Organizer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full items-center">
                  {/* Organization Name */}
                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <LuUserRoundPen className="text-gray-500" size={20} />
                      <Input
                        name="fullname"
                        type="text"
                        placeholder="Organization Name"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1 border-none outline-none focus:outline-none focus:ring-0"
                      />
                    </div>
                    {!!formik.touched.fullname && !!formik.errors.fullname ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.fullname}
                      </p>
                    ) : null}
                  </div>

                  {/* Email */}
                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
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
                      />
                    </div>
                    {!!formik.touched.email && !!formik.errors.email ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <MdOutlineEmail className="text-gray-500" size={20} />
                      <Input
                        name="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1 border-none p-2 outline-none focus:outline-none focus:ring-0"
                      />
                    </div>
                    {!!formik.touched.phoneNumber && !!formik.errors.phoneNumber ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.phoneNumber}
                      </p>
                    ) : null}
                  </div>

                  {/* Password */}
                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <MdLockOutline className="text-gray-500" size={20} />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="flex-1 border-none p-2 outline-none focus:outline-none focus:ring-0"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="border-none bg-transparent text-black shadow-none hover:bg-transparent focus:outline-none"
                      >
                        {showPassword ? (
                          <FaRegEye size={20} />
                        ) : (
                          <FaRegEyeSlash size={20} />
                        )}
                      </Button>
                    </div>
                    {!!formik.touched.password && !!formik.errors.password ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4 flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="flex items-center gap-2 rounded-2xl border border-black p-2">
                      <MdLockOutline className="text-gray-500" size={20} />
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
                        className="border-none bg-transparent text-black shadow-none hover:bg-transparent focus:outline-none"
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

                  {/* Submit */}
                  <div>
                    <Button
                      type="submit"
                      className="mt-4 w-full rounded-l-2xl rounded-r-2xl bg-registerButton p-6 hover:bg-indigo-900"
                      disabled={isPending}
                    >
                      {isPending ? "Loading..." : "Register"}
                    </Button>
                  </div>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Already have an account?
                  <Link href="/login" className="text-blue-500 underline">
                     Log in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default RegisterOrganizerPage;
