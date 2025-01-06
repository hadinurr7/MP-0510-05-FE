import * as Yup from "yup";

export const updateEventSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  price: Yup.number().positive("Price must be a positive number").min(1, "Price must be at least 1").required("Price is required"),
  availableSeat: Yup.number().nullable().min(1, "Available seats must be at least 1").required("Available seats are required"),
  startDate: Yup.date().min(new Date(), "Start time cannot be in the past").required("Start time is required"),
  enDate: Yup.date().min(Yup.ref('startTime'), "End time must be later than start time").required("End time is required"),
  city: Yup.string().nullable().required("city is required"),
});
