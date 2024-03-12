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
    let Loginvalue = sessionStorage.getItem('user_login');
    let auth_key = sessionStorage.getItem('auth_key');
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
          <FullLayout>
            <PageContainer title="Dashboard" description="Dashboard">
              <Box>
                <BasicInformation />
              </Box>
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
