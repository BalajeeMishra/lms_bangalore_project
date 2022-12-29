import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import TokenService from "./api/token.service";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import api from "../pages/api/api.js"
import AdminService from "./api/admin.service";
import { useRouter } from 'next/router';
import FacultyService from "./api/faculty.service";
import CartService from "./api/cart.service";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { IsAuthenticatedOrRedirect } from "../src/utils";
import EnquiryModal from "../src/components/EnquiryModal";
import { v4 as uuid } from 'uuid';

const tempData = {
  category: "Data Analytics and Visualisation",
  title: "Data Management with Excel for Effective Public Service Delivery (E4PSD)",
  batch: {
    name: 'Excel Skills for DataAnalytics and Visualisation',
    slots: [{
      startDate: "Nov 6th",
      frequency: "Mon - Fri (18days)",
      Timing: "Timing - 08:30 PM to 10:30 PM (IST)",
      soldout: true,
      weekendbatch: false
    },
    {
      startDate: "Nov 10th",
      frequency: "Sat - Sun (8days)",
      Timing: "Timing - 07:70 AM to 08:30 AM (IST)",
      soldout: false,
      weekendbatch: true
    }, {
      startDate: "Nov 16th",
      frequency: "Mon - Fri (18days)",
      Timing: "Timing - 08:30 PM to 10:30 PM (IST)",
      soldout: true,
      weekendbatch: false
    },
    {
      startDate: "Nov 20th",
      frequency: "Sat - Sun (6days)",
      Timing: "Timing - 07:70 AM to 08:30 AM (IST)",
      soldout: false,
      weekendbatch: true
    }]
  },
  curriculumLink: "Dev/Material/Course/1/4/1669142263000_c1.svg",
  image1: "/assets/images/coachs/Excel.png",
  para1: "With a global push towards evidence-based policy and data-driven decision-making, data management & analysis are now essential for effective public service delivery. However, despite the emphasis on data in the social sector, the absence of data architecture, and by extension data capacities - at individual, civil society. and governance ecosystems, severely impediment the use of data in assessing performance, and making strategic decisions. There is a strong need to strengthen the data ecosystem & build capacities to enhance nationwide statistical capacities ie. a nation's ability to collect, analyze & disseminate high-quality data about a nation's population and economy",
  para2: "Data capacities are expressed in the ability to collect relevant data, that is accurate, manage & store data effectively to process data, and analyze & visualize data for quick and effective decision -making. This course hopes to enable development actors - working in public delivery systems & social sector organizations to manage & analyze data through the entire course of an organization's data cycle. As a common spreadsheet, MS-Excel is a handy tool for managers in facilitating everyday data analysis. Professionals well-versed in MS-Excel can greatly enhance the effectiveness of data-based analytics in a cost-efficient manner.",
  para3: "Professionals working in public service delivery, or social sector organizations will find this course useful to monitor program progress and support strategic decision-making. This course will enable professionals to understand data fundamentals, acquaint themselves with different data typologies, collect good quality & relevant data, and analyze, visualize, and report data to support organizations to enhance public service delivery.",
  targetAudience: "Professionals working in public service delivery. or social sector organizations",
  timeCommitment: "4-5 weeks of classroom work, 8-10 hours of self-paced reading material & practicum",
  module: [{
    title: "Data fundamentals",
    points: ["What is Data", "Data types"]
  }, {
    title: "Frame works for Effective Public Service Delivery",
    points: ["The Data Cycle", "Setting up data-architecture"]
  }],
  instructorId: 1,
  vidThumb: "",
  coursePrice: '$259.83',
  courseLevel: "Intermediate",
  duration: "4-5weeks",
  lectures: 15,
  subject: "Excell Skills for Data Analytics and Visualisation",
  language: "Intermediate",
  twitter: "",
  facebook: "",
  instagram: "",
  pinterst: "",
}
function CourseTemplate() {
const [templateData, setTemplateData] = useState({})
const [courses, setCourses] = useState([])
const [courseCateogeries, setCourseCateogeries] = useState([]);
const [currentCourseId, setCurrentCourseId] = useState(null)
const router = useRouter();
const [enquiryModal, setEnquiryModal] = useState(false);
const [enquiryCourse, setEnquireyCourse] = useState(null);

  useEffect(() => {
    AdminService.listCourseDetails().then((res) => {
      let params = getQueryStringParams(window.location.search)
      if (res.status === 200) {
        setCourses(res.data.data)
        setCurrentCourseId(params.id)
      }
    })
  }, [])

  useEffect(() => {
    // Your code here
    FacultyService.getCourseCateogery().then(res => {
        if (res && res.data && res.data.data) {
          setCourseCateogeries(res.data.data)
        }
    })
}, []);

  useEffect(() => {
    if (currentCourseId) {
      let cc = courses.find(c => c.id === currentCourseId)
      setTemplateData(prev => cc)
    }else{
      setTemplateData(courses[0])
    }
  }, [currentCourseId])

const getQueryStringParams = query => {
  return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
              let [key, value] = param.split('=');
              params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
              return params;
          }, {}
          )
      : {}
};
  function CardMap() {

    let module_accrd = [];
    if (templateData?.module.length > 0) {
      templateData?.module.forEach((element, index) => {
        module_accrd.push(
          <Card key={"c"+index}>
            <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
              {element.title} <i className="fas fa-angle-down float-right"></i>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                <div className="w-100" style={{ display: 'flex', flexFlow: 'wrap-reverse', flexWrap: 'wrap' }}>
                  <ul className="p-15">
                    {element && element.points && element.points.map((point) => {
                      return <li key={"course_map_" + uuid()} style={{ listStyleType: "disc" }}> {point}</li>
                    })}
                  </ul>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>)
      });
    }

    return (
      <div >
        <Accordion defaultActiveKey="0">
          {module_accrd}
        </Accordion>
      </div>
    )
  }

  function downloadMaterial(download) {
    const docUrl = api.defaults.baseURL + "material?download&key=";
    if (download) {
      window.location.href = docUrl + download
    }
  }

  function getFormatedStartDate(slotSatrtDate) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let sd = new Date(slotSatrtDate)
    let monthName = monthNames[sd.getMonth()]
    let date = sd.getDate()
    return monthName + ' ' + date
  }

  function getCategoryName(id) {
    let currCat = courseCateogeries.find(c => c.id === id)
    return currCat?.title
  }

  function getImgSrc(src){
    return api.defaults.baseURL +"material?key="+ src;
  }

  function addToCart(e){
    e.preventDefault();
    IsAuthenticatedOrRedirect()
    CartService.addToCart(templateData.id).then((res)=>{
      if(res?.status === 200){
        toast.success("Added to the cart");
      }else{
        toast.warning(res?.data?.message);
      }
    })
  }

  return (
    <Layout>
      <PageBanner pageName={"Course"} />
      {/* Page Banner End */}
      {/* Course Left Start */}
      <section className="course-left-area py-130 rpy-100">
        <div className="container">
          <div className="row large-gap">
            <div className="col-lg-8">
              <div className="wow fadeInUp delay-0-4s cardView m-0">
                <div className="row">
                  <span style={{color: "#1e4dd7" , fontWeight: "800"}} className="px-15 w-100">{getCategoryName(templateData?.category)}</span>
                  <h3 className="px-15 w-100">{templateData?.title}</h3>
                  <hr />
                  <div className="w-100 p-15">
                    <h6 className=" ">Upcoming batches</h6>
                    <div className="gradientColor">
                      <span>{templateData?.batch?.name}</span>
                      <div style={{ background: '#fff', color: '#000' }}>
                        <div className="w-100">
                          <table className="w-100">
                            <tbody style={{ fontSize: "12px" }}>
                              {templateData && templateData?.batch && templateData?.batch?.slots && templateData?.batch.slots.length > 0 &&
                                templateData?.batch.slots.map((slot, ind) => {
                                  return (<>
                                    <tr key={"t"+ind} style={{ border: '1px solid #eee', position: 'relative', background: slot.soldout ? "#eaeaea" : "" }}>
                                      <td width={'15%'} className="p-10">{getFormatedStartDate(slot.startDate)}</td> <td width={'5%'} className="p-10">|</td>
                                      <td width={'30%'} className="p-10">{slot.weekendbatch && <span className="weekEndLabel">Weekend batch</span>} {slot.frequency} </td>
                                      <td width={'50%'} className="p-10">{slot.soldout && <span className="soldOutLabel">sold out</span>} {"Timing - " + slot.Timing1 + " to " + slot.Timing2 + " (IST)"}</td>
                                    </tr>
                                  </>)
                                })
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {templateData?.curriculum_link &&
                    <div className="w-100 p-15">
                      <div className="float-right pr-3 cursorPointer" style={{ border: '1px solid #254ec4' }} onClick={() => downloadMaterial(templateData?.curriculum_link)}>
                        <img src="/assets/images/features/icon11.png" alt="" width="20" className="rounded m-10" />
                        <span style={{ color: '#1e4dd7' }}>
                          Download Curriculum
                        </span>
                      </div>
                    </div>}
                  <hr />
                  {templateData?.image_1 && <img className="w-100 mt-45 mb-10 p-15" src={getImgSrc(templateData?.image_1)} />}
                  <p className="p-15">{templateData?.para_1}</p>
                  <p className="p-15">{templateData?.para_2}</p>
                  <p className="p-15">{templateData?.para_3}</p>
                  <hr />
                  <hr />
                  <div className="w-100 p-15">

                    <h4 className="">Target Audience</h4>
                    <p className=""><i className="far fa-hand-point-right"></i> {templateData?.target_audience}</p>
                  </div>
                  <hr />

                  <div className="w-100 p-15">
                    <h4 >Time Commitment</h4>
                    <p className=""><i className="far fa-hand-point-right"></i> {templateData?.time_commitment}</p>
                  </div>
                  <hr />
                  <div className="w-100 p-15">
                    <h6 className="">Module</h6> 
                    {templateData?.module &&
                      <CardMap />
                    }
                  </div>
                  <hr />
                  {/* hiding as per request */}
                  {/* <div className="w-100 p-15">
                    <h5 >Instructor</h5>
                    <div className="w-100 p-15" style={{display: "flex "}}>
                    {templateData?.instructor_image && <img className="w-25" src={getImgSrc(templateData?.instructor_image)} />}
                      <div className="p-20">
                      <h4 className="m-0 ">  {templateData?.instructor_name}</h4>
                      <p className="m-0 lightBlueIcon">  {templateData?.instructor_designation}</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
            <div className="course-sidebar rmb-55">
                <div className="wow fadeInUp delay-0-4s cardView m-0">
                  <img src="/assets/images/video/video-section-bg.jpg" alt="" className="rounded " />
                    <h3 className="p-15" style={{color: "#00c07a"}}>$ {templateData?.price?.price}</h3>
                      <hr />
                    <div className="flex-Just-between">
                      <span className="w-50"><i className="far fa-file-alt lightBlueIcon"/> Course Level</span>
                      <span className="w-50 text-right font-weight-bolder">{templateData?.course_level}</span>
                    </div>
                      <hr />
                    <div className="flex-Just-between">
                      <span className="w-50"><i className="far fa-clock lightBlueIcon"/> Duration </span>
                      <span className="w-50 text-right font-weight-bolder">{templateData?.duration}</span>
                    </div>
                      <hr />
                    <div className="flex-Just-between">
                      <span className="w-50"><i className="far fa-play-circle lightBlueIcon"/>  Lectures </span>
                      <span className="w-50 text-right font-weight-bolder">{templateData?.lectures}</span>
                    </div>
                      <hr />
                    <div className="flex-Just-between">
                      <span className="w-50"><i className="far fa-clipboard lightBlueIcon"/>  Subject </span>
                      <span className="w-50 text-right font-weight-bolder">{templateData?.subject}</span>
                    </div>
                      <hr />
                    <div className="flex-Just-between">
                      <span className="w-50"><i className="fas fa-globe lightBlueIcon"/> Language </span>
                      <span className="w-50 text-right font-weight-bolder">{templateData?.language}</span>
                    </div>
                      <hr />
                    <div className="flex-Just-Center">
                    {/* <Button style={{ background: "#00c07a" }} className="w-100" onClick={(e) => { setEnquiryModal(true); setEnquireyCourse(templateData?.title) }}>Enquire Now</Button> */}
                      <Button style={{background: "#00c07a"}} className="w-100" onClick={(e)=>{addToCart(e)}}>ADD TO CART <i className="fas fa-arrow-right" /></Button>
                    </div>

                  {/* <div className="justify-evenly p-2">
                    <div onClick={()=>{ openLink(templateData?.twitter)}}><i class="fab fa-twitter lightBlueIcon"></i></div>
                    <div onClick={()=>{ openLink(templateData?.facebook)}}><i class="fab fa-facebook-f lightBlueIcon"></i></div>
                    <div onClick={()=>{ openLink(templateData?.instagram)}}><i class="fab fa-instagram lightBlueIcon"></i></div>
                    <div onClick={()=>{ openLink(templateData?.pinterst)}}><i class="	fab fa-pinterest-p lightBlueIcon"></i></div>
                  </div> */}
                </div>
              </div>
              <div className="pt-20">

              {/* <div className="wow fadeInUp delay-0-4s cardView m-0">
                  <h4 className="widget-title">Category</h4>
                  <ul>
                    {courseCateogeries.length>0 && courseCateogeries.map((element)=>{
                      return (
                        <li>
                          <span >
                            <a>{element.title}</a>
                          </span>{" "}
                          <span>(1)</span>
                        </li>
                      )
                    })}
                    
                  </ul>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={2000} />
      <EnquiryModal toast={toast} setEnquiryModal={setEnquiryModal} showModal={enquiryModal} enquiryCourse={enquiryCourse} />
    </Layout>
  );
};
export default CourseTemplate;
