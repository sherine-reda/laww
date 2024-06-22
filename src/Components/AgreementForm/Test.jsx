import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { langContext } from "../../Context/LangContext";
import i18next from "i18next";
import { DataApi } from "../../Api";
// const formData = new FormData();

function Test() {
  const { Lang, setLang } = useContext(langContext);
  const [Data, setData] = useState(DataApi);

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  function handleSubmit(event) {
    event.preventDefault(); // prevent the form from submitting
  }

  async function submitRegister() {
    const form = document.getElementById("form");
    const submitter = document.querySelector("button[value=save]");
    const formData = new FormData(form, submitter);
    const output = document.getElementById("output");
    // formData.append('id',"sdsad")
    for (const [key, value] of formData) {
        // (key +":" +value);
 

      output.textContent += `${key}: ${value}\n ,,,,  `;
    }
  }


  return (
    <>
      <section className="mb-5 " id="ArForm">
        <div className="container shadow p-5">
          <div className="container mt-5 py-5">
            <div className="py-5 mx-auto w-50">
              {error ? <div className="alert alert-danger">{error}</div> : ""}
              <form id="form" onSubmit={handleSubmit}>
                {Data.map((q, i) => (
                  <>
                    <label htmlFor={q.question.id} className={`mt-2`}>
                      {" "}
                      {q.question.name}{" "}
                    </label>
                    {q.question.answers.map((a, i) => (
                        a.type == "select" ?
                        <select name={a.input_name} id="">
                       { a.options.map((o,i)=> 
                        <option value={o.name}>{o.name}</option>
                        )}
                        </select>
                        : a.type =="checkbox"?<>
                        
                          <label htmlFor={a.name}>{a.name}</label>
                          <input type="checkbox" name={a.input_name} id="" value={a.name}/>
                      
                        </>:<>
                        <input
                        name="name"
                        id={q.question.id}
                        type={a.type}
                        className="form-control btn btn-outline-form rounded-pill"
                      ></input>
                        </>
                      
                    ))}
                  </>
                ))}

                {isLoading ? (
                  <button
                    type="button"
                    className="btn myBtn fw-bold mt-3 px-3 py-2"
                  >
                    {/* <ThreeDots
                height="28"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              /> */}
                    loading...
                  </button>
                ) : (
                    <button
                      name="intent"
                      value="save"
                      className="btn myBtn fw-bold mt-3 px-3 py-2 bg-main text-white "
                      onClick={()=>submitRegister()}
                    >
                      {i18next.t("signup")}
                    </button>
                  )}
              </form>
              <output id="output"></output>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Test;
