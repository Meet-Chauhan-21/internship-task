import axios from 'axios';


const Operation = () => {

  const createFolder = async () => {
    try {
      const folderName = prompt("Enter folder name:");
      if (!folderName) return alert("Folder name cannot be empty");

      const response = await axios.post("http://localhost:8080/folder/create", { folderName });
      console.log(response.data)
      if (response.data.message === "Folder created successfully") {
        alert("Folder created successfully");
      } else {
        alert("Failed to create folder");
      }

    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder");
    }
  };

  return (
    <div className="w-[320px] border-2 border-gray-300 rounded-xl shadow-sm p-5 flex flex-col gap-6 bg-white">

      {/* 🔹 Upload Section */}
      <form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-3 w-full"
      >
        <label className="text-sm font-semibold text-gray-600">
          Upload File
        </label>

        <input
          type="file"
          name="myFile"
          className="border border-gray-300 rounded-md p-2 text-sm cursor-pointer file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-blue-50 file:text-blue-600 file:rounded-md hover:file:bg-blue-100"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Upload
        </button>
      </form>

      {/* 🔹 Divider */}
      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* 🔹 Folder Section */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-600">
          Folder
        </label>

        <button 
        onClick={createFolder}
        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 rounded-md transition">
          + Create Folder
        </button>
      </div>
    </div>
  )
}

export default Operation