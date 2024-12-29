"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Link from "next/link";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { LoginSchema } from "./schema";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import useLogin from "@/hooks/api/auth/useLogin";

export const LoginPage = () => {
  const { mutateAsync: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <main className="container mx-auto flex justify-center pt-20">
      <div className="h-full w-full">
        <div className="flex h-full w-full justify-center">
          <Card className="w-[500px] items-center border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full items-center gap-6">
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
                  <div>
                    <Button
                      type="submit"
                      className="mt-4 w-full rounded-l-2xl rounded-r-2xl bg-registerButton p-6 hover:bg-indigo-900"
                      disabled={isPending}
                    >
                      {isPending ? "Loading..." : "Login"}
                    </Button>
                  </div>
                </div>
              </form>
              <div className="mt-4 text-center">
                <Link href="/forgot-password" className="text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
