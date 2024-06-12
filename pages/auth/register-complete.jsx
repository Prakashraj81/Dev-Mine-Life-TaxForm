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

export default function RegisterComplete() {
    const router = useRouter(); 
    const onSubmit = async () => {    
        router.push(`/auth/login`);
    };  

  return (
    <>
    <Header/>
      <Box className="forget-password-form-wrapper py-32">
        <Box className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <Box className="page-heading">
              <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                ユーザー登録が完了しました。
             </Typography>
            </Box>
          </Box>
          <Box className="page-description py-8">
            <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                Mine life 相続をご利用いただきありがとうございます。
           </Typography>
            <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium my-1">
                ユーザー登録が完了しました。
           </Typography>
            <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                下記ログインページよりログイン後、相続税申告書の作成へとお進みください
           </Typography>
          </Box>
          <Box className="login-forms">
            <form action="#" method="POST">            
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
                  ログインページへ
                  </Typography>
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
      <Footer/>
    </>
  );
}

RegisterComplete.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
