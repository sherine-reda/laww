import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { langContext } from '../../Context/LangContext';
import { userContext } from '../../Context/UserContext';

function Layout() {
  const { Lang, setLang } = useContext(langContext);
  const { setUserToken,setUserName } = useContext(userContext);

  useEffect(() => {
      if (localStorage.getItem('Token') !== null) {
          setUserToken(localStorage.getItem('Token'));
          setUserName(localStorage.getItem("userName"))
      }
      
  }, [])
  return<>
   <Navbar />
   <div className={` ${Lang=="Ar"?"Rtl":"Ltr"}`}>
   <Outlet />

   </div>
  </>
}

export default Layout