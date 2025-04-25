import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/validURLConvert.js";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton.jsx";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

  return (
      <Link
          to={url}
          className="relative group bg-white border shadow-md rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-lg min-w-36 lg:min-w-56 grid gap-2 lg:gap-3 p-3 lg:p-4"
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

        {/* Product Image */}
        <div className="relative z-10 h-24 w-full rounded-xl overflow-hidden">
          <img
              src={data.image[0]}
              alt={data.name}
              className="w-full h-full object-scale-down group-hover:object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Time & Discount Tag */}
        <div className="relative z-10 flex items-center gap-2 text-xs">
        <span className="bg-green-200 text-green-700 rounded-full px-2 py-[2px] font-medium">
          10 min
        </span>
          {Boolean(data.discount) && (
              <span className="bg-green-100 text-green-600 px-2 py-[2px] rounded-full font-medium">
            {data.discount}% discount
          </span>
          )}
        </div>

        {/* Product Name */}
        <div className="relative z-10 px-1 font-medium text-sm lg:text-base line-clamp-2 group-hover:text-blue-700 transition-colors">
          {data.name}
        </div>

        {/* Unit Info */}
        <div className="relative z-10 px-1 text-sm font-semibold text-gray-700">
          {data.unit} Unit
        </div>

        {/* Price & Add to Cart */}
        <div className="relative z-10 px-1 flex items-center justify-between text-sm lg:text-base">
          <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
            ${data.price}
          </div>
          <div className="transform group-hover:scale-105 transition-transform">
            {data.stock === 0 ? (
                <span className="text-red-500 font-medium">Out of stock</span>
            ) : (
                <AddToCartButton data={data} />
            )}
          </div>
        </div>

        {/* Border Animation */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors duration-300"></div>
      </Link>
  );
};

export default CardProduct;
