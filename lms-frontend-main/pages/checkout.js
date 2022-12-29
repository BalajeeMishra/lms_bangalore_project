import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import * as county_state from "../public/assets/files/countries+states.json"
import { useEffect } from "react";
import { useState } from "react";
import CartService from "./api/cart.service";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
const Checkout = () => {
  const router = useRouter()

  const [cartList, setCartList] = useState([]);
  const [coupon, setCoupon] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [modalText, setModalText] = useState({
    heading:"Payment",
    context:"Thank you for your order.<br/> We are now redirecting you to CcAvenue to make payment."
  });
  const [checkout, setCheckout] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    company_name: "",
    company_address: "",
    country: "India",
    state: "",
    city: "",
    zipcode: "",
    street: "",
    address: "",
    note: "",
    total_amount: 0,
    coupon: "",
    coupon_price: 0,
    final_amount: 0,
    cart: []
  });
  useEffect(() => {
    getCartInfo()
  }, [])
  useEffect(() => {
    if(router?.query?.app_code ||router?.query?.code){
      console.log("router?.query?.code",router?.query?.code)
      setModalText({
        heading:"Payment",
        context:"Validating the data"
      })
      setOpenPaymentModal(true)
      validateTransaction(router?.query)
    }else{

    }
  }, [router.query])
  useEffect(() => {
    if (cartList) {
      let temp_total = 0;
      cartList?.forEach((cart_list) => {
        temp_total += +cart_list?.product?.price?.price;
      });
      setCheckout(prevState => ({
        ...prevState,
        total_amount: temp_total,
        final_amount: temp_total,
        cart: cartList
      }))
    }
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
  const validateTransaction = (data) => {
    CartService.validateTransaction(data)
      .then((res) => {
        if (res && res.status === 200) {
          console.log("dadasdsa",res.data)
          let data=res?.data
          if(data?.success){
            setModalText({
              heading:"Payment received",
              context:"Your transaction was successful!,<br/> Page will be redirected to home in 5 Seconds"
            })
            setTimeout(() => {
              router.push("/");
            }, 5000);
          }else{
            setModalText({
              heading:"Payment Failed",
              context:"Your transaction was failed!,<br/> Page will be redirected to cart in 5 Seconds"
            })
            setTimeout(() => {
              router.push("/cart");
            }, 5000);
          }
        }
      })
      .catch((e) => {
        console.log("Error:::", e);
        setCartList([]);
      });
  };


  const doCheckout = (e) => {
    e.preventDefault()
    setOpenPaymentModal(true)
    setModalText({
      heading:"Payment",
      context:"Thank you for your order. We are now redirecting you to CcAvenue to make payment."
    })
    CartService.checkout(checkout)
      .then((res) => {
        if (res && res.status === 200) {
          console.log(res.data.payment_url);
          setTimeout(() => {
            // window.open(res.data.payment_url,"_target")
            window.location.href =res.data.payment_url
            
          }, 2000);
        }else{
          setOpenPaymentModal(false)
        }
      })
      .catch((e) => {
        console.log("Error:::", e);
        setCartList([]);
      });
  };

  return (
    <Layout>
      <PageBanner pageName={"Checkout"} />
      <section className="checkout-area pt-130 rpt-95 pb-100 rpb-70">
        <form
          onSubmit={(e) => doCheckout(e)}
          id="payment-method"
          name="payment-method"
          className="checkout-form mb-30"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h3 className="from-title mb-25">Order Confirmation</h3>
                <hr />
                <div className="row mt-35">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        className="form-control"
                        value={checkout?.first_name}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            first_name: e.target.value
                          }))

                        }}
                        placeholder="First Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        className="form-control"
                        value={checkout?.last_name}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            last_name: e.target.value
                          }))

                        }}
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="tel"
                        id="number"
                        name="number"
                        className="form-control"
                        value={checkout?.phone_number}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            phone_number: e.target.value
                          }))
                        }}
                        placeholder="Phone Number"
                        pattern="[1-9][0-9]{9}"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="emailAddress"
                        name="email"
                        className="form-control"
                        value={checkout?.email}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            email: e.target.value
                          }))
                        }}
                        placeholder="Email Address"
                        pattern="^\S+@\S+\.\S+$"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="company-name"
                        name="company-name"
                        className="form-control"
                        value={checkout?.company_name}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            company_name: e.target.value
                          }))
                        }}
                        placeholder="Company name (optional)"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="company-address"
                        name="company-address"
                        className="form-control"
                        value={checkout?.company_address}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            company_address: e.target.value
                          }))
                        }}
                        placeholder="Company Address (optional)"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h6>Your Address</h6>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select name="country" id="country" value={checkout?.country} onChange={(e) => {
                    
                        setCheckout(prevState => ({
                          ...prevState,
                          country: e.target.value
                        }))
                        console.log(checkout)
                      }}>
                        <option value={null}>Select Country</option>
                        {county_state.map((a) =>
                          <option value={a.name}>{a?.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select name="state" id="state" value={checkout?.state}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            state: e.target.value
                          }))
                        }}>
                        <option value={null}>Select State</option>
                        {county_state.find(c => c.name == checkout.country)?.states?.map((a) =>
                          <option value={a.name}>{a?.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        value={checkout?.city}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            city: e.target.value
                          }))
                        }}
                        placeholder="City"
                        required=""
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        defaultValue=""
                        placeholder="State"
                        required=""
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        className="form-control"
                        value={checkout?.zipcode}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            zipcode: e.target.value
                          }))
                        }}
                        placeholder="Zip"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="street-name"
                        name="street-name"
                        className="form-control"
                        value={checkout?.street}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            street: e.target.value
                          }))
                        }}
                        placeholder="House, street name"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="apartment-name"
                        name="apartment-name"
                        className="form-control"
                        value={checkout?.address}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            address: e.target.value
                          }))
                        }}
                        placeholder="Apartment, suite, unit etc. (optional)"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h6>Order Notes (optional)</h6>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        name="order-note"
                        id="order-note"
                        className="form-control"
                        rows={5}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        value={checkout?.note}
                        onChange={(e) => {
                          setCheckout(prevState => ({
                            ...prevState,
                            note: e.target.value
                          }))
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">

                <h3 className="from-title mb-25">Order Summary</h3>
                {/* <div className="row mb-3 pt-5">
                  <div className="col-8 pr-0 mr-0">
                    <input
                      className="coupon-code rounded-0"
                      type="text"
                      placeholder="Coupon Code"
                    /></div>
                  <div className="col-4 pl-0 ml-0">
                    <button type="button" className="theme-btn w-100 rounded-0">
                      Apply
                    </button>
                  </div>

                </div> */}
                <div className="package-summary mb-25">
                  <table>
                    <tbody>
                      {cartList?.map((item, index) => (
                        <tr>
                          <td>
                            {item?.product?.title}<strong> × 1</strong>
                          </td>
                          <td>${(+item?.product?.price?.price).toFixed(2)}</td>
                        </tr>))}
                      <tr>
                        <td>
                          <strong>Order Total</strong>
                        </td>
                        <td>
                          <strong>${checkout?.total_amount}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                {/* <h5 className="title mt-20 mb-15">Payment Method</h5>
                <div className="form-group">
                  <select name="payment" id="payment">
                    <option value="default">Choose an Option</option>
                    <option value="payment1">chash on delivey</option>
                    <option value="payment2">Bank Transfer</option>
                    <option value="payment3">Paypal</option>
                  </select>
                </div> */}
                <button type="submit" className="theme-btn mt-30 w-100">
                  Proceed to Payment
                </button>

              </div>
            </div>
          </div>
        </form>
      </section>


      <Modal show={openPaymentModal} data-backdrop="static" data-keyboard="false">
        <Modal.Header>
       {modalText?.heading}
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML= {{__html:modalText?.context}}></div>
         
        {/* Thank you for your order. We are now redirecting you to CcAvenue to make payment. */}
        </Modal.Body>
      </Modal>
    </Layout>

  );
};
export default Checkout;
