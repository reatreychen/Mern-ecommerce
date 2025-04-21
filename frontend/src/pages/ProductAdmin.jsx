import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoMdSearch } from "react-icons/io";
const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 10,
          search: search.trim(),
        },
      });
      const responseData = await response.data;
      console.log("response data", responseData);
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);
  useEffect(() => {
    fetchProductData();
  }, [page]);
  console.log("product data loaded", productData);
  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold text-xl">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200">
          <IoMdSearch size={25} />
          <input
            type="text"
            placeholder="Search product here ..."
            className="h-full w-full  outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className=" bg-white p-2 shadow-md flex items-center justify-between ">
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="spinner-border text-primary-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {productData.map((p, index) => {
          return (
            <ProductCardAdmin
              key={index}
              data={p}
              fetchProductData={fetchProductData}
            />
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between my-4">
        <button
          onClick={handlePrevious}
          className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
        >
          Previous
        </button>
        <button className="w-full bg-slate-100">
          {page}/{totalPageCount}
        </button>
        <button
          onClick={handleNext}
          className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductAdmin;
