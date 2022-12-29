import axios from "./api/api";
import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";

const JoinMeet = () => {

    const [meetList, setMeetList] = useState();

    useEffect(() => {
        axios.get('/student_meeting')
        .then(res => {
            setMeetList(res.data.data);
        })
        .catch(err => {
            console.log("err",err);
        })
    }, []);

  return (
    <Layout>
      <PageBanner pageName={"JoinMeet"} />
      {/* JoinMeet Form Start */}
      <section className="contact-form-area wow fadeInUp delay-0-2s">
      <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="bg-layout wow fadeInUp delay-0-2s" >
                        <div className="content">
                            <h4>Upcoming Meetings</h4>
                            <hr/>
                            <ul className="course-video-list">
                            {meetList &&
                                <div className="card" key={meetList.meeting_id}>
                                    <div className="card-body">
                                    <p className="card-text">Topic: {meetList.topic}</p>
                                    {/* <p className="card-text">DateTime: {meetList.meet_time} </p> */}
                                    <p className="card-text">Passcode: {meetList.password}</p>
                                        <a rel="noopener noreferrer"  href={meetList.meeting_link} target="_blank">
                                            <span className="title">Meet Link</span> &nbsp;&nbsp;&nbsp;
                                            <i className="fas fa-video"></i>
                                        </a>
                                    </div>
                                </div>
                           }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      {/* JoinMeet Form End */}
    </Layout>
  )
}

export default JoinMeet;