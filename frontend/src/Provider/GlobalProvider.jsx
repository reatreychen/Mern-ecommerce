import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import { setCartItem } from "../store/cartProduct.js";
import {setAddress} from "../store/address.js"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/priceWithDiscount.js";
import summaryApi from "../common/SummaryApi.js";
import {setOrder} from "../store/order.js";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart)
  const fetchCartItems = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getToCart
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        dispatch(setCartItem(dataResponse.data));
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateCart = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItem,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        fetchCartItems();
        return dataResponse;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: id,
        },
      });

      const dataResponse = await response.data;
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error(error.message);
    }
  };

  const fetchAddress = async () => {
      try {
        const response = await Axios({
          ...summaryApi.getAddress,
        })
        const dataResponse = await response.data;
        if (dataResponse.success) {
          dispatch(setAddress(dataResponse.data))
        }
      }catch(error) {
        console.error("Error fetching address:", error);
      }
  }

  const fetchOrder = async () =>{
    try {
      const response = await Axios({
        ...SummaryApi.getOrder,
      })

      const dataResponse = await response.data
      if (dataResponse.success) {
        dispatch(setOrder(dataResponse.data))
      }
    }catch(error) {
      console.error("Error deleting order:", error);
    }
  }
  useEffect(() => {
    const qty = cartItem.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    setTotalQty(qty);
    const totalPrice = cartItem.reduce((acc, item) => {
        const priceAfterDiscount = pricewithDiscount(item?.productId?.price ,item?.productId?.discount)
      return acc + (priceAfterDiscount * item.quantity);
    }, 0);
    setTotalPrice(totalPrice);
    const notDiscountPrice = cartItem.reduce((acc, item) => {
        return acc + (item.productId?.price * item.quantity)
    },0)
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  useEffect(() => {
    fetchCartItems();
    fetchAddress();
    fetchOrder();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItems,
        updateCart,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
