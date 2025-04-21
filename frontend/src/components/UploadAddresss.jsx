import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Axios from "../utils/Axios.js";
import summaryApi from "../common/SummaryApi.js";
const UploadAddresss = ({ close }) => {
    const [data ,setData] = useState([])

    const handleOnchange = (e) => {
        const {name , value} = e.target
        setData((prev)=>({...prev,[name]:value}))
    }

    const handelSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await Axios({
          ...summaryApi.addAddress,
          data : data
        })
        const dataResponse = await response.data
        console.log("address" ,dataResponse)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className="fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className=" bg-white max-w-4xl w-full p-4 rounded">
        <div className=" flex justify-between items-center">
          <h1 className="p-2 font-semibold inter text-xl">Add Address</h1>
          <button onClick={close} className=" w-fit ml-auto block">
            <IoMdClose size={25} />
          </button>
        </div>
        <form onSubmit={handelSubmit} className=" mt-2 grid gap-1">
          <div className="grid gap-2 p-2">
            <label
              htmlFor="addressLine"
              className=" inter font-semibold font-2xl"
            >
              Address Line:
            </label>
            <input
              type="text"
                name="address_line"
                onChange={handleOnchange}
                required
              className="bg-blue-50 py-2 rounded border border-gray-400 font-medium"
            />
          </div>

          <div className="grid gap-2 p-2">
            <label htmlFor="city" className=" inter font-semibold font-2xl">
              City:
            </label>
            <input
              type="text"
                name="city"
                onChange={handleOnchange}
                required
              className="bg-blue-50 py-2 rounded border border-gray-400 font-medium"
            />
          </div>

          <div className="grid gap-2 p-2">
            <label htmlFor="state" className=" inter font-semibold font-2xl">
              State:
            </label>
            <input
              type="text"
                name="state"
                onChange={handleOnchange}
                required
              className="bg-blue-50 py-2 rounded border border-gray-400 font-medium "
            />
          </div>

          <div className="grid gap-2 p-2">
            <label htmlFor="pincode" className=" inter font-semibold font-2xl">
              Pincode:
            </label>
            <input
              type="text"
                name="pincode"
                onChange={handleOnchange}
                required
              className="bg-blue-50 py-2 rounded border border-gray-400 font-medium"
            />
          </div>

          <div className="grid gap-2 p-2">
            <label htmlFor="country" className=" inter font-semibold font-2xl">
              Country:
            </label>
            <input
              type="text"
                name="country"
                onChange={handleOnchange}
                required
              className="bg-blue-50 py-2 rounded border border-gray-400 font-medium"
            />
          </div>

          <div className="grid gap-2 p-2">
            <label htmlFor="mobile" className=" inter font-semibold font-2xl">
              Mobile No.:
            </label>
            <input
              type="text"
              name="mobile"
              onChange={handleOnchange}
                required
              className="bg-blue-50 py-2 rounded border border-gray-400 font-medium"
            />
          </div>

          <button className="py-2 rounded bg-green-600 mx-2 font-medium text-white hover:bg-green-800">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadAddresss;
