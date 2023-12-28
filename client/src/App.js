import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/Session";

export const UserContext = createContext({});

function App() {
  const[userAuth,setUserAuth] = useState({});

  useEffect(()=>{
     let userInSession = lookInSession("user");
     userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null});
  },[])




  return (
    <div className="App">
      <UserContext.Provider value={{userAuth,setUserAuth}}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="signin" element={<UserAuthForm type="sign-in" />} />
            <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
