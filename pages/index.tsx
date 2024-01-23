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
    let Loginvalue = sessionStorage.getItem('Login');
    value = atob(Loginvalue);    
    if(value === "true"){
      sessionValue = 1
    }
    else{
      sessionValue = 0;
    }
    setAuthkey(sessionValue);
  });
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
