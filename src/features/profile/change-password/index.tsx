"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { ChangePasswordSchema } from "./schema";
import { useSession } from "next-auth/react";
import useChangePassword from "@/hooks/api/user/useChangePassword";
import ProfileLayout from "../ProfileLayout";

export function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: session } = useSession();
  const token = session?.user.token;

  const { mutateAsync: changePassword, isPending } = useChangePassword(token!);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, actions) => {
      try {
        await changePassword(values);
        actions.setSubmitting(false);
        formik.resetForm();
      } catch (error) {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <ProfileLayout>
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-6">
            <Label htmlFor="password">Current Password</Label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex-1 pl-4 pr-12 py-2 border-none outline-none focus:ring-0 w-full sm:w-[250px] md:w-[300px] lg:w-[350px]"
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent"
            >
              {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </Button>
          </div>

          <div className="relative mb-6">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex-1 pl-4 pr-12 py-2 border-none outline-none focus:ring-0 w-full sm:w-[250px] md:w-[300px] lg:w-[350px]"
            />
            <Button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparen"
            >
              {showNewPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </Button>
          </div>

          <div className="relative mb-6">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex-1 pl-4 pr-12 py-2 border-none outline-none focus:ring-0 w-full sm:w-[250px] md:w-[300px] lg:w-[350px]"
            />
            <Button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparen"
            >
              {showConfirmPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </Button>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </div>
    </ProfileLayout>
  );
}
