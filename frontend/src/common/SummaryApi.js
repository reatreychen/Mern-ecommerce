export const baseURL = import.meta.env.VITE_API_URL;

const SummaryApi = {
  register: {
    method: "POST",
    url: "/api/register",
    headers: {
      "Content-Type": "application/json",
    },
  },
  login: {
    method: "POST",
    url: "/api/login",
    headers: {
      "Content-Type": "application/json",
    },
  },
  refreshToken: {
    method: "POST",
    url: "/api/refresh-token",
    headers: {
      "Content-Type": "application/json",
    },
  },
  userDetails: {
    method: "GET",
    url: "/api/user-detail",
    headers: {
      "Content-Type": "application/json",
    },
  },
  logOut: {
    method: "GET",
    url: "/api/logout",
    headers: {
      "Content-Type": "application/json",
    },
  },
  uploadAvatar: {
    method: "PUT",
    url: "/api/upload-avatar",
  },
  updateUserDetail: {
    method: "PUT",
    url: "/api/update-user-details",
  },
  addCategory: {
    method: "POST",
    url: "/api/add-category",
  },
  uploadImage: {
    method: "POST",
    url: "/api/upload",
  },
  getCategory: {
    method: "GET",
    url: "/api/get-category",
  },
  updateCategory: {
    method: "PUT",
    url: "/api/update-category",
  },
  deleteCategory: {
    method: "DELETE",
    url: "/api/delete-category",
  },
  addSubCategory: {
    method: "POST",
    url: "/api/create-sub-category",
  },
  getSubCategory: {
    method: "GET",
    url: "/api/get-sub-category",
  },
  updateSubCategory: {
    method: "PUT",
    url: "/api/update-sub-category",
  },
  deleteSubCategory: {
    method: "DELETE",
    url: "/api/delete-sub-category",
  },
  createProduct: {
    method: "POST",
    url: "/api/create-product",
  },
  getProduct: {
    method: "POST",
    url: "/api/get-product",
  },
  updateProduct: {
    method: "PUT",
    url: "/api/update-product",
  },
  deleteProduct: {
    method: "DELETE",
    url: "/api/delete-product",
  },
  getProductByCategory: {
    method: "POST",
    url: "/api/get-product-by-category",
  },
  getProductByCategoryAndSubCategory: {
    method: "POST",
    url: "/api/get-product-by-categoryandsubcategory",
  },
  getProductDetail: {
    method: "POST",
    url: "/api/get-product-detail",
  },
  searchProduct: {
    method: "POST",
    url: "/api/search-product",
  },
  addToCart: {
    method: "POST",
    url: "/api/add-cart",
  },
  getToCart: {
    method: "GET",
    url: "/api/get-cart",
  },
  updateCartItem: {
    method: "PUT",
    url: "/api/update-cart",
  },
  deleteCartItem: {
    method: "DELETE",
    url: "/api/delete-cart",
  },
  addAddress: {
    method: "POST",
    url: "/api/add-address",
  },
  getAddress: {
    method: "GET",
    url: "/api/get-address",
  },
  updateAddress: {
    method: "PUT",
    url: "/api/update-address",
  },
  deleteAddress: {
    method: "DELETE",
    url: "/api/delete-address",
  },
  payByCash: {
    method: "POST",
    url: "/api/order-cash",
  },
  getOrder: {
    method: "GET",
    url: "/api/get-order",
  }
};

export default SummaryApi;
