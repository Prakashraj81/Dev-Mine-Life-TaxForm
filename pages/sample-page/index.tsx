import type { ReactElement } from 'react';
import { Typography } from '@mui/material';
//import FullLayout from '../components/layouts/full/FullLayout';

const SamplePage = () => {
  return (
    <>
    <Typography className="font-bold tracking-2 text-2xl text-primary-color">This is a sample page</Typography>  
    </>
  );
};

export default SamplePage;
// SamplePage.getLayout = function getLayout(page: ReactElement) {
//   return <FullLayout>{page}</FullLayout>;
// };