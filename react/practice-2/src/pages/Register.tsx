import { useFormik } from "formik";
import { registrationForm } from "../utils/validation";
import { useEffect, useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log("Form data value : ", formData);
  }, [formData]);

  const formkit = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      hobbies: [],
      course: "",
      image: null,
    },

    validationSchema: registrationForm,

    onSubmit: (value) => {
      setFormData(Object.entries(value));
      console.log("Form value : ", value);
      alert("form submitted..!");
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <form
        onSubmit={formkit.handleSubmit}
        className="w-full max-w-[800px] bg-white border rounded-xl p-4 md:p-6 shadow-md md:flex"
      >
        {/* Left Section - Desktop, Full width on mobile */}
        <div className="md:w-1/2 md:pr-4 md:border-r mb-6 md:mb-0">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Registration Form
          </h2>

          {/* First & Last Name */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="w-full mb-3 sm:mb-0">
              <input
                name="firstname"
                value={formkit.values.firstname}
                onChange={formkit.handleChange}
                type="text"
                placeholder="First name"
                className="w-full p-2 border rounded-md"
              />
              {formkit.touched.firstname && formkit.errors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {formkit.errors.firstname}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                name="lastname"
                value={formkit.values.lastname}
                onChange={formkit.handleChange}
                type="text"
                placeholder="Last name"
                className="w-full p-2 border rounded-md"
              />
              {formkit.touched.lastname && formkit.errors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {formkit.errors.lastname}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              name="email"
              value={formkit.values.email}
              onChange={formkit.handleChange}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md"
            />
            {formkit.touched.email && formkit.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              name="password"
              value={formkit.values.password}
              onChange={formkit.handleChange}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-md"
            />
            {formkit.touched.password && formkit.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.password}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <input
              name="phone"
              value={formkit.values.phone}
              onChange={formkit.handleChange}
              type="text"
              placeholder="Phone"
              className="w-full p-2 border rounded-md"
            />
            {formkit.touched.phone && formkit.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Desktop, Full width on mobile */}
        <div className="md:w-1/2 md:pl-4">
          {/* Gender */}
          <div className="mb-4">
            <span className="font-medium block mb-2">Gender:</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  onChange={formkit.handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  onChange={formkit.handleChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
            {formkit.touched.gender && formkit.errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.gender}
              </p>
            )}
          </div>

          {/* Hobbies */}
          <div className="mb-4">
            <span className="font-medium block mb-2">Hobbies:</span>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="hobbies"
                  value="cricket"
                  onChange={formkit.handleChange}
                  className="mr-1"
                />
                Cricket
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="hobbies"
                  value="dancing"
                  onChange={formkit.handleChange}
                  className="mr-1"
                />
                Dancing
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="hobbies"
                  value="singing"
                  onChange={formkit.handleChange}
                  className="mr-1"
                />
                Singing
              </label>
            </div>
            {formkit.touched.hobbies && formkit.errors.hobbies && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.hobbies}
              </p>
            )}
          </div>

          {/* Course */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select your course</label>
            <select
              name="course"
              value={formkit.values.course}
              onChange={formkit.handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select course</option>
              <option value="bca">BCA</option>
              <option value="bba">BBA</option>
              <option value="b-com">B-Com</option>
            </select>
            {formkit.touched.course && formkit.errors.course && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.course}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                formkit.setFieldValue("image", file);
              }}
              onBlur={() => formkit.setFieldTouched("image", true)}
              className="w-full p-2 border rounded-md file:mr-3 file:border-0 file:bg-gray-200 file:px-3 file:py-1 file:rounded-md file:cursor-pointer text-sm"
            />
            {formkit.touched.image && formkit.errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.image}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:mt-8">
            <input
              type="submit"
              value="Submit"
              className="w-full h-10 border rounded-md hover:bg-black hover:text-white transition cursor-pointer bg-gray-800 text-white font-medium"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;