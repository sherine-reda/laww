import { Field, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import $ from "jquery";
import i18next from "i18next";
import { langContext } from "../../Context/LangContext";
import axios from "axios";
import { json } from "react-router-dom";
import { DataApi } from "../../Api";
import { type } from "@testing-library/user-event/dist/type";
function AgreementForm({ Id }) {
  const { Lang, setLang } = useContext(langContext);
  // (Id);
  const [responsibilities, setresponsibilities] = useState([]);
  const [itemValue, setitemValue] = useState(null);
  const [AmountPrice, setAmountPrice] = useState(0);
  const [SelectPrice, setSelectPrice] = useState(null);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [Taxes, setTaxes] = useState(0);
  const [isCheckedItem, setisCheckedItem] = useState(false);
  const [QuestionsService, setQuestionsService] = useState([]);
  const [myData, setmyData] = useState([]);
  const [inputTextInfo, setinputTextInfo] = useState({});
  const [typeInput, settypeInput] = useState("");
  let arr = [];

  function add(e) {
    let x = document.getElementById("inputText").value;
    setresponsibilities((prevStateArray) => [...prevStateArray, x]);
  }
  function deleteRes(i) {
    setresponsibilities(
      responsibilities.filter((ele) => ele !== responsibilities[i])
    );
  }
  let index;
  function setUpdateRes(i) {
    index = i;
    document.getElementById("inputText").value = responsibilities[i];
    document.getElementById("plusIcon").classList.add("d-none");
    document.getElementById("editIcon").classList.remove("d-none");
  }
  function editRes() {
    let x = document.getElementById("inputText").value;
    setresponsibilities(
      responsibilities.map((ele) => (ele == responsibilities[index] ? x : null))
    );
    document.getElementById("plusIcon").classList.remove("d-none");
    document.getElementById("editIcon").classList.add("d-none");
  }
  async function getQuestionsService() {
    let url = `https://portal.alnwab.com/api/questions?lang=${Lang.toLowerCase()}&service_id=${Id}`;
    let { data } = await axios.get(url, {
      headers: { accept: "application/json" },
    });
    console.log(data);
    setQuestionsService(data);
  }

  function dd(e) {
    let dodo = e.target;

    let items = Array.from(
      e.target?.nextSibling?.querySelectorAll(".dropdown-item")
    );
    items.map((e, i) =>
      e.addEventListener("click", function (e) {
        setitemValue(e.target.innerHTML);
        dodo.innerHTML = e.target.innerHTML;
      })
    );
  }
  function isChecked(i, e) {
    let x = !e.target.nextSibling.checked;
    let price = e.target.querySelector(".price-Check")
    // console.log(e.target.querySelector(".price-Check"));
    // console.log(e.target.nextSibling);
    // console.log("is checked" , x);
    setisCheckedItem(x);

    x
      ? e.target.classList.add("bg-main", "text-white")
      : e.target.classList.remove("bg-main", "text-white");
   if(price != null){
    if (x) {
      amoumt(e);
    } else {
      subtractAmount(e);
    }
   }
  }
    
  function amoumt(e) {

    if(e.target.getAttribute("type")=="select"){
      if(e.target.value != SelectPrice){
        console.log("hello");
        setSelectPrice(e.target.value)
        // console.log(Number(SelectPrice.slice(SelectPrice.indexOf("$")+1)));
        let price =Number(e.target.value.slice(e.target.value.indexOf("$")+1));
        console.log(price);
        let tax = (price * 15) / 100;
        console.log(AmountPrice , price);
        let i = AmountPrice+price
        if(SelectPrice){
          let x = i - Number(SelectPrice.slice(SelectPrice.indexOf("$")+1))
          setTotalPrice(x + tax);
          setAmountPrice(x);
          setTaxes(tax);
        }else{
          setTotalPrice(i + tax);
          setAmountPrice(i);
          setTaxes(tax);
        }
        // setSelectPrice(price)
     
      }
    
    }else{
      let x = e.target.innerHTML.indexOf("+");
      let y = e.target.innerHTML.indexOf("SAR");
      let z = Number(e.target.innerHTML.slice(x + 1, y));
      let i = AmountPrice+z
      console.log(AmountPrice , z);

      let tax = (i  * 15) / 100;
      setTotalPrice(i  + tax);
      setAmountPrice(i );
      setTaxes(tax);
    }
    // console.log(e.target);
   
  }
  function subtractAmount(e) {
    let x = e.target.innerHTML.indexOf("+");
    let y = e.target.innerHTML.indexOf("SAR");
    let z = AmountPrice - Number(e.target.innerHTML.slice(x + 1, y));
    let tax = (z * 15) / 100;
    setTotalPrice(z + tax);
    setAmountPrice(z);
    setTaxes(tax);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const questions = [];
    let Form_Data = { questions: questions, Prices: {"amountPrice":AmountPrice,"taxesPrice":Taxes,"totalPrice":TotalPrice} };
    // console.log(TotalPrice);

    const inputs = e.target.querySelectorAll("input,textarea,select");
    inputs.forEach((input) => {
      // console.log((input.value).slice(0,(input.value).indexOf("_")));
      // console.log((input.value).slice((input.value).indexOf("_")+1,(input.value).indexOf("$")));
      if (input.type == "checkbox" || input.type == "radio") {
        if (input.checked) {
          const input_name = input.getAttribute("name");
          const id_q = input.getAttribute("id_q");
          const id_A = input.getAttribute("id");
          const type = input.getAttribute("type");
          const value = input.value;
          const question = {};
          question.id = id_q;
          if (type == "select") {
            let value_option = value.slice(0,value.indexOf("_"));
            let id_option = value.slice(value.indexOf("_")+1 , value.indexOf("$"));
            question.answers = {
              id: id_A,
              name: "",
              type: type,
              input_name: input_name,
              options: [
                {
                  id:id_option,
                  name:value_option,
                },
              ],
            };
          } else {
            question.answers = {
              id: id_A,
              name: value,
              price: 0,
              type: type,
              input_name: input_name,
              options: [],
            };
          }

          console.log(question);
          questions.push({ question });
        }
      } else {
        const input_name = input.getAttribute("name");
        const id_q = input.getAttribute("id_q");
        const id_A = input.getAttribute("id");
        const type = input.getAttribute("type");
        const value = input.value;
        const question = {};
        question.id = id_q;
        if (type == "select") {
          let value_option = value.slice(0, value.indexOf("_") - 1);
          let id_option = value.slice(value.indexOf("_") + 1);
          question.answers = {
            id: id_A,
            name: "",
            type: type,
            input_name: input_name,
            options: [
              {
                id: id_option,
                name: value_option,
              },
            ],
          };
        } else {
          question.answers = {
            id: id_A,
            name: value,
            price: 0,
            type: type,
            input_name: input_name,
            options: [],
          };
        }

        //  console.log(question);
        questions.push({ question });
      }
    });
    //  questions.forEach(q=>{
    //   console.log(q.question.id);
    //  })
    localStorage.setItem("Formvalues",JSON.stringify(Form_Data))
    console.log('Form values:', Form_Data);
    // let x = e?.target;

    // console.log(x);
  }

  useEffect(() => {
    getQuestionsService();
  }, [Lang, Id]);
  return (
    <>
      <section className="mb-5  " id="ArForm">
        <div className="container shadow  w-lg-50  justify-content-center  d-flex ">
          <form onSubmit={handleSubmit} id="form" className="p-5 w-100 ">
            <div className="row  g-md-5 gy-5 p-lg-5 text-center  ">
              {QuestionsService?.map((q, i) => (
                <div className="col-md-12 m-auto text-center" key={i}>
                  <div className="item">
                    <label htmlFor={q.question.id}> {q.question.name}</label>
                    {q.question.answers.map((a, i) =>
                      a.type == "select" ? (
                        <div className="custom-select  w-100" key={i}>
                          <select
                            className=" btn btn-outline-form w-100 rounded-pill h-100"
                            type={a.type}
                            id={a.id}
                            name={a.input_name}
                            id_q={q.question.id}
                            onClick={a.price>0?(e)=>amoumt(e):null}
                          >
                              <option value="" disabled selected>Select an option</option>

                            {a.options.map((o, i) => (
                              <option key={i} value={`${o.name}_${o.id}$${a.price}`} >
                              {a.price > 0?  <span className="position-absolute price-Check start-5 fs-6 fw-bold">
                                  +{a.price} SAR
                                </span>:null}
                                {o.name}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow"></span>
                        </div>
                      ) : a.type == "checkbox" || a.type == "radio" ? (
                        <div className="d-lg-inline-block w-50 ps-3" key={i}>
                          <div className=" m-auto w-100">
                            <div className="item">
                              <label
                                htmlFor={a.id}
                                onClick={(e) => isChecked(a.id, e)}
                                className="checkboxItem btn btn-outline-form position-relative rounded-pill fs-5"
                              >
                                {a.name}
                                {a.price > 0?  <span className="position-absolute price-Check start-5 fs-6 fw-bold">
                                  +{a.price} SAR
                                </span>:null}
                              </label>
                              <input
                                id={a.id}
                                id_q={q.question.id}
                                key={i}
                                type={a.type}
                                name={a.input_name}
                                value={a.name}
                                hidden
                                aria-hidden
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="position-relative">
                          <input
                            key={i}
                            name={a.input_name}
                            id={a.id}
                            id_q={q.question.id}
                            type={a.type}
                            className="form-control btn btn-outline-form rounded-pill"
                          ></input>
                           {a.price > 0?  <span className="position-absolute price-Check text-main start-5 fs-6 fw-bold">
                                  +{a.price} SAR
                                </span>:null}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* ///////////////فاتورة////////////// */}

              <div className="col-md-12">
                <div className="row my-5 text-center m-auto w-50  gy-3 ">
                  <div className="col-6 ">
                    <div className="item ">
                      <h6 className="text-end"> {i18next.t("Amount")}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6> {AmountPrice} SAR </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6 className="text-end"> {i18next.t("Taxes")}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6> {Taxes} SAR </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6 className="text-end"> {i18next.t("Total")}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6>{TotalPrice} SAR </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 ">
                <div className="item  text-center">
                  <button
                    className="btn btn-outline-gray rounded-pill w-lg-50  "
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    // name="intent"
                    value="save"
                    // onClick={() => submit()}
                  >
                    {i18next.t("BuyAgreement")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Modellllllllllllll */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirm Agreement
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-diss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h4 className="">Personal Data</h4>
                <div className="ms-3">
                  <h5>
                    Full Name :{" "}
                    <span className="text-muted fs-5">Ahmed Mohamed</span>
                  </h5>
                  <h5>
                    Email :{" "}
                    <span className="text-muted fs-5">Ahmed@gmail.com</span>
                  </h5>
                  <h5>
                    Gender : <span className="text-muted fs-5">Male</span>
                  </h5>
                  <h5>
                    Phone : <span className="text-muted fs-5">84848484848</span>
                  </h5>
                </div>
                <h4 className="">Agreement</h4>
                <div className="row ms-3">
                  <div className="col-md-6">
                    <h5>
                      Name :{" "}
                      <span className="text-muted fs-5">Service Policy</span>
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      Language :{" "}
                      <span className="text-muted fs-5">English</span>
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      Language :{" "}
                      <span className="text-muted fs-5">English</span>
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      Language :{" "}
                      <span className="text-muted fs-5">English</span>
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      Language :{" "}
                      <span className="text-muted fs-5">English</span>
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      Language :{" "}
                      <span className="text-muted fs-5">English</span>
                    </h5>
                  </div>
                  <div className="col-md-12">
                    <h5>
                      Language :{" "}
                      <span className="text-muted fs-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur, similique.
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="modal-footer m-auto justify-content-center">
                <div className="">
                  <div className="row my-5 text-center m-auto  w-50 gy-3 ">
                    <div className="col-6 ">
                      <div className="item ">
                        <h6 className="text-end"> {i18next.t("Amount")}</h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6> {AmountPrice} SAR </h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6 className="text-end"> {i18next.t("Taxes")}</h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6> {Taxes} SAR </h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6 className="text-end"> {i18next.t("Total")}</h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6>{TotalPrice} SAR </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn bg-main text-white w-75"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModal2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Payment
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AgreementForm;
