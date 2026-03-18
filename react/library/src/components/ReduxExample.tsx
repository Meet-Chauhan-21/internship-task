import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../redux/data/dataSlice";
import { checkPrint as checkData } from '../redux/data/dataSlice'
import { checkPrint } from '../redux/data/resultSlice'
import { useState } from "react";
import AddMarkForm from "./AddMarkForm";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";

function ReduxExample() {
  const users = useSelector((s: any) => s.userData.data);
  const marks = useSelector((s: any) => s.marks.marks);

  const dispatch = useDispatch();

  const [selectedRno, setSelectedRno] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handelMark = (rno: number) => {
    setSelectedRno((prev) => (prev === rno ? null : rno));
    dispatch(checkData()) // call dataSlice
    dispatch(checkPrint()) // call resultSlice
  };
  
  const handleRemove = (rno: number) => {
    dispatch(removeData(rno));
  };

  const handleUpdate = (user: any) => {
    setSelectedUser(user);
  };

  const handleCloseUpdate = () => {
    setSelectedUser(null);
  };

  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Redux Example - User Management
      </h1>

      {/* USER TABLE */}
      <table className="w-full border border-gray-300 text-center mb-6">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 border border-gray-300">Roll No</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Course</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="bg-white hover:bg-gray-100">
              <td className="p-3 border border-gray-300">{user.rno}</td>
              <td className="p-3 border border-gray-300">{user.name}</td>
              <td className="p-3 border border-gray-300">{user.course}</td>
              <td className="p-3 border border-gray-300 space-x-2">
                <button
                  onClick={() => handleRemove(user.rno)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(user)}
                  className="bg-green-500 text-white px-4 py-1 m-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handelMark(user.rno)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  {selectedRno === user.rno ? "Hide Marks" : "View Marks"}
                </button>
              </td>

            </tr>
          ))}

        </tbody>
      </table>

      {/* MARKS TABLE */}
      {selectedRno !== null && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">
            Marks for Roll No: {selectedRno}
          </h2>
          {marks.filter((mark: any) => mark.rno === selectedRno).length ===
          0 ? (
            <p className="text-gray-500 italic">
              No marks found for this roll number.
            </p>
          ) : (
            <table className="w-full border border-gray-300 text-center">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="p-3 border border-gray-300">Roll No</th>
                  <th className="p-3 border border-gray-300">English</th>
                  <th className="p-3 border border-gray-300">Maths</th>
                  <th className="p-3 border border-gray-300">Coding</th>
                </tr>
              </thead>
              <tbody>
                {marks
                  .filter((mark: any) => mark.rno === selectedRno)
                  .map((mark: any, idx: number) => (
                    <tr key={idx} className="bg-white hover:bg-gray-100">
                      <td className="p-3 border border-gray-300">{mark.rno}</td>
                      <td className="p-3 border border-gray-300">
                        {mark.english}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {mark.maths}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {mark.coding}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* FORMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddUserForm />

        <AddMarkForm />
      </div>

      <UpdateUserForm
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={handleCloseUpdate}
      />
    </div>
  );
}

export default ReduxExample;
