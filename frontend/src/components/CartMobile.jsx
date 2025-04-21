import { useSelector } from "react-redux";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { FaCaretRight } from "react-icons/fa";
import { FaCartShopping } from 'react-icons/fa6'
import DisplayCartItem from "./DisplayCartItem";
import { useState } from "react";
const CartMobile = () => {
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [displayCartItem,setDisplayCartItem] = useState(false)
  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit">
                <FaCartShopping />
              </div>
              <div className="text-xs font-semibold">
                <p className=" font-semibold inter ">{totalQty} items</p>
                <p>$ {totalPrice}</p>
              </div>
            </div>

            <button onClick={()=> setDisplayCartItem(true)} className="flex items-center gap-1">
              <span className="text-sm font-semibold">View Cart</span>
              <FaCaretRight />
            </button>
          </div>
        </div>
      )}

      {
        displayCartItem && (
          <DisplayCartItem close={()=>setDisplayCartItem(false)}/>
        )
      }
    </>
  );
};

export default CartMobile;
