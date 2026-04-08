import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Path from "../components/Path";
import Table from "../components/Table";
import Operation from "../components/Operation";

type FolderItem = {
  _id: string;
  folderName: string;
  path: string;
};

type FileItem = {
  _id: string;
  fileName: string;
  contentType: string;
  customeURL?: string;
  folderId?: FolderItem;
};

const Home = () => {
  const [currentPath, setCurrentPath] = useState("");
  const currentPathRef = useRef("");
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const segments = currentPath ? currentPath.split("/").filter(Boolean) : [];
  const parentPath = segments.slice(0, -1).join("/");
  const isRoot = currentPath === "";

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

  useEffect(() => {
    currentPathRef.current = currentPath;
    loadContents(currentPath).catch((error) => {
      console.error("Error fetching folder contents:", error);
    });
  }, [currentPath]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <h2 className="text-black text-center text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="p-2 sm:p-4">
            <Path
              currentPath={currentPath}
              onSelectPath={navigateToPath}
            />
          </div>

          <div className="p-2 sm:p-4">
            <div className="mb-3">
              <button
                onClick={() => navigateToPath(parentPath)}
                disabled={isRoot}
                className="border border-gray-400 px-3 py-1 rounded-md text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Back
              </button>
            </div>

            <Table
              currentPath={currentPath}
              folders={folders}
              files={files}
              onOpenFolder={navigateToPath}
            />
          </div>
        </div>

        <div className="w-full lg:w-[320px]">
          <Operation
            selectedPath={currentPath}
            getSelectedPath={() => currentPathRef.current}
            onSuccess={() => loadContents(currentPathRef.current)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
