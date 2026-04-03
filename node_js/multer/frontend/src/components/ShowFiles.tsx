import axios from "axios";
import { useState } from "react";
import ImageCard from "./ImageCard";
import PdfCard from "./PdfCard";
import DocxCard from "./DocxCard";
import FilePreviewModel from "./FilePreviewModel";

type UploadedFile = {
  _id: string;
  fileName: string;
  contentType: string;
  fileUrl?: string;
  customFileUrl?: string;
  customeURL?: string;
};

const ShowImage = () => {
  const [files, setFiles] = useState<UploadedFile[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  const handleImage = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/file/all-files`);
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // 🔹 Separate files
  const images = files?.filter((f) => f.contentType?.startsWith("image/"));
  const pdfs = files?.filter((f) => f.contentType === "application/pdf");
  const docs = files?.filter(
    (f) =>
      f.contentType === "application/msword" ||
      f.contentType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );


  return (
    <div>
      {/* Button */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={handleImage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load Files
        </button>
      </div>

      {/* 🔥 IMAGE SECTION */}
      <h2 className="text-xl font-semibold mt-8 text-center">Images</h2>
      <div className="flex flex-wrap gap-6 justify-center items-center mt-4">
        {images?.map((file) => (
          <ImageCard file={file} onClick={() => setSelectedFile(file)} />
        ))}
      </div>

      {/* 🔥 PDF SECTION */}
      <h2 className="text-xl font-semibold mt-10 text-center"> Documents (PDF) </h2>
      <div className="flex flex-wrap gap-6 justify-center items-center mt-4">
        {pdfs?.map((file) => (
          <PdfCard file={file} onClick={() => setSelectedFile(file)} />
        ))}
      </div>

      {/* 🔥 DOCS SECTION */}
      <h2 className="text-xl font-semibold mt-10 text-center"> Documents (DOC/DOCX) </h2>
      <div className="flex flex-wrap gap-6 justify-center items-center mt-4">
        {docs?.map((file) => (
          <DocxCard file={file} onClick={() => setSelectedFile(file)} />
        ))}
      </div>

      {/* 🔥 FILE PREVIEW MODAL */}
      {selectedFile && (
        <FilePreviewModel file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
      
    </div>
  );
};

export default ShowImage;
