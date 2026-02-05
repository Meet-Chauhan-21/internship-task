import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { registrationForm } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editUser = location.state?.editUser;

  const fileToBase64 = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const formkit = useFormik({
    initialValues: {
      id: editUser?.id || null,
      firstname: editUser?.firstname || "",
      lastname: editUser?.lastname || "",
      email: editUser?.email || "",
      password: editUser?.password || "",
      phone: editUser?.phone || "",
      gender: editUser?.gender || "",
      hobbies: editUser?.hobbies || [],
      course: editUser?.course || "",
      image: null,
    },

    enableReinitialize: true,

    validationSchema: registrationForm,

    onSubmit: async (value) => {
      const lc_data = localStorage.getItem("data");
      const users = lc_data ? JSON.parse(lc_data) : [];

      const imageBase64 = value.image
        ? await fileToBase64(value.image)
        : editUser?.image || "";

      if (value.id) {
        // 🔁 UPDATE USER
        const updatedUsers = users.map((u: User) =>
          u.id === value.id ? { ...value, image: imageBase64 } : u,
        );

        localStorage.setItem("data", JSON.stringify(updatedUsers));
        alert("User updated successfully!");
      } else {
        // ➕ ADD NEW USER
        const newUser = {
          ...value,
          id: Date.now(),
          image: imageBase64,
        };

        localStorage.setItem("data", JSON.stringify([...users, newUser]));
        alert("User added successfully!");
      }

      navigate("/home");
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
              <label htmlFor="firstname" className="font-bold ml-1">
                firstname <span className="text-red-600">*</span>
              </label>
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
                  {formkit.errors.firstname as string}
                </p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="lastname" className="font-bold ml-1">
                lastname <span className="text-red-600">*</span>
              </label>

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
                  {formkit.errors.lastname as string}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="font-bold ml-1">
              email <span className="text-red-600">*</span>
            </label>

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
                {formkit.errors.email as string}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="font-bold ml-1">
              password <span className="text-red-600">*</span>
            </label>

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
                {formkit.errors.password as string}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="font-bold ml-1">
              phone <span className="text-red-600">*</span>
            </label>

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
                {formkit.errors.phone as string}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Desktop, Full width on mobile */}
        <div className="md:w-1/2 md:pl-4">
          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="font-bold ml-1">
              Gender <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formkit.values.gender === "male"}
                  onChange={formkit.handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formkit.values.gender === "female"}
                  onChange={formkit.handleChange}
                />
                Female
              </label>
            </div>
            {formkit.touched.gender && formkit.errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.gender as string}
              </p>
            )}
          </div>

          {/* Hobbies */}
          <div className="mb-4">
            <label htmlFor="hobbies" className="font-bold ml-1">
              Hobbies <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="cricket"
                  checked={formkit.values.hobbies.includes("cricket")}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    let hobbies = [...formkit.values.hobbies];

                    if (checked) hobbies.push(value);
                    else hobbies = hobbies.filter((h) => h !== value);

                    formkit.setFieldValue("hobbies", hobbies);
                  }}
                />
                Cricket
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="dancing"
                  checked={formkit.values.hobbies.includes("dancing")}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    let hobbies = [...formkit.values.hobbies];

                    if (checked) hobbies.push(value);
                    else hobbies = hobbies.filter((h) => h !== value);

                    formkit.setFieldValue("hobbies", hobbies);
                  }}
                />
                Dancing
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="singing"
                  checked={formkit.values.hobbies.includes("singing")}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    let hobbies = [...formkit.values.hobbies];

                    if (checked) hobbies.push(value);
                    else hobbies = hobbies.filter((h) => h !== value);

                    formkit.setFieldValue("hobbies", hobbies);
                  }}
                />
                Singing
              </label>
            </div>
            {formkit.touched.hobbies && formkit.errors.hobbies && (
              <p className="text-red-500 text-sm mt-1">
                {formkit.errors.hobbies as string}
              </p>
            )}
          </div>

          {/* Course */}
          <div className="mb-4">
            <label htmlFor="course" className="font-bold ml-1">
              Course <span className="text-red-600">*</span>
            </label>
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
                {formkit.errors.course as string}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label htmlFor="image" className="font-bold ml-1">
              Upload Image <span className="text-red-600">*</span>
            </label>
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
          {editUser?.image && !formkit.values.image && (
            <div className="mb-3 flex justify-center">
              <img
                src={editUser.image}
                alt="preview"
                className="w-24 h-24 object-cover rounded-full border"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="md:mt-8">
            <input
              type="submit"
              value="Submit"
              className="w-full h-10 border rounded-md hover:bg-black hover:text-white transition cursor-pointer bg-gray-800 text-white font-medium"
            />
          </div>

          {/* View Data Button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full h-10 border border-gray-800 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
            >
              View Data
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
