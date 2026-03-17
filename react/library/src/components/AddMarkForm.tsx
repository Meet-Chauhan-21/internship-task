import { useDispatch } from "react-redux";
import { addMark } from "../redux/data/resultSlice";
import { useState } from "react";

const AddMarkForm = () => {
  const [marksFormData, setMarksFormData] = useState({
    rno: "",
    english: "",
    maths: "",
    coding: "",
  });

  const dispatch = useDispatch();

  const handleMarksChange = (e: any) => {
    const { name, value } = e.target;
    setMarksFormData({ ...marksFormData, [name]: value });
  };

  const handleAddMark = () => {
    if (!marksFormData.rno) return;
    dispatch(
      addMark({
        rno: Number(marksFormData.rno),
        english: Number(marksFormData.english),
        maths: Number(marksFormData.maths),
        coding: Number(marksFormData.coding),
      }),
    );
    setMarksFormData({ rno: "", english: "", maths: "", coding: "" });
  };

  return (
    <>
      {/* FORM 2 - Add User Marks */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add User Marks
        </h2>
        <div className="flex flex-col gap-3 mb-4">
          <input
            type="number"
            name="rno"
            value={marksFormData.rno}
            onChange={handleMarksChange}
            placeholder="Enter Roll No"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="english"
            value={marksFormData.english}
            onChange={handleMarksChange}
            placeholder="English Marks"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="maths"
            value={marksFormData.maths}
            onChange={handleMarksChange}
            placeholder="Maths Marks"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="coding"
            value={marksFormData.coding}
            onChange={handleMarksChange}
            placeholder="Coding Marks"
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddMark}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full"
        >
          Add Marks
        </button>
      </div>
    </>
  );
};

export default AddMarkForm;
