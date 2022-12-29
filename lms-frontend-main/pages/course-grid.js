import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Pagination from "../src/Pagination";
import TokenService from "./api/token.service";
import FacultyService from "./api/faculty.service"
import AdminService from "./api/admin.service"
import api from "./api/api.js"
import EnquiryModal from "../src/components/EnquiryModal";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

function CourseGrid() {
  const [showEnroll, setShowEnroll] = useState(false);
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [courseCateogeries, setCourseCateogeries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCcourses, setAllCourses] = useState([]);
  const [enquiryCourse, setEnquireyCourse] = useState(null);

  useEffect(() => {
    // Perform localStorage action
    const token = TokenService.getLocalAccessToken();
    if (token) setShowEnroll(true)
  }, [])


  useEffect(() => {
    // Your code here
    FacultyService.getCourseCateogery().then(res => {
        if (res && res.data && res.data.data) {
          setCourseCateogeries(res.data.data)
          let tempCats = res.data.data
          let allcats = []

          AdminService.listCourseDetails().then((res) => {
            if (res.status === 200) {
              setAllCourses(res.data.data)
              let coursesOfFirstCat = res.data.data.filter(c=>c.category === tempCats[0].id)
              setCourses(coursesOfFirstCat)
              tempCats.forEach(element => {
                let temp = res.data.data.filter(c=>c.category === element.id)
                let obj = {id: element.id, title: element.title, length: temp.length}
                allcats.push(obj)
              });
              if(allcats.length > 0 ){
                setCourseCateogeries(allcats)
              }else{
                setCourseCateogeries(tempCats)
              }

            }
          })
        }
    })
}, [])

// useEffect(()=>{
//   let allcats = []
// if(courseCateogeries.length>0 && courses.length>0){
//   courseCateogeries.forEach(element => {
//     let temp = courses.filter(c=>c.category === element.id)
//     let obj = {id: element.id, title: element.title, length: temp.length}
//     allcats.push(obj)
//   });
//   console.log('allcattss ',allcats)
//   setAllCategeries(allcats)
// }
// },[courseCateogeries])

function getImgSrc(src){
  return api.defaults.baseURL +"material?key="+ src;
}

function redirectToTemplate(id){
  return "/course-template?id=" + id
}

  function CoursesCard(props) {
    return (
      <>
        {props.courses.length > 0 && courses.map((course,index) => {
          return (
            <div key={"manage_course_grid"+index}  className="col-md-6">
              <div className="coach-item wow fadeInUp delay-0-4s">
                <div className="coach-image">
                  <img
                    src={getImgSrc(course?.image_1)}
                    alt="Coach"
                  />
                </div>
                <div className="coach-content">
                  {/* <span className="label">Coming Soon</span> */}
                  <h4>
                    <Link href={redirectToTemplate(course.id)}>
                      {course.title}
                    </Link>
                  </h4>
                  <div className="ratting-price">
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span>(3k)</span>
                    </div>
                  </div>
                  {showEnroll &&
                    <div className="flex-Just-Center mb-10">
                      {/* <Button style={{ width: '70%' }} onClick={() => { setEnquiryModal(true); setEnquireyCourse(course?.title); }} variant="primary">View Course Details</Button> */}
                      <Button style={{ width: '70%' }} onClick={() => window.location.href = redirectToTemplate(course.id)} variant="primary">View Course Details</Button>
                    </div>}
                  <ul className="coach-footer">
                    <li>
                      <i className="far fa-file-alt" />
                      <span>{course?.lectures} Lessons</span>
                    </li>
                    <li>
                      <i className="far fa-user" />
                      <span>seats</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        })
        }
         <ToastContainer autoClose={2000} />
        <EnquiryModal toast={toast} setEnquiryModal={setEnquiryModal} showModal={enquiryModal} enquiryCourse={enquiryCourse} />
      </>
    )
  }

function showCCcourses(id){
  let coursesOfCats = allCcourses.filter(c=>c.category === id)
  setCourses(coursesOfCats)
}

  return (
    <Layout>
      <PageBanner pageName={"Courses"} />
      {/* Page Banner End */}
      {/* Course Left Start */}
      <section className="course-left-area py-130 rpy-100">
        <div className="container">
          <div className="row large-gap">
            <div className="col-lg-4">
              <div className="course-sidebar rmb-55">
                <div className="widget widget-menu wow fadeInUp delay-0-4s">
                  <h4 className="widget-title">Category</h4>
                  <ul>
                    {/* <li>
                      <span onClick={() => setCourseFlag(1)}>
                        <a>Data Analytics and Visualisation</a>
                      </span>{" "}
                      <span>(3)</span>
                    </li> */}
                    {courseCateogeries.length > 0 && courseCateogeries.map((element,index) => {
                      return (
                        <li key={"course_pointer_"+index} onClick={()=>showCCcourses(element.id)} className="cursorPointer">
                          <span >
                            <a>{element.title}</a>
                          </span>{" "}
                          <span> ( {element.length} ) </span> 
                        </li>
                      )
                    })}
                  </ul>
                </div>
                 
              </div>
            </div>
            <div className="col-lg-8">
              <div className="course-grids">
                
                <div className="row">
                  <CoursesCard courses={courses}/>
                </div>
                {/* <ul className="pagination flex-wrap mt-20">
                  <Pagination
                    paginationCls={".course-grids .row .col-md-6"}
                    sort={4}
                  />
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default CourseGrid;
