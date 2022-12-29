import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Pagination from "../src/Pagination";
const CourseGrid = () => {
  return (
    <Layout>
      <PageBanner pageName={"My Learning"} />
      {/* Page Banner End */}
      {/* Course Left Start */}
      <section className="course-left-area py-130 rpy-100">
        <div className="container-fluid">
          <iframe src="https://learn.educationnest.com/course-detail/" height="2550px" width="100%" />
          <div className="row large-gap">
            {/* <div className="col-lg-4">
              <div className="course-sidebar rmb-55">
                <div className="widget widget-search wow fadeInUp delay-0-2s">
                  <form onSubmit={(e) => e.preventDefault()} action="#">
                    <input type="text" placeholder="Search Here" required="" />
                    <button
                      type="submit"
                      className="searchbutton fa fa-search"
                    />
                  </form>
                </div>
               
                
              </div>
            </div> */}
            {/* <div className="col-lg-12"> */}
              {/* <div className="course-grids">
                <div className="shop-shorter mb-40 wow fadeInUp delay-0-2s">
                  <div className="sort-text">
                    Showing <b>4</b> Courses For 8 Course
                  </div>
                  <ul className="grid-list">
                    <li>
                      <a href="#">
                        <i className="fas fa-list-ul" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="active">
                        <i className="fas fa-border-all" />
                      </a>
                    </li>
                  </ul>
                  <div className="products-dropdown">
                    <select>
                      <option value="default">Filter by</option>
                      <option value="new" selected="">
                        Latest
                      </option>
                      <option value="old">Oldest</option>
                      <option value="hight-to-low">High To Low</option>
                      <option value="low-to-high">Low To High</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-4s">
                      <div className="coach-image">
                        <Link href="/my-course-detail">
                          <a className="category">Lifestyle</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach1.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Basic Coach</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn How to Manage Your Lifestyle
                          </Link>
                        </h4>
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-6s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Web Design</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach2.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">HTML CSS</span>
                        <h4>
                          <Link href="/my-course-detail">
                            How to Learn Basic Web Design HTML
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-2s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Technology</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach3.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Basic Coach</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn How to Manage Your Lifestyle
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-4s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Photography</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach4.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Photography</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn Photography and Video Editing Basic
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-2s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Development</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach5.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Advance</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn How to Manage Your Lifestyle
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-4s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Marketing</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach6.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Basic Coach</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn How to Manage Marketing Strategy
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-2s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Development</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach7.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Advance</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn How to Manage Your Lifestyle
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="coach-item wow fadeInUp delay-0-4s">
                      <div className="coach-image">
                        <Link href="/course-grid">
                          <a className="category">Marketing</a>
                        </Link>
                        <img
                          src="assets/images/coachs/coach8.jpg"
                          alt="Coach"
                        />
                      </div>
                      <div className="coach-content">
                        <span className="label">Basic Coach</span>
                        <h4>
                          <Link href="/my-course-detail">
                            Learn How to Manage Marketing Strategy
                          </Link>
                        </h4>
                        
                        <ul className="coach-footer">
                          <li>
                            <i className="far fa-file-alt" />
                            <span>12 Lessions</span>
                          </li>
                          <li>
                            <i className="far fa-user" />
                            <span>seats</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="pagination flex-wrap mt-20 justify-content-center">
                  <Pagination
                    paginationCls={".course-grids .row .col-md-4"}
                    sort={4}
                  />
                </ul>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default CourseGrid;
