import { useNavigate } from "react-router-dom";
import type { UserForHome } from "../types/user";

const Home = () => {

  const navigate = useNavigate();

  const lc_data = localStorage.getItem("data");
  const full_data = lc_data ? JSON.parse(lc_data) : [];

  const handleDelete = (index:number) => {
    const updatedData = full_data.filter((value:UserForHome, i:number) => {
      console.log(value);
      return i !== index
    });
    localStorage.setItem("data", JSON.stringify(updatedData));
    window.location.reload();
  };

  const handleUpdate = (user:UserForHome) => {
  navigate("/register", { state: { editUser: user } });
};


  return (
    <div className="flex justify-center items-center">
      <div>
        {!full_data[0] ? (
          <h2 className="text-2xl font-bold m-8">No Data Found</h2>
        ) : (
          <table className="w-[1100px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg m-8">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3 border">firstname</th>
                <th className="px-4 py-3 border">lastname</th>
                <th className="px-4 py-3 border">email</th>
                <th className="px-4 py-3 border">phone</th>
                <th className="px-4 py-3 border">gender</th>
                <th className="px-4 py-3 border">course</th>
                <th className="px-4 py-3 border">hobbies</th>
                <th className="px-4 py-3 border">image</th>
                <th className="px-4 py-3 border">action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {full_data.map((user:UserForHome, index:number) => (
                <tr key={user.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-1 border">{user.firstname}</td>
                  <td className="px-4 py-1 border">{user.lastname}</td>
                  <td className="px-4 py-1 border">{user.email}</td>
                  <td className="px-4 py-1 border">{user.phone}</td>
                  <td className="px-4 py-1 border">{user.gender}</td>
                  <td className="px-4 py-1 border">{user.course}</td>
                  <td className="px-4 py-1 border">
                    {user.hobbies.join(", ")}
                  </td>

                  <td className="px-4 py-1 border">
                    {user.image && (
                      <img
                        src={user.image}
                        alt="uploaded"
                        className="w-14 h-14 object-cover rounded-full border"
                      />
                    )}
                  </td>
                  <td className="flex p-4 gap-2">
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-center items-center mt-6">
          <button
            className="border-2 border-black rounded-lg p-2 transition hover:text-white hover:bg-black"
            onClick={() => {
              navigate("/register");
            }}
          >
            add new user
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
