import  { useEffect, useRef, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link } from "react-router-dom";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/validURLConvert";
const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCard = new Array(12).fill(null);
  const subCategory = useSelector((state) => state.product.allSubCategory)
  const user = useSelector((state) => state.user);
  const containerRef = useRef();
  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });
      const dataReponse = await response.data;
      if (dataReponse.success) {
        setData(dataReponse.data);
      }
    } catch (e) {
      console.error("Error fetching products by category: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handelRedirectProductListPage =() => {
    const subcategory = subCategory.find(sub => {
      const filterData = sub.category.some(c =>{
        return c._id === id
      })
      return filterData ? true : null
    })

    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
    return url
  }
  const redirectUrl = handelRedirectProductListPage()

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, [user]);
  return (
    <section>
      <div className=" container mx-auto p-4 flex justify-between items-center gap-4">
        <h3 className=" font-semibold inter text-lg md:text-xl">{name}</h3>
        <Link to={redirectUrl} className="text-green-500 hover:text-green-800 font-semibold inter">
          See All
        </Link>
      </div>

      <div className=" flex items-center relative">
        <div
          className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCard.map((_, index) => {
              return (
                <CardLoading key={"CategorywiseProductDisplay123" + index} />
              );
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={index}
              />
            );
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryWiseProductDisplay;
