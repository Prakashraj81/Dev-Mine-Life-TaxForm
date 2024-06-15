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
import CustomInput from "../../components/inputbox-icon/custom-input";

export default function ForgetPassword() {
  let [ForgetPasswordEmail, setForgetPasswordEmail] = useState("");
  let [Otp, setOtp] = useState("");
  let [isValidEmail, setisValidEmail] = useState(true);
  let [ShowLoader, setShowLoader] = useState(false);
  let [ForgetPasswordEmailError, setForgetPasswordEmailError] = useState(false);
  let [EmailCheckError, setEmailCheckError] = useState(false);

  const handleForgetPwdInput = (event) => {
    setForgetPasswordEmailError(false);
    let inputVal = event.target.value;
    setForgetPasswordEmail(inputVal);
  }

  const handleOtpInput = (event) => {
    let inputVal = event.target.value;
    setOtp(inputVal);
  }

  const onSubmit = async () => {
    if (ForgetPasswordEmail !== "") {
      try {
        setShowLoader(true);
        const params = { email: ForgetPasswordEmail };
        const response = await axios.get('https://minelife-api.azurewebsites.net/check_user_email', { params });
        if (response.status !== 200) {
          setForgetPasswordEmailError(false);
          await forgetpwd_user();
        }
        else {
          setShowLoader(false);
          setEmailCheckError(true);
        }
      } catch (error) {
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
  const forgetpwd_user = async () => {
    try {
      const params = { email: ForgetPasswordEmail };
      const response = await axios.get('https://minelife-api.azurewebsites.net/forgot_password', { params });
      if (response.status === 200) {
        router.push(`/auth/reset-password?email=${btoa(ForgetPasswordEmail)}`);
      }
      else {
        setShowLoader(false);
        setEmailCheckError(true);
      }
    } catch (error) {
      console.log("User not created.");
      setShowLoader(false);
      setEmailCheckError(true);
      console.error('Error:', error);
    }
  }


  return (
    <>
      <Header />
      <Box className="forget-password-form-wrapper py-32">
        <Box className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <Box className="page-heading">
              <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                メールアドレスの入力
              </Typography>
            </Box>
          </Box>
          <Box className="page-description py-8">
            <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              会員登録に使用したメールアドレスを入力し、送信ボタンを押して下さい。
            </Typography>
          </Box>
          <Box className="login-forms">
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


              <Box className="username-details mb-7">
                <Box className="label w-full inline-block">
                  <Typography component={"label"} htmlFor="ForgetPasswordEmail" className="form-label">
                    メールアドレス
                  </Typography>
                </Box>
                <Box className="w-full inline-block mt-2">
                  <CustomInput type={"email"} id={"ForgetPasswordEmail"} onChange={handleForgetPwdInput} value={ForgetPasswordEmail} error={ForgetPasswordEmailError}/>
                  {ForgetPasswordEmailError && (
                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                  {isValidEmail ? null : <Typography component={"p"} fontSize={14} className="text-red-500 mt-2" role="alert">形式が違います</Typography>}
                </Box>
              </Box>

              <Box className="login-btn pt-10 text-center">
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
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    パスワードのリセットメールを送信する
                  </span>
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

ForgetPassword.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
