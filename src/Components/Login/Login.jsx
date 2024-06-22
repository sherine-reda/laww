import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots  } from 'react-loader-spinner';
import { langContext } from "../../Context/LangContext";
import i18next from "i18next";
import { userContext } from "../../Context/UserContext";
function Login() {
    const { Lang, setLang } = useContext(langContext);
    let { setUserToken} = useContext(userContext);
    let { setUserName } = useContext(userContext);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let validationSchema = Yup.object({
        email: Yup.string().email(Lang == "Ar"?" يرجى ادخال بريد الالكتروني صالح":"email pattern is invalid").required(Lang == "Ar"?" يجب ادخال بريد الالكتروني صالح":"email is required"),
        password: Yup.string().matches(/^[A-Z][A-Za-z0-9]{5,8}/, Lang == "Ar"?"  يجب أن تبدأ كلمة المرور بحرف كبير وتحتوي فقط على الأحرف أو الأرقام (0-9) وأن يتراوح مجموعها بين 6 و9 أحرف.":"password should start with uppercase letter & only contain letters (A-Z or a-z) or numbers (0-9) & be between 6 and 9 characters in total.")
        .required(Lang == "Ar"?" يرجى ادخال كلمه مرور":'password is required')
        .min(6).max(9),
    })


    
    
    async function submitLogin(values) {
        setIsLoading(true);
        let { data } = await axios.post(`http://192.168.1.108/api/auth/login`, values, {headers:{'accept':'application/json'}}).catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            });
        if (data.access_token) {
          localStorage.setItem("Token", data.access_token);
          setUserToken(data.access_token);
          localStorage.setItem("userName", data.user.name);
          setUserName(data.user.name)
          setIsLoading(false);
          navigate('/');
        }
    }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  return (
    <>
     <div className="container mt-5 py-5">
     <div className="py-5 mx-auto w-50">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h1 className="fs-4  mb-5 text-center"> {i18next.t('signin')} </h1>
        <form onSubmit={formik.handleSubmit}>
        
          <label htmlFor="email"  >
          {i18next.t('email')} :
          </label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            type="email"
            className="form-control"
          ></input>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-danger font-bold mt-2 p-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password" className={`mt-2`} >
          {i18next.t('password')} :
          </label>
          <input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            type="password"
            className="form-control"
          ></input>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-danger font-bold mt-2 p-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

       
          {isLoading ? (
            <button type="button" className="btn myBtn fw-bold mt-3 px-3 py-2">
              <ThreeDots
                height="28"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn myBtn fw-bold mt-3 px-3 py-2 bg-main text-white "
            >
                 {Lang=="Ar"?"تسجيل الدخول":"Login"}
            </button>
          )}
        </form>
        <div className="mt-3 text-center"><span> {Lang=="Ar"?"ليس لديك حساب ؟":"You don't have an account ?"}</span><Link to={"/register"} className="text-main fw-bold "> {i18next.t('signup')} </Link></div>
      </div>
     </div>
    </>
  );
}

export default Login