import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetail from "./utils/fetchUserDetail";
import { setUserDetails } from "./store/counterSlice";
import { useDispatch } from "react-redux";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import GlobalProvider from "./Provider/GlobalProvider";
import CartMobile from "./components/CartMobile";

const App = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetail();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        dispatch(setAllCategory(dataResponse.data))
      }
    } catch (e) {
      console.error("Error fetching category:", e);
    }finally{
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const dataResponse = await response.data;
      if (dataResponse.success) {
        dispatch(setAllSubCategory(dataResponse.data))
      }
    } catch (e) {
      console.error("Error fetching category:", e);
    }
  };


  useEffect(() => {
    fetchUser();
    fetchCategory()
    fetchSubCategory()
  }, []);

  return (
    <GlobalProvider>
    
      <Header />
      <main className={'min-h-[78vh]'}>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <CartMobile/>
    </GlobalProvider>
  );
};

export default App;
