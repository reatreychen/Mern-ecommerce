import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import Loading from "../components/Loading";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCagory from "../components/EditCagory";
import ConfirmBox from "../components/ConfirmBox";
import {toast} from "react-hot-toast"

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id : "",
  });
  // const allCategory = useSelector((state) => state.product.allCategory)
  // console.log("all categories" , allCategory)
  // useEffect(() => {
  //   setCategoryData(allCategory)
  // },[allCategory])

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        setCategoryData(dataResponse.data)
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () =>{
    try {
        const response = await Axios({
          ...SummaryApi.deleteCategory,
          data: deleteCategory,
        })
        const dataResponse = await response.data;
        if (dataResponse.success) {
          toast.success(dataResponse.message);
          fetchCategory()
          setOpenConfirmBoxDelete(false);
        }
    }catch(e) {
      console.error("Error deleting category:", e);
      toast.error("Failed to delete category");
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <section>
      <div className=" bg-white p-2 shadow-md flex items-center justify-between">
        <h1 className=" font-semibold">Category</h1>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm font-semibold border border-primary-100 py-1 px-3 rounded-full hover:bg-primary-200 hover:text-white"
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && (
        <p className="text-center text-gray-600 font-semibold">
          No categories found
        </p>
      )}

      <div className=" p-4 grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-4">
        {categoryData.map((category, index) => {
          return (
            <div
              className="w-44 h-56 overflow-hidden p-2 bg-white rounded shadow-md grid gap-1"
              key={index}
            >
              <div className=" w-40 h-36 ">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-scale-down "
              />
              </div>
              <p className="text-center font-semibold text-ellipsis line-clamp-1">
                {category?.name}
              </p>
              <div className=" flex items-center h-9 gap-2 pt-2">
                <button
                  className="text-sm flex-1 py-1 rounded-full border border-primary-200 font-medium hover:bg-primary-100 hover:text-white"
                  onClick={() => {setOpenEdit(true) 
                    setEditData(category)}}
                >
                  Edit
                </button>
                <button onClick={()=>{
                  setOpenConfirmBoxDelete(true)
                  setDeleteCategory(category)
                }} className=" text-sm flex-1 py-1  rounded-full border border-primary-200 font-medium hover:bg-primary-100 hover:text-white">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategory
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCagory
          data = {editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {
        openConfirmBoxDelete && (
          <ConfirmBox close={()=>setOpenConfirmBoxDelete(false)} 
            cancel={()=>setOpenConfirmBoxDelete(false)}
            confirm={handleDeleteCategory}
          />
        )
      }
    </section>
  );
};

export default Category;
