import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/validURLConvert.js";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton.jsx";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  // const {fetchCartItems} = useGlobalContext()

  // const handleAddToCart = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     setLoading(true);
  //     const response = await Axios({
  //       ...summaryApi.addToCart,
  //       data: {
  //         productId: data?._id
  //       }
  //     })

  //     const responseData = response.data
  //     if (responseData.success) {
  //       toast.success(responseData.message)
  //       if (fetchCartItems) {
  //         fetchCartItems()
  //       }
  //     }
  //   }catch(err) {
  //     console.log(err);
  //     toast.error(
  //       err?.response?.data?.message
  //   )
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  return (
    <Link
      to={url}
      className=" shadow-md border py-2 lg:p-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white"
    >
      <div className=" min-h-20 w-full max-h-24 rounded overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className=" w-full h-full object-scale-down"
        />
      </div>
      <div className=" flex items-center gap-1">
        <div className="rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-200">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p
              className="text-green-700 bg-green-200
             px-2 w-fit text-xs rounded-full"
            >
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>

      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>

      <div className="w-fit gap-1 px-2 lg:px-0 text-sm font-semibold  lg:text-base">
        {data.unit} Unit
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">${data.price}</div>
        </div>

        <div>
          {data.stock == 0 ? (
            <p>Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
