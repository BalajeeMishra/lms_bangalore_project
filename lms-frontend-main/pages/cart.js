import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import CartCount from "../src/components/CartCount";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import CartService from "./api/cart.service";
const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getCartInfo();
  }, []);
  useEffect(() => {
    let temp_total = 0;
    cartList.forEach((cart_list) => {
      temp_total += +cart_list?.product?.price?.price;
    });
    setTotal(temp_total.toFixed(2));
  }, [cartList]);

  const getCartInfo = () => {
    CartService.getCartInfo()
      .then((res) => {
        if (res && res.status === 200) {
          setCartList(res.data.data);
        }
      })
      .catch((e) => {
        console.log("Error:::", e);
        setCartList([]);
      });
  };
  const deleteCart = (product) => {
    CartService.deleteCart(product?.id)
      .then((res) => {
        if (res && res.status === 200) {
          getCartInfo();
        }
      })
      .catch((e) => {
        console.log("Error:::", e);
      });
  };
  return (
    <Layout>
      <PageBanner pageName={"Cart"} />
      <section className="cart-page py-120 rpy-100">
        <div className="container">
          <div className="cart-total-product">
            <div className="d-flex justify-content-between total-section">
              <h6 className="product-name m-0">Name</h6>
              <h6 className="product-qty m-0">Quantity</h6>
              <h6 className="product-total-price m-0">Price</h6>
              <span></span>
            </div>

            {cartList?.map((item, index) => (
              <div className="cart-item-wrap pt-15" key={"cart" + index}>
                <div className="alert fade show cart-single-item">
                  <h6 className="product-name">
                    <img src={'/assets/images/video/video-section-bg.jpg'} style={{width: "100px",paddingRight: "10px"}}/>

                    {item?.product?.title}
                  </h6>
                  <span className="product-price">1</span>
                  {/* <CartCount />  */}
                  {/* <span className="avilable">
                <i className="fas fa-check" /> Avilable Now
              </span> */}
                  <span className="product-total-price">
                    ${(+item?.product?.price?.price).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    onClick={() => {
                      deleteCart(item);
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between total-section">
              <h5 className="product-name">Total</h5>
              <h6 className="product-qty">{cartList?.length}</h6>

              <h6 className="product-total-price">${total}</h6>
              <span></span>
            </div>

            {/* <div className="total-cart-price">
            <h5 className="product-name w-50">Total</h5> */}
            {/* <div className="cart-item-wrap pt-15">
                <div className="alert fade show cart-single-item">
                  <h5 className="product-name">Total</h5>
                  <span className="product-price">{cartList?.length}</span>
   
                  <span className="product-total-price">
                    {total}
                  </span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    onClick={() => {
                      deleteCart(item);
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div> */}

            {/* <h5>
                <span className="w-50">Total Items: </span>
                {cartList?.length}
              </h5> */}
            {/* <h5>Cart Total: ${total}</h5> */}
            {/* </div> */}
          </div>
          {cartList?.length > 0 && (
            <div className="cart-total-price mt-40">
              <div className="row justify-content-end text-center text-lg-left">
                <div className="col-lg-6">
                  <div className="update-shopping text-lg-right">
                    <Link href="/checkout">
                      <a className="theme-btn mt-10">checkout</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!(cartList?.length > 0) && (
            <div className="cart-total-price mt-40">
              <div className="row justify-content-end text-center text-lg-left">
                <div className="col-lg-6">
                  <div className="update-shopping text-lg-right">
                    <Link href="/course-grid">
                      <a className="theme-btn mt-10">View Course</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
export default Cart;
