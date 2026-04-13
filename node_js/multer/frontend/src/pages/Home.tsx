import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Path from "../components/Path";
import Table from "../components/Table";
import CreateFolderModel from "../components/CreateFolderModel";

type FolderItem = {
  _id: string;
  folderName: string;
  path: string;
};

type FileItem = {
  _id: string;
  fileName: string;
  contentType: string;
  relativePath: string;
  fullPath: string;
};

const Home = () => {
  const [currentPath, setCurrentPath] = useState("");
  const currentPathRef = useRef("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  const navigateToPath = (path: string) => {
    currentPathRef.current = path;
    setCurrentPath(path);
  };

  const loadContents = async (path = "") => {
    const response = await axios.get("http://localhost:8080/folder/contents", {
      params: { path },
    });

    setFolders(response.data.folders || []);
    setFiles(response.data.files || []);
  };

  const createFolder = async (folderName: string) => {
    try {
      const activePath = currentPathRef.current;

      const folderPath = activePath ? `${activePath}/${folderName}` : folderName;

      const response = await axios.post("http://localhost:8080/folder/create", {
        folderName,
        folderPath,
      });

      if (response.data.message === "Folder created successfully") {
        alert("Folder created successfully");
        setIsCreateFolderOpen(false);
        await loadContents(activePath);
      } else {
        alert("Failed to create folder");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder");
    }
  };

  const uploadFile = async (file: File) => {
    const activePath = currentPathRef.current;

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
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    try {
      await Promise.all(selectedFiles.map((file) => uploadFile(file)));
      alert("Files uploaded successfully");
      await loadContents(currentPathRef.current);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files");
    }

    event.target.value = "";
  };

  useEffect(() => {
    currentPathRef.current = currentPath;
    loadContents(currentPath).catch((error) => {
      console.error("Error fetching folder contents:", error);
    });
  }, [currentPath]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <h2 className="text-black text-center text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
        Dashboard
      </h2>

      <div className="flex flex-col gap-2">
        <Path currentPath={currentPath} onSelectPath={navigateToPath} />

        <div className="w-full max-w-[800px] mx-auto flex justify-end mt-1">
          <div className="flex flex-row items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              onClick={() => setIsCreateFolderOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Create Folder
            </button>
          </div>
        </div>

        <Table
          currentPath={currentPath}
          folders={folders}
          files={files}
          onOpenFolder={navigateToPath}
        />
      </div>

      <CreateFolderModel
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={createFolder}
      />
    </div>
  );
};

export default Home;
