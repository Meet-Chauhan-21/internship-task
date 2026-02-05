import * as Yup from "yup";

export const registrationForm = Yup.object({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string().email("invaid email").required("email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "minimum 6 characters")
    .required("password is required"),
  gender: Yup.string().required("gender is required"),
  hobbies: Yup.array().min(1, "select al least one hobby"),
  course: Yup.string().required("course is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only JPG or PNG allowed", (value) => {
      if (!value) return false;
      return (
        value instanceof File &&
        // ["image/jpeg", "image/png"].includes(value.type);
        value.type.startsWith("image/")
      );
    }),
  // .test("fileSize", "Image size must be less than 2MB", (value) => {
  //   if (!value) return false;
  //   return value instanceof File && value.size <= 2 * 1024 * 1024;
  // })
});
