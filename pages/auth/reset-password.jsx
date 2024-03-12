import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Typography } from '@mui/material';
import { InputAdornment, IconButton, Input, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';

export default function OtpVerification() {
  let [Email, setEmail] = useState("");
  let [new_password, setnew_password] = useState("");
  let [confirm_password, setconfirm_password] = useState("");
  let [pwd_code, setpwd_code] = useState("");
  let [ShowLoader, setShowLoader] = useState(false);
  let [OtpCheckError, setOtpCheckError] = useState(false);

  //Error state
  let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
  let [new_password_error, setnew_password_error] = useState(false);
  let [confirm_password_error, setconfirm_password_error] = useState(false);
  let [pwd_code_error, setpwd_code_error] = useState(false);
  let [PasswordCheckError, setPasswordCheckError] = useState(false);

  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInput = (event) => {
    let inputVal = event.target.value;
    let inputId = event.currentTarget.id;
    if (inputId === "new_password") {
      setnew_password(inputVal);
      setnew_password_error(false);      
    }
    else if (inputId === "confirm_password") {
      setconfirm_password(inputVal);
      setconfirm_password_error(false);
    }
    else {
      setpwd_code(inputVal);
      setpwd_code_error(false);
    }
    setisSumbitDisabled(false);
    setPasswordCheckError(false);
  }


  //Password hide / show
  const handleTogglePassword = (event) => {
    let showValue = event.currentTarget.id;
    if (showValue === "new_password") {
      setShowPassword(!showPassword);
    }
    else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };


  let router = useRouter();
  const onSubmit = async () => {    
    if (new_password === "") {
      setnew_password_error(true);
      setisSumbitDisabled(true);
    }
    else if (confirm_password === "") {
      setconfirm_password_error(true);
      setisSumbitDisabled(true);
    }
    else if (pwd_code === "") {
      setpwd_code_error(true);
      setisSumbitDisabled(true);
    }
    else if(new_password !== confirm_password){
      setPasswordCheckError(true);
      setisSumbitDisabled(true);
    }
    else {
      Email = router.query.email;
      Email = atob(Email);
      try {    
        setShowLoader(true);    
        const formData = new FormData();
        formData.append('email', Email);
        formData.append('new_password', new_password);
        formData.append('pwd_code', pwd_code);
        const response = await axios.post('https://minelife-api.azurewebsites.net/reset_password', formData);
        if (response.status === 200) {
          setShowLoader(false);
          router.push('/auth/register-complete');
        }
        else {
          setShowLoader(false);
        }
      } catch (error) {
        setShowLoader(false);
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="forget-password-form-wrapper py-32">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <div className="page-heading">
              <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                メールアドレスの確認
              </p>
            </div>
          </div>
          <div className="page-description py-8">
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              入力いただいたメールアドレス宛に６桁の認証コードを送信しました。
            </p>
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium mt-1">
              認証コードを入力して下さい。
            </p>
          </div>
          <div className="login-forms">
            <form action="#" method="POST">
              <>
                {OtpCheckError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">User Not Exist</Alert>
                  </Stack>
                )}
              </>
              <>
                {PasswordCheckError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">Your password is not matched.</Alert>
                  </Stack>
                )}
              </>
              <>
                {ShowLoader && (
                  <BackdropLoader ShowLoader={ShowLoader} />
                )}
              </>

                <Box className="label w-full inline-block mb-1">
                  <Typography className="form-label">
                    パスワード
                  </Typography>
                </Box>
                <Box className="mb-5">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control w-full mx-auto bg-custom-gray focus:outline-none border-0 rounded h-12 pl-3 focus:ring-0 hover:ring-0"
                    id="new_password"
                    onChange={handleInput}
                    value={new_password}
                    endAdornment={
                      <InputAdornment>
                        <IconButton
                          size="small"
                          id="new_password"
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {new_password_error && (
                    <p className="text-red-500" role="alert">この項目は必須です</p>
                  )}
                </Box>                

                <Box className="label w-full inline-block mb-1">
                  <Typography className="form-label">
                    Confirm パスワード
                  </Typography>
                </Box>
                <>
                  <Box className="mb-5">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control w-full mx-auto bg-custom-gray focus:outline-none border-0 rounded h-12 pl-3"
                      id="confirm_password"
                      onChange={handleInput}
                      value={confirm_password}
                      endAdornment={
                        <InputAdornment>
                          <IconButton
                            size="small"
                            id="confirm_password"
                            onClick={handleTogglePassword}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {confirm_password_error && (
                      <p className="text-red-500" role="alert">この項目は必須です</p>
                    )}
                  </Box>                  

                  
                  <Box className="label w-full inline-block mb-1">
                    <Typography className="form-label">
                      認証コード
                    </Typography>
                  </Box>
                  <Box className="mb-5">
                    <input
                      type="text"
                      id="pwd_code"
                      onChange={handleInput}
                      value={pwd_code}
                      className="form-control w-full mx-auto bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    />
                    {pwd_code_error && (
                      <p className="text-red-500" role="alert">この項目は必須です</p>
                    )}
                  </Box>                 

                </>
                <div className="login-btn pt-10 text-center">
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                      次へ
                    </span>
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

OtpVerification.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
