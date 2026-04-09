import axios from "axios";
import { useRef, useState } from "react";

type OperationProps = {
  selectedPath: string;
  getSelectedPath: () => string;
  onSuccess: () => Promise<void> | void;
};

const Operation = ({ selectedPath, getSelectedPath, onSuccess }: OperationProps) => {
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createFolder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const trimmedFolderName = folderName.trim();

      if (!trimmedFolderName) {
        return alert("Folder name cannot be empty");
      }

      const activePath = getSelectedPath();

      const folderPath = activePath
        ? `${activePath}/${trimmedFolderName}`
        : trimmedFolderName;

      const response = await axios.post("http://localhost:8080/folder/create", {
        folderName: trimmedFolderName,
        folderPath,
      });

      if (response.data.message === "Folder created successfully") {
        alert("Folder created successfully");
        setFolderName("");
        await onSuccess();
      } else {
        alert("Failed to create folder");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder");
    }
  };

  const uploadFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!file) {
        return alert("Please select a file");
      }

      const activePath = getSelectedPath();

      const formData = new FormData();
      formData.append("folderPath", activePath);
      formData.append("myfile", file);

      await axios.post(
        `http://localhost:8080/file/upload?folderPath=${encodeURIComponent(activePath)}`,
        formData,
        {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-folder-path": activePath,
        },
        },
      );

      alert("File uploaded successfully");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      await onSuccess();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div className="w-full lg:w-[320px] border-2 border-gray-300 rounded-xl shadow-sm p-4 sm:p-5 flex flex-col gap-5 sm:gap-6 bg-white">
      <form
        onSubmit={uploadFile}
        encType="multipart/form-data"
        className="flex flex-col gap-3 w-full"
      >
        <label className="text-sm font-semibold text-gray-600">
          Upload File
        </label>

        <input
          ref={fileInputRef}
          type="file"
          name="myfile"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="border border-gray-300 rounded-md p-2 text-sm cursor-pointer file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-blue-50 file:text-blue-600 file:rounded-md hover:file:bg-blue-100"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Upload
        </button>

        <p className="text-xs text-gray-500 break-all">
          Current path: {selectedPath || "/root"}
        </p>
      </form>

      <div className="w-full h-[1px] bg-gray-300"></div>

      <form className="flex flex-col gap-3" onSubmit={createFolder}>
        <label className="text-sm font-semibold text-gray-600">
          Create Folder
        </label>

        <input
          type="text"
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
          placeholder="Enter folder name"
          className="border border-gray-300 rounded-md p-2 text-sm"
        />

        <button
          type="submit"
          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 rounded-md transition"
        >
          + Create Folder
        </button>
      </form>
    </div>
  );
};

export default Operation;
