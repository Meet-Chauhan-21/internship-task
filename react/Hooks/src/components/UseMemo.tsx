import { useMemo, useState } from "react";

const UseMemo = () => {
  const [count, setCount] = useState(0);

  const slowValue = useMemo(() => {
    console.log("Slow calculation running...");
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i;
    }
    return total;
  }, []);

  return (
    <div>
      <h2 className="text-center text-3xl underline m-4">Count: {count}</h2>
      <h2 className="text-center text-3xl font-bold font-sans m-4 text-white">
        Result: {slowValue}
      </h2>

      <div className="flex justify-center">
        <button
          onClick={() => setCount(count + 1)}
          className="border-2 text-xl text-red-500 rounded-md m-2 px-3 py-1 transition-all hover:text-white hover:bg-red-400 font-bold bg-white"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default UseMemo;
