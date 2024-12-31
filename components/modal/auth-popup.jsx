/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

const AuthKeyPopup = ({ open }) => {
    const router = useRouter();

    const handleLoginRedirect = () => {
        sessionStorage.clear();
        router.push('/auth/login');
    };

    return (
        <Dialog open={open}>
            <Box className="py-4 px-2">
                <DialogTitle>認証が必要です。</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography className='tracking-2' component={"p"} fontSize={14}>セッションの有効期限が切れているか、セッションが無効です。</Typography>
                        <Typography className='tracking-2' lineHeight={3} component={"p"} fontSize={14}>もう一度ログインしてください。</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoginRedirect} color="primary" variant="contained">
                        ログインに移動
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AuthKeyPopup;
