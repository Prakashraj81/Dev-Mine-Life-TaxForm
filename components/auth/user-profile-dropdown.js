"use client";
import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const UserProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="user-profile"
        aria-controls="user-profile-menu"
        aria-haspopup="true"
        className='hover:bg-white focus:bg-white'
        onClick={handleOpenMenu}
      >
        <AccountCircleIcon />
        <span className='pl-3 text-sm lg:text-base xl:text-base 2xl:text-base font-medium'>山田　太郎</span>
       <span className='pl-3'><ArrowDropDownIcon /></span>
      </IconButton>
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
      </Menu>
    </div>
  );
};


export default UserProfileDropdown;
