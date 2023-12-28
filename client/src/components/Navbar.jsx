import React, { useContext, useState } from "react";
import logo from "../images/mediumlogo.png";
import { Link, Outlet } from "react-router-dom";
import writing from "../images/writing.png";
import { UserContext } from "../App";
import UserNavigation from "./UserNavigation";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const[showUserNav,setShowUserNav] = useState(false);

  const {
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const handleBlur = () =>{
    setTimeout(() => {
      setShowUserNav(false)
    }, 600);
  }
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="flex-none w-16 h-9">
          <img src={logo} alt="" className="w-full" />
        </Link>

        <div
          className={
            "absolute py-4 px-[5vw] bg-white w-full left-0 top-full mt-0 border-b border-grey md:relative md:inset-0  md:border-0 md:p-0 md:w-auto md:show  " +
            (showSearch ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="search"
            className="w-full md:w-auto
         bg-grey pl-6 p-4 pr-[12%] md:pr-6 rounded-full outline-none placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey  "></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden  bg-grey w-12 h-12 rounded-full flex items-center justify-center"
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          <Link to="/editor" className="hidden md:flex gap-2 link">
            <img src={writing} alt="" className="w-6" />
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              <Link to="dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-xl block mt-1"></i>
                </button>
              </Link>

              <div className="relative">
                <button 
                onClick={()=>setShowUserNav(!showUserNav)}
                onBlur={handleBlur}
                className="w-12 h-12 mt-1 rounded-full">
                  <img
                    src={profile_img}
                    alt=""
                    className="rounded-full object-cover"
                  />
                </button>
                {
                  showUserNav ? <UserNavigation /> : ''
                }
              
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                sign In
              </Link>
              <Link className="btn-light py-2 hidden md:block" to="/signup">
                sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
