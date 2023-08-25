import type { ReactElement } from 'react';
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
  useEffect(() => {
    sessionValue = Number(sessionStorage.getItem('Login'));
    if (sessionValue) {
      window.history.replaceState({}, document.title, window.location.pathname);
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

// Index.getLayout = function getLayout(page: ReactElement) {
//   return <BlankLayout>{page}</BlankLayout>;
// };