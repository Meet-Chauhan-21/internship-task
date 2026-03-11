import { useRef } from "react";

const UseRef = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handelInput = () => {
    inputRef.current?.focus();
    inputRef.current ? (inputRef.current.style.color = "red") : null;
  };

  const handelToggel = () => {
    if (inputRef.current) {
      if (inputRef.current.style.display === "none") {
        inputRef.current.style.display = "inline";
      } else {
        inputRef.current.style.display = "none";
      }
    }
  };

  return (
    <div>
      <h2 className="text-center m-3 text-red-400 font-mono text-xl">
        useRef hook explain
      </h2>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="enter text here"
          className="p-2 m-2 border-2 rounded-md"
          ref={inputRef}
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handelInput}
          className="p-1 px-2 rounded-md m-2 bg-blue-500 text-white transition-all hover:bg-blue-700"
        >
          focus input
        </button>

        <button
          onClick={handelToggel}
          className="p-1 px-2 rounded-md m-2 bg-red-500 text-white transition-all hover:bg-red-700"
        >
          toggel
        </button>
      </div>
    </div>
  );
};

export default UseRef;
