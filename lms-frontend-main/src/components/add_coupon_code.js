import React from "react";

const AddCouponCode = () => {
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
              <form>
                <div class="row">
                  <div class="col col-4 mb-3">
                    <label for="coupon">Enter the coupon code</label>
                    <input class="form-control rounded-0" type="text" name="coupon" id="coupon" placeholder="Coupone Code" />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="discountinpercentage">Discount in(%)</label>
                    <input class="form-control rounded-0" type="number" name="discountinpercentage" id="discountinpercentage" placeholder="in %" />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="discountinprice">Flat Discout(in $)</label>
                    <input class="form-control rounded-0" type="number" name="discountinprice" id="order" placeholder="in dollars" />
                  </div>
                  <div class="col col-4 mb-3">
                    <label for="discountinprice">Expiry Date</label>
                    <input class="form-control rounded-0" type="date" name="date" id="date" />
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
export default AddCouponCode;
