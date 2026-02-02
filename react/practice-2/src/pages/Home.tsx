import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();
  console.log("this print in home side data", state);

  if (!state) return <h2 className="text-center mt-10 text-xl">No data found</h2>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">User Details</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">First Name</th>
              <td className="px-4 py-2">{state.firstname}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">Last Name</th>
              <td className="px-4 py-2">{state.lastname}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">Email</th>
              <td className="px-4 py-2">{state.email}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">Phone Number</th>
              <td className="px-4 py-2">{state.phone}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">Gender</th>
              <td className="px-4 py-2">{state.gender}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">Hobbies</th>
              <td className="px-4 py-2">{state.hobbies?.join(", ")}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-2 bg-gray-100">Course</th>
              <td className="px-4 py-2">{state.course}</td>
            </tr>

            {state.image && (
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-2 bg-gray-100">Image</th>
                <td className="px-4 py-2">
                  <img
                    src={URL.createObjectURL(state.image)}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
