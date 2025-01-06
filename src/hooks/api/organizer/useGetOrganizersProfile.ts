// import { axiosInstance } from "@/lib/axios";
// import { User } from "@/types/user";
// import { useQuery } from "@tanstack/react-query";

// interface GetProfileQueries {
//   token: string | undefined;
// }
// const useGetUserProfile = ({ token }: GetProfileQueries) => {
//   return useQuery({
//     queryKey: ["users", token],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get<User>("/users/organizer-profile", {
//         headers: {
//           Authorization:`Bearer ${token}`
//         },
//       });
//       return data;
//     },
//     enabled: !!token,
//   });
// };

// export default useGetUserProfile;