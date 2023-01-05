import TokenService from "./api/token.service";
import NavHeader from "../src/components/header/navHeader";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import AddCourseDetails from "./manage-course";
import EditCourseDetails from "./edit-course";
import AdminService from "./api/admin.service";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkIsSuperUser } from "../src/utils";
import CouponCode from "../src/components/coupon-code";

function AdminDashBoard(props) {
  const [tab, setTab] = useState(1);
  const menuList = [
    { name: "Manage Course", link: "manage-course", icon: "fas fa-book-open", id: 2 },
    { name: "Manage Purchase", link: "purshase-manage", icon: "fas fa-cart-arrow-down", id: 3 },
    { name: "Coupon Code", link: "coupon-code", icon: "fa fa-gift", id: 5 }
    // {name: "Manage Users", link: "manage-users", icon: "fas fa-users", id: 4},
  ];
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [updated, setUpdated] = useState(false)

  function handleEditClose() {
    setShowEditModal(false);
  }
  function handleClose() {
    setShowModal(false);
  }
  useEffect(() => {
    // const token = TokenService.getLocalAccessToken();
    // if (!token) {
    //   router.push("/login");
    // }
    // checkIsSuperUser();
  }, []);

  useEffect(() => {
    AdminService.listCourseDetails().then((res) => {
      if (res.status === 200) {
        setCourses(res.data.data);
      }
    });
  }, [updated]);

  const TabSideBar = ({ itemList, label }) => {
    return (
      <div className="sidebar">
        <p className="title-db cursorPointer" onClick={() => setTab(1)}>
          {label}
        </p>
        {itemList.map(({ name, id, icon }, index) => (
          <div key={"dashboard_" + index} className="menu-item" onClick={() => setTab(id)}>
            <div className="menu">
              <i className={icon} style={{ marginBottom: "14px" }}></i>
              <p>{name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  function Tab1() {
    return (
      <div>
        <div> Admin Dashboard</div>
        <img className="admindashContent" src="/assets/images/dashboard.svg" />
      </div>
    );
  }

  function Tab2() {
    return (
      <>
        <div>
          <p className="title-db pb-10">Admin Dashboard / Manage Courses</p>
          <div className="col-lg-12 mb-4 flex-Just-between">
            <p className="title-db">All Courses</p>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                setShowModal(true);
              }}
            >
              + New Course
            </button>
          </div>
          <ListView />
          {showModal && <CourseModal clName="admindash" xl setShowModal={setShowModal} showModal={showModal} header={"Course Details"} />}
        </div>
      </>
    );
  }

  function Tab3() {
    return (
      <>
        <div> Manage Purchase </div>
      </>
    );
  }

  function Tab4() {
    return (
      <>
        <div> User Manage</div>
      </>
    );
  }

  const Tab5 = () => (
    <>
      <CouponCode />
    </>
  );

  function redirectToTemplate(id) {
    window.location.href = "/course-template?id=" + id;
  }

  function deleteCourseDetail(id) {
    // deleteCourseDetails
    AdminService.deleteCourseDetails(id).then((res) => {
      if (res?.status === 200) {
        let deletedCourse = res.data.data;
        let filteredCourses = courses.filter((c) => c.id !== deletedCourse.id);
        setCourses(filteredCourses);
      }
    });
  }

  function ListView() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courses.length > 0 &&
          courses.map((course, index) => {
            return (
              <div className="col-md-4" key={"l" + index}>
                <div className="coach-item wow fadeInUp delay-0-4s">
                  <div className="cardView m-0">
                    <h5 onClick={() => redirectToTemplate(course.id)}>{course.title}</h5>
                    <ul className="coach-footer">
                      <li className="cursorPointer" onClick={() => { setShowEditModal(true); setUpdated(false); setEditCourse(course) }}>
                        <i className="fa fa-pen" />
                        <span>Edit Course</span>
                      </li>
                      <li className="cursorPointer" onClick={() => deleteCourseDetail(course.id)}>
                        <i className="far fa-trash-alt" />
                        <span>Delete Course</span>
                      </li>
                    </ul>
                  </div>
                  {showEditModal && <EditCourseModal clName="admindash" xl setShowEditModal={setShowEditModal} showEditModal={showEditModal} header={"Edit Course Details"} />}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  function done(item) {
    toast.success("Success: Course Details added");
    setCourses((prev) => [...prev, item]);
  }

  function edone(item) {
    toast.success("Success: Course Details updated");
    setUpdated(true)
  }

  function CourseModal(props) {
    return (
      <>
        <Modal show={props.showModal} onHide={handleClose} dialogClassName={props.xl ? "modal-xl" : ""} className="vidModal admindash">
          <Modal.Header closeButton>{props.header}</Modal.Header>
          <Modal.Body>
            <AddCourseDetails setShowModal={props.setShowModal} cb={done} />
          </Modal.Body>
          {!props.hideClose && (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }

  function EditCourseModal(props) {
    return (
      <>
        <Modal show={props.showEditModal} onHide={handleEditClose} dialogClassName={props.xl ? "modal-xl" : ""} className="vidModal admindash">
          <Modal.Header closeButton>{props.header}</Modal.Header>
          <Modal.Body>
            <EditCourseDetails setShowModal={props.setShowEditModal} cb={edone} course={editCourse} />
          </Modal.Body>
          {!props.hideClose && (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Close
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }
  return (
    <div className="wrapper">
      <NavHeader />
      <div className="container-main layout-container">
        <TabSideBar itemList={menuList} label="Admin Dashboard" />
        <div className="layout-sub">
          {console.log("tbbb", tab)}
          {/* {props && props.children ? props.children : "Admin Dashboard"} */}
          {tab === 1 && <Tab1 />}
          {tab === 2 && <Tab2 />}
          {tab === 3 && <Tab3 />}
          {tab === 4 && <Tab4 />}
          {tab === 5 && <Tab5 />}
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
export default AdminDashBoard;
