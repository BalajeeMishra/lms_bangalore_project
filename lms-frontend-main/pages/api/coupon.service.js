import api from './api';

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

const CouponService = {
    couponVerification,
    showCoupons,
    addCoupon,
    editCoupon,
    deleteCoupon,
};

export default CouponService;