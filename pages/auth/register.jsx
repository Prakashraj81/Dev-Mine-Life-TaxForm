"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import BackdropLoader from "../../components/loader/backdrop-loader";

export default function Register(props) {
  let [Name, setName] = useState("");
  let [PhoneNo, setPhoneNo] = useState("");
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  let [ConfirmPassword, setConfirmPassword] = useState("");

  let [isValidEmail, setisValidEmail] = useState(true);
  let [RegisterError, setRegisterError] = useState(false);
  let [ShowLoader, setShowLoader] = useState(false);
  let [NameError, setNameError] = useState(false);
  let [PhoneNoError, setPhoneNoError] = useState(false);
  let [EmailError, setEmailError] = useState(false);
  let [PasswordError, setPasswordError] = useState(false);
  let [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
  let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
  let [SuccessToast, setSuccessToast] = useState(false);
  let [ErrorToast, setErrorToast] = useState(false); 

  //All input validation check and handling function
  const inputHandlingFunction = (event) => {
    let inputId = event.currentTarget.id;
    let inputValue = event.target.value;
    if (inputId === "Name") {
      setName(inputValue);
      setNameError(false);
    }
    else if (inputId === "PhoneNo") {
      setPhoneNo(inputValue);
      setPhoneNoError(false);
    }
    else if (inputId === "Email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setisValidEmail(emailPattern.test(inputValue));
      setEmail(inputValue);
      setEmailError(false);
    }
    else if (inputId === "Password") {
      setPassword(inputValue);
      setPasswordError(false);
    }
    else {
      setConfirmPassword(inputValue);
      setConfirmPasswordError(false);
    }
    setisSumbitDisabled(false);
  }

  //Submit API function 
  const router = useRouter();
  const onSubmit = async () => {
    setShowLoader(true);
    if (Name === "") {
      setNameError(true);
      isSumbitDisabled = true;
    }
    if (PhoneNo === "") {
      setPhoneNoError(true);
      isSumbitDisabled = true;
    }
    if (Email === "") {
      setEmailError(true);
      isSumbitDisabled = true;
    }
    if (Password === "") {
      setPasswordError(true);
      isSumbitDisabled = true;
    }
    if (Password !== ConfirmPassword) {
      setRegisterError(true);
      isSumbitDisabled = true;
    }

    let formData = new FormData();
    formData.append('name', Name);
    formData.append('phone', PhoneNo);
    formData.append('email', Email);
    formData.append('password', Password);

    const params = {
      email: Email
    };

    //User email check Api
    if (isSumbitDisabled !== true) {   
      axios.get("https://minelife-api.azurewebsites.net/check_user_email", { params })
        .then(response => {
          if(response.data.message === "User Not Exist"){
            register_user(formData);
          }    
          else{
            notifyError("User Already Exist");   
            setRegisterError(true);
            setRegisterError(true);
            setShowLoader(false);
          }      
        })
        .catch(error => {
          notifyError("User not created.");          
          setRegisterError(true);
          setShowLoader(false);
          console.error('Error:', error);
        });
    }
    else {
      notifyError("User not created.");  
      setisSumbitDisabled(true);
      setShowLoader(false);
    }
  };  

  //User register Api
  const register_user = async(formData) => {    
    if(formData !== null){
      axios.post("https://minelife-api.azurewebsites.net/register_user", formData)
      .then(response => {
        notifySuccess("User create successful.");
        console.log(response.data.message);
        setRegisterError(false);
        setShowLoader(false);
        router.push(`/auth/login`);
      })
      .catch(error => {
        notifyError("User not created.");          
        setRegisterError(true);
        setShowLoader(false);
        console.error('Error:', error);
      });
    }    
    else{
      notifyError("formData is empty.");  
      setisSumbitDisabled(true);
      setShowLoader(false);
    }
  }

  return (
    <>
      <Header />
      <div className="register-form-wrapper py-14">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="register-forms">
            <form action="#" method="POST">
              <>
                {RegisterError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">IDまたはパスワードが違います</Alert>
                  </Stack>
                )}
              </>
              <>
                {ShowLoader && (
                  <BackdropLoader ShowLoader={ShowLoader}/>
                )}
              </>
              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="Name" className="form-label">
                    お名前
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="Name"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    onChange={inputHandlingFunction}
                    value={Name}
                  />
                  {NameError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                </div>
              </div>

              <div className="phone-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="PhoneNo" className="form-label">
                    電話番号
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="PhoneNo"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    onChange={inputHandlingFunction}
                    value={PhoneNo}
                  />
                  {PhoneNoError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                </div>
                <div className="mt-1">
                  <p className="text-xs font-medium text-black">
                    ハイフン抜きで入力して下さい
                  </p>
                </div>
              </div>

              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="Email" className="form-label">
                    メールアドレス
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="Email"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    onChange={inputHandlingFunction}
                    value={Email}
                  />
                  {EmailError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                  {isValidEmail ? null : <p className="text-red-500 mt-2" role="alert">形式が違います</p>}
                </div>
              </div>

              <div className="password-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="Password" className="form-label">
                    パスワード
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="password"
                    id="Password"
                    className="form-control w-full bg-custom-gray rounded focus:outline-none h-12 pl-3"
                    onChange={inputHandlingFunction}
                    value={Password}
                  />
                  {PasswordError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                </div>
              </div>

              <div className="password-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="ConfirmPassword" className="form-label">
                    Confirm パスワード
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="password"
                    id="ConfirmPassword"
                    className="form-control w-full bg-custom-gray rounded focus:outline-none h-12 pl-3"
                    onChange={inputHandlingFunction}
                    value={ConfirmPassword}
                  />
                  {ConfirmPasswordError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                </div>
              </div>

              <div className="login-btn pt-10 text-center">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    Mine life 相続を始める
                  </span>
                </button>
              </div>
              <div className="text-center">
                <div className="mt-3">
                  <p>
                    <span className="text-xs text-black font-medium">
                      Mine life 相続に登録することで、
                      <Link href="/pages/terms-of-use" className="text-blue-600">
                        利用規約
                      </Link>
                      に同意したものとみなします。
                    </span>
                  </p>
                </div>
                <div className="mt-7">
                  <p className="text-sm text-black font-medium">
                    会員登録済みの方
                  </p>
                </div>
              </div>
              <div className="register-btn pt-10 text-center">
                <Link href="/auth/login">
                  <button className="bg-white border-2 border-primary-gray rounded px-7 py-2">
                    <span className="text-primary-gray text-sm font-medium">
                      ログイン
                    </span>
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


Register.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
