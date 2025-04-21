import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
const Search = () => {
  const navigate = useNavigate();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const location = useLocation();
  const [isMobile] = useMobile();
  const params = useLocation()
  const searchText = params.search.slice(3)
  const handleSearch = () => {
    navigate("/search");
  };
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const handleOnchange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  }
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 rounded-lg border flex overflow-hidden items-center text-neutral-300 bg-gray-50">

      {isSearchPage && isMobile ? (
        <Link to={"/"} className=" p-2 m-1 bg-white rounded-full shadow-md flex items-center justify-center h-full hover:bg-primary-100">
          <FaArrowLeft size={25} />
        </Link>
      ) : (
        <button className=" flex items-center justify-center h-full p-3 text-neutral-600">
          <IoSearch size={22} />
        </button>
      )}

      {!isSearchPage ? (
        //not in search page
        <div className=" hover:text-neutral-500" onClick={handleSearch}>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'Search "milk"',
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              'Search "bread"',
              1000,
              'Search "sugar"',
              1000,
              'Search "panner"',
              1000,
              'Search "chocolate"',
              1000,
              'Search "curd"',
              1000,
              'Search "rice"',
              1000,
              'Search "egg"',
              1000,
              'Search "chips"',
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      ) : (
        //when i was search page
        <div className="w-full h-full">
          <input
            type="text"
            placeholder="Search for atta dal and more."
            autoFocus
            defaultValue={searchText}
            className="bg-transparent w-full h-full outline-none font-semibold text-gray-600"
            onChange={handleOnchange}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
