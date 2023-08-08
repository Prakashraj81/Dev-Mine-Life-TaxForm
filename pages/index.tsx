import type { ReactElement } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import Head from 'next/head'
import FullLayout from '../components/layouts/full/FullLayout';
import BasicInformation from './basic-information/index';

export default function Index({ preview }) {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <BasicInformation/>
      </Box>
    </PageContainer>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};