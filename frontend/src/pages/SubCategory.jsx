import { useEffect, useState } from "react";
import UploadSubCategory from "../components/UploadSubCategory";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import ConfirmBox from "../components/ConfirmBox";
import EditSubCategory from "../components/EditSubCategory";

const SubCategory = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(null);
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState(null);
  const [category, setCategory] = useState([])
  // Fetch Sub Category
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      });
      console.log("sub category", response.data)
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
        data: category
      })
      const dataResponse = await response.data
      if (dataResponse.success) {
        setCategory(dataResponse.data)
      }
    }catch (error) {
      console.error("Error fetching category:", error);
      toast.error(error.message)
    }
  }

  const handleDeleteCategory = async () => {
    try {
      if (!deleteSubCategory) return;
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: { _id: deleteSubCategory._id },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategory();
        setOpenConfirmBoxDelete(false);
        setDeleteSubCategory(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete subcategory.");
    }
  };

  useEffect(() => {
    fetchSubCategory();
    fetchCategory()
  }, []);

  return (
    <section>
      <div className="bg-white p-2 shadow-md flex items-center justify-between lg:w-full md:w-full w-[100%]">
        <h1 className="font-semibold">Sub Category</h1>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm font-semibold border border-primary-100 py-1 px-3 rounded-full hover:bg-primary-200 hover:text-white"
        >
          Add Sub Category
        </button>
      </div>

      {/* Table to display data */}
      <table className="table-auto w-[99%] text-base font-medium my-2 mx-2">
        <thead className=" text-center">
          <tr>
            <th className={"px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100"}>
              No.
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
              Name
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
              Image
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
              Category
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item ,index) => (
              <tr key={index} className="border-b">
                <td className={"py-2 text-sm font-medium inter text-center"}>
                  {index +1}
                </td>
                <td className="py-2 text-sm font-medium inter text-center">
                  {item.name}
                </td>
                <td className="py-2 px-4 flex items-center justify-center">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="h-14 w-14 object-scale-down rounded"
                  />
                </td>
                <td className="py-2 text-sm font-medium inter text-center">
                  {
                    category.find((category)=>category._id == item.category)?.name || "Unknow Category"
                  }
                </td>
                <td className="py-2 text-sm justify-center items-center lg:flex md:flex flex">
                  <button
                    onClick={() => {
                      setEditSubCategory(item);
                      setOpenEdit(true);
                    }}
                    className="text-sm font-semibold border border-primary-100 py-1 px-4 rounded-full hover:bg-primary-200 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteSubCategory(item);
                      setOpenConfirmBoxDelete(true);
                    }}
                    className="text-sm font-semibold border border-primary-100 py-1 px-3 rounded-full hover:bg-primary-200 hover:text-white ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No subcategories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals */}
      {openUploadCategory && (
        <UploadSubCategory
          close={() => setOpenUploadCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}
      {openEdit && editSubCategory && (
        <EditSubCategory
          close={() => setOpenEdit(false)}
          data={editSubCategory}
          fetchData={fetchSubCategory}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
