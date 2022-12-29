import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Cookies from "js-cookie";
import AuthService from './api/auth.service';

function Logout() {

  const router = useRouter();

  useEffect(() => {
    AuthService.logout();
    Cookies.remove("loggedIn");
    Cookies.remove("type");
    Cookies.remove("admin");
    router.push("/");
  }, []);

  return (
    <div>logout</div>
  )
}

export default Logout