// import axios from "./api/api";
// import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
// import FacLayout from '.';
// import CardView from "../src/components/CardView";
import VidRecordings from "../src/components/VidRecordings";

const StudentsClassRecordings = () => {

    return (
        <Layout>
            <PageBanner pageName={"Recorded Classes"} />
            {/* View Recordings Form Start */}
            <section className="contact-form-area wow fadeInUp delay-0-2s">
                <div className="container">
                    <div className="bg-layout wow fadeInUp delay-0-2s" >
                        <div className="content">
                            <VidRecordings />
                        </div>
                    </div>
                </div>
            </section>
            {/* View Recordings Form End */}
        </Layout>
    )
}

export default StudentsClassRecordings;