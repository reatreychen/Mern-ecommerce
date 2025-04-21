import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/validURLConvert";
import CardProduct from "../components/CardProduct";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);
  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const subCategory = params?.subcategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

  const categoryId = params?.category?.split("-").pop() || null;
  const subCategoryId = params?.subcategory?.split("-").pop() || null;

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        },
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        if (dataResponse.page == 1) {
          setData(dataResponse.data);
        } else {
          setData([...data, ...dataResponse.data]);
        }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = AllSubCategory.filter((s) => {
      const filterData = s.category.filter((el) => {
        return el._id === categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);
  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* sub category */}
        <div className=" min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0])}-${
              s?.category[0]
            }/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link key={index}
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* product */}
        <div className="sticky">
          <div className=" bg-white shadow-md p-4 z-20 rounded">
            <h1>{subCategoryName}</h1>
          </div>
          <div className=" -z-10 min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {data.map((p, index) => {
                return <CardProduct data={p} key={index} />;
              })}
            </div>
          </div>
        </div>

        {
          loading && <loading/>
        }
      </div>
    </section>
  );
};

export default ProductList;
