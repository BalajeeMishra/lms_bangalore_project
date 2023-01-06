import NavigationBar from "../src/components/navBar/NavBar";
import NavHeader from "../src/components/header/navHeader";
import TokenService from "./api/token.service";
import { useEffect } from "react";
import { useRouter } from "next/router";

function FacLayout({ children }) {
  const menuList = [
    // {name: "Dashboard", link: "faculty-dashboard", icon: "fa fa-home"},
    { name: "Student List", link: "faculty-student-list", icon: "fas fa-users" },
    { name: "Add Module / Course Materials", link: "faculty-add-course", icon: "fas fa-book-open" },
    { name: "Add Quiz", link: "faculty-add-quiz", icon: "fas fa-puzzle-piece" },
    { name: "Add Quiz Question", link: "faculty-add-quiz-questions", icon: "far fa-list-alt" },
    { name: "Add Assignment", link: "faculty-add-assignment", icon: "fas fa-book-reader" },
    { name: "Grade Assignment", link: "faculty-grade-assignment", icon: "fas fa-list-ol" },
    { name: "Create live class", link: "faculty-create-meet", icon: "fas fa-video" },
    { name: "View previous recorded class", link: "view-recordings", icon: "fas fa-bars" },
    { name: "upload video", link: "upload-video", icon: "fas fa-video" }
  ];
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const token = TokenService.getLocalAccessToken();
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="wrapper">
      <NavHeader />
      <div className="container-main layout-container">
        <NavigationBar itemList={menuList} />
        <div className="layout-sub">{children}</div>
      </div>
    </div>
  );
}

export default FacLayout;
