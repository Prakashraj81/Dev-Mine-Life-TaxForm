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
      <div className="forget-password-form-wrapper py-32">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <div className="page-heading">
              <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                ユーザー登録が完了しました。
              </p>
            </div>
          </div>
          <div className="page-description py-8">
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                Mine life 相続をご利用いただきありがとうございます。
            </p>
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium my-1">
                ユーザー登録が完了しました。
            </p>
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                下記ログインページよりログイン後、相続税申告書の作成へとお進みください
            </p>
          </div>
          <div className="login-forms">
            <form action="#" method="POST">            
              <div className="login-btn pt-5 text-center">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                  ログインページへ
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

RegisterComplete.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
