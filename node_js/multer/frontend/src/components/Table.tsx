import { useState } from "react";
import {
  Document20Regular,
  DocumentPdf20Regular,
  DocumentText20Regular,
  Folder20Regular,
  Image20Regular,
} from "@fluentui/react-icons";
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
  relativePath: string;
  fullPath: string;
};

type TableProps = {
  currentPath: string;
  folders: FolderItem[];
  files: FileItem[];
  onOpenFolder: (path: string) => void;
};

const getFileTypeInfo = (file: FileItem) => {
  const extension = (file.contentType || file.fileName.split(".").pop() || "file").toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "avif"].includes(extension)) {
    return { extension, Icon: Image20Regular, iconClass: "text-emerald-600" };
  }

  if (extension === "pdf") {
    return { extension, Icon: DocumentPdf20Regular, iconClass: "text-red-600" };
  }

  if (extension === "doc" || extension === "docx") {
    return { extension, Icon: DocumentText20Regular, iconClass: "text-blue-600" };
  }

  return { extension, Icon: Document20Regular, iconClass: "text-gray-600" };
};

const Table = ({ currentPath, folders, files, onOpenFolder }: TableProps) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[800px] mt-1 sm:mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="table-fixed min-w-[560px] w-full text-sm sm:text-base">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-5">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500 sm:px-5" colSpan={1}>
                  No folders or files in {currentPath || "root"}
                </td>
              </tr>
            ) : (
              <>
                {folders.map((folder) => {
                  return (
                    <tr
                      key={folder._id}
                      onClick={() => onOpenFolder(folder.path)}
                      className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-2.5 sm:px-5">
                        <span className="inline-flex items-center gap-2.5 font-medium text-gray-800">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-amber-50">
                            <Folder20Regular className="text-amber-600" aria-hidden="true" />
                          </span>
                          <span className="truncate">{folder.folderName}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {files.map((file) => {
                  const fileType = getFileTypeInfo(file);
                  const FileTypeIcon = fileType.Icon;

                  return (
                    <tr
                      key={file._id}
                      onClick={() => setSelectedFile(file)}
                      className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-2.5 sm:px-5">
                        <span className="inline-flex items-center gap-2.5 text-gray-700">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-50">
                            <FileTypeIcon className={fileType.iconClass} aria-hidden="true" />
                          </span>
                          <span className="truncate">{file.fileName}</span>
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
