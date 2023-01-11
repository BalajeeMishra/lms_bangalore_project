import React, { useState, useEffect } from "react";
import Modal from "./modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { v4 as uuid } from "uuid";
import StudentService from "../../pages/api/student.service";
import EditCouponCode from "./edit_coupon_code";
import { useRouter } from "next/router";
import Link from "next/link";

function FeedbackList() {
  const [allComment, setAllComment] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fn();
  }, []);

  async function deleteHandler(id) {
    const response = await StudentService.deletefeedback(id);
    if (response.status == 204) {
      toast.success(" Feedback deleted successfully");
      return router.push("/admin-dashboard");
    }
    if (response.status != 204) {
      return toast.error("something went wrong!!Please try again");
    }
  }

  async function fn() {
    const response = await StudentService.listfeedback();
    console.log(response, "responseeeeuuu");
    setAllComment(response.data);
  }
  return (
    <>
      <section class="container-fluid py-5">
        <div class="row">
          <div class="col col-9">
            <div class="container">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" class="text-center">
                      Email
                    </th>
                    <th scope="col" class="text-center">
                      Mobile No.
                    </th>
                    <th scope="col" class="text-center">
                      Course
                    </th>
                    <th scope="col" class="text-center">
                      Batch
                    </th>
                    <th scope="col" class="text-center">
                      Comment
                    </th>
                    <th scope="col" class="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allComment.map((c, i) => (
                    <tr key={i}>
                      <th scope="row">{c.name}</th>
                      <td class="text-center">{c.user}</td>
                      <td class="text-center">{c.mobile}</td>
                      <td class="text-center">{c.course_name}</td>
                      <td class="text-center">{c.batch_name}</td>
                      <td class="text-center">{c.detail}</td>
                      <td class="text-center">
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

      <div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}
export default FeedbackList;
