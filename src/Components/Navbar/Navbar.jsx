import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { langContext } from "../../Context/LangContext";
import i18next from "i18next";
import { userContext } from "../../Context/UserContext";
import $ from 'jquery';

function Navbar() {
  // const [Lang, setLang] = useState("Ar")
  const { Lang, setLang } = useContext(langContext);
  let navigate = useNavigate();
  const { Token, setUserToken, name } = useContext(userContext);

  // let userToken = null;
  async function logout() {
    localStorage.removeItem("Token");
    setUserToken(null);
    // (userToken);
    navigate("/login");

    // navigate("/login");
  }
  $(document).ready(function(){
    $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      if (scroll > 0) {
        $("nav").css("background" , "rgba(255, 255, 255, 1)");
      }

      else{
        $("nav").css("background" , "transparent");  	
        
      }
    })
  })
 
  //  function handleScroll(id){
  //   const item = ReactDOM.findDOMNode(this.refs[id]);
  //   window.scrollTo(item.offsetTop);

  // }
  function changeLang(e) {
    (e.target.getAttribute("data-lang"));
    setLang(e.target.getAttribute("data-lang"));
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg  fixed-top ">
        <div className="container flex-row-reverse  ">
      
          <Link className="navbar-brand w-25 ms-5   text-end" to="/">
            <img
              src={logo}
              className="w-100"
              alt="شركه النواب للمحاماة و الاستشارات القانونيه"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  flex-row-reverse  justify-content-between w-100 ">
              <li className="nav-item">
                <a href="/#theAgreement" className="nav-link active">
                  {i18next.t("AgreementNav")}
                </a>
                {/* <Link  onClick={this.handleScroll.bind(this, 'theAgreement')} className="nav-link active">{i18next.t('AgreementNav')}</Link> */}
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="https://alnwab.com/index.php/about/"
                >
                  {i18next.t("About")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="https://alnwab.com/index.php/contact-us/"
                >
                  {i18next.t("ContactUs")}
                </Link>
              </li>

              {/* <li>
                <ul className="navbar-nav"> */}
              {Token !== null ? (
                <>
                  {/* <li className="nav-item"> */}
                  <div className="dropdown ">
                    <button
                      className="nav-item dropdown-toggle border-0 text-white h-100 w-100"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user "></i> {name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                    <li className=" dropdown-item d-flex justify-content-center align-items-center ">
                        <Link
                          to="/profile"
                          className="btn btn-outline-main rounded-pill w-100 border-0 "
                        >
                          <i className="fa-solid fa-user "></i> My Profile
                       
                        </Link>
                      </li>
                      <li className="text-center dropdown-item">
                        {" "}
                        <Link
                          onClick={() => {
                            logout();
                          }}
                          className="nav-link cursor-pointer btn btn-outline-main rounded-pill "
                        >
                          {i18next.t("logout")}
                          <i className="fa-solid fa-right-from-bracket ms-3"></i>
                        </Link>
                      </li>
                     
                    </ul>
                  </div>

                  {/* </li> */}
                </>
              ) : (
                <>
                  <div className="d-flex p-0 m-0 ">
                  <li className="nav-item   login">
                    <NavLink className="nav-link  px-3" to="/login">
                      {i18next.t("signin")}
                    </NavLink>
                  </li>
                  <li className="nav-item register">
                    <NavLink className="nav-link  px-3 " to="/register">
                      {i18next.t("signup")}
                    </NavLink>
                  </li>
                  </div>
                </>
              )}

              {/* </ul>
              </li> */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {Lang == "Ar" ? "العربية" : "English"}
                </Link>
                <ul className="dropdown-menu">
                  {Lang == "Ar" ? (
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-lang="En"
                        onClick={(e) => changeLang(e)}
                      >
                        الانجليزية
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-lang="Ar"
                        onClick={(e) => changeLang(e)}
                      >
                        {" "}
                        Arabic
                      </Link>
                    </li>
                  )}
                  {/* <li><Link className="dropdown-item" to="#" data-lang={Lang=="Ar"?"Ar":"En"} onClick={(e)=>changeLang(e)} > {Lang=="Ar"?"الانجليزية":"Arabic"}</Link></li>  */}
                </ul>
              </li>
            </ul>

          
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
