"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateUserProfile from "@/hooks/api/user/useUpdateUserProfile";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import useGetUserProfile from "@/hooks/api/user/useGetUsersProfile";
import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorLoading from "@/app/components/ErrorLoading";
import validationUpdateProfile from "./schema";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const token = session?.user.token;
  const { data, isPending: isPendingGet, error } = useGetUserProfile({ token });
  const { mutateAsync: updateProfile, isPending } = useUpdateUserProfile(
    token!,
  );

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isEdited, setIsEdited] = useState(false);
  const profilePictureRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      profilePicture: null,
      phoneNumber: "",
      referralCode: "",
      totalPoints: 0,
    },
    validationSchema: validationUpdateProfile,

    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        profilePicture: values.profilePicture || null, // cek pp
      };
      await updateProfile(updatedValues);
      await updateSession(updatedValues);
      setIsEdited(false);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        fullname: data.fullname,
        profilePicture: null,
        phoneNumber: data.phoneNumber,
        referralCode: data.referralCode,
        totalPoints: data.totalPoints,
      });
      setSelectedImage(data.profilePicture || "");
    }
  }, [data]);

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("profilePicture", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleClickChooseFile = () => {
    profilePictureRef.current?.click();
  };

  if (isPendingGet) {
    return (
        <div className="flex h-full items-center justify-center">
          <LoadingScreen />
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex h-full items-center justify-center">
          <ErrorLoading />
        </div>
    );
  }

  return (
      <div className="h-screen w-screen px-4 py-10 sm:px-6 lg:px-8">
        <Card className="flex flex-1 flex-col border-none shadow-none">
          <CardHeader className="text-start">
            <CardTitle className="text-2xl">Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="mb-4 flex flex-col items-start justify-start rounded-2xl p-4 text-start">
            <div className="pb-10">
              <Label className="text-xl">Profile Picture</Label>
            </div>
            <div className="flex items-center justify- space-x-4">
              <Avatar className="h-36 w-36 cursor-pointer">
                <AvatarImage
                  src={selectedImage || data?.profilePicture}
                />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              {isEdited && (
                <div>
                <Button
                  type="button"
                  onClick={handleClickChooseFile} 
                  className="shadow-none border bg-transparent outline-1 text-black rounded px-4 py-2 hover:border-black hover:bg-transparentr"
                >
                  Change Photo Profile
                </Button>
                <input
                  ref={profilePictureRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>
              )}
            </div>
          </CardContent>

          <form onSubmit={formik.handleSubmit}>
            <CardContent className="mb-4 w-full space-y-2 rounded-2xl border border-gray-300 p-4">
              <Label htmlFor="fullname" className="text-xl">
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Full Name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={!isEdited}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <p className="text-xs text-red-500">{formik.errors.fullname}</p>
              )}
            </CardContent>

            <CardContent className="mb-4 w-full space-y-2 rounded-2xl border border-gray-300 p-4">
              <Label htmlFor="email" className="text-xl">
                Email
              </Label>
              <Input
                id="email"
                value={data?.email}
                readOnly
                className="rounded-md border border-gray-300 p-2 text-lg"
              />
            </CardContent>

            <CardContent className="mb-4 w-full space-y-2 rounded-2xl border border-gray-300 p-4">
              <Label htmlFor="phoneNumber" className="text-xl">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                readOnly={!isEdited}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`rounded-md border p-2 text-lg ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-start space-x-4">
              {isEdited ? (
                <>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isPending}
                    onChange={() => {
                      setIsEdited;
                    }}
                    className="bg-blue-500 font-medium hover:bg-blue-600"
                    >
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEdited(false);
                    }}
                    className="w-36 text-lg"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="default"
                  onClick={(e) => {
                    e.preventDefault(); // Mencegah form submit jika ada event submit lainnya
                    setIsEdited(true);
                  }}
                  className="bg-blue-500 font-medium hover:bg-blue-600"
                  >
                  <FaPencilAlt className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
  );
}
