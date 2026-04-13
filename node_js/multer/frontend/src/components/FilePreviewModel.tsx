import { useEffect, useRef, useState } from "react";
import {
  Dismiss24Regular,
  DocumentPdf24Regular,
  DocumentText24Regular,
  Image24Regular,
  SlideGrid24Regular,
  TextFont24Regular,
} from "@fluentui/react-icons";
import { renderAsync } from "docx-preview";
import { init as initPptxPreview } from "pptx-preview";

type PreviewFile = {
  fileName: string;
  contentType?: string;
  relativePath?: string;
};

type FilePreviewModelProps = {
  file: PreviewFile | null;
  onClose: () => void;
};

const FilePreviewModel = ({ file, onClose }: FilePreviewModelProps) => {
  const docxContainerRef = useRef<HTMLDivElement | null>(null);
  const pptxContainerRef = useRef<HTMLDivElement | null>(null);
  const pptxViewerRef = useRef<ReturnType<typeof initPptxPreview> | null>(null);
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");

  if (!file) return null;

  const encodedRelativePath = (file.relativePath || "")
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const sourceUrl = encodedRelativePath
    ? `http://localhost:8080/uploads/${encodedRelativePath}`
    : "";
  const pdfUrl = sourceUrl
    ? `${sourceUrl}#toolbar=0&navpanes=0&scrollbar=0`
    : "";
  const extension = (file.contentType || "").toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "avif"].includes(extension);
  const isPdf = extension === "pdf";
  const isText = extension === "txt";
  const isDocx = extension === "docx";
  const isPptx = extension === "pptx";

  const getPreviewIcon = () => {
    if (isImage) return <Image24Regular className="text-emerald-700" />;
    if (isPdf) return <DocumentPdf24Regular className="text-red-700" />;
    if (isText) return <TextFont24Regular className="text-slate-700" />;
    if (isDocx) return <DocumentText24Regular className="text-blue-700" />;
    if (isPptx) return <SlideGrid24Regular className="text-violet-700" />;
    return <DocumentText24Regular className="text-gray-700" />;
  };

  const getPreviewBadgeClass = () => {
    if (isImage) return "bg-emerald-100";
    if (isPdf) return "bg-red-100";
    if (isText) return "bg-slate-100 ring-1 ring-slate-200";
    if (isDocx) return "bg-blue-100";
    if (isPptx) return "bg-violet-100 ring-1 ring-violet-200";
    return "bg-gray-100";
  };

  useEffect(() => {
    let isActive = true;
    setTextContent("");
    setPreviewError("");
    setIsLoading(false);

    const clearOfficePreview = () => {
      if (pptxViewerRef.current) {
        pptxViewerRef.current.destroy();
        pptxViewerRef.current = null;
      }

      if (docxContainerRef.current) {
        docxContainerRef.current.innerHTML = "";
      }

      if (pptxContainerRef.current) {
        pptxContainerRef.current.innerHTML = "";
      }
    };

    const loadPreview = async () => {
      if (!sourceUrl) {
        return;
      }

      if (isText) {
        setIsLoading(true);

        try {
          const response = await fetch(sourceUrl);
          const content = await response.text();

          if (isActive) {
            setTextContent(content);
          }
        } catch (error) {
          if (isActive) {
            setPreviewError("Unable to load text file preview");
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }

        return;
      }

      if (isDocx || isPptx) {
        setIsLoading(true);
        clearOfficePreview();

        try {
          const response = await fetch(sourceUrl);
          const buffer = await response.arrayBuffer();

          if (!isActive) {
            return;
          }

          if (isDocx && docxContainerRef.current) {
            await renderAsync(buffer, docxContainerRef.current, undefined, {
              ignoreWidth: true,
              ignoreHeight: true,
              breakPages: true,
              renderComments: false,
              renderHeaders: true,
              renderFooters: true,
            });
          }

          if (isPptx && pptxContainerRef.current) {
            const viewer = initPptxPreview(pptxContainerRef.current, {
              mode: "slide",
              width: 960,
              height: 600,
            });

            pptxViewerRef.current = viewer;
            await viewer.preview(buffer);
          }
        } catch (error) {
          if (isActive) {
            setPreviewError("Unable to load document preview");
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }
    };

    void loadPreview();

    return () => {
      isActive = false;
      clearOfficePreview();
    };
  }, [sourceUrl, isDocx, isPptx, isText]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-3 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getPreviewBadgeClass()}`}>
              {getPreviewIcon()}
            </div>
            <div>
              <h2 className="max-w-[520px] truncate text-base font-semibold text-gray-900 sm:max-w-[700px]">
                {file.fileName}
              </h2>
              <p className="text-sm text-gray-500">File preview</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
            aria-label="Close preview"
            title="Close"
          >
            <Dismiss24Regular />
          </button>
        </div>

        <div className="bg-gray-50 px-4 py-4 sm:px-5">
          {isImage ? (
            <img
              src={sourceUrl}
              alt={file.fileName}
              className="mx-auto max-h-[70vh] w-full rounded-xl bg-white object-contain shadow-sm"
            />
          ) : isPdf ? (
            <iframe src={pdfUrl} className="h-[70vh] w-full rounded-xl bg-white shadow-sm" />
          ) : isText ? (
            <div className="h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              {isLoading ? (
                <div className="flex h-full items-center justify-center text-gray-500">Loading preview...</div>
              ) : previewError ? (
                <div className="flex h-full items-center justify-center text-gray-500">{previewError}</div>
              ) : (
                <pre className="whitespace-pre-wrap break-words p-4 text-sm leading-6 text-gray-800">
                  {textContent}
                </pre>
              )}
            </div>
          ) : isDocx ? (
            <div className="h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              {isLoading && <div className="mb-3 text-sm text-gray-500">Loading preview...</div>}
              {previewError ? (
                <div className="text-gray-500">{previewError}</div>
              ) : (
                <div ref={docxContainerRef} />
              )}
            </div>
          ) : isPptx ? (
            <div className="h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              {isLoading && <div className="mb-3 text-sm text-gray-500">Loading preview...</div>}
              {previewError ? (
                <div className="text-gray-500">{previewError}</div>
              ) : (
                <div ref={pptxContainerRef} />
              )}
            </div>
          ) : (
            <div className="flex h-[40vh] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-gray-500">
              Preview not supported
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModel;
