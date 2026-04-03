
const PdfCard = ({ file, onClick }: any) => {
    return (
        <div
            key={file._id}
            onClick={onClick}
            className="w-64 bg-white border rounded-xl shadow hover:shadow-lg cursor-pointer transition overflow-hidden"
        >
            {/* 🔹 Top: icon + name */}
            <div className="flex items-center gap-2 p-3">
                <span className="text-xl">📕</span>
                <p className="text-sm font-medium truncate">{file.fileName}</p>
            </div>

            {/* 🔹 Preview (PDF first page) */}
            <div className="h-40 bg-gray-100">
                <iframe
                    src={file.customeURL || "" + "#toolbar=0&navpanes=0&scrollbar=0"}
                    className="w-full h-full overflow-hidden pointer-events-none"
                    title={file.fileName}
                />
            </div>

            {/* 🔹 Bottom */}
            <div className="p-2 text-xs font-bold text-gray-500">PDF document</div>
        </div>
    );
};

export default PdfCard;
