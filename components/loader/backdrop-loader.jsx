/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackdropLoader({ShowLoader}) {
    return (
        <>
            <Backdrop open={ShowLoader}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}