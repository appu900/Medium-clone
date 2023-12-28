import React, { useContext } from "react";
import InputBox from "../components/InputBox";
import googlelogo from "../images/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../components/PageAnimation";
import axios from "axios";
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { storeInSession } from "../common/Session";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {

  const authForm = useRef();
  let{userAuth:{access_token},setUserAuth} = useContext(UserContext)

  console.log(access_token)


  const userAuthThroughServer = async (serverRoute,formdata)=>{

     axios.post("http://localhost:5000"+serverRoute,formdata)
     .then(({data}) =>{
      storeInSession("user",JSON.stringify(data))
      setUserAuth(data)
      toast.success("wooooo")
  
     
     })
     .catch(({response}) =>{
        
        toast.error(response.data.error)
     })

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "sign-in" ? "/signin" :  "/signup"

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("atleast 3 charcter requried for fullname");
      }
    }

    if (!emailRegex.test(email)) {
      return toast.error("invalid email");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("password must contain upppercase lowercase and ");
    }

    userAuthThroughServer(serverRoute,formData);


  };

  return (
    access_token ? <Navigate to="/"/>
    :
    <AnimationWrapper keyvalue={type}>
      <section className="h-cover flex items-center justify-center ">
        <Toaster/>
        <form ref={authForm} className="w-[80%] max-w-[400px]  ">
          <h1 className="mb-14 text-4xl font-gelasio capitalize text-center font-normal ">
            {type == "sign-in" ? "welcome back" : "create your account"}
          </h1>
          {type != "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="User name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn-dark center mt-1 w-full "
          >
            {type == "sign-in" ? "sign in" : "sign up"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-light  flex items-center md:px-28 px-24 border bg-white justify-between w-full">
            <img src={googlelogo} alt="" className="w-5" />
            continue with google
          </button>

          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey">
              Don't have an account ?{" "}
              <Link to="/signup" className="underline text-black text-xl ml-1">
                sign up here
              </Link>{" "}
            </p>
          ) : (
            <p className="mt-6 text-dark-grey">
              Already have an account ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                sign in here
              </Link>{" "}
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
