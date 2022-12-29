import Cookies from "js-cookie";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { sidebarOnclick, stickyNav } from "../utils";
import MobileHeader from "./MobileHeader";
import { useRouter } from "next/router";
import AuthService from "../../pages/api/auth.service";
import TokenService from "../../pages/api/token.service";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [type, setType] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    // Perform localStorage action
    const token = TokenService.getLocalAccessToken();
    if (token) {
      setShowLogin(false);
      setLoggedIn(true);
    }
    stickyNav();
    // setLoggedIn(Cookies.get('loggedIn'));
    setType(Cookies.get("type"));
  }, []);

  const router = useRouter();
  const handleLogout = () => {
    AuthService.logout();
    Cookies.remove("loggedIn");
    Cookies.remove("type");
    Cookies.remove("admin");
    router.push("/login");
  };

  const [navToggle, setNavToggle] = useState(false);
  let studLayout;

  if (loggedIn && type === "student") {
    studLayout = (
      <>
        <button>
          <Link href="/cart">
            <span>
            Cart &nbsp;
              <i
                className="fa fa-shopping-basket"
                style={{ fontSize: "20px", color: "#000", cursor: "pointer" }}
              ></i>
             
            </span>
          </Link>
        </button>
        <button>
          <div onClick={handleLogout}>
            <i
              className="fas fa-sign-out-alt"
              style={{ fontSize: "20px", color: "#000", cursor: "pointer" }}
            ></i>
            Logout
          </div>
        </button>
        <div className="menu-sidebar" onClick={() => sidebarOnclick()}>
          <button>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
      </>
    );
  }

  return (
    <Fragment>
      <header className="main-header ">
        {/* Header-Top */}
        {/* <HeaderTop /> */}
        {/* Header-Upper */}
        <div className="header-upper">
          <div className="container-fluid clearfix">
            <div className="header-inner d-flex align-items-center justify-content-between">
              <div className="logo-outer d-lg-flex align-items-center">
                <div className="logo">
                  {/* <Link href="#"> */}
                  {/* <a> */}
                  <img
                    src="assets/images/logos/education_nest_logo_web.png"
                    alt="Logo"
                    title="Logo"
                    width="200px"
                  />
                  {/* </a> */}
                  {/* </Link> */}
                </div>
              </div>
              <div className="nav-outer clearfix">
                {/* Main Menu */}
                <nav className="main-menu navbar-expand-lg">
                  <div className="navbar-header">
                    <div className="mobile-logo bg-white br-10 p-15">
                      <Link href="/">
                        <a>
                          <img
                            src="assets/images/logos/education_nest_logo_web.png"
                            alt="Logo"
                            title="Logo"
                          />
                        </a>
                      </Link>
                    </div>
                    {/* Toggle Button */}
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                      onClick={() => setNavToggle(!navToggle)}
                    >
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                  </div>
                  <div
                    className={`navbar-collapse collapse clearfix ${
                      navToggle ? "show" : ""
                    }`}
                  >
                    <Menus />
                    <MobileHeader />
                  </div>
                </nav>
                {/* Main Menu End*/}
              </div>
              {/* Menu Button */}
              <div className="menu-btn-sidebar d-flex align-items-center">
                {/* <form onSubmit={(e) => e.preventDefault()} action="#">
                  <input type="search" placeholder="Search" required="" />
                  <button>
                    <i className="fas fa-search" />
                  </button>
                </form> */}
                {/* <button className="cart">
                  <i className="fas fa-shopping-bag" />
                </button> */}
                {showLogin && (
                  <>
                    <button>
                      <Link href="/login">Login</Link>
                    </button>
                    <button>
                      <Link href="/register">Register</Link>
                    </button>
                  </>
                )}
                {/* menu sidbar */}
                {studLayout}
                {showLogin === false && type !== "student" && (
                  <>
                    <button>
                      <div onClick={handleLogout}>
                        <i
                          className="fas fa-sign-out-alt"
                          style={{
                            fontSize: "20px",
                            color: "#000",
                            cursor: "pointer",
                          }}
                        ></i>
                        Logout
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*End Header Upper*/}
      </header>
    </Fragment>
  );
};

export default Header;

// DefaultHeader = ({ navToggle, setNavToggle }) => (
//   <Fragment>
//     <header className="main-header header-two">
//       {/* Header-Top */}
//       {/* <HeaderTop /> */}
//       {/* Header-Upper */}
//       <div className="header-upper">
//         <div className="container-fluid clearfix">
//           <div className="header-inner d-flex align-items-center justify-content-between">
//             <div className="logo-outer d-lg-flex align-items-center">
//               <div className="logo">
//                 <Link href="/">
//                   <a>
//                     <img
//                       src="assets/images/logos/logo.png"
//                       alt="Logo"
//                       title="Logo"
//                     />
//                   </a>
//                 </Link>
//               </div>
//             </div>
//             <div className="nav-outer clearfix">
//               {/* Main Menu */}
//               <nav className="main-menu navbar-expand-lg">
//                 <div className="navbar-header">
//                   <div className="mobile-logo bg-green br-10 p-15">
//                     <Link href="/">
//                       <a>
//                         <img
//                           src="assets/images/logos/logo.png"
//                           alt="Logo"
//                           title="Logo"
//                         />
//                       </a>
//                     </Link>
//                   </div>
//                   {/* Toggle Button */}
//                   <button
//                     type="button"
//                     className="navbar-toggle"
//                     data-toggle="collapse"
//                     data-target=".navbar-collapse"
//                     onClick={() => setNavToggle(!navToggle)}
//                   >
//                     <span className="icon-bar" />
//                     <span className="icon-bar" />
//                     <span className="icon-bar" />
//                   </button>
//                 </div>
//                 <div
//                   className={`navbar-collapse collapse clearfix ${
//                     navToggle ? "show" : ""
//                   }`}
//                 >
//                   <Menus />
//                   <MobileHeader />
//                 </div>
//               </nav>
//               {/* Main Menu End*/}
//             </div>
//             {/* Menu Button */}
//             <div className="menu-btn-sidebar d-flex align-items-center">
//               <form onSubmit={(e) => e.preventDefault()} action="#">
//                 <input type="search" placeholder="Search" required="" />
//                 <button>
//                   <i className="fas fa-search" />
//                 </button>
//               </form>
//               <button className="cart">
//                 <i className="fas fa-shopping-bag" />
//               </button>
//               <button>
//               <Link href="/login">
//                 <i className="far fa-user-circle" />
//               </Link>
//               </button>
//               {/* menu sidbar */}
//               {/* <div className="menu-sidebar" onClick={() => sidebarOnclick()}>
//                 <button>
//                   <span className="icon-bar" />
//                   <span className="icon-bar" />
//                   <span className="icon-bar" />
//                 </button>
//               </div> */}
//               {studLayout}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/*End Header Upper*/}
//     </header>
//   </Fragment>
// ),

const Menus = () => {
  return (
    <ul className="navigation clearfix d-none d-lg-flex">
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      {/* <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li> */}
      <li>
        <Link href="/course-grid">
          <a>courses</a>
        </Link>
      </li>
      <li>
        <Link href="/purchase">
          <a>Purchase</a>
        </Link>
      </li>
      <li>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </li>
    </ul>
  );
};
