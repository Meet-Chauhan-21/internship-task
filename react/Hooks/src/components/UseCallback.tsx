import React, { useCallback, useState } from "react";

const UseCallback = () => {
  const [count, setCount] = useState<number>(0);

  const check = useCallback(() => {
    console.log("printing...! and count : ", count);
  }, [count]);

  return (
    <div>
      <h2 className="text-center m-3 text-red-400 font-mono text-xl">
        useCallback hook explain
      </h2>

      <h2 className="text-center m-4 text-blue-400 text-2xl">{count}</h2>
      <div className="flex justify-center">
        <button
          onClick={() => setCount(count + 1)}
          className="border-2 text-xl text-red-500 rounded-md m-2 px-3 py-1 transition-all hover:text-white hover:bg-red-400 font-bold bg-white"
        >
          Increment
        </button>
        <button
          className="border-2 text-xl text-yellow-500 rounded-md m-2 px-3 py-1 transition-all hover:text-white hover:bg-yellow-400 font-bold bg-white"
          onClick={check}
        >
          click to print useCallback
        </button>
      </div>
    </div>
  );
};

export default UseCallback;
