import { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../redux/data/dataSlice";

const AddUserForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    rno: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInsert = () => {
    dispatch(
      addData({
        id: Number(formData.id),
        name: formData.name,
        rno: Number(formData.rno),
      }),
    );
    setFormData({ id: "", name: "", rno: "" });
  };

  return (
    <>
      {/* FORM 1 - Add New User */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add New User
        </h2>
        <div className="flex flex-col gap-3 mb-4">
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter ID"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="rno"
            value={formData.rno}
            onChange={handleChange}
            placeholder="Enter Roll No"
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          onClick={handleInsert}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add User
        </button>
      </div>
    </>
  );
};

export default AddUserForm;
