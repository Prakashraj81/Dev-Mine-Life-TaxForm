import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


export default function DeleteModal({ DeleteModalOpen, DeleteModalFunction }) {    
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });   

    return (
        <Dialog open={DeleteModalOpen} TransitionComponent={Transition} keepMounted>
            <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
            <DialogActions>
                <Button id='No' onClick={DeleteModalFunction}>No</Button>
                <Button id='Yes' onClick={DeleteModalFunction}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}