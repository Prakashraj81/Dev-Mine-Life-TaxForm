/* eslint-disable react/prop-types */
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const PageLoader = ({ loading }) => {
  return (
    loading ? (
        <Backdrop open={loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
        </Backdrop>
    ) : null
  );
};

export default PageLoader;
