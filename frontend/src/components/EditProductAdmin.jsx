import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";
const EditProductAdmin = ({ close,data : propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subcategory: propsData.subcategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    public: propsData.public,
  });
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      setData((prev) => {
        return {
          ...prev,
          image: [...prev.image, response.data.url],
        };
      });
    } catch (e) {
      console.error("Error uploading image:", e);
    }
  };
  const handleDeleteIamge = (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleRemoveCategory = (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleRemoveSubCategory = (index) => {
    data.subcategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateProduct,
        data: data
      });
      const dataResponse = await response.data;
      console.log("updated data: " , dataResponse)
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        close();
        fetchProductData();
        setData({
          name: "",
          image: [],
          category: [],
          subcategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          public: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]">
        <div className="bg-white w-full p-2 shadow-md flex items-center justify-between px-3">
          <h1 className=" font-medium inter">Upload Product</h1>
          <button onClick={close}>
            <IoMdClose size={20} />
          </button>
        </div>

        <div className=" grid p-3">
          <form onSubmit={handleSubmit}>
            <div className=" grid gap-2">
              <label htmlFor="namee" className=" font-medium inter">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={handleOnChange}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              />
            </div>
            <div className=" grid gap-2 pt-3">
              <label htmlFor="namee" className=" font-medium inter">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Enter product description"
                value={data.description}
                onChange={handleOnChange}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              />
            </div>

            <div className=" pt-3">
              <p className=" font-medium">Image</p>
              <div className="pt-2">
                <label className=" bg-gray-50 flex h-24 items-center justify-center border border-primary-200 rounded cursor-pointer">
                  <div className=" flex justify-center flex-col items-center">
                    {loading ? (
                      <p className=" bg-red-700">please upload image</p>
                    ) : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="productImage"
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* display image */}
            <div className=" flex flex-wrap gap-4 pt-2">
              {data.image.map((img, index) => {
                return (
                  <div
                    key={index}
                    className=" h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                  >
                    <img
                      src={img}
                      alt={img}
                      className="w-full h-full object-scale-down cursor-pointer"
                    />
                    <div
                      onClick={() => handleDeleteIamge(index)}
                      className=" absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* select category */}
            <div className=" grid gap-2">
              <label htmlFor="category" className=" font-medium inter">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category =
                    allCategory?.find((element) => element._id === value) || {};

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              >
                <option value={" "}>Select Category</option>
                {allCategory.map((c, index) => {
                  return (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className=" flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      className="flex items-center gap-1 bg-blue-50 mt-1 text-sm"
                      key={c._id + index + "productsection"}
                    >
                      <p>{c.name}</p>
                      <div
                        onClick={() => handleRemoveCategory(index)}
                        className=" hover:text-red-500 cursor-pointer"
                      >
                        <IoMdClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* select sub category */}
            <div className=" grid gap-2 pt-3">
              <label htmlFor="category" className=" font-medium inter">
                Sub Category
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory =
                    allSubCategory?.find((element) => element._id === value) ||
                    {};

                  setData((prev) => {
                    return {
                      ...prev,
                      subcategory: [...prev.subcategory, subCategory],
                    };
                  });
                  setSelectCategory("");
                }}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              >
                <option value={" "}>Select Sub Category</option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option
                      key={c._id + index + "select sub category"}
                      value={c?._id}
                    >
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className=" flex flex-wrap gap-3">
                {data.subcategory.map((c, index) => {
                  return (
                    <div
                      className="flex items-center gap-1 bg-blue-50 mt-1 text-sm"
                      key={c._id + index + "productsection"}
                    >
                      <p>{c.name}</p>
                      <div
                        onClick={() => handleRemoveSubCategory(index)}
                        className=" hover:text-red-500 cursor-pointer"
                      >
                        <IoMdClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" grid gap-2 pt-3">
              <label htmlFor="unit" className=" font-medium inter">
                Unit
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                placeholder="Enter product unit"
                value={data.unit}
                onChange={handleOnChange}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              />
            </div>

            <div className=" grid gap-2 pt-3">
              <label htmlFor="stock" className=" font-medium inter">
                Number of Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="Enter product stock"
                value={data.stock}
                onChange={handleOnChange}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              />
            </div>

            <div className=" grid gap-2 pt-3">
              <label htmlFor="price" className=" font-medium inter">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Enter product price"
                value={data.price}
                onChange={handleOnChange}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              />
            </div>

            <div className=" grid gap-2 pt-3">
              <label htmlFor="discount" className=" font-medium inter">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                placeholder="Enter product discount"
                value={data.discount}
                onChange={handleOnChange}
                className=" bg-gray-50 rounded outline-none border border-primary-200 p-2"
              />
            </div>
            <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold px-3 mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProductAdmin;
