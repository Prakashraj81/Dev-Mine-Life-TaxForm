import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Typography } from '@mui/material';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';

export default function ForgetPassword() {  
  let [ForgetPasswordEmail, setForgetPasswordEmail] = useState("");
  let [Otp, setOtp] = useState("");
  let [isValidEmail, setisValidEmail] = useState(true);
  let [ShowLoader, setShowLoader] = useState(false);
  let [ForgetPasswordEmailError, setForgetPasswordEmailError] = useState(false);
  let [EmailCheckError, setEmailCheckError] = useState(false);

  const handleForgetPwdInput = (event) =>{
    setForgetPasswordEmailError(false);
    let inputVal = event.target.value;
    setForgetPasswordEmail(inputVal);
  }

  const handleOtpInput = (event) =>{
    let inputVal = event.target.value;
    setOtp(inputVal);
  }

  const onSubmit = async () => {    
    if (ForgetPasswordEmail !== "") {
      try{
        setShowLoader(true);
        const params = { email: ForgetPasswordEmail };
        const response = await axios.get('https://minelife-api.azurewebsites.net/check_user_email', {params});
        if(response.status !== 200){          
          setForgetPasswordEmailError(false);          
          await forgetpwd_user();
        }
        else{
          setShowLoader(false);
          setEmailCheckError(true);
        }     
      } catch (error){
        console.log("User not created.");   
        setShowLoader(false);
        setEmailCheckError(true);
        console.error('Error:', error);
      }         
    }
    else {
      setShowLoader(false);
      setForgetPasswordEmailError(true);
    }
  };

  const router = useRouter();
  const forgetpwd_user = async() => {
    try{      
      const params = { email: ForgetPasswordEmail };
      const response = await axios.get('https://minelife-api.azurewebsites.net/forgot_password', {params});
      if(response.status === 200){
        router.push(`/auth/reset-password?email=${btoa(ForgetPasswordEmail)}`);
      }
      else{
        setShowLoader(false);
        setEmailCheckError(true);
      }     
    } catch (error){
      console.log("User not created.");   
      setShowLoader(false);
      setEmailCheckError(true);
      console.error('Error:', error);
    }            
  }


  return (
    <>
    <Header/>
      <div className="forget-password-form-wrapper py-32">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <div className="page-heading">
              <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                メールアドレスの入力
              </p>
            </div>
          </div>
          <div className="page-description py-8">
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              会員登録に使用したメールアドレスを入力し、送信ボタンを押して下さい。
            </p>
          </div>
          <div className="login-forms">
            <form action="#" method="POST">
            <>
                {EmailCheckError && (
                  <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">User Not Exist</Alert>
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
                  <label htmlFor="ForgetPasswordEmail" className="form-label">
                    メールアドレス
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="email"
                    id="ForgetPasswordEmail"
                    onChange={handleForgetPwdInput}
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                    
                    value={ForgetPasswordEmail}
                    />
                    {ForgetPasswordEmailError && (
                      <p className="text-red-500" role="alert">この項目は必須です</p>
                    )}
                    {isValidEmail ? null : <p className="text-red-500 mt-2" role="alert">形式が違います</p>}
                </div>
              </div>             

              <div className="login-btn pt-10 text-center">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    パスワードのリセットメールを送信する
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

ForgetPassword.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
