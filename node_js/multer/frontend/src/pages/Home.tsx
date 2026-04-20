import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { ToastMessage } from "../components/Toast";
import { Delete24Regular, Dismiss24Regular, Edit24Regular } from "@fluentui/react-icons";
import Path from "../components/Path";
import Table from "../components/Table";
import CreateFolderModel from "../components/CreateFolderModel";
import Toast from "../components/Toast";

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

type RenameModalState = {
  isOpen: boolean;
  id: string;
  name: string;
  type: "file" | "folder";
};

type DeleteModalState = {
  isOpen: boolean;
  id: string;
  name: string;
  type: "file" | "folder";
  ids?: string[];
  count?: number;
};

// Blocked file extensions for upload
const BLOCKED_EXTENSIONS = ["app", "apk", "exe", "msi", "dmg"];

const Home = () => {
  const [currentPath, setCurrentPath] = useState("");
  const currentPathRef = useRef("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [renameModal, setRenameModal] = useState<RenameModalState>({
    isOpen: false,
    id: "",
    name: "",
    type: "file",
  });
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    id: "",
    name: "",
    type: "file",
    ids: [],
    count: 0,
  });
  const [renameValue, setRenameValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 350);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchInput]);

  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const navigateToPath = (path: string) => {
    currentPathRef.current = path;
    setCurrentPath(path);
  };

  const loadContents = async (path = "") => {
    try {
      const response = await axios.get("http://localhost:8080/folder/contents", {
        params: { path },
      });

      setFolders(response.data.folders || []);
      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Error loading contents:", error);
      showToast("Failed to load folder contents", "error");
    }
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
        showToast("Folder created successfully", "success");
        setIsCreateFolderOpen(false);
        await loadContents(activePath);
      } else {
        showToast("Failed to create folder", "error");
      }
    } catch (error: any) {
      console.error("Error creating folder:", error);
      const errorMsg = error.response?.data?.message || "Failed to create folder";
      showToast(errorMsg, "error");
    }
  };

  const openDeleteFileModal = (fileId: string, fileName: string) => {
    setDeleteModal({ isOpen: true, id: fileId, name: fileName, type: "file", ids: [], count: 0 });
  };

  const openDeleteFolderModal = (folderId: string, folderName: string) => {
    setDeleteModal({ isOpen: true, id: folderId, name: folderName, type: "folder", ids: [], count: 0 });
  };

  const openBulkDeleteFilesModal = (fileIds: string[], fileNames: string[]) => {
    if (fileIds.length === 0) {
      showToast("Please select at least one file", "warning");
      return;
    }

    setDeleteModal({
      isOpen: true,
      id: "",
      name: fileNames[0] || "",
      type: "file",
      ids: fileIds,
      count: fileIds.length,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.isOpen) {
      return;
    }

    try {
      if (deleteModal.type === "file" && (deleteModal.ids?.length || 0) > 0) {
        await Promise.all((deleteModal.ids || []).map((id) => axios.delete(`http://localhost:8080/file/${id}`)));
        showToast(`${deleteModal.count} files deleted successfully`, "success");
      } else {
        const endpoint = deleteModal.type === "file" ? "file" : "folder";
        await axios.delete(`http://localhost:8080/${endpoint}/${deleteModal.id}`);
        showToast(`${deleteModal.type === "file" ? "File" : "Folder"} "${deleteModal.name}" deleted successfully`, "success");
      }

      setDeleteModal({ isOpen: false, id: "", name: "", type: "file", ids: [], count: 0 });
      await loadContents(currentPathRef.current);
    } catch (error: any) {
      console.error("Error deleting item:", error);
      const errorMsg = error.response?.data?.message || "Failed to delete";
      showToast(errorMsg, "error");
      setDeleteModal({ isOpen: false, id: "", name: "", type: "file", ids: [], count: 0 });
    }
  };

  const openRenameFileModal = (fileId: string, currentName: string) => {
    setRenameModal({ isOpen: true, id: fileId, name: currentName, type: "file" });
    setRenameValue(currentName);
  };

  const openRenameFolderModal = (folderId: string, currentName: string) => {
    setRenameModal({ isOpen: true, id: folderId, name: currentName, type: "folder" });
    setRenameValue(currentName);
  };

  const handleRenameSubmit = async () => {
    const newName = renameValue.trim();

    if (!renameModal.isOpen || !newName) {
      return;
    }

    if (newName === renameModal.name) {
      setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
      setRenameValue("");
      return;
    }

    try {
      const endpoint = renameModal.type === "file" ? "file" : "folder";
      await axios.put(`http://localhost:8080/${endpoint}/${renameModal.id}/rename`, {
        newName,
      });

      showToast(`${renameModal.type === "file" ? "File" : "Folder"} renamed successfully`, "success");
      setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
      setRenameValue("");
      await loadContents(currentPathRef.current);
    } catch (error: any) {
      console.error("Error renaming:", error);
      const errorMsg = error.response?.data?.message || `Failed to rename ${renameModal.type}`;
      showToast(errorMsg, "error");
      setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
      setRenameValue("");
    }
  };

  const downloadSingleFile = async (fileId: string, fileName: string) => {
    const response = await axios.get(`http://localhost:8080/file/${fileId}/download`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const downloadFile = async (fileId: string, fileName: string) => {
    try {
      await downloadSingleFile(fileId, fileName);
      showToast(`Downloading "${fileName}"...`, "success");
    } catch (error) {
      console.error("Error downloading file:", error);
      showToast("Failed to download file", "error");
    }
  };

  const validateFileType = (fileName: string): boolean => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext && BLOCKED_EXTENSIONS.includes(ext)) {
      showToast(`File type .${ext} is not allowed for upload`, "error");
      return false;
    }
    return true;
  };

  const uploadFile = async (file: File) => {
    // Validate file type
    if (!validateFileType(file.name)) {
      return;
    }

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
      const validFiles = selectedFiles.filter((file) => validateFileType(file.name));

      if (validFiles.length === 0) {
        return;
      }

      await Promise.all(validFiles.map((file) => uploadFile(file)));
      showToast(`${validFiles.length} file(s) uploaded successfully`, "success");
      await loadContents(currentPathRef.current);
    } catch (error: any) {
      console.error("Error uploading files:", error);
      const errorMsg = error.response?.data?.message || "Failed to upload files";
      showToast(errorMsg, "error");
    }

    event.target.value = "";
  };

  useEffect(() => {
    currentPathRef.current = currentPath;
    loadContents(currentPath);
  }, [currentPath]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <h2 className="text-black text-center text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
        Dashboard
      </h2>

      <div className="flex flex-col gap-2">
        <Path currentPath={currentPath} onSelectPath={navigateToPath} />

        <div className="w-full max-w-[900px] mx-auto flex flex-wrap items-center justify-between gap-2 mt-1">
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search folders and files"
            className="h-10 w-full sm:w-72 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            aria-label="Search folders and files"
          />

          <div className="ml-auto flex flex-row items-center gap-2">
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
          searchTerm={debouncedSearch}
          selectedFileIds={selectedFileIds}
          onSelectedFileIdsChange={setSelectedFileIds}
          folders={folders}
          files={files}
          onOpenFolder={navigateToPath}
          onDeleteSelectedFiles={openBulkDeleteFilesModal}
          onDeleteFile={openDeleteFileModal}
          onDeleteFolder={openDeleteFolderModal}
          onRenameFile={openRenameFileModal}
          onRenameFolder={openRenameFolderModal}
          onDownloadFile={downloadFile}
        />
      </div>

      <CreateFolderModel
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={createFolder}
      />

      {renameModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-3 backdrop-blur-[2px]"
          onClick={() => {
            setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
            setRenameValue("");
          }}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Edit24Regular />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Rename {renameModal.type}</h2>
                  <p className="text-sm text-gray-500">Enter a new name</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
                  setRenameValue("");
                }}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
                aria-label="Close dialog"
                title="Close"
              >
                <Dismiss24Regular />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="space-y-2">
                <label htmlFor="renameInput" className="text-sm font-medium text-gray-700">
                  New name
                </label>
                <input
                  id="renameInput"
                  type="text"
                  value={renameValue}
                  onChange={(event) => setRenameValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleRenameSubmit();
                    }
                    if (event.key === "Escape") {
                      setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
                      setRenameValue("");
                    }
                  }}
                  placeholder="Enter new name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setRenameModal({ isOpen: false, id: "", name: "", type: "file" });
                    setRenameValue("");
                  }}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRenameSubmit}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-3 backdrop-blur-[2px]"
          onClick={() => setDeleteModal({ isOpen: false, id: "", name: "", type: "file", ids: [], count: 0 })}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Delete24Regular />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Delete {deleteModal.type}</h2>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, id: "", name: "", type: "file", ids: [], count: 0 })}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
                aria-label="Close dialog"
                title="Close"
              >
                <Dismiss24Regular />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <p className="text-sm text-gray-700">
                {(deleteModal.count || 0) > 0 ? (
                  <>Are you sure you want to delete <span className="font-semibold">{deleteModal.count}</span> selected files?</>
                ) : (
                  <>Are you sure you want to delete <span className="font-semibold">{deleteModal.name}</span>?</>
                )}
              </p>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setDeleteModal({ isOpen: false, id: "", name: "", type: "file", ids: [], count: 0 })}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Home;
