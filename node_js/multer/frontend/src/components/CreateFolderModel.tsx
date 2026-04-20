import { useState } from "react";
import { Dismiss24Regular, FolderAdd24Regular } from "@fluentui/react-icons";

type CreateFolderModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => Promise<void> | void;
};

const CreateFolderModel = ({ isOpen, onClose, onCreate }: CreateFolderModelProps) => {
  const [folderName, setFolderName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  if (!isOpen) {
    return null;
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFolderName = folderName.trim();

    if (!trimmedFolderName) {
      setErrorMessage("Folder name cannot be empty");
      return;
    }

    setErrorMessage("");
    await onCreate(trimmedFolderName);
    setFolderName("");
  };

  const handleClose = () => {
    setFolderName("");
    setErrorMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-3 backdrop-blur-[2px]"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FolderAdd24Regular />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Create Folder</h2>
              <p className="text-sm text-gray-500">Add a new folder in the current directory</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
            aria-label="Close dialog"
            title="Close"
          >
            <Dismiss24Regular />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div className="space-y-2">
            <label htmlFor="folderName" className="text-sm font-medium text-gray-700">
              Folder name
            </label>
            <input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(event) => {
                setFolderName(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              placeholder="Enter folder name"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              autoFocus
            />
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModel;