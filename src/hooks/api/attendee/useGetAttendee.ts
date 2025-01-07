import useAxios from "@/hooks/useAxios";
import { Attendees } from "@/types/attendee";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";

const useGetAttendeesByEvent = (eventId: number, token : string) => {
  const { axiosInstance } = useAxios();
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["attendees", eventId,token], 
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Attendees[]>(
          `/attendees/${eventId}`,
          {
            headers: {
              Authorization:`Bearer ${token}`
            }
          }
        );
        
        console.log("Attendees Data: ", data)

        return data || {data:[]};
      } catch (error: any) {
        console.error("Error fetching attendees:", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("event-storage");
          dispatch(logoutAction());
        }

        throw new Error("Failed to fetch attendees");
      }
    },
    enabled: !!token,
  });
};

export default useGetAttendeesByEvent;
