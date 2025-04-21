import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register"
import UserMenuMbile from "../pages/UserMenuMbile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import Product from "../pages/ProductAdmin";
import SubCategory from "../pages/SubCategory";
import Category from "../pages/Category";
import UploadProduct from "../pages/UploadProduct";
import AdminPermission from "../layouts/AdminPermission";
import ProductList from "../pages/ProductList";
import ProductDisplay from "../pages/ProductDisplay";
import CartMobile from "../components/CartMobile";
import CheckOut from "../pages/CheckOut.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "search",
                element: <SearchPage/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "register",
                element: <Register/>,
            },
            {
                path: "user",
                element: <UserMenuMbile/>,
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    {
                        path: "profile",
                        element: <AdminPermission><Profile/></AdminPermission>,
                    },
                    {
                        path: "myorder",
                        element: <MyOrder/>,
                    },
                    
                    {
                        path: "address",
                        element: <Address/>,
                    },
                    {
                        path: "product",
                        element: <AdminPermission><Product/></AdminPermission>,
                    },
                    {
                        path: "sub-category",
                        element: <AdminPermission><SubCategory/></AdminPermission>,
                    },
                    {
                        path: "category",
                        element: <AdminPermission><Category/></AdminPermission>,
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermission><UploadProduct/></AdminPermission>,
                    },
                ],
            },
            {
                path:":category",
                children: [
                    {
                        path:":subcategory",
                        element: <ProductList/>,
                    },
                ]
            },
            {
                path :"product/:product",
                element: <ProductDisplay/>
            },
            {
                path :"checkout",
                element: <CheckOut/>
            },
        ]
    },
])

export default router;