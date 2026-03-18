import ReduxExample from "./components/ReduxExample";
// import TanStackExample from "./components/TanStackExample";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
          Redux & TanStack Query Examples
        </h1> */}

        <div className="space-y-10">
          {/* Redux Example Component */}
          <ReduxExample />

          {/* TanStack Query Example Component */}
          {/* <TanStackExample /> */}
        </div>
      </div>
    </div>
  );
}

export default App;