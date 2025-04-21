import Loading from "./Loading.jsx";
import { useEffect, useState } from "react";
import summaryApi from "../common/SummaryApi.js";
import Axios from "../utils/Axios.js";
import { useGlobalContext } from "../Provider/GlobalProvider.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems ,updateCart ,deleteCartItem} = useGlobalContext();
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState() 
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });

      const responseData = response.data;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // checking this item in cart or not
  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailableCart(checkingItem);

    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity);
    setCartItemDetails(product)
  }, [data, cartItem]);

  const increaseQty =async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await updateCart(cartItemDetails?._id , qty+1)
    if (response.success) {
      toast.success("item added")
    }
  }

  const decreaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (qty === 1) {
       deleteCartItem(cartItemDetails?._id)
    }else {
      const response = await updateCart(cartItemDetails?._id , qty-1)
      if (response.success) {
        toast.success("item removed")
      }
    }
  }
  return (
    <div className={"w-full max-w-[150px]"}>
      {isAvailableCart ? (
        <div className="flex w-full h-full">
          <button
          onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>

          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">
            {qty}
          </p>

          <button
          onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
