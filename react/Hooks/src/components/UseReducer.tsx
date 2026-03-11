import { useReducer } from "react";

type State = {
  count:number
}

const UseReducer = () => {
  
  const initialState:State = {
    count: 0
  };

  const reducer = (state: State, action: any) => {
    switch (action.type) {
      case "INCREMENT":
        return {count: state.count + 1};

      case "DECREMENT":
        return {count: state.count - 1};

      case "RESET":
        return {count: 0};

      default:
        return state;
    }
  };

  const handelChange = (type: string) => {
    if (type === "INCREMENT") {
      dispatch({ type: "INCREMENT" });
      
    } else if (type === "DECREMENT") {
      dispatch({ type: "DECREMENT" });
    
    } else if (type === "RESET") {
      dispatch({ type: "RESET" });
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2 className="text-center m-3 text-red-400 font-mono text-xl">
        useReducer hook explain
      </h2>

      <div>
        <h2 className="text-center text-yellow-400 m-2 font-bold text-2xl">
          {state.count}
        </h2>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => handelChange("INCREMENT")}
            className="border-2 border-blue-500 transition-all hover:border-blue-800 text-blue-500 p-1 px-2 m-2"
          >
            INCREMENT
          </button>
          <button
            onClick={() => handelChange("DECREMENT")}
            className="border-2 border-green-500 transition-all hover:border-green-800 text-green-500 p-1 px-2 m-2"
          >
            DECREMENT
          </button>
          <button
            onClick={() => handelChange("RESET")}
            className="border-2 border-red-500 transition-all hover:border-red-800 text-red-500 p-1 px-2 m-2"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseReducer;
