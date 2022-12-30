import React, { useState } from "react";
import CartService from "../../pages/api/cart.service";
import axios from "axios";
const AddCouponCode = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [message, setMessage] = useState("");

  const submitCodeData = async (e) => {
    e.preventDefault();

    if (couponCode && discount && validFrom && validTo) {
      setMessage("Please enter all the data carefully");
    }
    console.log(validFrom, validTo, "BALAJEE MSIN DDB");
    const response = await CartService.addCoupon({
      code: couponCode,
      discount: discount,
      valid_from: validFrom,
      valid_to: validTo,
      active: true
    });
    if (response.status == 200) {
      alert("successfully submitted");
    }
  };

  return (
    <>
      <section class="container-fluid">
        <div class="row">
          <div class="col col-9">
            <div class="container">
              <h5>Add a Coupon</h5>
              <a href="/coupon/all" class="btn btn-sm btn-primary mt-2">
                Go Back
              </a>
            </div>
            <br />
            <div class="container table-style card pt-3 px-5 shadow-lg p-3 mb-5 bg-body rounded">
              <p>Please enter either discount in percentages or flat, don't enter both at a time.</p>
              <form onSubmit={submitCodeData}>
                <div class="row">
                  <div class="col col-4 mb-3">
                    <label for="coupon">Enter the coupon code</label>
                    <input
                      class="form-control rounded-0"
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                      }}
                      type="text"
                      name="coupon"
                      id="coupon"
                      placeholder="Coupone Code"
                    />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="discountinpercentage">Discount in(%)</label>
                    <input
                      class="form-control rounded-0"
                      type="number"
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                      name="discountinpercentage"
                      id="discountinpercentage"
                      placeholder="in %"
                    />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="discountinprice">Valid From</label>
                    <input
                      class="form-control rounded-0"
                      type="datetime-local"
                      onChange={(e) => {
                        setValidFrom(e.target.value);
                      }}
                      name="valid_from"
                      id="valid_from"
                    />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="discountinprice">Valid to</label>
                    <input
                      class="form-control rounded-0"
                      type="datetime-local"
                      onChange={(e) => {
                        setValidTo(e.target.value);
                      }}
                      name="valid_to"
                      id="valid_to"
                    />
                  </div>
                </div>
                <div>
                  <input type="radio" id="choice" name="active" />
                  <label for="choice">isActive</label>
                </div>
                <button class="btn btn-primary my-3 button-style" type="submit">
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddCouponCode;
