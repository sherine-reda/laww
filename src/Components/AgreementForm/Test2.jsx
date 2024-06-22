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
function Test2() {
  const { Lang, setLang } = useContext(langContext);
  // (Id);
  const [responsibilities, setresponsibilities] = useState([]);
  const [itemValue, setitemValue] = useState(null);
  const [totalPrice, settotalPrice] = useState(0);
  const [Taxes, setTaxes] = useState(0);
  const [isCheckedItem, setisCheckedItem] = useState(false);
  const [QuestionsService, setQuestionsService] = useState([]);
  const [myData, setmyData] = useState([]);
  let arr = [];

  function add(e) {
    // (e.target.nextSibling.value);
    let x = document.getElementById("inputText").value;
    setresponsibilities((prevStateArray) => [...prevStateArray, x]);
    // setresponsibilities(arr)
    
    // e.target.nextSibling.value = ""
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
    // (e.target.nextSibling.value);
    let x = document.getElementById("inputText").value;
    setresponsibilities(
      responsibilities.map((ele) => (ele == responsibilities[index] ? x : null))
    );
    document.getElementById("plusIcon").classList.remove("d-none");
    document.getElementById("editIcon").classList.add("d-none");


    // clear()
  }
  async function getQuestionsService() {
    // let url = `http://192.168.1.108/api/questions?lang=${Lang.toLowerCase()}&service_id=${Id}`;
    // // (url);
    // let { data } = await axios.get(url, {
    //   headers: { accept: "application/json" },
    // });
   
    // (data);
    setQuestionsService(DataApi);
    // (QuestionsService);
  }

  function dd(e) {
    let dodo = e.target;

    let items = Array.from(
      e.target?.nextSibling?.querySelectorAll(".dropdown-item")
    );
    // (items);
    items.map((e, i) =>
      e.addEventListener("click", function (e) {
        setitemValue(e.target.innerHTML);
        dodo.innerHTML = e.target.innerHTML;
      })
    );
  }
  function handleSubmit(event) {
    event.preventDefault(); // prevent the form from submitting
  }
  function isChecked(i, e) {
   
    let x = !document.getElementById(i).checked;
    
    setisCheckedItem(x);
   
    x
      ? e.target.classList.add("bg-main", "text-white")
      : e.target.classList.remove("bg-main", "text-white");
    // x?:null
    if (x) {
      amoumt(e);
    } else {
      subtractAmount(e);
    }
  }
  function amoumt(e) {
    let x = e.target.innerHTML.indexOf("+");
    let y = e.target.innerHTML.indexOf("SAR");
    // (x,y);
    // (e.target.innerHTML.slice(x+1,y));
    let z = totalPrice + Number(e.target.innerHTML.slice(x + 1, y));
    let tax = (z * 15) / 100;
    //  (z,tax);
    settotalPrice(z);
    setTaxes(tax);
  }
  function subtractAmount(e) {
    let x = e.target.innerHTML.indexOf("+");
    let y = e.target.innerHTML.indexOf("SAR");
    // (x,y);
    // (e.target.innerHTML.slice(x+1,y));
    let z = totalPrice - Number(e.target.innerHTML.slice(x + 1, y));
    let tax = (z * 15) / 100;
    settotalPrice(z);
    setTaxes(tax);
  }
  async function submit() {
    const form = document.getElementById("form");
    const submitter = document.querySelector("button[value=save]");
    const formData = new FormData(form, submitter);
    let arr = [];
    let ids = [];
    QuestionsService.map((q, i) => ids.push(q.question.id));
    for (const [key, value] of formData) {
      arr.push({ nameQ: key, answer: value });
    }

    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      obj.id_Q = ids[i];
    }
    setmyData(arr);

  }
  useEffect(() => {
    getQuestionsService();
  }, [Lang]);
  return (
    <>
      <section className="mb-5  " id="ArForm">
        <div className="container shadow  w-50">
          <form onSubmit={handleSubmit} id="form" className="p-5">
            <div className="row  g-md-5 gy-5 p-5 text-center">
              {QuestionsService?.map((q, i) => (
                <div className="col-md-12" key={i}>
                  <div className="item">
                    <label htmlFor={q.question.id}> {q.question.name}</label>
                    {q.question.answers.map((a, i) =>
                      a.type == "select" ? (
                        <div className="custom-select  w-100">
                          <select
                            className=" btn btn-outline-form w-100 rounded-pill h-100"
                            name={q.question.name}
                          >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </select>
                          <span className="custom-arrow"></span>
                        </div>
                      ) : a.type == "checkbox" ? (
                        <div className="">
                          <div className=" m-auto">
                            <div className="item">
                              <label
                                htmlFor={i}
                                onClick={(e) => isChecked(i, e)}
                                className="checkboxItem btn btn-outline-form position-relative rounded-pill fs-5"
                              >
                                {a.name}
                                <span className="position-absolute price-Check start-5 fs-6 fw-bold">
                                  +{a.price} SAR
                                </span>
                              </label>
                              <input
                                id={i}
                                key={i}
                                type={a.type}
                                name={q.question.name}
                                value={a.input_name}
                                hidden
                                aria-hidden
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <input
                          name={q.question.name}
                          id={q.question.id}
                          type={a.type}
                          className="form-control btn btn-outline-form rounded-pill"
                        ></input>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* ///////////////فاتورة////////////// */}

              <div className="col-md-12">
                <div className="row my-5 text-center m-auto  w-50 gy-3 ">
                  <div className="col-6 ">
                    <div className="item ">
                      <h6 className="text-end"> {i18next.t("Amount")}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6> {totalPrice} ر.س </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6 className="text-end"> {i18next.t("Taxes")}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6> {Taxes} ر.س </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6 className="text-end"> {i18next.t("Total")}</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h6>{totalPrice + Taxes} ر.س </h6>
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
                    onClick={() => submit()}
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
          tabindex="-1"
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
                        <h6> {totalPrice} ر.س </h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6 className="text-end"> {i18next.t("Taxes")}</h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6> {Taxes} ر.س </h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6 className="text-end"> {i18next.t("Total")}</h6>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="item">
                        <h6>{totalPrice + Taxes} ر.س </h6>
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
          tabindex="-1"
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

export default Test2;
