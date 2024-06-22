import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AgreementForm from "../AgreementForm/AgreementForm";
import Footer from "../Footer/Footer";
import { langContext } from "../../Context/LangContext";
import Typed from 'typed.js';

// import { resources } from "../../language/Lang";
import i18next, { use } from "i18next";
import axios from "axios";
import Test from "../AgreementForm/Test";
import Test2 from "../AgreementForm/Test2";
function Home() {
  const { Lang, setLang } = useContext(langContext);
  const [servicesData, setServicesData ] = useState([]);
  const [IdServ, setIdServ ] = useState(null);
  
  // const { Loading, setLoading } = useState(false);
  // (Lang.toLowerCase());
  async function services(){
    // setLoading(true)
    // http://192.168.1.108
   let u = "https://portal.alnwab.com"
  
     let url = `https://portal.alnwab.com/api/services?lang=${Lang.toLowerCase()}`
    let {data} = await axios.get(url,{
      headers:{'accept':'application/json'}
    })
    setServicesData(data.services)

  }
  function sendID(id){
    setIdServ(id)
  }
  useEffect(() => {
    const typed = new Typed("#mainTitle", {
      strings: [`${i18next.t('header')}`],
      typeSpeed: 100,
      showCursor: false,
    
    });
    services()
    
  }, [Lang])
  
  // (Lang);
  return (
    <>
    {/* {("renddeeer")} */}
      <header
        id="home"
        className=" d-flex justify-content-center align-items-center"
      >
        <div>
          <h1 id="mainTitle"> {i18next.t('header')}</h1>
          <p >
            {/* {Lang=='Ar'?"  إصدر إتفاقيات خلال دقائق. موثوق بها من ٥٠٠+ شركة في الخليج":"Generate business agreements in minutes. Trusted by 500+ gulf companies"} */}
            {i18next.t('title')}
          </p>
        </div>
      </header>
      {/* طريقة العمل */}
      <section id="HowWork" className="">
        <div className="container text-center py-5  mb-5 ">
          <h2 className="pb-5 title"> {i18next.t('OurProcess')}</h2>
          {/* className="row mt-5" */}
          <div  className={"row mt-5"} >
          <div className="col-md-4">
              <div className="item">
                <div className="circle">
                  <div className="inside-circle d-flex justify-content-center align-items-center">
                    {" "}
                    <span>01</span>
                  </div>
                </div>
                <h2 className="mt-4"> {i18next.t('OurProcess_t1')}</h2>
              </div>
            </div>
          
            <div className="col-md-4">
              <div className="item">
                <div className="circle">
                  <div className="inside-circle d-flex justify-content-center align-items-center">
                    {" "}
                    <span>02</span>
                  </div>
                </div>
                <h2 className="mt-4">{i18next.t('OurProcess_t2')}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="item">
                <div className="circle ">
                  <div className="inside-circle d-flex justify-content-center align-items-center">
                    {" "}
                    <span>03</span>
                  </div>
                </div>
                <h2 className="mt-4">{i18next.t('OurProcess_t3')}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* صيغ الاتفاقات */}
      <section id="AgreementForms" className="mt-5">
        <div className="container text-center py-5">
          <h2 className="pb-5 title">صيغ الاتفاقات</h2>
          <div className="row mt-5 gy-5">
            <div className="col-lg-4 col-md-6 ">
              <div className="item item1 m-auto d-flex justify-content-center align-items-end pb-4 rounded-5 shadow">
                <div className="content ">
                  <h3 className="text-white">سياسية الخصوصية</h3>
                  <Link to="" className="btn readMore shadow">
                    اقرا المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item item2 d-flex m-auto justify-content-center align-items-end pb-4 rounded-5 shadow">
                <div className="content ">
                  <h3 className="text-white">(NDA) عدم الافصاح </h3>
                  <Link to="" className="btn readMore shadow">
                    اقرا المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item item3 d-flex m-auto justify-content-center align-items-end pb-4 rounded-5 shadow">
                <div className="content ">
                  <h3 className="text-white">الشروط والاحكام</h3>
                  <Link to="" className="btn readMore shadow">
                    اقرا المزيد
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* الاتفاقية */}
      <section id="theAgreement" className="my-5 py-5 bg-gray">
        <div className="container text-center py-5">
          <h2 className=" title">{i18next.t('services')} </h2>
          <p>{i18next.t('chose')} {i18next.t('services')} </p>
          <div className="row g-lg-5 gy-5 my-5">
            {/* {(servicesData)} */}
           
              {servicesData?.map((ele,i)=>  <Link className="col-xl-4  col-lg-6" key={i} onClick={()=>sendID(ele.id)}>
             
              <div className="item w-100 h-100">
                <div  className="btn btn-outline-gray rounded-pill w-100 h-100"><h5>{ele.name}</h5> <span>{ele.description}</span></div>
               
              </div>
            </Link>)}
          
         
          
          </div>
        </div>
       {IdServ?<AgreementForm Id={IdServ}/>:null}
       {/* <Test2 /> */}
      </section>

      {/* <input type="checkbox" /> */}

      <Footer />

    </>
  );
}

export default Home;
