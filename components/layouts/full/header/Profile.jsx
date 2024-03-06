import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const router = useRouter();  
  const FunctionLogOut = () => {   
    let bool = false;
    let Logoutboolean = btoa(bool);     
    sessionStorage.setItem('Login', Logoutboolean);
    router.push(`/`);
  }

  return (
    <>
      <Box>
        <ul className="flex items-baseline space-x-24 nav-menu">
          {/* <li className="hidden lg:block xl:block 2xl:block">
            <a
              className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
              href="/"
            >
              診断(調整中)
            </a>
          </li> */}
          {/* <li className="hidden lg:block xl:block 2xl:block">
            <a
              className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
              href="/"
            >
              申告書の作成が難しい方へ
            </a>
          </li> */}
          <li className="hidden lg:block xl:block 2xl:block">
            <Link
              href="/pages/contact"
              className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
            >
              ご相談・お問い合わせ
            </Link>
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
                  <KeyboardArrowDownIcon width="20" height="20" />
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
              width: "250px",
            },
          }}
        >
        
          <MenuItem>
            <ListItemIcon>
              <AppRegistrationOutlinedIcon width={18} />
            </ListItemIcon>
            <p className="text-sm">登録情報の変更・退会</p>
          </MenuItem>
          <MenuItem className="py-3">
            <ListItemIcon>
              <BeenhereOutlinedIcon width={18} />
            </ListItemIcon>
            <p className="text-sm">有料会員登録</p>           
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <Button
              href=""
             onClick={FunctionLogOut}
              variant="outlined"
              color="primary"
              component={Link}
              fullWidth
            >
              ログアウト
            </Button>
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default Profile;
