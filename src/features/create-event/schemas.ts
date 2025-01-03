import * as Yup from "yup";

export const createEventSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, "name must be at least 3 characters long"),
 
  availableSeats: Yup.number()
    .required("Available seats are required")
    .positive("Available seats must be a positive number")
    .integer("Available seats must be a whole number"),
  price: Yup.number().required("Price is required"),
  startDate: Yup.string()
    .required("Start date is required")
    .test("is-future", "Start date cannot be in the past", function (value) {
      if (!value) return false;
      return new Date(value) > new Date();
    }),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after the start date",
      function (value) {
        if (!value) return false;
        const { startDate } = this.parent;
        if (!startDate) return false;
        return new Date(value) > new Date(startDate);
      }
    ),
  categoryId: Yup.number()
    .required("Category is required")
    .positive("Invalid category selection"),
  cityId: Yup.number()
    .required("City is required")
    .positive("Invalid city selection"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});

export const editEventSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, "name must be at least 3 characters long"),
  availableSeats: Yup.number()
    .required("Available seats are required")
    .positive("Available seats must be a positive number")
    .integer("Available seats must be a whole number"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  categoryId: Yup.number()
    .required("Category is required")
    .positive("Invalid category selection"),
  cityId: Yup.number()
    .required("City is required")
    .positive("Invalid city selection"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  thumbnail: Yup.mixed().nullable(),
});