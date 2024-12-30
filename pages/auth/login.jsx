"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment, IconButton, Input, FormControl, Button, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';
import CustomInput from "../../components/inputbox-icon/custom-input";

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
  let [AlertMessage, setAlertMessage] = useState("IDまたはパスワードが違います");

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
    setLoginError(false);
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
      try {
        const response = await axios.post('https://minelife-api.azurewebsites.net/user_login', formData);
        if (response.status === 200) {
          let encode_auth_key = btoa(response.data.auth_key);
          let encode_login = btoa(response.data.is_authenticated);
          localStorage.setItem('mine_life_auth_key', encode_auth_key);
          localStorage.setItem('user_login', encode_login);
          setLoginError(false);
          setShowLoader(false);
          router.push(`/basic-information`);
        }
        else {
          setLoginError(true);
          setShowLoader(false);
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          setAlertMessage("Server error.");
          setLoginError(true);
        }
        else if (error.response.data.error.code === 'InternalServerError') {
          setAlertMessage("Internal server error.");
          setLoginError(true);
        }
        else if (error.response.data.error.message === "Authentication Failure") {
          setAlertMessage("IDまたはパスワードが違います");
          setLoginError(true);
        }
        setShowLoader(false);
      }
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
      <Box className="login-form-wrapper py-14">
        <Box className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <Box className="page-heading">
              <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                ログイン
              </Typography>
            </Box>
          </Box>
          <Box className="page-description py-8">
            <Typography fontSize={14} component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              登録済みのメールアドレスでログインして下さい
            </Typography>
          </Box>
          <Box className="login-forms">
            <form action="#" method="POST">
              <>
                {LoginError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{AlertMessage}</Alert>
                  </Stack>
                )}
              </>
              <>
                {ShowLoader && (
                  <BackdropLoader ShowLoader={ShowLoader} />
                )}
              </>
              <Box className="username-details mb-7">
                <Box className="label w-full inline-block">
                  <Typography component={"label"} className="form-label">
                    メールアドレス
                  </Typography>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={"text"} id={"UserName"} onChange={inputHandlingFunction} value={UserName} error={UserNameError} />
                  {UserNameError && (
                    <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                  {isValidEmail ? null : <Typography component={"p"} className="text-red-500 mt-2" role="alert">形式が違います</Typography>}
                </Box>
              </Box>

              <Box className="password-details mb-7">
                <Box className="label w-full inline-block">
                  <Typography component={"label"} className="form-label">
                    パスワード
                  </Typography>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={showPassword ? 'text' : 'password'} id={"Password"} onChange={inputHandlingFunction} value={Password} error={PasswordError} />
                  <Box className="py-2 mt-2">
                    <InputAdornment>
                      <IconButton id="Icon" onClick={handleTogglePassword} >
                        {showPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                      </IconButton>
                      <Typography fontSize={12} component={"label"} className="text-sm" onClick={handleTogglePassword}>パスワードを表示する</Typography>
                    </InputAdornment>
                  </Box>
                  {PasswordError && (
                    <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>
              </Box>

              <Box className="login-btn pt-3 text-center">
                <Box>
                  <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={false}
                    variant="contained"
                    sx={{
                      width: 'auto',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                      },
                      borderRadius: '3px',
                      paddingLeft: 3,
                      paddingRight: 3,
                      py: 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Typography component={"span"} className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                      ログイン
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box className="text-center">
                <Box className="mt-3">
                  <Link href="/auth/forget-password">
                    <span className="text-xs text-black font-medium">
                      パスワードを忘れた方
                    </span>
                  </Link>
                </Box>
                <Box className="mt-5">
                  <Typography component={"p"} className="text-sm text-black font-semibold">
                    はじめてご利用の方
                  </Typography>
                </Box>
              </Box>
              <Box className="register-btn pt-7 text-center">
                <Button
                  component={Link}
                  href="/auth/register"
                  type="button"
                  variant="contained"
                  sx={{
                    width: 'auto',
                    backgroundColor: 'white',
                    color: 'gray',
                    border: '1.6px solid',
                    borderColor: 'gray',
                    '&:hover': {
                      backgroundColor: 'lightgray',
                      color: 'gray',
                    },
                    borderRadius: '3px',
                    paddingLeft: 3,
                    paddingRight: 3,
                    py: 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography component={"span"} className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    会員登録
                  </Typography>
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

Login.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};


