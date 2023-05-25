import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { HomeContainer, GamingContainer } from "./Containers";
import React, {useEffect, useState} from "react";
import ProfileContainer from "./Containers/ProfileContainer";
import PrizeContainer from "./Containers/PrizeContainer";
import Header from "./Component/SignInHeader";
import LoadingSpinner from "./Component/Spinner";
import Footer from "./Component/Footer";
function on(eventType, listener) {
  document.addEventListener(eventType, listener);
  document[eventType] = true;
}



function App() {
  const loginUser = React.useCallback(async (event) => { await setLoggedIn(event)},[])
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(!document.login) {
      on("login", loginUser);
    }
    if(!document.logout) {
      on('logout', logout);
    }

    if(!document.userUpdate) {
      on('userUpdate', updateUserAndPersist);
    }

    if(!document.loading) {
      on('loading', (event) => {setIsLoading(event.detail.loading);})
    }

    if(localStorage.getItem('user') !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('user')));
    }

    setIsLoading(false);
  },[loginUser])

  const setLoggedIn = async (event) => {
    const payload = event.detail;
    console.log(payload);
    setUser(JSON.parse(payload.body));
    localStorage.setItem('user',payload.body);
    localStorage.setItem('loginType', payload.type);
    setIsLoading(false);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginType');
  }

  const updateUserAndPersist = (event) => {
    const payload = event.detail;
    localStorage.setItem('user',payload.body);
    setUser(JSON.parse(payload.body));
  }

  return (
    <>
      <Router>
        {!isLoading ? <Header user={user} /> : <LoadingSpinner /> }
        <Routes>
          <Route path="/" element={<HomeContainer user={user} isLoading={isLoading}/>}/>
          <Route path="/game" element={<GamingContainer user={user} isLoading={isLoading} />}/>
          <Route path="/profile" element={<ProfileContainer user={user} isLoading={isLoading} /> } />
          <Route path="/prizes" element={<PrizeContainer user={user} isLoading={isLoading} /> } />
        </Routes>
        <div className='home-footer'>
          <Footer/>
        </div>
      </Router>
    </>
  );
}

export default App;
