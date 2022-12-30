import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import CartService from "../../pages/api/cart.service";
const EditCouponCode = ({ codeData }) => {
  const [couponCode, setCouponCode] = useState(codeData.code);
  const [discount, setDiscount] = useState(codeData.discount);
  const [validFrom, setValidFrom] = useState(codeData.valid_from);
  const [validTo, setValidTo] = useState(codeData.valid_to);
  const [active, setActive] = useState(codeData.active);
  const router = useRouter();

  var isActiveOrNot = [
    { value: true, name: "Active" },
    { value: false, name: "Disabled" }
  ];

  async function findData() {}

  // useEffect(() => {
  //   console.log(validTo.slice(0, validTo.length - 4));
  // }, []);

  const submitCodeData = async (e) => {
    e.preventDefault();
    if (!couponCode || !discount || !validFrom || !validTo) {
      return toast.warn("Please enter all the data carefully");
    }
    const response = await CartService.editCoupon({
      id: codeData.id,
      code: couponCode,
      discount: discount,
      valid_from: validFrom.slice(0, validFrom.length - 4),
      valid_to: validTo.slice(0, validTo.length - 4),
      active: active
    });
    if (response.status == 202) {
      toast.success("Coupon Code edited successfully");
      router.push("/admin-dashboard");
    }
    if (response.status != 202) {
      return toast.error("something went wrong!!Please try again");
    }
  };

  return (
    <>
      <section class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="container">
              <h5>Add a Coupon</h5>
              <Link href="/admin-dashboard" key="go_back" style={{ textDecoration: "none" }}>
                <button class="btn btn-sm btn-primary mt-2"> Go Back </button>
              </Link>
              {/* <a href="/coupon/all" class="btn btn-sm btn-primary mt-2">
                Go Back
              </a> */}
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
                      value={couponCode}
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
                      value={discount}
                    />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="valid_from">Valid From</label>
                    <input
                      class="form-control rounded-0"
                      type="datetime-local"
                      onChange={(e) => {
                        setValidFrom(e.target.value + ":00z");
                      }}
                      name="valid_from"
                      id="valid_from"
                      value={validFrom.slice(0, validFrom.length - 4)}
                    />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="valid_to">Valid to</label>
                    <input
                      class="form-control rounded-0"
                      type="datetime-local"
                      onChange={(e) => {
                        setValidTo(e.target.value + ":00z");
                      }}
                      name="valid_to"
                      id="valid_to"
                      value={validTo.slice(0, validTo.length - 4)}
                    />
                  </div>
                  <div class="col col-3 mb-3">
                    <label for="isActiveOrNot">Status of coupon</label>
                    <div className="d-flex justify-content-between mt-1">
                      <div>
                        <input
                          type="radio"
                          class="form-control rounded-0"
                          name="isActiveOrNot"
                          id="isActiveOrNot"
                          checked={active}
                          onChange={() => {
                            setActive(true);
                          }}
                          // value={this.state.isActiveOrNot[0].value}
                        />{" "}
                        {isActiveOrNot[0].name}
                      </div>
                      <div>
                        <input
                          type="radio"
                          class="form-control rounded-0"
                          name="isActiveOrNot"
                          id="isActiveOrNot"
                          checked={!active}
                          onChange={() => {
                            setActive(false);
                          }}
                          // value={this.state.isActiveOrNot[1].value}
                        />{" "}
                        {isActiveOrNot[1].name}
                      </div>
                    </div>
                  </div>
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

export default EditCouponCode;
