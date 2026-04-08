type PreviewFile = {
  fileName: string;
  contentType?: string;
  customeURL?: string;
};

type FilePreviewModelProps = {
  file: PreviewFile | null;
  onClose: () => void;
};

const FilePreviewModel = ({ file, onClose }: FilePreviewModelProps) => {
  if (!file) return null;

  const sourceUrl = file.customeURL || "";
  const pdfUrl = sourceUrl
    ? `${sourceUrl}#toolbar=0&navpanes=0&scrollbar=0`
    : "";
  const officeViewerUrl = sourceUrl
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(sourceUrl)}`
    : "";

  const isImage = file.contentType?.startsWith("image/");
  const isPdf = file.contentType === "application/pdf";
  const isWord =
    file.contentType === "application/msword" ||
    file.contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-3 sm:p-4 rounded w-[95%] max-w-3xl relative"
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-2 top-2">
          ❌
        </button>

        <h2 className="text-center mb-3">{file.fileName}</h2>

        {isImage ? (
          <img src={sourceUrl} className="w-full h-[60vh] object-contain" />
        ) : isPdf ? (
          <iframe src={pdfUrl} className="w-full h-[60vh]" />
        ) : isWord ? (
          <iframe src={officeViewerUrl} className="w-full h-[60vh]" />
        ) : (
          <p className="text-center">Preview not supported</p>
        )}
      </div>
    </div>
  );
};

export default FilePreviewModel;
