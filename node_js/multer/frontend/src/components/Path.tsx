type PathProps = {
  currentPath: string;
  onSelectPath: (path: string) => void;
};

const Path = ({ currentPath, onSelectPath }: PathProps) => {
  const segments = currentPath ? currentPath.split("/").filter(Boolean) : [];

  return (
    <div className="flex justify-center items-center">
      <div className="border-2 border-gray-300 rounded-md p-3 sm:p-4 w-full max-w-[800px] text-base sm:text-xl bg-white">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-semibold">Path</h2>

          <button
            onClick={() => onSelectPath("")}
            className="shrink-0 border border-gray-400 px-3 py-1 rounded-md text-sm hover:bg-gray-100"
          >
            Root
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:text-base break-all text-gray-700">
          <button
            onClick={() => onSelectPath("")}
            className={`rounded-md px-2 py-1 ${
              currentPath === ""
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            /root
          </button>

          {segments.map((segment, index) => {
            const targetPath = segments.slice(0, index + 1).join("/");

            return (
              <div key={targetPath} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                <button
                  onClick={() => onSelectPath(targetPath)}
                  className={`rounded-md px-2 py-1 ${
                    currentPath === targetPath
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {segment}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Path;
