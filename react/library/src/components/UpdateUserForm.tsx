import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../redux/data/dataSlice";

const UpdateUserForm = ({ user, isOpen, onClose }: any) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    rno: "",
    name: "",
    course: "",
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      rno: user.rno,
      name: user.name,
      course: user.course,
    });
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSave = () => {
    if (!formData.rno || !formData.name || !formData.course) return;

    dispatch(
      updateData({
        rno: Number(formData.rno),
        name: formData.name,
        course: formData.course,
      }),
    );

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Update User</h2>

          <div className="flex flex-col gap-4">
            <input
              type="number"
              name="rno"
              readOnly
              value={formData.rno}
              onChange={handleChange}
              placeholder="Enter Roll No"
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

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">Select Course</option>
              <option value="BCA">BCA</option>
              <option value="B-COM">B-COM</option>
              <option value="BBA">BBA</option>
            </select>
          </div>

          <div className="mt-auto flex gap-3 pt-6">
            <button
              onClick={handleCancel}
              className="w-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handelSave}
              className="w-1/2 bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Save
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default UpdateUserForm;
