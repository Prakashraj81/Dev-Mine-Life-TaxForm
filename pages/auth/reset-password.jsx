/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Button, Typography } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';
import CustomInput from "../../components/inputbox-icon/custom-input";

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
    let data;  
    if (new_password === "") {
      setnew_password_error(true);
      isSumbitDisabled = true;
      setisSumbitDisabled(true);
    }
    if (confirm_password === "") {
      setconfirm_password_error(true);
      isSumbitDisabled = true;
      setisSumbitDisabled(true);
    }
    if (pwd_code === "") {
      setpwd_code_error(true);
      isSumbitDisabled = true;
      setisSumbitDisabled(true);
    }
    if(new_password !== confirm_password){
      setPasswordCheckError(true);
      isSumbitDisabled = true;
      setisSumbitDisabled(true);
    }
    
    if(isSumbitDisabled === false){
      Email = router.query.email;
      Email = atob(Email);
      try {    
        setShowLoader(true);    
        const formData = new FormData();
        formData.append('email', Email);
        formData.append('new_password', new_password);
        formData.append('pwd_code', pwd_code);

        const response = await fetch(`https://minelife-api.azurewebsites.net/reset_password`, {
          method: 'POST',
          body: formData
        });
        data = await response.json();
        if(!response.ok) throw new Error(data);

        if (response.ok) {
          setShowLoader(false);
          router.push('/auth/register-complete');
        }
        else {
          setShowLoader(false);
        }
      } catch (error) {
        setShowLoader(false);
        console.error('Error:', data.error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <Box className="forget-password-form-wrapper py-12">
        <Box className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <Box className="page-heading">
              <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                メールアドレスの確認
              </Typography>
            </Box>
          </Box>
          <Box className="page-description py-8">
            <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              入力いただいたメールアドレス宛に６桁の認証コードを送信しました。
            </Typography>
            <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium mt-1">
              認証コードを入力して下さい。
            </Typography>
          </Box>
          <Box className="login-forms">
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
                  <CustomInput type={showPassword ? 'text' : 'password'} id={"new_password"} onChange={handleInput} value={new_password} error={new_password_error} />
                  <Box className="py-2 mt-2">
                    <InputAdornment>
                      <IconButton id="new_password" onClick={handleTogglePassword} >
                        {showPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                      </IconButton>
                      <Typography fontSize={14} component={"label"} className="text-sm" onClick={handleTogglePassword}>パスワードを表示する</Typography>
                    </InputAdornment>
                  </Box>                
                  {new_password_error && (
                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>                

                <Box className="label w-full inline-block mb-1">
                  <Typography className="form-label">
                    Confirm パスワード
                  </Typography>
                </Box>
                <>
                  <Box className="mb-5">                    
                    <CustomInput type={showConfirmPassword ? 'text' : 'password'} id={"confirm_password"} onChange={handleInput} value={confirm_password} error={confirm_password_error} />
                  <Box className="py-2 mt-2">
                    <InputAdornment>
                      <IconButton id="confirm_password" onClick={handleTogglePassword} >
                        {showConfirmPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                      </IconButton>
                      <Typography fontSize={14} component={"label"} className="text-sm" onClick={handleTogglePassword}>パスワードを表示する</Typography>
                    </InputAdornment>
                  </Box>          
                    {confirm_password_error && (
                      <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                    )}
                  </Box>                  

                  
                  <Box className="label w-full inline-block mb-1">
                    <Typography className="form-label">
                      認証コード
                    </Typography>
                  </Box>
                  <Box className="mb-5">                    
                    <CustomInput type={'text'} id={"pwd_code"} onChange={handleInput} value={pwd_code} error={pwd_code_error} />
                    {pwd_code_error && (
                      <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                    )}
                  </Box>                 

                </>
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
                    次へ
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

OtpVerification.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
