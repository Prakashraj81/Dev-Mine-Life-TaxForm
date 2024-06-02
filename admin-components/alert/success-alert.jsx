import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { IconX } from "@tabler/icons-react";
import Slide from '@mui/material/Slide';

export default function SuccessAlert() {
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="left" ref={ref} {...props} />;
    // });
    const [open, setOpen] = React.useState(true);    

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse>
                <Alert
                    className='absolute right-0 bottom-0 z-10'
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <IconX fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <Typography color="inherit" size="small">This is a success alert — check it out!</Typography>
                </Alert>
            </Collapse>
        </Box>
    );
}