import api from "./api";

const getCartInfo = () => {
  return api
    .get("/cart")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};
const deleteCart = (cart_id) => {
  return api
    .delete(`/cart/${cart_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const addToCart = (product) => {
  return api
    .post("/cart", {
      product
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const couponVerification = async (couponCode) => {
  return api
    .get(`/coupon/${couponCode}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const addCoupon = async (couponCode) => {
  return api
    .post("/coupon", {
      ...couponCode
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const editCoupon = async (couponCode) => {
  return api
    .put(`/coupon/${couponCode.id}`, {
      ...couponCode
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const showCoupons = async (couponCode) => {
  return api
    .get("/coupon")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const deleteCoupon = async (id) => {
  return api
    .delete(`/coupon/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

// const enquire = (data) => {
//   return api.post("/enquire", {
//       ...data
//   })
//   .then(response => {
//     return response;
//   })
//   .catch(error => {
//     return error.response;
//   });
// };
const checkout = (data) => {
  console.log(data, "datasss ");
  return api
    .post("/checkout", {
      ...data
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const validateTransaction = (data) => {
  return api
    .post("/validate_transaction", {
      ...data
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const CartService = {
  getCartInfo,
  deleteCart,
  addToCart,
  checkout,
  validateTransaction,
  couponVerification,
  addCoupon,
  showCoupons,
  editCoupon,
  deleteCoupon
};

export default CartService;
