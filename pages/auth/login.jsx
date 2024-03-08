"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment, IconButton, Input, FormControl, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';

export default function Login(props) {
  let [UserName, setUserName] = useState("");
  let [Password, setPassword] = useState("");

  let [isValidEmail, setisValidEmail] = useState(true);
  let [LoginError, setLoginError] = useState(false);
  let [ShowLoader, setShowLoader] = useState(false);
  let [UserNameError, setUserNameError] = useState(false);
  let [PasswordError, setPasswordError] = useState(false);
  let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  //All input validation check and handling function
  const inputHandlingFunction = (event) => {
    let inputId = event.currentTarget.id;
    let inputValue = event.target.value;
    if (inputId === "UserName") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setisValidEmail(emailPattern.test(inputValue));
      setUserName(inputValue);
      setUserNameError(false);
    }
    else {
      setPassword(inputValue);
      setPasswordError(false);
    }
    setisSumbitDisabled(false);
  }

  //Submit API function 
  const router = useRouter();
  const onSubmit = async () => {
    setShowLoader(true);
    let defaultValues = {
      UserName: UserName,
      Password: Password,
    };

    if (defaultValues.UserName === "") {
      setUserNameError(true);
      isSumbitDisabled = true;
    }
    if (defaultValues.Password === "") {
      setPasswordError(true);
      isSumbitDisabled = true;
    }

    let formData = new FormData();
    formData.append('email', defaultValues.UserName);
    formData.append('password', defaultValues.Password);

    //Api setup
    if (isSumbitDisabled !== true) {
      axios.post("https://minelife-api.azurewebsites.net/user_login", formData)
        .then(response => {
          let encode_auth_key = btoa(response.data.auth_key);
          let encode_login = btoa(response.data.is_authenticated);
          sessionStorage.setItem('auth_key', encode_auth_key);
          sessionStorage.setItem('Login', encode_login);
          setLoginError(false);
          setShowLoader(false);
          router.push(`/basic-information`);
        })
        .catch(error => {
          setLoginError(true);
          setShowLoader(false);
          console.error('Error:', error);
        });
    }
    else {
      setisSumbitDisabled(true);
      setShowLoader(false);
    }
  }

  //Password hide / show
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };







  return (
    <>
      <Header />
      <div className="login-form-wrapper py-14">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <div className="page-heading">
              <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                ログイン
              </p>
            </div>
          </div>
          <div className="page-description py-8">
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              登録済みのメールアドレスでログインして下さい
            </p>
          </div>
          <div className="login-forms">
            <form action="#" method="POST">
              <>
                {LoginError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">IDまたはパスワードが違います</Alert>
                  </Stack>
                )}
              </>
              <>
                {ShowLoader && (
                  <BackdropLoader ShowLoader={ShowLoader} />
                )}
              </>
              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label className="form-label">
                    メールアドレス
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="UserName"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    onChange={inputHandlingFunction}
                    value={UserName}
                  />
                  {UserNameError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                  {isValidEmail ? null : <p className="text-red-500 mt-2" role="alert">形式が違います</p>}
                </div>
              </div>

              <div className="password-details mb-7">
                <div className="label w-full inline-block">
                  <label className="form-label">
                    パスワード
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    id="Password"
                    onChange={inputHandlingFunction}
                    value={Password}
                  />
                  <div className="py-2 mt-2">
                    <InputAdornment>
                      <IconButton id="Icon" onClick={handleTogglePassword} >
                        {showPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                      </IconButton>
                      <label className="text-sm" onClick={handleTogglePassword}>パスワードを表示する</label>
                    </InputAdornment>
                  </div>
                  {PasswordError && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                </div>
              </div>

              <div className="login-btn pt-10 text-center">
                <button
                  onClick={onSubmit}
                  type="button"
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    ログイン
                  </span>
                </button>
              </div>
              <div className="text-center">
                <div className="mt-3">
                  <Link href="/auth/forget-password">
                    <span className="text-xs text-black font-medium">
                      パスワードを忘れた方
                    </span>
                  </Link>
                </div>
                <div className="mt-7">
                  <p className="text-sm text-black font-semibold">
                    はじめてご利用の方
                  </p>
                </div>
              </div>
              <div className="register-btn pt-10 text-center">
                <Link href="/auth/register">
                  <button className="bg-white border-2 border-primary-gray rounded px-7 py-2">
                    <span className="text-primary-gray text-sm font-medium">
                      会員登録
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

Login.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};


