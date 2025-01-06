// "use client";

// import useAxios from "@/hooks/useAxios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// interface UpdateProfilePayload {
//   fullname: string;
//   profilePicture: File | null;
//   phoneNumber: string;
//   totalPoints:number
// }

// const useUpdateUserProfile = (token: string) => {
//   const router = useRouter();
//   const { axiosInstance } = useAxios();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload: UpdateProfilePayload) => {
//       const updateProfileForm = new FormData();

//       updateProfileForm.append("fullname", payload.fullname);
//       updateProfileForm.append("phoneNumber", payload.phoneNumber);

//       if (payload.profilePicture) {
//         updateProfileForm.append("profilePicture", payload.profilePicture);
//       }

//       const { data } = await axiosInstance.patch("/users/profile", updateProfileForm, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return data;
//     },
//     onSuccess: async () => {
//       toast.success("Update profile success");
//       await queryClient.invalidateQueries({ queryKey: ["users"] });
//       router.push("/profile");
//     },
//     onError: (error: AxiosError<any>) => {
//       toast.error(error.response?.data.message || error.response?.data);
//     },
//   });
// };

// export default useUpdateUserProfile;
