"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { InputAdornment, IconButton, Input, FormControl, Button, Box, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../../components/header";
import Footer from "../../components/footer";
import CustomInput from "../../components/inputbox-icon/custom-input";
import CustomPhoneInput from "../../components/inputbox-icon/custom-phone-input";
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
  let [showPassword, setShowPassword] = useState(false);

  //Password hide / show
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9\b]+$/;
    if (!numericRegex.test(keyValue)) {
      e.preventDefault();
    }
  };

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
    if (ConfirmPassword === "") {
      setConfirmPasswordError(true);
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
      try {
        const params = { email: Email };
        const response = await axios.get('https://minelife-api.azurewebsites.net/check_user_email', { params });
        if (response.status === 200) {
          await register_user(formData);
        }
        else {
          console.log("User Already Exist");
          setRegisterError(true);
          setShowLoader(false);
        }
      } catch (error) {
        console.log("User not created.");
        setRegisterError(true);
        setShowLoader(false);
        console.error('Error:', error);
      }
    }
    else {
      console.log("User not created.");
      setisSumbitDisabled(true);
      setShowLoader(false);
    }
  };

  //User register Api
  const register_user = async (formData) => {
    if (formData !== null) {
      try {
        const response = await axios.post('https://minelife-api.azurewebsites.net/register_user', formData);
        if (response.status === 200) {
          setRegisterError(false);
          setShowLoader(false);
          router.push(`/auth/register-complete`);
          //router.push(`/auth/login`);
        }
        else {
          setLoginError(true);
          setShowLoader(false);
        }
      } catch (error) {
        setRegisterError(true);
        setShowLoader(false);
        console.error('Error:', error);
      }
    }
    else {
      console.log("formData is empty.");
      setisSumbitDisabled(true);
      setShowLoader(false);
    }
  }

  return (
    <>
      <Header />
      <Box className="register-form-wrapper py-14">
        <Box className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <Box className="register-forms">
            <form action="#" method="POST">
              <>
                {RegisterError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error"><Typography>IDまたはパスワードが違います</Typography></Alert>
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
                  <label htmlFor="Name" className="form-label">
                    お名前
                  </label>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={"text"} id={"Name"} onChange={inputHandlingFunction} value={Name} error={NameError}/>
                  {NameError && (
                    <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>
              </Box>

              <Box className="phone-details mb-7">
                <Box className="label w-full inline-block">
                  <label htmlFor="PhoneNo" className="form-label">
                    電話番号
                  </label>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomPhoneInput type={"text"} id={"PhoneNo"} onChange={inputHandlingFunction} onKeyPress={handleKeyPress} value={PhoneNo} error={PhoneNoError} />
                  {PhoneNoError && (
                    <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>
                <Box className="mt-1">
                  <Typography fontSize={14} component={"p"} className="text-xs font-medium text-black">
                    ハイフン抜きで入力して下さい
                  </Typography>
                </Box>
              </Box>

              <Box className="username-details mb-7">
                <Box className="label w-full inline-block">
                  <label htmlFor="Email" className="form-label">
                    メールアドレス
                  </label>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={"text"} id={"Email"} onChange={inputHandlingFunction} value={Email} error={EmailError}/>
                  {EmailError && (
                    <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                  {isValidEmail ? null : <Typography component={"p"} className="text-red-500 mt-2" role="alert">形式が違います</Typography>}
                </Box>
              </Box>

              <Box className="password-details mb-7">
                <Box className="label w-full inline-block">
                  <label htmlFor="Password" className="form-label">
                    パスワード
                  </label>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={showPassword ? 'text' : 'password'} id={"Password"} onChange={inputHandlingFunction} value={Password} error={PasswordError}/>
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

              <Box className="password-details mb-7">
                <Box className="label w-full inline-block">
                  <label htmlFor="ConfirmPassword" className="form-label">
                    Confirm パスワード
                  </label>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={showPassword ? 'text' : 'password'} id={"ConfirmPassword"} onChange={inputHandlingFunction} value={ConfirmPassword} error={ConfirmPasswordError} />
                  <Box className="py-2 mt-2">
                    <InputAdornment>
                      <IconButton id="Icon" onClick={handleTogglePassword} >
                        {showPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                      </IconButton>
                      <Typography fontSize={12} component={"label"} className="text-sm" onClick={handleTogglePassword}>パスワードを表示する</Typography>
                    </InputAdornment>
                  </Box>
                  {ConfirmPasswordError && (
                    <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>
              </Box>

              <Box className="login-btn pt-5 text-center">
                <Button
                  type="button"
                  onClick={onSubmit}
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
                  <Typography component={"span"} className="text-sm font-medium">
                    Mine life 相続を始める
                  </Typography>
                </Button>
              </Box>
              <Box className="text-center">
                <Box className="mt-3">
                  <Typography component={"p"}>
                    <Typography fontSize={14} component={"span"} className="text-xs text-black font-medium">
                      Mine life 相続に登録することで、
                      <Link href="/pages/terms-of-use" className="text-blue-600">
                        利用規約
                      </Link>
                      に同意したものとみなします。
                    </Typography>
                  </Typography>
                </Box>
                <Box className="mt-7">
                  <Typography fontSize={14} component={"p"} className="text-sm text-black font-medium">
                    会員登録済みの方
                  </Typography>
                </Box>
              </Box>
              <Box className="register-btn pt-7 text-center">
                <Button
                  component={Link}
                  href="/auth/login"
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
                  <Typography component={"span"} className="text-sm font-medium">
                    ログイン
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


Register.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
