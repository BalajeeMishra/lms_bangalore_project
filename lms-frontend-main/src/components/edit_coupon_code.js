import React from "react";

const EditCouponCode = () => {
  return (
    <>
      <div class="container main-title">
        <h2 class="page-title">Add a Coupone</h2>
        <a href="/coupon/all" class="btn btn-info mt-2">
          Back to all Couppone.
        </a>
      </div>
      <br />
      <div class="container table-style card">
        <form method="" action="">
          <div class="form-group">
            <label for="coupon">Enter the coupon code</label>
            <input class="form-control" type="number" value="" name="coupon" id="coupon" placeholder="Coupone Code" />
          </div>
          <div class="form-group mt-3">
            <label for="discountinpercentage">Discount in Percentage(%)</label>
            <input class="form-control" type="number" value="" name="discountinpercentage" id="discountinpercentage" placeholder="Discount in percentages" />
          </div>

          <div class="form-group mt-3">
            <label for="discountinprice">Discount in Dollar($)</label>
            <input class="form-control" type="text" value="" name="discountinprice" id="order" placeholder="Discount in prices" />
          </div>
          <div class="form-group mt-3">
            <label for="discountinprice">Expiry Date</label>
            <input class="form-control" type="date" value="" name="date" id="date" />
          </div>
          <button class="btn btn-info mt-2 button-style" type="submit">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCouponCode;
