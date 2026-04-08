import React from "react";
import ShowFiles from "../components/ShowFiles";
import Path from "../components/Path";
import Table from "../components/Table";
import Operation from "../components/Operation";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

  {/* 🔹 Heading */}
  <h2 className="text-black text-center text-2xl font-semibold mb-6">
    Dashboard
  </h2>

  {/* 🔹 MAIN LAYOUT */}
  <div className="flex flex-col lg:flex-row gap-6">

    {/* LEFT SIDE */}
    <div className="flex flex-col flex-1 gap-4">

      <div className="p-4">
        <Path />
      </div>

      <div className="p-4">
        <Table />
      </div>

      <div className="border-2 rounded-lg p-4 bg-white">
        <ShowFiles />
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="w-[300px]">
      <Operation />
    </div>

  </div>
</div>
  );
};

export default Home;