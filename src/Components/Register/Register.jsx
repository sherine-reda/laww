import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots  } from 'react-loader-spinner';
import { langContext } from "../../Context/LangContext";
import i18next from "i18next";

function Register() {
    const { Lang, setLang } = useContext(langContext);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    let validationSchema = Yup.object({
        name: Yup.string().min(3, Lang == "Ar"?" يرجى ادخال اسم لا يقل عن 3 احرف ":"name minlength is 3").max(50,Lang == "Ar"?"الاسم لا يزيد عن 50 احرف":"name maxlength is 15").required(Lang == "Ar"?"يرجى ادخال الاسم":'name is required'),
        email: Yup.string().email(Lang == "Ar"?" يرجى ادخال بريد الالكتروني صالح":"email pattern is invalid").required(Lang == "Ar"?" يجب ادخال بريد الالكتروني صالح":"email is required"),
        phone: Yup.string().matches(phoneRegex, Lang == "Ar"?" يرجى ادخال رقم جوال صحيح":"phone is invalid").required(Lang == "Ar"?" يرجى ادخال رقم جوال صحيح":'phone is required'),
        password: Yup.string().matches(/^[A-Z][A-Za-z0-9]{5,8}/, Lang == "Ar"?"  يجب أن تبدأ كلمة المرور بحرف كبير وتحتوي فقط على الأحرف أو الأرقام (0-9) وأن يتراوح مجموعها بين 6 و9 أحرف.":"password should start with uppercase letter & only contain letters (A-Z or a-z) or numbers (0-9) & be between 6 and 9 characters in total.")
        .required(Lang == "Ar"?" يرجى ادخال كلمه مرور":'password is required')
        .min(6).max(9),
        password_confirmation: Yup.string().oneOf([Yup.ref("password")], Lang == "Ar"?"كلمه المرور لا تطابق":"password-confirmation don't match the password").required(Lang == "Ar"?" يرجى اعاده ادخال كلمه المرور":'password_confirmation is required')
    })


    
    
    async function submitRegister(values) {
        setIsLoading(true);
        let { data } = await axios.post(`http://192.168.1.108/api/auth/register`, values).catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            });
            
        if (data.message === 'User successfully registered') {
            setIsLoading(false)
            navigate('/login')
        }
    }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
     <div className="container mt-5 py-5">
     <div className="py-5 mx-auto w-50">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h1 className="fs-4  mb-5 text-center">  {i18next.t('signup')}</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className={`mt-2`}>   {i18next.t('FullName')} :</label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            type="text"
            className="form-control"
          ></input>
          {formik.errors.name && formik.touched.name ? (
            <div className="text-danger font-bold mt-2 p-2">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email" className={`mt-2`} >
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

          <label htmlFor="password_confirmation" className={`mt-2`}>
          {i18next.t('password-confirmation')} :
          </label>
          <input
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password_confirmation"
            type="password"
            className="form-control"
          ></input>
          {formik.errors.password_confirmation && formik.touched.password_confirmation ? (
            <div className="text-danger font-bold mt-2 p-2">
              {formik.errors.password_confirmation}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone" className={`mt-2`}>
             {i18next.t('phone')} :
          </label>
          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            type="tel"
            className="form-control"
          ></input>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-danger font-bold mt-2 p-2">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          {isLoading ? (
            <button type="button" className="btn myBtn fw-bold mt-3 px-3 py-2">
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
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn myBtn fw-bold mt-3 px-3 py-2 bg-main text-white "
            >
                                   {i18next.t('signup')}

            </button>
          )}
        </form>
        <div className="mt-3 text-center"><span> {Lang=="Ar"?" لديك حساب ؟":"You have an account ?"}</span><Link to={"/login"} className="text-main fw-bold ">  {i18next.t('signin')}</Link></div>

      </div>
     </div>
    </>
  );
}

export default Register;
