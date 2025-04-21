import { useEffect, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import UseMenu from "./UseMenu";
import { useGlobalContext } from "../Provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [displayCartItem , setDisplayCartItem] = useState(false);
  const user = useSelector((state) => state.user.user);
  const cartItem = useSelector((state) => state.cartItem.cart)
  const {totalPrice ,totalQty} = useGlobalContext()
  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  }

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return
    }
    navigate("/user");
  }

  // useEffect(()=> {
  //   const qty = cartItem.reduce((acc, item) =>  {
  //     return acc + item.quantity;
  //   },0)
  //   setTotalQty(qty);
  //   const totalPrice = cartItem.reduce((acc, item) => {
  //     return acc + (item.productId.price * item.quantity)
  //   },0)
  //   setTotalPrice(totalPrice)
  // },[cartItem]);

  return (
    <header className=" h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className=" container mx-auto flex items-center px-2 justify-between">
          {/* logo */}
          <Link className=" flex items-center gap-1">
            <MdDeliveryDining size="35" />
            <h1 className=" text-2xl lobster-regular">Trey</h1>
          </Link>
          {/* search */}
          <div className=" hidden lg:block">
            <Search />
          </div>
          {/* user profile */}
          <div>
            {/* mobile */}
            <button
              className=" text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={25} />
            </button>
            {/* desktop */}
            {/* login */}
            <div className=" hidden lg:flex items-center gap-4">
              {user?._id ? (
                <div className=" relative">
                  <div
                    onClick={() => setOpenUserMenu((pre) => !pre)}
                    className=" select-none flex items-center gap-1 cursor-pointer"
                  >
                    <p className=" font-semibold font-sans">Account</p>
                    {openUserMenu ? (
                      <GoTriangleDown size={25} />
                    ) : (
                      <GoTriangleUp size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className=" bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UseMenu close ={handleCloseUserMenu}/>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLogin}
                  className="inter font-semibold px-3 py-1 bg-green-800 hover:bg-green-700 text-white rounded  text-[18px]"
                >
                  Login
                </button>
              )}
              <button onClick={()=> setDisplayCartItem(true)} className="flex items-center bg-green-800 hover:bg-green-700 px-3 py-1 rounded text-white gap-1">
                {/* add cart */}
                <div className=" animate-bounce">
                  <BsCart4 size={25} />
                </div>
                <div className=" font-semibold text-sm">
                  {
                    cartItem[0] ? (
                      <div>
                        <p>{totalQty} items</p>
                        <p>${totalPrice}</p>
                      </div>
                    ): (
                      <p>My Cart</p>
                    )
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" container mx-auto px-2 lg:hidden">
        <Search />
      </div>

      {
        displayCartItem && (
          <DisplayCartItem close={()=>setDisplayCartItem(false)}/>
        )     
         }
    </header>
  );
};

export default Header;
