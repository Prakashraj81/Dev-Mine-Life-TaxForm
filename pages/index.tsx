import React, { useState, useEffect } from "react";
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import Head from 'next/head'
import FullLayout from '../components/layouts/full/FullLayout';
import BlankLayout from '../components/layouts/blank/BlankLayout';
import BasicInformation from './basic-information/index';
import Login from './auth/login';


export default function Index({ preview }) {
  let [Authkey, setAuthkey] = useState(0);
  let sessionValue = 0;
  let value;
  useEffect(() => {
    const Loginvalue = sessionStorage.getItem('user_login');
    const auth_key = localStorage.getItem("mine_life_auth_key");
    if(Loginvalue !== null && auth_key !== null){
      value = atob(Loginvalue);   
      setAuthkey(1);
    }   
    else{
      setAuthkey(0);
    } 
  }, [Authkey]);
  return (
    <>
      {Authkey ?
        <>
          <FullLayout children={preview}>
            <PageContainer title="Dashboard" description="Dashboard">
              <BasicInformation />
            </PageContainer>
          </FullLayout>
        </>
        :
        <>
          <BlankLayout>
            <PageContainer title="Login" description="Login">
              <Box>
                <Login />
              </Box>
            </PageContainer>
          </BlankLayout>
        </>
      }
    </>
  )
}
