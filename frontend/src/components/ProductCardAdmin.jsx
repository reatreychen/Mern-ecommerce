import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id,
        },
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        fetchProductData();
        setOpenDelete(false);
      }
    } catch (error) {
      console.log("error deleting product", error);
    }
  };
  return (
    <section>
      <div className="w-44 p-4 mt-4 bg-white rounded shadow-md mx-4">
        <div>
          <img
            src={data?.image[0]}
            alt={data?.name}
            className="w-full h-full object-scale-down"
          />
        </div>
        <p className=" text-ellipsis line-clamp-1 font-medium">{data?.name}</p>
        <p className=" text-slate-400">{data?.unit}</p>
        <div className=" grid grid-cols-2 py-2 gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className="border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => setOpenDelete(true)}
            className="border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {editOpen && <EditProductAdmin data={data} close={() => setEditOpen(false)} fetchProductData={fetchProductData}/>}
      {openDelete && (
        <ConfirmBox
          close={() => setOpenDelete(false)}
          cancel={() => setOpenDelete(false)}
          confirm={handleDelete}
        />
      )}
    </section>
  );
};

export default ProductCardAdmin;
