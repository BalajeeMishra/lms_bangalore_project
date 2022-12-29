import React from 'react'
import FacLayout from './faculty';

const Dashboard = () => {
  return (
    <FacLayout>
        <p className='title-db'>HOME / DASHBOARD</p>
        <hr/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                <div className="bg-layout wow fadeInUp delay-0-2s" >
                            <div className="content">
                  <div className="card">
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                            <span>Personal Details</span>
                        </h5>
                        <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Name</p>
                            <p className="col-sm-9">Allen Davis</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Date of Birth</p>
                            <p className="col-sm-9">24 Jul 1983</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Email ID</p>
                            <p className="col-sm-9">allendavis@example.com</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 text-muted mb-0 mb-sm-3">Mobile</p>
                            <p className="col-sm-9">305-310-5857</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 text-muted mb-0">Address</p>
                            <p className="col-sm-9 mb-0">4663  Agriculture Lane, Miami,<br/>Florida - 33165, United States.</p>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </FacLayout>
  )
}

export default Dashboard;