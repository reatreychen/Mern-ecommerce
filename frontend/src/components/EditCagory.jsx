import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import uploadImage from "../utils/uploadImage";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
const EditCagory = ({ close, fetchData, data: categoryData }) => {
  const [data, setData] = useState({
    _id: categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        image: response.data.url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });
      const { data: dataResponse } = response;
      if (dataResponse) {
        toast.success(dataResponse.message);
        close();
        fetchData();
      } else if (response.data?.error) {
        toast.error(response.data.error);
      }
      console.log("update category", dataResponse)
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 p-4 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">Update Category</h1>
          <button className="w-fit block ml-auto" onClick={close}>
            <IoMdClose size={25} />
          </button>
        </div>

        <form className="grid gap-1 my-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName" className="font-normal">
              Name:
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter Category Name"
              className="border rounded p-2 font-normal border-primary-100 bg-slate-50"
            />
          </div>

          <div className="mt-2">
            <p className="font-normal">Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-36 flex items-center justify-center rounded mt-2">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Category"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-200 cursor-pointer"
                  } px-3 py-2 rounded text-white font-semibold`}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            disabled={!data.name || !data.image || loading}
            className={`${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-300"
                : "bg-slate-200 cursor-not-allowed"
            } font-semibold rounded px-3 py-1 mt-3 text-white`}
          >
            {loading ? "Adding..." : "Update Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCagory;
