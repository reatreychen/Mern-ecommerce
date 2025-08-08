export const baseURL = import.meta.env.VITE_API_URL;

const SummaryApi = {
  register: {
    method: "POST",
    url: "/api/user/register",
    headers: {
      "Content-Type": "application/json",
    },
  },
  login: {
    method: "POST",
    url: "/api/user/login",
    headers: {
      "Content-Type": "application/json",
    },
  },
  refreshToken: {
    method: "POST",
    url: "/api/user/refresh-token",
    headers: {
      "Content-Type": "application/json",
    },
  },
  userDetails: {
    method: "GET",
    url: "/api/user/user-detail",
    headers: {
      "Content-Type": "application/json",
    },
  },
  logOut: {
    method: "GET",
    url: "/api/user/logout",
    headers: {
      "Content-Type": "application/json",
    },
  },
  uploadAvatar: {
    method: "PUT",
    url: "/api/user/upload-avatar",
  },
  updateUserDetail: {
    method: "PUT",
    url: "/api/user/update-user-details",
  },
  addCategory: {
    method: "POST",
    url: "/api/category/add-category",
  },
  uploadImage: {
    method: "POST",
    url: "/api/upload",
  },
  getCategory: {
    method: "GET",
    url: "/api/category/get-category",
  },
  updateCategory: {
    method: "PUT",
    url: "/api/category/update-category",
  },
  deleteCategory: {
    method: "DELETE",
    url: "/api/category/delete-category",
  },
  addSubCategory: {
    method: "POST",
    url: "/api/sub-category/create-sub-category",
  },
  getSubCategory: {
    method: "GET",
    url: "/api/sub-category/get-sub-category",
  },
  updateSubCategory: {
    method: "PUT",
    url: "/api/sub-category/update-sub-category",
  },
  deleteSubCategory: {
    method: "DELETE",
    url: "/api/sub-category/delete-sub-category",
  },
  createProduct: {
    method: "POST",
    url: "/api/product/create-product",
  },
  getProduct: {
    method: "POST",
    url: "/api/product/get-product",
  },
  updateProduct: {
    method: "PUT",
    url: "/api/product/update-product",
  },
  deleteProduct: {
    method: "DELETE",
    url: "/api/product/delete-product",
  },
  getProductByCategory: {
    method: "POST",
    url: "/api/product/get-product-by-category",
  },
  getProductByCategoryAndSubCategory: {
    method: "POST",
    url: "/api/product/get-product-by-categoryandsubcategory",
  },
  getProductDetail: {
    method: "POST",
    url: "/api/product/get-product-detail",
  },
  searchProduct: {
    method: "POST",
    url: "/api/product/search-product",
  },
  addToCart: {
    method: "POST",
    url: "/api/cart/add-cart",
  },
  getToCart: {
    method: "GET",
    url: "/api/cart/get-cart",
  },
  updateCartItem: {
    method: "PUT",
    url: "/api/cart/update-cart",
  },
  deleteCartItem: {
    method: "DELETE",
    url: "/api/cart/delete-cart",
  },
  addAddress: {
    method: "POST",
    url: "/api/address/add-address",
  },
  getAddress: {
    method: "GET",
    url: "/api/address/get-address",
  },
  updateAddress: {
    method: "PUT",
    url: "/api/address/update-address",
  },
  deleteAddress: {
    method: "DELETE",
    url: "/api/address/delete-address",
  },
  payByCash: {
    method: "POST",
    url: "/api/order/order-cash",
  },
  getOrder: {
    method: "GET",
    url: "/api/order/get-order",
  }
};

export default SummaryApi;
