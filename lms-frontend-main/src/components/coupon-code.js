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
import CartService from "../../pages/api/cart.service";
function CouponCode(props) {
  const [addButton, setAddButton] = useState(false);
  const [allCode, setAllCode] = useState([]);
  useEffect(() => {
    fn();
  }, []);

  async function fn() {
    const response = await CartService.showCoupons();
    console.log(response.data);
    setAllCode(response.data);
  }
  return (
    <>
      {!addButton ? (
        <section class="container-fluid py-5">
          <div class="row">
            <div class="col col-9">
              <div class="container">
                <a class="btn btn-sm btn-primary mb-3" onClick={() => setAddButton(true)}>
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
                        Active
                      </th>
                      <th scope="col" class="text-center">
                        Action.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCode.map((c, i) => (
                      <tr key={i}>
                        <th scope="row">{c.code}</th>
                        <td class="text-center">{c.discount}</td>
                        <td class="text-center">{c.active ? "✅" : "❌"}</td>
                        <td class="text-center">
                          <a href="">📝</a>
                        </td>
                      </tr>
                    ))}
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
