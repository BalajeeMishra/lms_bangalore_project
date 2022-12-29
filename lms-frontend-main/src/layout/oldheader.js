import Cookies from "js-cookie";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { sidebarOnclick, stickyNav } from "../utils";
// import { Courses, Home } from "./Menu";
import MobileHeader from "./MobileHeader";

const Header = ({ header }) => {
  useEffect(() => {
    stickyNav();
  }, []);
  const [navToggle, setNavToggle] = useState(false);
  switch (header) {
    case 1:
      return <Header1 navToggle={navToggle} setNavToggle={setNavToggle} />;
    default:
      return (
        <DefaultHeader navToggle={navToggle} setNavToggle={setNavToggle} />
      );
  }
};

let loggedIn = Cookies.get('loggedIn');
let type = Cookies.get('type');
let  studLayout;
if(loggedIn && type === 'student') {
  studLayout = (
    <div className="menu-sidebar" onClick={() => sidebarOnclick()}>
      <button>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    </div>
  )
}

export default Header;
const Header1 = ({ navToggle, setNavToggle }) => (
    <Fragment>
      <header className="main-header">
        {/* Header-Top */}
        {/* <HeaderTop /> */}
        {/* Header-Upper */}
        <div className="header-upper">
          <div className="container-fluid clearfix">
            <div className="header-inner d-flex align-items-center justify-content-between">
              <div className="logo-outer d-lg-flex align-items-center">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img
                        src="assets/images/logos/logo.png"
                        alt="Logo"
                        title="Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="nav-outer clearfix">
                {/* Main Menu */}
                <nav className="main-menu navbar-expand-lg">
                  <div className="navbar-header">
                    <div className="mobile-logo bg-green br-10 p-15">
                      <Link href="/">
                        <a>
                          <img
                            src="assets/images/logos/logo.png"
                            alt="Logo"
                            title="Logo"
                          />
                        </a>
                      </Link>
                    </div>
                    {/* Toggle Button */}
                    {}
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
                <form onSubmit={(e) => e.preventDefault()} action="#">
                  <input type="search" placeholder="Search" required="" />
                  <button>
                    <i className="fas fa-search" />
                  </button>
                </form>
                <button className="cart">
                  <i className="fas fa-shopping-bag" />
                </button>
                <button >
                {}
                <Link href="/login">
                  <i className="far fa-user-circle" />
                </Link>
                </button> 
                {/* menu sidbar */}
                {studLayout
                }
                {/* <div className="menu-sidebar" onClick={() => sidebarOnclick()}>
                  <button>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/*End Header Upper*/}
      </header>
    </Fragment>
  ),
  DefaultHeader = ({ navToggle, setNavToggle }) => (
    <Fragment>
      <header className="main-header header-two">
        {/* Header-Top */}
        {/* <HeaderTop /> */}
        {/* Header-Upper */}
        <div className="header-upper">
          <div className="container-fluid clearfix">
            <div className="header-inner d-flex align-items-center justify-content-between">
              <div className="logo-outer d-lg-flex align-items-center">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img
                        src="assets/images/logos/logo.png"
                        alt="Logo"
                        title="Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="nav-outer clearfix">
                {/* Main Menu */}
                <nav className="main-menu navbar-expand-lg">
                  <div className="navbar-header">
                    <div className="mobile-logo bg-green br-10 p-15">
                      <Link href="/">
                        <a>
                          <img
                            src="assets/images/logos/logo.png"
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
                <form onSubmit={(e) => e.preventDefault()} action="#">
                  <input type="search" placeholder="Search" required="" />
                  <button>
                    <i className="fas fa-search" />
                  </button>
                </form>
                <button className="cart">
                  <i className="fas fa-shopping-bag" />
                </button>
                <button>
                <Link href="/login">
                  <i className="far fa-user-circle" />
                </Link>
                </button>
                {/* menu sidbar */}
                {/* <div className="menu-sidebar" onClick={() => sidebarOnclick()}>
                  <button>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div> */}
                {studLayout}
              </div>
            </div>
          </div>
        </div>

        {/*End Header Upper*/}
      </header>
    </Fragment>
  ),
  Menus = () => (
    <ul className="navigation clearfix d-none d-lg-flex">
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href="/course-grid">
          <a>courses</a>
        </Link>
      </li>
    </ul>
  );
