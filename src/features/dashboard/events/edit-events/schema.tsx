import * as Yup from "yup";


export const editEventSchema = Yup.object().shape({

  name: Yup.string().required("Event name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .min(0, "Price must be greater than or equal to 0")
    .required("Price is required"),
  availableSeats: Yup.number()
    .min(1, "Available seats must be at least 1")
    .required("Available seats is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  startDate: Yup.date()
    .min(new Date(), "Start date must be in the future")
    .required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  categoryId: Yup.number().required("Category is required"),
  cityId: Yup.number().required("City is required"),
});