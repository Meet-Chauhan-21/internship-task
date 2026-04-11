import { useState } from "react";

type CreateFolderModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => Promise<void> | void;
};

const CreateFolderModel = ({ isOpen, onClose, onCreate }: CreateFolderModelProps) => {
  const [folderName, setFolderName] = useState("");
  if (!isOpen) {
    return null;
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFolderName = folderName.trim();

    if (!trimmedFolderName) {
      alert("Folder name cannot be empty");
      return;
    }

    await onCreate(trimmedFolderName);
    setFolderName("");
  };

  const handleClose = () => {
    setFolderName("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-md bg-white p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">Create Folder</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={folderName}
            onChange={(event) => setFolderName(event.target.value)}
            placeholder="Folder name"
            className="border border-gray-300 rounded-md p-2 text-sm"
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-700"
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