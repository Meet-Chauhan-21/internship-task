import axios from "axios";
import { useEffect, useState } from "react";

type UploadedFile = {
  _id: string;
  fileName: string;
  contentType: string;
  fileUrl?: string;
  customFileUrl?: string;
  customeURL?: string;
};

const Table = () => {
  const [files, setFiles] = useState<UploadedFile[] | null>(null);

  useEffect(() => {
    try {
      const handleFiles = async () => {
        const response = await axios.get(
          `http://localhost:8080/file/all-files`,
        );
        setFiles(response.data.files);
      };
      handleFiles();
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <table className=" table-fixed w-[800px] border-separate border-2 rounded-md border-gray-300 mt-4">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="w-[200px] p-2 pl-4">Type</th>
            <th className="w-[600px] p-2 pl-4">Filename</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file) => (
            <tr key={file._id}>
              <td className="p-2 pl-4 border-r-8 border-b-2">{file.contentType}</td>
              <td className="p-2 pl-4">{file.fileName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
