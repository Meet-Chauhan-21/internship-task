// import React from 'react'
import { useFormik } from "formik";
import { registrationForm } from "../utils/validation";
import { useEffect, useState } from "react";

const Register = () => {

  const [formData,setFormData] = useState({})

  useEffect(()=>{
      console.log("Form data value : ", formData);
  },[formData])

  const formkit = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      hobbies: []
    },

    validationSchema: registrationForm,

    onSubmit: (value) => {
      setFormData(Object.entries(value))
      console.log("Form value : ", value);
      alert("form submited..!");
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        onSubmit={formkit.handleSubmit}
        className="w-[420px] bg-white border rounded-xl p-6 shadow-md"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Registration Form
        </h2>

        {/* First & Last Name */}
        <div className="flex gap-3 mb-4">
          <div className="w-full">
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

        {/* Gender */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-medium">Gender:</span>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" 
              onChange={formkit.handleChange}
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" 
              onChange={formkit.handleChange}
            />
            Female
          </label>
          {formkit.touched.gender && formkit.errors.gender && (
            <p className="text-red-500 text-sm mt-1">
              {formkit.errors.gender}
            </p>
          )}
        </div>

        {/* Hobbies */}
        {/* Hobbies */}
<div className="mb-2">
  <span className="font-medium block mb-2">Hobbies:</span>

  <div className="flex items-center gap-4">
    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        name="hobbies"
        value="cricket"
        onChange={formkit.handleChange}
      />
      Cricket
    </label>

    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        name="hobbies"
        value="dancing"
        onChange={formkit.handleChange}
      />
      Dancing
    </label>

    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        name="hobbies"
        value="singing"
        onChange={formkit.handleChange}
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


        {/* Submit */}
        <input
          type="submit"
          value="Submit"
          className="w-full h-10 border rounded-md hover:bg-black hover:text-white transition"
        />
      </form>
    </div>
  );
};

export default Register;
