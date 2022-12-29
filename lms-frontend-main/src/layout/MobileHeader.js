import Link from "next/link";
import { useState, useEffect } from "react";
import TokenService from "../../pages/api/token.service";
// import { Blog, Courses, Home, Pages } from "./Menu";
import { useRouter } from 'next/router';
import AuthService from "../../pages/api/auth.service";
import Cookies from "js-cookie";

const MobileHeader = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
      AuthService.logout();
      Cookies.remove("loggedIn");
      Cookies.remove("type");
      Cookies.remove("admin");
      router.push("/login");
  }

  useEffect(() => {
    // Perform localStorage action
    const token = TokenService.getLocalAccessToken();
    if (token) setShowLogin(false)
    let type = Cookies.get('type');
    if (type === 'student') {
      setIsStudent(true)
    }else{
      setIsStudent(false)
    }
  }, []);
  // const activeMenuSet = (value) =>
  //     setActiveMenu(activeMenu === value ? "" : value),
  //   activeLi = (value) =>
  //     value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <ul className="navigation clearfix d-block d-lg-none mobile-header">
      {/* <li className="dropdown current">
        <a href="#">home</a>
        <ul style={activeLi("home")}>
          <Home />
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet("home")}>
          <span className="fas fa-chevron-down" />
        </div>
      </li> */}
      <li >
        <Link href="/">Home</Link>
      </li>
      {/* <li>
        <Link href="/about">About</Link>
      </li> */}
      
      <li >
        <Link href="/course-grid">Courses</Link>
      </li>
      <li>
        <Link href="/purchase">Purchase</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
     
      {showLogin &&
        <>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </>
      }
      {!showLogin && isStudent &&<>
      {/* <span>Student</span> */}
        <li>
          <Link href="/student-my-courses">My Course Details</Link>
        </li>
        <li>
          <Link href="/student-course-materials">Course Materials</Link>
        </li>
        <li>
          <Link href="/student-my-quiz">My Quiz</Link>
        </li>
        <li>
          <Link href="/student-my-assignment">My Assignment</Link>
        </li>
        <li>
          <Link href="/student-join-meet">Join Meet</Link>
        </li> 
        <li>
          <Link href="/student-class-recordings">Recorded Classes</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>

      </>}
      {!showLogin &&  <li>
            <a onClick={handleLogout} >Logout</a>
         </li> }
      {/* <li className="dropdown">
        <a href="#">Courses</a>
        <ul style={activeLi("Courses")}>
          <Courses />
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet("Courses")}>
          <span className="fas fa-chevron-down" />
        </div>
      </li> */}
      {/* <li className="dropdown">
        <a href="#">pages</a>
        <ul style={activeLi("Pages")}>
          <Pages />
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet("Pages")}>
          <span className="fas fa-chevron-down" />
        </div>
      </li> */}
      {/* <li className="dropdown">
        <a href="#">blog</a>
        <ul style={activeLi("Blog")}>
          <Blog />
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet("Blog")}>
          <span className="fas fa-chevron-down" />
        </div>
      </li> */}
    </ul>
  );
};
export default MobileHeader;
