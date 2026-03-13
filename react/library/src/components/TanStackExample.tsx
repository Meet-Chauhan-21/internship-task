import { useProduct } from "../TanStack/useProduct";

function TanStackExample() {
  const { data, isPending, error, isError } = useProduct();

  if (isPending) {
    return (
      <div className="p-10 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          TanStack Query Example - Users List
        </h1>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="ml-4 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          TanStack Query Example - Users List
        </h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error?.message || "Failed to fetch data"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        TanStack Query Example - Users List
      </h1>

      {/* TABLE */}
      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3 border border-gray-300">ID</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Phone</th>
            <th className="p-3 border border-gray-300">City</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user: any) => (
            <tr key={user.id} className="bg-white hover:bg-gray-100">
              <td className="p-3 border border-gray-300">{user.id}</td>
              <td className="p-3 border border-gray-300">{user.name}</td>
              <td className="p-3 border border-gray-300">{user.email}</td>
              <td className="p-3 border border-gray-300">{user.phone}</td>
              <td className="p-3 border border-gray-300">{user.address?.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        <p className="font-semibold">
          Total Users: {data?.length || 0}
        </p>
        <p className="text-sm mt-1">
          Data fetched from JSONPlaceholder API using TanStack Query
        </p>
      </div>
    </div>
  );
}

export default TanStackExample;
