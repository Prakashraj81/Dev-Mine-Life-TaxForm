import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomTextAreaField from "../forms/theme-elements/CustomTextAreaField";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function EnquiryViewModal({ EnquiryData, OpenModalPopup, handleModalClose }) {
  let [MessageText, setMessageText] = useState("");

  const inputHandle = (event) =>{
    let inputId = event.currentTarget.id;
    let inputValue = event.target.value;
    setMessageText(inputValue);
  }

  const handleModalCloseAndCall = (id) =>{
    const params = {detail_id: id, Message: MessageText};
    handleModalClose(params);
  }

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={OpenModalPopup}
        onClose={() => handleModalClose(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={OpenModalPopup}>
          <Box sx={style}>
            <Box className="pb-7"><CustomTextField label="From" variant="outlined" disabled value={"dev@g-japan.com"} fullWidth /></Box>

            <Box className="pb-7"><CustomTextField className="pb-3" label="To" variant="outlined" disabled value={EnquiryData.email} fullWidth /></Box>

            <Box className="pb-7"><CustomTextField className="pb-3" label="Inquiry type" variant="outlined" disabled value={EnquiryData.inquiry_details} fullWidth /></Box>

            <Box className="pb-7"><TextField
              className="pb-3"
              label="Your Text"
              multiline
              fullWidth
              variant="outlined"
              onChange={inputHandle}              
              rows={3} 
            /></Box>
            <Box className="float-right">
              <Button onClick={() => handleModalClose(null)}>Return</Button>
              <Button onClick={() => handleModalCloseAndCall(EnquiryData.contact_form_id)}>Send</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}