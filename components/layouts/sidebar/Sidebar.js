import React, { useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };


  const [Id, setId] = useState(0);
  const [visible, setvisible] = useState(false);

  function SubMenuOpen(event) {
    let id = Number(event.currentTarget.id);
    if (Id === id) {
      setvisible(false);
      setId(0);
    } else {
      setvisible(true);
      setId(id);
    }
  }

  let curl = useRouter();
  const location = curl.pathname;

  const SidebarContent = (
    <Box p={2} height="100%">
      <div className="pb-7">
      <LogoIcon className="mx-auto" />
      </div>
      {Menuitems.map((item, index) => (
        <List        
        className="Sidebar-menu py-5px"
        component="li" disablePadding key={item.title}>
          <NextLink href={item.href}>
            <ListItem
              onClick={() => handleClick(index)}
              button
              selected={location === item.href}
              className={`${
                location === item.href
                  ? "text-primary-color tracking-2"
                  : "border-border-light border-2"
              }`}
            >
              <ListItemIcon>
                <FeatherIcon
                  className={`${
                    location === item.href ? "text-black" : ""
                  }`}
                  icon={item.icon}
                  width="20"
                  height="20"
                />
              </ListItemIcon>

              <ListItemText
                className={`${
                  location === item.href ? "text-black" : ""
                }`}
                id={item.id}
                onClick={SubMenuOpen}
              >
                {item.title}
              </ListItemText>
              <ListItemIcon>                
                <ArrowForwardIosIcon />
              </ListItemIcon>
            </ListItem>
          </NextLink>
          {item.href === "" && item.id === Id ? (
            <Box className="w-full inline-block px-3 py-7px">
              {item.child.map((sub, index) => (
                <>
                  <List
                    component="li"
                    className="w-full tracking-2 text-black inline-block px-3 py-7px text-base"
                    disablePadding
                    key={sub.title}
                  >
                    <NextLink
                      className={`${
                        location === sub.href
                          ? "text-primary-color"
                          : ""
                      }`}
                      href={sub.href}
                    >
                      {sub.title}
                    </NextLink>
                  </List>
                </>
              ))}
            </Box>
          ) : (
            <></>
          )}
        </List>
      ))}
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "280px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "280px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
