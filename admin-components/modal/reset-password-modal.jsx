import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const PasswordResetModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="password-reset-title"
      aria-describedby="password-reset-description"
    >
      <Box sx={style}>
        <Typography id="password-reset-title" variant="h6" component="h2">
          パスワードが正常にリセットされました
        </Typography>
        <Typography id="password-reset-description" sx={{ mt: 2 }}>
          パスワードは正常にリセットされました。新しいパスワードでログインできるようになります。
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          ログインに移動
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordResetModal;
