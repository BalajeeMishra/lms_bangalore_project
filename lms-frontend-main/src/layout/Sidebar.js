import { Fragment } from "react";
import { sidebarOnclick } from "../utils";
import Link from "next/link";

const Sidebar = () => {
  const menuList = [
    // {name: "My Profile", link: "student-my-profile", icon: "fas fa-user-circle"},
    { name: "My Course Details", link: "student-my-courses", icon: "fas fa-book-open" },
    // {name: "My Courses", link: "student-my-courses", icon: "Icon3"},
    { name: "Course Materials", link: "student-course-materials", icon: "fa fa-book-open" },
    { name: "My Quiz", link: "student-my-quiz", icon: "fa fa-puzzle-piece" },
    { name: "My Assignment", link: "student-my-assignment", icon: "fas fa-book-reader" },
    { name: "Join Meet", link: "student-join-meet", icon: "fas fa-video" },
    { name: "Recorded Classes", link: "student-class-recordings", icon: "	fa fa-microphone" },
    { name: "Feedback", link: "feedback", icon: "fa fa-comments" }
  ];

  return (
    <Fragment>
      <div className="form-back-drop" onClick={() => sidebarOnclick()} />
      {/* Hidden Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon" onClick={() => sidebarOnclick()}>
            <span className="fa fa-times" />
          </div>

          <div className="student-sidebar">
            <p className="title-db" style={{ color: "#fff" }}>
              STUDENT
            </p>
            {menuList.map(({ name, link, icon }, index) => (
              <Link href={link} key={name} style={{ textDecoration: "none" }}>
                <div className="menu-item">
                  <div className="menu">
                    {/* <img src={icon} alt=""/> */}
                    <i className={icon} style={{ marginBottom: "14px" }}></i>
                    <p>{name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Sidebar;
