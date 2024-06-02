import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SessionExpiredModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="session-expired-title"
      aria-describedby="session-expired-description"
    >
      <Box sx={style}>
        <Typography id="session-expired-title" variant="h6" component="h2">
          Session Expired
        </Typography>
        <Typography id="session-expired-description" sx={{ mt: 2 }}>
          Your session has expired. Please log in again to continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Modal>
  );
};

export default SessionExpiredModal;
