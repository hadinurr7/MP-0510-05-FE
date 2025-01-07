import useAxios from "@/hooks/useAxios";

export interface UpdateEventPayload {
  name: string;
  description: string;
  price: number;
  availableSeats: number;
  thumbnail: File | null;
  startDate: string;
  endDate: string;
  categoryId: number;
  cityId: number;
}

const { axiosInstance } = useAxios();

const useUpdateEvent = async (eventId: number, payload: UpdateEventPayload, token : string) => {

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await axiosInstance.patch(`/events/${eventId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`
    }

  
  });
  return data;
};

export default useUpdateEvent