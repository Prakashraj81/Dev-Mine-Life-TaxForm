import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Box>
        <ul className="flex items-baseline space-x-24 nav-menu">
          <li className="hidden lg:block xl:block 2xl:block">
            <a
              className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
              href="/"
            >
              診断(調整中)
            </a>
          </li>
          <li className="hidden lg:block xl:block 2xl:block">
            <a
              className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
              href="/"
            >
              申告書の作成が難しい方へ
            </a>
          </li>
          <li>
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick2}
            >
              <Box display="flex" alignItems="center">
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
                  onClick={handleClick2}
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
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="text-black"
                    variant="h5"
                    fontWeight="400"
                    sx={{ ml: 1 }}
                  >
                    Hi,
                  </Typography>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      ml: 1,
                    }}
                  >
                    山田　太郎
                  </Typography>
                  <FeatherIcon icon="chevron-down" width="20" height="20" />
                </Box>
              </Box>
            </Button>
          </li>
        </ul>

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
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <Button
              href="/auth/login"
              variant="outlined"
              color="primary"
              component={Link}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default Profile;
