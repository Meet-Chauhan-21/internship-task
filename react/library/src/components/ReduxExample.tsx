import { useDispatch, useSelector } from "react-redux";
import { addData, removeData } from "../redux/data/dataSlice";
import { useState } from "react";

function ReduxExample() {

  const users = useSelector((s: any) => s.userData.data);
  const marks = useSelector((s: any)=> s.marks.marks);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    rno: ""
  });

  const [selectedRno, setSelectedRno] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInsert = () => {
    dispatch(addData({
      id: Number(formData.id),
      name: formData.name,
      rno: Number(formData.rno)
    }));

    setFormData({
      id: "",
      name: "",
      rno: ""
    });
  };

  const handelMark = (rno: number) => {
    setSelectedRno(prev => prev === rno ? null : rno);
  }

  const handleRemove = (id: number) => {
    dispatch(removeData(id));
  };

  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Redux Example - User Management
      </h1>

      {/* TABLE */}
      <table className="w-full border border-gray-300 text-center mb-6">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 border border-gray-300">ID</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Roll No</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="bg-white hover:bg-gray-100">
              <td className="p-3 border border-gray-300">{user.id}</td>
              <td className="p-3 border border-gray-300">{user.name}</td>
              <td className="p-3 border border-gray-300">{user.rno}</td>
              <td className="p-3 border border-gray-300">

                <button 
                  onClick={() => handleRemove(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handelMark(user.rno)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 ml-2"
                >
                  view marks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRno !== null && (
        <table className="w-full border border-gray-300 text-center mb-6">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-3 border border-gray-300">Roll No</th>
              <th className="p-3 border border-gray-300">English</th>
              <th className="p-3 border border-gray-300">Maths</th>
              <th className="p-3 border border-gray-300">Coding</th>
            </tr>
          </thead>
          <tbody>
            {marks.filter((mark: any) => mark.rno === selectedRno).map((mark: any) => (
              <tr key={mark.rno} className="bg-white hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{mark.rno}</td>
                <td className="p-3 border border-gray-300">{mark.english}</td>
                <td className="p-3 border border-gray-300">{mark.maths}</td>
                <td className="p-3 border border-gray-300">{mark.coding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
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
            type="text"
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
    </div>
  );
}

export default ReduxExample;
