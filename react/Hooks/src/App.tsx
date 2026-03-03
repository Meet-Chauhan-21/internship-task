import { useState } from "react";
import UseEffect from "./components/UseEffect";
import UseState from "./components/UseState";
import UseContext from "./components/UseContext";
import UseCallback from "./components/UseCallback";
import UseReducer from "./components/UseReducer";
import UseMemo from "./components/UseMemo";
import UseRef from "./components/UseRef";
import UserContext from "./context/UserContextProvider";

function App() {
  
  const [show, setShow] = useState("useState");

  return (
    <>
  <UserContext>
      <div>
        <h2 className="text-center m-4 text-3xl font-bold text-green-500">
          Let's Try All Hooks
        </h2>
        <div className="button-group flex gap-2 justify-center items-center">
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useState");
            }}
            >
            useState
          </button>
          <br />
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useEffect");
            }}
          >
            useEffect
          </button>
          <br />
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useCallback");
            }}
          >
            useCallback
          </button>
          <br />
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useContext");
            }}
            >
            useContext
          </button>
          <br />
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useReducer");
            }}
          >
            useReducer
          </button>
          <br />
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useMemo");
            }}
            >
            useMemo
          </button>
          <br />
          <button
            className="text-xl font-semibold text-blue-400 border-2 m-2 px-3 py-2 transition-all hover:bg-slate-200 hover:text-[#242424] rounded-md"
            onClick={() => {
              setShow("useRef");
            }}
            >
            useRef
          </button>
        </div>

        {show === "useState" && <UseState />}
        {show === "useEffect" && <UseEffect />}
        {show === "useContext" && <UseContext />}
        {show === "useCallback" && <UseCallback />}
        {show === "useReducer" && <UseReducer />}
        {show === "useMemo" && <UseMemo />}
        {show === "useRef" && <UseRef />}

      </div>
      

      </UserContext>
    </>
  );
}

export default App;
