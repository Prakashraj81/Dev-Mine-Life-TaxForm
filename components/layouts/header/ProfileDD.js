import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  return (
    <>
      <ul class="flex items-baseline space-x-24 nav-menu">
        <li className="hidden lg:block xl:block 2xl:block">
          <a
            class="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
            href="/"
          >
            診断(調整中)
          </a>
        </li>
        <li className="hidden lg:block xl:block 2xl:block">
          <a
            class="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
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
            onClick={handleClick4}
          >
            <Box display="flex" alignItems="center">
              <AccountCircleOutlinedIcon className="" />
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

      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "250px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link href="/auth/login">
              <button className="text-black">Logout</button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
