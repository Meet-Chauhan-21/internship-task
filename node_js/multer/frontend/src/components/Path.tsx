import { ChevronRight12Regular, Desktop20Regular } from "@fluentui/react-icons";

type PathProps = {
  currentPath: string;
  onSelectPath: (path: string) => void;
};

const Path = ({ currentPath, onSelectPath }: PathProps) => {
  const segments = currentPath ? currentPath.split("/").filter(Boolean) : [];

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[900px] bg-white">
        <div className="flex flex-wrap items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm sm:text-base text-gray-700">
          <button
            onClick={() => onSelectPath("")}
            className="rounded p-1 hover:bg-white"
            aria-label="PC Root"
            title="PC Root"
          >
            <Desktop20Regular className="text-gray-700" />
          </button>

          {segments.map((segment, index) => {
            const targetPath = segments.slice(0, index + 1).join("/");

            return (
              <div key={targetPath} className="flex items-center gap-1">
                <ChevronRight12Regular className="text-gray-400" />
                <button
                  onClick={() => onSelectPath(targetPath)}
                  className={`rounded px-1.5 py-0.5 ${
                    index === segments.length - 1
                      ? "bg-white text-gray-900"
                      : "hover:bg-white"
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
