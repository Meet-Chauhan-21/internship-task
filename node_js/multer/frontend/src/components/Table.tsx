import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Document20Regular,
  DocumentPdf20Regular,
  DocumentText20Regular,
  Folder20Regular,
  Image20Regular,
  Delete20Regular,
  Edit20Regular,
  CloudArrowDown20Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from "@fluentui/react-icons";
import { FileSpreadsheet, Presentation, Table2 } from "lucide-react";
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
  searchTerm?: string;
  selectedFileIds: string[];
  onSelectedFileIdsChange: Dispatch<SetStateAction<string[]>>;
  folders: FolderItem[];
  files: FileItem[];
  onOpenFolder: (path: string) => void;
  onDeleteSelectedFiles?: (fileIds: string[], fileNames: string[]) => void;
  onDeleteFile?: (fileId: string, fileName: string) => void;
  onDeleteFolder?: (folderId: string, folderName: string) => void;
  onRenameFile?: (fileId: string, fileName: string) => void;
  onRenameFolder?: (folderId: string, folderName: string) => void;
  onDownloadFile?: (fileId: string, fileName: string) => void;
};

const DEFAULT_ITEMS_PER_PAGE = 5;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

const getFileTypeInfo = (file: FileItem) => {
  const extension = (file.contentType || file.fileName.split(".").pop() || "file").toLowerCase();

  if (extension === "csv") {
    return { Icon: Table2, iconClass: "text-teal-600" };
  }

  if (["xlsx", "xls"].includes(extension)) {
    return { Icon: FileSpreadsheet, iconClass: "text-green-700" };
  }

  if (["ppt", "pptx"].includes(extension)) {
    return { Icon: Presentation, iconClass: "text-orange-600" };
  }

  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "avif"].includes(extension)) {
    return { Icon: Image20Regular, iconClass: "text-emerald-600" };
  }

  if (extension === "pdf") {
    return { Icon: DocumentPdf20Regular, iconClass: "text-red-600" };
  }

  if (extension === "doc" || extension === "docx") {
    return { Icon: DocumentText20Regular, iconClass: "text-blue-600" };
  }

  return { Icon: Document20Regular, iconClass: "text-gray-600" };
};

const Table = ({
  currentPath,
  searchTerm = "",
  selectedFileIds,
  onSelectedFileIdsChange,
  folders,
  files,
  onOpenFolder,
  onDeleteSelectedFiles,
  onDeleteFile,
  onDeleteFolder,
  onRenameFile,
  onRenameFolder,
  onDownloadFile,
}: TableProps) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  // Combine folders and files
  type FolderWithType = FolderItem & { isFile?: never; isFolder: true };
  type FileWithType = FileItem & { isFolder?: never; isFile: true };
  type TableItem = FolderWithType | FileWithType;

  const normalizedSearch = searchTerm.toLowerCase();
  const filteredFolders = normalizedSearch
    ? folders.filter((folder) => folder.folderName.toLowerCase().includes(normalizedSearch))
    : folders;
  const filteredFiles = normalizedSearch
    ? files.filter((file) => file.fileName.toLowerCase().includes(normalizedSearch))
    : files;

  const allItems: TableItem[] = [
    ...filteredFolders.map((f) => ({ ...f, isFolder: true as const })),
    ...filteredFiles.map((f) => ({ ...f, isFile: true as const })),
  ];

  const totalItems = allItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allItems.slice(startIndex, endIndex);

  const isEmpty = totalItems === 0;
  const currentPageFiles = currentItems.filter((item): item is FileWithType => item.isFile === true);
  const isAllPageFilesSelected =
    currentPageFiles.length > 0 && currentPageFiles.every((file) => selectedFileIds.includes(file._id));
  const selectedFiles = files.filter((file) => selectedFileIds.includes(file._id));
  const selectedFileNames = selectedFiles.map((file) => file.fileName);

  useEffect(() => {
    // Keep only selected ids that still exist in the current folder/file list.
    onSelectedFileIdsChange((prev) => prev.filter((id) => files.some((file) => file._id === id)));
  }, [files, onSelectedFileIdsChange]);

  useEffect(() => {
    onSelectedFileIdsChange([]);
    setCurrentPage(1);
  }, [currentPath, onSelectedFileIdsChange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleSingleFileSelection = (fileId: string) => {
    onSelectedFileIdsChange((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId],
    );
  };

  const toggleSelectAllCurrentPageFiles = () => {
    const pageFileIds = currentPageFiles.map((file) => file._id);

    if (isAllPageFilesSelected) {
      onSelectedFileIdsChange((prev) => prev.filter((id) => !pageFileIds.includes(id)));
      return;
    }

    onSelectedFileIdsChange((prev) => Array.from(new Set([...prev, ...pageFileIds])));
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div className="w-full max-w-[900px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="w-12 px-2 py-3 text-center">
                <input
                  type="checkbox"
                  checked={isAllPageFilesSelected}
                  onChange={toggleSelectAllCurrentPageFiles}
                  className="h-5 w-5 cursor-pointer"
                  aria-label="Select all files on this page"
                />
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-5">
                Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-5 text-center w-[180px]">
                <div className="flex items-center justify-end gap-2">
                  {selectedFileIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => onDeleteSelectedFiles?.(selectedFileIds, selectedFileNames)}
                      className="inline-flex items-center justify-center rounded p-1.5 text-red-600 transition-colors hover:bg-red-100"
                      title={`Delete ${selectedFileIds.length} selected`}
                      aria-label={`Delete ${selectedFileIds.length} selected files`}
                    >
                      <Delete20Regular />
                    </button>
                  )}
                  <span>Operations</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-gray-500 sm:px-5 col-span-2"
                  colSpan={3}
                >
                  {normalizedSearch
                    ? `No folders or files match "${searchTerm}"`
                    : `No folders or files in ${currentPath || "root"}`}
                </td>
              </tr>
            ) : (
              <>
                {currentItems.map((item, idx) => {
                  if (item.isFile === true) {
                    const file = item as FileWithType;
                    const fileType = getFileTypeInfo(file);
                    const FileTypeIcon = fileType.Icon;

                    return (
                      <tr
                        key={`${idx}-file`}
                        className="border-b border-gray-100 transition-colors hover:bg-slate-50"
                      >
                        <td className="px-2 py-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={selectedFileIds.includes(file._id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleSingleFileSelection(file._id);
                            }}
                            className="h-5 w-5 cursor-pointer"
                            aria-label={`Select ${file.fileName}`}
                          />
                        </td>
                        <td
                          className="px-2 py-2.5 sm:px-3 cursor-pointer"
                          onClick={() => setSelectedFile(file)}
                        >
                          <span className="inline-flex items-center gap-2.5 text-gray-700">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-50">
                              <FileTypeIcon
                                className={fileType.iconClass}
                                aria-hidden="true"
                              />
                            </span>
                            <span className="truncate">{file.fileName}</span>
                          </span>
                        </td>
                        <td className="px-4 py-2.5 sm:px-5 w-[180px]">
                          <div className="flex items-center justify-end gap-2 w-full">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDownloadFile?.(file._id, file.fileName);
                              }}
                              className="p-1.5 text-gray-600 hover:bg-green-100 hover:text-green-600 rounded transition-colors"
                              title="Download"
                            >
                              <CloudArrowDown20Regular />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRenameFile?.(file._id, file.fileName);
                              }}
                              className="p-1.5 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded transition-colors"
                              title="Rename"
                            >
                              <Edit20Regular />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteFile?.(file._id, file.fileName);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-100 hover:text-red-700 rounded transition-colors"
                              title="Delete"
                            >
                              <Delete20Regular />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  } else {
                    const folder = item as FolderWithType;

                    return (
                      <tr
                        key={`${idx}-folder`}
                        className="border-b border-gray-100 transition-colors hover:bg-slate-50"
                      >
                        <td className="px-2 py-2.5 text-center" />
                        <td
                          className="px-2 py-2.5 sm:px-3 cursor-pointer"
                          onClick={() => onOpenFolder(folder.path)}
                        >
                          <span className="inline-flex items-center gap-2.5 font-medium text-gray-800">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-amber-50">
                              <Folder20Regular
                                className="text-amber-600"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="truncate">{folder.folderName}</span>
                          </span>
                        </td>
                        <td className="px-4 py-2.5 sm:px-5 w-[180px]">
                          <div className="flex items-center justify-end gap-2 w-full">
                            <span
                              className="inline-flex p-1.5 rounded opacity-0 pointer-events-none"
                              aria-hidden="true"
                            >
                              <CloudArrowDown20Regular />
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRenameFolder?.(folder._id, folder.folderName);
                              }}
                              className="p-1.5 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded transition-colors"
                              title="Rename"
                            >
                              <Edit20Regular />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteFolder?.(folder._id, folder.folderName);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-100 hover:text-red-700 rounded transition-colors"
                              title="Delete"
                            >
                              <Delete20Regular />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      {!isEmpty && (
        <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-[900px]">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} items ({totalPages} page{totalPages !== 1 ? "s" : ""})
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              Rows:
              <select
                value={itemsPerPage}
                onChange={(event) => {
                  const nextSize = Number(event.target.value) || DEFAULT_ITEMS_PER_PAGE;
                  setItemsPerPage(nextSize);
                  setCurrentPage(1);
                }}
                className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-700"
                aria-label="Rows per page"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <ChevronLeft20Regular />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <ChevronRight20Regular />
            </button>
          </div>
        </div>
      )}

      {selectedFile && (
        <FilePreviewModel
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default Table;
