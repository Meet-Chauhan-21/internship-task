import * as Yup from 'yup'

export const registrationForm = Yup.object({
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    email: Yup.string().email("invaid email").required("email is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "phone must be 10 digits").required("phone is required"),
    password: Yup.string().min(6,"minimum 6 characters").required("password is required"),
    gender: Yup.string().required("gender is required"),
    hobbies: Yup.array().min(1,"select al least one hobby")
}) 