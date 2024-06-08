import React, { useState, useEffect } from "react";
import BlankLayout from '../../../admin-components/layouts/blank/BlankLayout';
import PageContainer from '../../../admin-components/container/PageContainer';
import Logo from '../../../admin-components/layouts/full/shared/logo/Logo';
import {
  Grid,
  Box,
  Card,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Alert,
  Backdrop,
  Checkbox,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '../../../admin-components/forms/theme-elements/CustomTextField';
import BackdropLoader from '../../../components/loader/backdrop-loader';

const AdminLogin = () => {
  let [UserName, setUserName] = useState("");
  let [Password, setPassword] = useState("");

  let [isValidEmail, setisValidEmail] = useState(true);
  let [checkValidEmail, setcheckValidEmail] = useState(false);
  let [LoginError, setLoginError] = useState(false);
  let [ShowLoader, setShowLoader] = useState(false);
  let [UserNameError, setUserNameError] = useState(false);
  let [PasswordError, setPasswordError] = useState(false);
  let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

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

  const validateEmail = async (Email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(Email)) {
        try {
            const params = { email: Email };
            const response = await axios.get('https://minelife-api.azurewebsites.net/admin/check_admin_email', { params });
            if (response.status === 200 && response.data.message === "Admin Not Exist") {
                setUserNameError(false);
                setcheckValidEmail(true);
                setisSumbitDisabled(true);
                isSumbitDisabled = true;
            }
            else if (response.status === 208 && response.data.error.message === "Admin Already Exist") {
                setUserNameError(false);
                setcheckValidEmail(false);
                setisSumbitDisabled(false);
                isSumbitDisabled = false;
            }
            else {
                setUserNameError(false);
                setcheckValidEmail(true);
                setisSumbitDisabled(true);
                isSumbitDisabled = true;
                setShowLoader(false);
            }            
        } catch (error) {
            setcheckValidEmail(true);
            setisSumbitDisabled(true);
            isSumbitDisabled = true;
            setShowLoader(false);
            console.error('Error:', error);
        }
    } else {
      setcheckValidEmail(true);
    }
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
    else if (defaultValues.Password === "") {
      setPasswordError(true);
      isSumbitDisabled = true;
    }  
    else if (defaultValues.UserName !== "") {
      await validateEmail(defaultValues.UserName);
    }

    //Api setup
    if (isSumbitDisabled !== true) {
      let formData = new FormData();
      formData.append('email', defaultValues.UserName);
      formData.append('password', defaultValues.Password);
      try {
        const response = await axios.post('https://minelife-api.azurewebsites.net/admin/login', formData);
        if (response.status === 200 && response.data.is_authenticated === true) {
          let encode_auth_key = btoa(response.data.auth_key);
          let encode_login = btoa(response.data.is_authenticated);
          //let encode_name = btoa(response.data.is_authenticated);
          sessionStorage.setItem('admin_auth_key', encode_auth_key);
          sessionStorage.setItem('admin_user_login', encode_login);
          //sessionStorage.setItem('admin_user_name', encode_name);
          setLoginError(false);
          setShowLoader(false);
          router.push(`/admin/pages/dashboard`);
        }
        else if(response.status === 401 && response.data.error.message === "Authentication Failure"){
          setLoginError(true);
          setShowLoader(false);
        }
        else {
          setLoginError(true);
          setShowLoader(false);
        }
      } catch (error) {
        setLoginError(true);
        setShowLoader(false);
        console.error('Error:', error);
      }
    }
    else {
      setShowLoader(false);
    }
  }

  //Password hide / show
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <>
      {ShowLoader && (
      <BackdropLoader ShowLoader={ShowLoader} />
    )}
    <PageContainer title="Mine life admin-login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Box>  
                  {checkValidEmail && (
                      <Stack className="pb-0" sx={{ width: '100%' }} spacing={2}>
                          <Alert severity="error">あなたのメールアドレスは無効です!</Alert>
                      </Stack>
                  )}  
                  {LoginError && (
                    <Stack className="pb-0" sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">IDまたはパスワードが違います</Alert>
                    </Stack>
                  )}                                              
              </Box>
              <Stack>
                <Box mt="20px">
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    fontSize={14}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                  >
                    Username
                  </Typography>
                  <CustomTextField onChange={inputHandlingFunction} value={UserName} id="UserName" fontSize={12} fontWeight={500} variant="outlined" fullWidth />
                  {UserNameError && (
                    <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>
                <Box mt="20px">
                  <Typography
                    variant="subtitle1"
                    fontSize={14}
                    fontWeight={500}
                    component="label"
                    htmlFor="Password"
                    mb={0}
                  >
                    Password
                  </Typography>
                  <CustomTextField onChange={inputHandlingFunction} value={Password} id="Password" type={showPassword ? 'text' : 'password'} fontSize={14} fontWeight={500} variant="outlined" fullWidth />
                  <Box className="py-2 mt-2">
                    <InputAdornment>
                      <IconButton id="Icon" onClick={handleTogglePassword} >
                        {showPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                      </IconButton>
                      <Typography component="label" fontWeight={500} fontSize={12} onClick={handleTogglePassword}>パスワードを表示する</Typography>
                    </InputAdornment>
                  </Box>
                  {PasswordError && (
                    <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                  )}
                </Box>
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  my={2}
                >
                  <Typography
                    className="text-blue-500 hover:underline"
                    component={Link}
                    href="/admin/auth/forget-password"
                    fontWeight={500}
                    fontSize={12}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    Forgot Password ?
                  </Typography>
                </Stack>
              </Stack>
              <Box mb="15px">
                <Button
                  className="bg-primary-color text-white hover:bg-primary-color"
                  fontSize={12}
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={onSubmit}
                >
                  <Typography fontWeight={500} fontSize={14}>Sign In</Typography>
                </Button>                
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    </>
  );
};
export default AdminLogin;

