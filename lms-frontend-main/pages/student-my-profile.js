import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { useState, useEffect } from "react";
import ProfileService from './api/profile.service';

const MyProfile = () => {    
   const [profileService, setProfileService] = useState();

   useEffect(() => {
        ProfileService.userProfile().then(res =>{
            // console.log("student", res.data.data)
            setProfileService(res.data.data)
        }) 
    }, []);

  return (
    <Layout>
      <PageBanner pageName={"My Profile"} />
      {/* JoinMeet Form Start */}
      <section className="course-left-area py-130 rpy-100">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="profile-header">
                        <div className="row align-items-center">
                            {/* <div className="col-auto profile-image">
                                <a rel="noopener noreferrer"  href="#">
                                    <img className="rounded-circle" height="150" alt="User Image" src="assets/images/teams/team1.jpg"/>
                                </a>
                            </div> */}
                            <div className="col profile-user-info">
                                <h4 className="user-name mb-0">{profileService && profileService['first_name']}</h4>
                                <h6 className="text-muted">{profileService && profileService['username']}</h6>
                                {/* <div className="pb-3">
                                    <i className="fa fa-map-marker"></i> Florida, United States
                                </div>
                                <div className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div> */}
                            </div>
                            <div className="col-auto profile-btn"></div>
                        </div>
                    </div>
                    <div className="profile-menu  mt-4">
                        <ul className="nav nav-tabs nav-tabs-solid">
                            <li className="nav-item">
                                <a rel="noopener noreferrer"  className="nav-link active" data-toggle="tab" href="#per_details_tab">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content profile-tab-cont">
                        <div className="tab-pane fade active show" id="per_details_tab">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title d-flex justify-content-between">
                                                <span>Personal Details</span>
                                                {/* <a rel="noopener noreferrer"  className="edit-link" data-toggle="customModal" href="#edit_personal_details">
                                                    <i className="fa fa-edit mr-1"></i>Edit
                                                </a> */}
                                            </h5>
                                            <div className="row">
                                                <p className="col-sm-2 text-muted mb-0 mb-sm-3">Name</p>
                                                <p className="col-sm-10">{profileService && profileService['first_name']}</p>
                                            </div>
                                            {/* <div className="row">
                                                <p className="col-sm-2 text-muted mb-0 mb-sm-3">Date of Birth</p>
                                                <p className="col-sm-10">24 Jul 1983</p>
                                            </div> */}
                                            <div className="row">
                                                <p className="col-sm-2 text-muted mb-0 mb-sm-3">Email ID</p>
                                                <p className="col-sm-10">{profileService && profileService['username']}</p>
                                            </div>
                                            {/* todo needs to update below to once api is ready */}
                                            <div className="row">
                                                <p className="col-sm-2 text-muted mb-0 mb-sm-3">Occupation </p>
                                                <p className="col-sm-10">Tester</p>
                                            </div>
                                            <div className="row">
                                                <p className="col-sm-2 text-muted mb-0">Experience </p>
                                                <p className="col-sm-10 mb-0">1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default MyProfile;