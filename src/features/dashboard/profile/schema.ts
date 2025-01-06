import * as Yup from "yup";

const validationUpdateProfile = Yup.object().shape({
  fullname: Yup.string()
    .required("Please input your full name")
    .min(3, "Full name must be at least 3 characters long")
    .max(100, "Full name cannot be more than 100 characters long"),
  
    profilePicture: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File is too large",
      (value) => {
        if (!value) return true;
        return (value as File).size <= 5 * 1024 * 1024;
      }
    ),
    phoneNumber: Yup.string()
    .matches(/^[0-9]{11,13}$/, "Phone number is not valid")
    .required("Please input your phone number"),

});

export default validationUpdateProfile;
