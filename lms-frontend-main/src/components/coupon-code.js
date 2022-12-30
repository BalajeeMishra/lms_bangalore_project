import React, { useState, useEffect } from "react";
import Modal from "./modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { v4 as uuid } from "uuid";
import FacultyService from "../../pages/api/faculty.service";
import AdminService from "../../pages/api/admin.service";
import AddCouponCode from "./add_coupon_code";
import CartService from "../../pages/api/cart.service";
import EditCouponCode from "./edit_coupon_code";
import { useRouter } from "next/router";
import Link from "next/link";
function CouponCode(props) {
  const [addButton, setAddButton] = useState(false);
  const [allCode, setAllCode] = useState([]);
  const [openedit, setOpenEdit] = useState(false);
  const [codeData, setCodeData] = useState({});
  const router = useRouter();
  useEffect(() => {
    fn();
  }, []);

  function editHandler(c) {
    setOpenEdit(true);
    setCodeData(c);
  }

  async function deleteHandler(id) {
    const response = await CartService.deleteCoupon(id);
    if (response.status == 204) {
      toast.success(" Coupon Code deleted successfully");
      router.push("/admin-dashboard");
    }
    if (response.status != 204) {
      return toast.error("something went wrong!!Please try again");
    }
  }

  async function fn() {
    const response = await CartService.showCoupons();

    setAllCode(response.data);
  }
  return (
    <>
      {openedit ? (
        <EditCouponCode codeData={codeData} />
      ) : !addButton ? (
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
                        Status
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
                          <a
                            onClick={() => {
                              editHandler(c);
                            }}
                          >
                            📝
                          </a>
                          <a
                            onClick={() => {
                              deleteHandler(c.id);
                            }}
                          >
                            🗑️
                          </a>
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
