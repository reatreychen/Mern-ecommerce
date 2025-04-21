import React from "react";
import { IoMdClose } from "react-icons/io";
const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className=" bg-white w-full max-w-md p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className=" font-semibold text-xl">Permanent Delete</h1>
          <button>
            <IoMdClose size={25} onClick={close} />
          </button>
        </div>
        <p className=" font-medium my-4 text-neutral-600">
          Are you sure permanent delete ?
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
          onClick={cancel}
            className="flex-1 bg-green-600 rounded py-1 px-3
             hover:bg-green-800 font-medium  hover:text-white"
          >
            Cancel
          </button>
          <button onClick={confirm} className="flex-1 px-3 py-1 bg-red-600 rounded font-medium hover:text-white hover:bg-red-900">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
