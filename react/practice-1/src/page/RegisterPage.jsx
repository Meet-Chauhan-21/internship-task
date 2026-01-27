import React from "react";

const RegisterPage = () => {

  

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <form>
          <div className="font-mono ">
            <h2 className="text-center text-3xl p-2 font-bold mb-4">
              Form Validation ..!
            </h2>

            <div className="w-full p-2 px-5">
              <div className="flex justify-center items-center gap-5">
                <input
                  type="text"
                  placeholder="firstname"
                  className="border-2 rounded-md px-2 py-1"
                  required
                />

                <input
                  type="text"
                  placeholder="lastname"
                  className="border-2 rounded-md px-2 py-1"
                  required
                />
              </div>
            </div>

            <div className="w-full p-2 px-5">
              <input
                type="email"
                placeholder="enter email here"
                className="border-2 w-full box-border rounded-md px-2 py-1"
                required
              />
            </div>
            <div className="w-full p-2 px-5">
              <input
                type="password"
                placeholder="enter password here"
                className="border-2 w-full rounded-md px-2 py-1"
                required
              />
            </div>
            <div className="w-full p-2 px-5">
              <input
                type="submit"
                value="submit"
                className="border-2 bg-blue-600 w-full rounded-md px-2 py-1 transition-all text-xl font-bold hover:bg-blue-700 hover:text-yellow-400 hover:border-yellow-400"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
