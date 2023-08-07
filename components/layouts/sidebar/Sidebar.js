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
import styled from "styled-components";
import { motion } from "framer-motion";

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

  const SubMenuOpen = (id) => {
    let menu_id = id;
    if (Id === menu_id) {
      setvisible(false);
      setId(0);
    } else {
      setvisible(true);
      setId(menu_id);
    }
  };

  const DropdownLink = styled(motion.a)`
    background: none;
    height: 60px;
    padding-left: 3rem;
    display: inline-block;
    align-items: center;
    text-decoration: none;
    color: #000;
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
  `;

  const IconAnimate = styled(motion.span)`
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
  `;

  let curl = useRouter();
  const location = curl.pathname;

  const SidebarContent = (
    <Box p={2} height="100%">
      <div className="pb-7">
        <LogoIcon className="mx-auto" />
      </div>
      {Menuitems.map((item, index) => (
        <List
          className="Sidebar-menu SidebarLink py-2"
          component="li"
          disablePadding
          key={item.title}
          onClick={() => handleClick(index)}
        >
          <NextLink href={item.href}>
            <ListItem
              onClick={() => SubMenuOpen(item.id)}
              id={item.id}
              button
              selected={location === item.href}
              className={`${
                location === item.href
                  ? "text-primary-color tracking-2 "
                  : "border-border-light border-2"
              }`}
            >
              <ListItemIcon
                className={`${
                  location === item.href ? "text-black" : "text-custom-black"
                }`}
                width="20"
                height="20"
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                className={`${location === item.href ? "text-black" : ""}`}
                id={item.id}
              >
                {item.title}
              </ListItemText>
              <ListItemIcon className="transition ease-in-out delay-150 duration-300" width="20" height="20">
              {item.href === "" && item.id === Id
                    ? item.iconOpened
                    : item.child
                    ? item.iconClosed
                    : null}
              </ListItemIcon>
            </ListItem>
          </NextLink>
          {item.href === "" && item.id === Id ? (
            <DropdownLink
              className={`${item.id !== Id ? "w-full inline-block transition-all-all pl-0 px-3 py-7px" : "transition ease-in-out delay-150 duration-300"}`}
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              exit={{ height: 0 }}
            >
              {item.child.map((sub, index) => (
                <>
                  <List
                    component="li"
                    className="w-full tracking-2 text-black inline-block pl-0 px-3 py-7px text-base"
                    disablePadding
                    key={sub.title}
                    item={item}                    
                  >
                    <NextLink
                      className={`${
                        location === sub.href ? "text-primary-color" : ""
                      }`}
                      href={sub.href}
                    >
                      {sub.title}
                    </NextLink>
                  </List>
                </>
              ))}
            </DropdownLink>
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
