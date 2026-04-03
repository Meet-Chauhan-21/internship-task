

const FilePreviewModel = ({ file, onClose } : any) => {

  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[90%] max-w-3xl relative">
        <button onClick={onClose} className="absolute right-2 top-2">
          ❌
        </button>

        <h2 className="text-center mb-3">{file.fileName}</h2>

        {file.contentType?.startsWith("image/") ? (
          <img src={file.customeURL || ""} className="w-full h-[500px] object-cover" />

        ) : file.contentType === "application/pdf" ? (
          <iframe src={file.customeURL || "" + "#toolbar=0&navpanes=0&scrollbar=0"} className="w-full h-[500px]" />
        ) : file.contentType === "application/msword" || file.contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
          <iframe src={file.customeURL || "" + "#toolbar=0&navpanes=0&scrollbar=0"} className="w-full h-[500px]" />
        ) : (
          <p className="text-center">Preview not supported</p>
        )}
      </div>
    </div>
  );
};

export default FilePreviewModel;