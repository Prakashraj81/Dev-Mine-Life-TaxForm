import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Grid, Box, Card, Typography, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment, IconButton, Input, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Margin, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../../../admin-components/forms/theme-elements/CustomTextField';
import BlankLayout from '../../../admin-components/layouts/blank/BlankLayout';
import PageContainer from '../../../admin-components/container/PageContainer';
import Logo from '../../../admin-components/layouts/full/shared/logo/Logo';
import BackdropLoader from '../../../components/loader/backdrop-loader';
import PasswordResetModal from '../../../admin-components/modal/reset-password-modal';
import { tr } from 'date-fns/locale';
import { set } from 'date-fns';

const ForgetPassword = () => {
    let [Email, setEmail] = useState("");
    let [OTP, setOTP] = useState("");
    let [NewPassword, setNewPassword] = useState("");
    let [ConfirmPassword, setConfirmPassword] = useState("");

    let [isValid, setIsValid] = useState(false);
    let [AttemptMessage, setAttemptMessage] = useState("");
    let [PasswordValidation, setPasswordValidation] = useState(false);
    let [OTPValidation, setOTPValidation] = useState(false);
    let [EmailError, setEmailError] = useState(false);
    let [OTPError, setOTPError] = useState(false);
    let [NewPasswordError, setNewPasswordError] = useState(false);
    let [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
    let [ShowPasswordInputs, setShowPasswordInputs] = useState(false);
    let [ShowLoader, setShowLoader] = useState(false);
    let [showPassword, setShowPassword] = useState(false);
    let [ShowResetPasswordModal, setShowResetPasswordModal] = useState(false);

    //Password hide / show
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const router = useRouter();  
    const GoToLogin = () => {
        setShowResetPasswordModal(false);        
        router.push(`/admin/auth/login`);
    };

    const onChange = (event) => {
        let Id = event.currentTarget.id;
        let value = event.target.value;
        if (Id === "Email") {
            setEmail(value);
            setEmailError(false);
        }
        else if (Id === "OTP") {
            setOTP(value);
            setOTPError(false);
            setOTPValidation(false);
        }
        else if (Id === "NewPassword") {
            setNewPassword(value);
            setNewPasswordError(false);
            setPasswordValidation(false);
        }
        else {
            setConfirmPassword(value);
            setConfirmPasswordError(false);
            setPasswordValidation(false);
        }
        setIsValid(false);
    }

    const validateEmail = async (Email) => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (emailRegex.test(Email)) {
            try {
                const params = { email: Email };
                const response = await axios.get('https://minelife-api.azurewebsites.net/admin/check_admin_email', { params });
                if (response.status === 200) {
                    setEmailError(false);
                    setIsValid(true);
                    setShowLoader(false);
                }
                else if (response.status === 208) {
                    setEmailError(false);
                    setIsValid(false);
                    await forgetPassword(Email);
                }
                else {
                    setEmailError(false);
                    setIsValid(true);
                }
                setShowLoader(false);
            } catch (error) {
                setIsValid(false);
                setShowLoader(false);
                console.error('Error:', error);
            }
        } else {
            setIsValid(true);
            setShowLoader(false);
        }
    }

    const forgetPassword = async (Email) => {
        try {
            const params = { email: Email };
            const response = await axios.get('https://minelife-api.azurewebsites.net/admin/forgot_password', { params });
            if (response.status === 200) {
                setEmailError(false);
                setIsValid(false);
                setShowPasswordInputs(true);
            }
            else {
                setEmailError(false);
                setIsValid(true);
                setShowPasswordInputs(false);
            }
            setShowLoader(false);
        } catch (error) {
            setIsValid(true);
            setShowLoader(false);
            setShowPasswordInputs(false);
            console.error('Error:', error);
        }
    }

    const onSubmit = async () => {
        setShowLoader(true);
        if (ShowPasswordInputs === false) {
            if (Email === "") {
                setEmailError(true);
            }
            else{
                await validateEmail(Email);
            }            
        }
        else {
            if (OTP === "") {
                setOTPError(true);
            }
            else if (NewPassword === "") {
                setNewPasswordError(true);
            }
            else if (ConfirmPassword === "") {
                setConfirmPasswordError(true);
            }
            else if (NewPassword != ConfirmPassword) {
                setPasswordValidation(true);
            }
            else {
                setEmailError(false);
                setOTPError(false);
                setNewPasswordError(false);
                setConfirmPasswordError(false);
                setPasswordValidation(false);
                let formData = new FormData();
                formData.append('email', Email);
                formData.append('new_password', NewPassword);
                formData.append('pwd_code', OTP);
                try{
                    const response = await axios.post('https://minelife-api.azurewebsites.net/admin/reset_password', formData);
                    if(response.status === 200){
                        setShowLoader(false);
                        setShowResetPasswordModal(true);
                    }
                }catch(error){
                    if(error.response.status === 412 && error.response.data.error.message === "Invalid OTP. '2' more attempts remaining."){
                        setAttemptMessage("無効な OTP。残りの試行回数は「2」です。");
                        setOTPValidation(true);                        
                    }
                    else if(error.response.status === 412 && error.response.data.error.message === "Invalid OTP. '1' more attempts remaining."){
                        setAttemptMessage("無効な OTP。残りの試行回数は「1」です。");
                        setOTPValidation(true);
                    }
                    else if(error.response.status === 412 && error.response.data.error.message === "Invalid OTP. 3 Attempts exceeded. Your account is Locked. Details are sent to your email"){
                        setAttemptMessage("無効な OTP。試行回数が 3 回を超えました。あなたのアカウントはロックされています。詳細はメールに送信されます");
                        setOTPValidation(true);
                    }
                    setShowLoader(false);
                    console.error('Error:', error);
                }
            }
            setShowLoader(false);
        }
    }
    return (
        <>
            {ShowLoader && (
                <BackdropLoader ShowLoader={ShowLoader} />
            )}
            {ShowResetPasswordModal && (
                <PasswordResetModal open={ShowResetPasswordModal} handleClose={GoToLogin} />
            )}
            <PageContainer title="Forget password" description="Forget password">
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
                                    {isValid && (
                                        <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">あなたのメールアドレスは無効です。</Alert>
                                        </Stack>
                                    )}
                                    {PasswordValidation && (
                                        <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">パスワードと確認用パスワードが一致しません。</Alert>
                                        </Stack>
                                    )}
                                    {OTPValidation && (
                                        <Stack className="pb-5" sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">{AttemptMessage}</Alert>
                                        </Stack>
                                    )}
                                </Box>
                                <Box className="py-2">
                                    <Typography
                                        variant="subtitle1"
                                        fontSize={14}
                                        fontWeight={500}
                                        component="label"
                                        mb="5px"
                                    >
                                        Email address
                                    </Typography>
                                    <CustomTextField autoComplete="off" fontSize={12} fontWeight={500} id="Email" onChange={onChange} variant="outlined" fullWidth />
                                    {EmailError && (
                                        <Typography fontSize={12} fontWeight={500} className='text-red-500'>この項目は必須です</Typography>
                                    )}
                                </Box>
                                <Box>
                                    {ShowPasswordInputs && (
                                        <>
                                            <Box className="py-2">
                                                <Typography
                                                    variant="subtitle1"
                                                    component="label"
                                                    mb="5px"
                                                    fontSize={14}
                                                    fontWeight={500}
                                                >
                                                    OTP
                                                </Typography>
                                                <CustomTextField id='OTP' onChange={onChange} type='text' fontSize={12} fontWeight={500} variant="outlined" fullWidth />
                                                {OTPError && (
                                                    <Typography fontSize={12} fontWeight={500} className='text-red-500'>この項目は必須です</Typography>
                                                )}
                                            </Box>
                                            <Box className="py-2">
                                                <Typography
                                                    variant="subtitle1"
                                                    component="label"
                                                    mb="5px"
                                                    fontSize={14}
                                                    fontWeight={500}
                                                >
                                                    New Password
                                                </Typography>
                                                <CustomTextField id='NewPassword' onChange={onChange} type={showPassword ? 'text' : 'password'} fontSize={12} fontWeight={500} variant="outlined" fullWidth />
                                                {NewPasswordError && (
                                                    <Typography fontSize={12} fontWeight={500} className='text-red-500'>この項目は必須です</Typography>
                                                )}
                                            </Box>
                                            <Box className="py-2">
                                                <Typography
                                                    variant="subtitle1"
                                                    fontSize={14}
                                                    fontWeight={500}
                                                    component="label"
                                                    mb="5px"
                                                >
                                                    Confirm password
                                                </Typography>
                                                <CustomTextField id='ConfirmPassword' onChange={onChange} type={showPassword ? 'text' : 'password'} fontSize={12} fontWeight={500} variant="outlined" fullWidth />
                                                {ConfirmPasswordError && (
                                                    <Typography fontSize={12} fontWeight={500} className='text-red-500'>この項目は必須です</Typography>
                                                )}
                                            </Box>
                                            <Box className="py-2 mt-2">
                                                <InputAdornment>
                                                    <IconButton id="Icon" onClick={handleTogglePassword} >
                                                        {showPassword ? <Visibility style={{ width: '18px', height: '18px' }} /> : <VisibilityOff style={{ width: '18px', height: '18px' }} />}
                                                    </IconButton>
                                                    <Typography component="label" fontWeight={500} fontSize={12} onClick={handleTogglePassword}>パスワードを表示する</Typography>
                                                </InputAdornment>
                                            </Box>
                                        </>
                                    )}
                                </Box>
                                <Box className="w-full flex justify-start pb-4 pt-6">
                                    <Button
                                        className="bg-blue-500 border border-blue-500 text-white"
                                        size="medium"
                                        variant="contained"
                                        component={Link}
                                        href='/admin/auth/login'
                                    >
                                        <Typography fontWeight={500} fontSize={14}>Cancel</Typography>
                                    </Button>
                                    {ShowPasswordInputs ? 
                                    <>
                                        <Button
                                        className="bg-primary-color border border-primary-color text-white"
                                        size="medium"
                                        variant="contained"
                                        onClick={onSubmit}
                                        sx={{ marginLeft: '25px' }}
                                    >
                                        <Typography fontWeight={500} fontSize={14}>Submit</Typography>
                                    </Button>
                                    </>                                    
                                    :
                                    <Button
                                        className="bg-primary-color border border-primary-color text-white"
                                        size="medium"
                                        variant="contained"
                                        onClick={onSubmit}
                                        sx={{ marginLeft: '25px' }}
                                    >
                                        <Typography fontWeight={500} fontSize={14}>Get OTP</Typography>
                                    </Button>
                                    }
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </>
    );
};
export default ForgetPassword;

