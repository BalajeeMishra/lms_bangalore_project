import Link from 'next/link';
import AuthService from '../../../pages/api/auth.service';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';

function NavHeader(){
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false)
    const handleLogout = () => {
        AuthService.logout();
        Cookies.remove("loggedIn");
        Cookies.remove("type");
        Cookies.remove("admin");
        router.push("/login");
    }

    useEffect(() => {
        if (Cookies.get("admin") === "true") {
            setIsAdmin(true)
        }
    }, [])

    function redirectToDashboard(){
        window.location.href = "/admin-dashboard"
    }
    return (

        <header className="main-header main-header-bg" >
            <div className="header-upper">
                <div className="container-fluid clearfix">
                    <div className="header-inner d-flex align-items-center justify-content-between ">
                    <div className="logo-outer d-lg-flex align-items-center">
                        <div > 
                      
                            <img
                                src="/assets/images/logos/education_nest_logo_web.png"
                                alt="Logo"
                                title="Logo"
                            />
                        </div>
                    </div>

                    <div className="menu-btn-sidebar d-flex">
                            {isAdmin && <div className='mr-3 cursorPointer' onClick={redirectToDashboard} >
                                <i className="fas fa-chalkboard-teacher" style={{ fontSize: '20px', color: '#000', cursor: 'pointer' }}></i> Admin-DashBoard
                            </div>}
                        <div onClick={handleLogout} >
                            <i className="fas fa-sign-out-alt" style={{fontSize: '20px', color: '#000', cursor: 'pointer'}}></i> Logout
                        </div>
                    </div>
                    </div>
                </div>
            </div>
      </header>
      )
}

export default NavHeader;