import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { IconEye, IconCirclePlus, IconTrashX, IconX, IconEyeOff } from "@tabler/icons-react";
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import theme from "../theme";
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

export default function AddAdminUserModal({AdminUserData, OpenModalPopup, handleModalClose}) {  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isSaveDisabled = !name || !email || !password || !confirmPassword;

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    // Implement your save logic here
  };

    return (
        <div>      
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={OpenModalPopup}                
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
                      <Box className="pb-7 block md:flex lg:flex xl:flex 2xl:flex justify-between items-center">
                        <Typography variant="h6">Add Admin User</Typography>
                        <IconButton><IconX className="float-right text-black cursor-pointer" onClick={handleModalClose} /></IconButton>
                      </Box>                             

                      <Box className="pb-7">
                        <CustomTextField
                          label="Name"
                          variant="outlined"
                          fullWidth
                          required
                          value={AdminUserData.admin_name ? AdminUserData.admin_name : name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Box>

                      <Box className="pb-7">
                        <CustomTextField
                          className="pb-3"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          value={AdminUserData.email ? AdminUserData.email : email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Box>
                      
                      <Box className="pb-7">
                        <CustomTextField
                          className="pb-3"
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          variant="outlined"
                          fullWidth
                          value={AdminUserData.password ? AdminUserData.password : password}
                          onChange={(e) => setPassword(e.target.value)}                          
                        />
                      </Box>

                      <Box className="pb-3">
                      <CustomTextField
                          className="pb-3"
                          type={showPassword ? 'text' : 'password'}
                          label="Confirm Password"
                          variant="outlined"
                          fullWidth
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)}                         
                        />                        
                      </Box>
                      
                      <Box className="pb-7">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox size="small" checked={showPassword} onClick={handleTogglePasswordVisibility} />} label="Show password" />                          
                        </FormGroup>
                      </Box>

                      <Box className="w-full float-right">
                        <Button
                          style={{
                            backgroundColor: theme.palette.error.main,
                            color: '#FFF',
                            marginRight: '25px',
                          }}
                          onClick={handleModalClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            backgroundColor: theme.palette.primary.main,
                            color: '#FFF',
                          }}
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}