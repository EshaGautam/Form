import React, { useEffect, useState } from 'react';
import contextCreate from './components/Store/context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  
useEffect(()=>{
  let storeLoggedInKey = localStorage.getItem("loggedIn");
   if(storeLoggedInKey==='1'){
    setIsLoggedIn(true)
}},[])
 
  



  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn','1')
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
     localStorage.clear()
     }
  

  return (
    <React.Fragment>
      <contextCreate.Provider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler}}>
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </contextCreate.Provider>
    </React.Fragment>
  );
}

export default App;
