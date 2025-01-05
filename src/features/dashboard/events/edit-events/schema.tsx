import * as Yup from "yup";

export const updateEventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  price: Yup.number().required("price is required"),
  availableSeat: Yup.number().nullable().required("availableSeat is required"),
  startTime: Yup.date().required("startTime is required"),
  endTime: Yup.date().required("endTime is required"),
  address: Yup.string().nullable().required("address is required"),
});