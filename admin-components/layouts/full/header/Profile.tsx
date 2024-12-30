import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import axios from "axios";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import SessionExpiredModal from "../../../modal/session-expired-modal";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(true);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    // Example logic to simulate session expiration
    const timer = setTimeout(() => {
      setSessionExpired(true);
    }, 10000); // Set session to expire in 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Logic to handle closing the modal, e.g., redirect to login page
    setSessionExpired(false);
    //window.location.href = '/login'; // Redirect to login page
  };

  const router = useRouter();  
  const AdminLogOut = async () => {   
    try{
      let admin_auth_key = atob(sessionStorage.getItem("admin_auth_key"));
      let formData = new FormData();
      formData.append("auth_key", admin_auth_key);
      if(admin_auth_key !== null){
        const response = await axios.post('https://minelife-api.azurewebsites.net/admin/logout', formData);
        if(response.status === 200){
          sessionStorage.clear();
          localStorage.clear();
          router.push(`/admin/auth/login`);
        }        
        else{
          console.log("Please contact vendor");
        }  
      }
      else{
        console.log("Invalid auth key");
      }     
    } catch (error){      
      if(error.response.status === 440 && error.response.data.error.message === "Session Expired. Please login again."){
          sessionStorage.clear();
          localStorage.clear();
          router.push(`/admin/auth/login`);
          //<SessionExpiredModal open={sessionExpired} handleClose={handleClose} />
        }
      console.error('Error:', error);
    }   
  }

  return (
    <Box onClick={handleClick2} className="cursor-pointer">
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}        
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <span>User name</span>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >        
        {/* <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem> */}
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={AdminLogOut}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
