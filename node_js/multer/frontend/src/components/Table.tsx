import { useState } from "react";
import FilePreviewModel from "./FilePreviewModel";

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

type TableProps = {
  currentPath: string;
  folders: FolderItem[];
  files: FileItem[];
  onOpenFolder: (path: string) => void;
};

const getFileTypeInfo = (file: FileItem) => {
  const extension = file.fileName.split(".").pop()?.toLowerCase() || "file";

  if (file.contentType?.startsWith("image/")) {
    return { icon: "🖼", label: extension.toUpperCase() };
  }

  if (extension === "pdf") {
    return { icon: "📕", label: "PDF" };
  }

  if (extension === "doc" || extension === "docx") {
    return { icon: "📘", label: extension.toUpperCase() };
  }

  return { icon: "📄", label: extension.toUpperCase() };
};

const Table = ({ currentPath, folders, files, onOpenFolder }: TableProps) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[800px] overflow-x-auto">
        <table className="table-fixed min-w-[560px] w-full border-separate border-2 rounded-md border-gray-300 mt-2 sm:mt-4 bg-white text-sm sm:text-base">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="w-[180px] p-2 pl-3 sm:pl-4">Type</th>
              <th className="w-[380px] p-2 pl-3 sm:pl-4">Name</th>
            </tr>
          </thead>
          <tbody>
            {folders.length === 0 && files.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan={2}>
                  No folders or files in {currentPath || "root"}
                </td>
              </tr>
            ) : (
              <>
                {folders.map((folder) => {
                  const isSelected = selectedRowId === folder._id;

                  return (
                    <tr
                      key={folder._id}
                      onClick={() => setSelectedRowId(folder._id)}
                      onDoubleClick={() => onOpenFolder(folder.path)}
                      className={`cursor-pointer border-b-2 ${
                        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-2 pl-3 sm:pl-4 border-r-8 border-b-2">
                        <span className="font-medium">Folder</span>
                      </td>
                      <td className="p-2 pl-3 sm:pl-4 border-b-2 font-medium">
                        <span className="inline-flex items-center gap-2">
                          <span aria-hidden="true">📁</span>
                          <span>{folder.folderName}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {files.map((file) => {
                  const isSelected = selectedRowId === file._id;
                  const fileType = getFileTypeInfo(file);

                  return (
                    <tr
                      key={file._id}
                      onClick={() => setSelectedRowId(file._id)}
                      onDoubleClick={() => setSelectedFile(file)}
                      className={`cursor-pointer border-b-2 ${
                        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-2 pl-3 sm:pl-4 border-r-8 border-b-2">
                        <span className="font-medium">{fileType.label}</span>
                      </td>
                      <td className="p-2 pl-3 sm:pl-4 border-b-2">
                        <span className="inline-flex items-center gap-2">
                          <span aria-hidden="true">{fileType.icon}</span>
                          <span>{file.fileName}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>

        {selectedFile && (
          <FilePreviewModel
            file={selectedFile}
            onClose={() => setSelectedFile(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
