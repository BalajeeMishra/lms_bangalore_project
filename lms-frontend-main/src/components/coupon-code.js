import React, { useState, useEffect } from "react";
import Modal from "./modal/Modal";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { v4 as uuid } from "uuid";
import FacultyService from "../../pages/api/faculty.service";
import AdminService from "../../pages/api/admin.service";
import AddCouponCode from "./add_coupon_code";

function CouponCode(props) {
  const [addCode, setAdd1Code] = useState(false);
  return (
    <>
      {!addCode ? (
        <section class="container-fluid py-5">
          <div class="row">
            <div class="col col-9">
              <div class="container">
                <a class="btn btn-sm btn-primary mb-3" onClick={() => setAdd1Code(true)}>
                  ADD
                </a>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col" class="text-center">
                        Discount (in %)
                      </th>
                      <th scope="col" class="text-center">
                        Discount (in $){" "}
                      </th>
                      <th scope="col" class="text-center">
                        Action.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {coupons.forEach((c, i) => {
                    <tr>
                      <th scope="row">c.coupon</th>
                      <td class="text-center">c.discountinpercentage</td>
                      <td class="text-center">c.discountinprice</td>

                      <td class="text-center">
                        <a href="/coupon/edit_coupon/<%=c._id %>">Edit</a>
                      </td>
                    </tr>;
                  })} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <AddCouponCode />
      )}
    </>
  );
}
export default CouponCode;
