import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { useSelector } from "react-redux";
import { pricewithDiscount } from "../utils/priceWithDiscount";
import AddToCartButton from "./AddToCartButton";
import imageEmpty from "../assets/empty.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa6";
import toast from "react-hot-toast";
const DisplayCartItem = ({ close }) => {
  const { totalPrice, totalQty, notDiscountTotalPrice } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const rediractToAddAddress = () => {
    if (user?._id) {
      navigate("/checkout")
      if (close) {
        close();
      }
      return
    }
    toast("Please login")
  }
  return (
    <section className=" fixed bg-neutral-900 top-0 left-0 bottom-0 right-0 bg-opacity-70 z-50">
      <div className=" bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className=" flex items-center justify-between p-4">
          <h2 className="font-semibold inter">Cart</h2>
          <button onClick={close} className="lg:hidden">
            <IoMdClose size={25} />
          </button>
          <button className="hidden lg:block" onClick={close}>
            <IoMdClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/***display items */}
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p className="font-semibold inter">Your total savings</p>
                <p className="font-semibold inter">
                  $ {notDiscountTotalPrice - totalPrice}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div key={index} className="flex  w-full gap-4">
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className="object-scale-down"
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2 font-semibold">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold">
                            {pricewithDiscount(
                              item?.productId?.price,
                              item?.productId?.discount
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bg-white p-4">
                <h3 className="inter font-semibold">Bill details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p className=" font-semibold inter">Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      ${notDiscountTotalPrice}
                    </span>
                    <span className="font-semibold inter">${totalPrice}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p className="font-semibold inter">Quntity total</p>
                  <p className="flex items-center gap-2 font-semibold">
                    {totalQty} item
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p className=" font-semibold inter">Delivery Charge</p>
                  <p className="flex items-center gap-2 font-semibold">Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  <p>$ {totalPrice}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={imageEmpty}
                className="w-full h-full object-scale-down"
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className=" p-2">
            <div className="bg-green-600 px-2 py-3 rounded text-neutral-100 flex items-center justify-between gap-3">
              <div className=" font-semibold inter text-xl ">
                $ {totalPrice}
              </div>
              <button onClick={rediractToAddAddress} className=" flex items-center justify-center font-semibold inter  gap-1">
                Checkout
                <span>
                  <FaCaretRight size={20} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
