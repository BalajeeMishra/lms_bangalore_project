import Cookies from "js-cookie";
import AuthService from "../pages/api/auth.service";
import TokenService from "../pages/api/token.service";

// Animation with wowjs
export const animation = () => {
  if (typeof window !== "undefined") {
    window.WOW = require("wowjs");
  }
  new WOW.WOW().init();
};

// Sidebar
export const sidebarOnclick = () => {
  const body = document.querySelector("body");
  body.classList.toggle("side-content-visible");
};

// Sticky nav
const stickyNav_ = () => {
  let offset = window.scrollY;
  const stickys = document.querySelectorAll(".main-header");
  for (let i = 0; i < stickys.length; i++) {
    const sticky = stickys[i];
    if (sticky) {
      if (offset > 10) {
        sticky.classList.add("fixed-header");
      } else {
        sticky.classList.remove("fixed-header");
      }
    }
  }
};
export const stickyNav = (stickyClass) =>
  window.addEventListener("scroll", stickyNav_);

// Scroll top
export const scrollTopFun = () => {
  let scrollUp = document.getElementById("scroll-top"),
    lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    let st = window.scrollY;
    if (st > 110) {
      scrollUp.classList.add("d-block");
    } else {
      scrollUp.classList.remove("d-block");
    }
  });
};

// Paggination
export const getPagination = (totalNumber, sort) => {
  let arr = new Array(Math.ceil(totalNumber / sort))
    .fill()
    .map((_, idx) => idx + 1);
  return arr;
};
// change pagination and update pagination and content
export const pagination = (listClass, sort, active) => {
  let list = document.querySelectorAll(listClass);
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (active === 1) {
      if (i < sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    } else {
      if (i >= (active - 1) * sort && i < active * sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    }
  }
};
export function checkIsSuperUser() {
  AuthService.getUserProfile().then((res) => {
    if (res?.status === 200) {
      let userprof = res.data.data
      let redirecTo = false
      if (!userprof) {
        redirecTo = true
      } else if (userprof?.is_superuser === undefined || userprof?.is_superuser === false || userprof?.is_superuser === null) {
        redirecTo = true
      }
      if(userprof?.is_superuser === true){
        Cookies.set('admin',true)
      }
      let type = Cookies.get('type')
      if (redirecTo) {
        let path = "/"
        if (type === "student") {
          path = "/student-my-courses"
        } else if (type === "teacher") {
          path = "/faculty"
        }
        window.location.href = path
      }
    }
  })
}

export function IsAuthenticatedOrRedirect(){
  const token = TokenService.getLocalAccessToken();
  if(!token) {
    window.location.href = "/login"
  }
}