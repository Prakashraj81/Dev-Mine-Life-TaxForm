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
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import styled from "styled-components";
import { motion } from "framer-motion";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SidebarItems = () => {
  let curl = useRouter();
  let location = curl.pathname;
  const paths = location.split('/');

if (paths.length >= 4) {  
  paths.splice(3, 1); 
  location = paths.join('/');  
} 

  const [open, setOpen] = React.useState(true);
  const [activeDivIndex, setActiveDivIndex] = useState(null);

  const handleClick = (index) => {          
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
    console.log("index:" + index);
  };

  const [Id, setId] = useState(0);
  const [visible, setvisible] = useState(false);

  const SubMenuOpen = (id) => {
    let menu_id = id;
    if (Id === menu_id) {
      setActiveDivIndex(null); 
      setvisible(false);
      setId(0);
    } else {
      setActiveDivIndex(menu_id === activeDivIndex ? null : menu_id); 
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
    transition: height 0.5s ease-in-out;
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

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (    
    <Box sx={{ px: 3 }}>     


       {Menuitems.map((item, index) => (
        <Accordion className="py-3  shadow-none border-0 p-0">
        <AccordionSummary
          className="p-0"
          expandIcon={<ExpandMoreIcon onClick={() => handleClick(index)}/>}
          aria-controls="panel1a-content"
          disablePadding
          id={item.id}
          key={item.title}
          onClick={() => handleClick(index)}
        >
          <NextLink href={item.href}>
        <ListItem
              onClick={() => SubMenuOpen(item.id)}
              id={`${item.id}`}
              button
              selected={location === item.href}
              key={index}
              className={`div-item p-0 ${activeDivIndex === item.id ? 'border-l-4 active' : ''}`}              
            >
            <ListItemText
                className={`${location === item.href ? "text-black p-0" : "p-0"}`}
                id={`${item.id}`}
              >
                <span className={`${ location === item.href ? "text-black p-0" : " p-0 text-custom-black" }`}>
                {item.icon}
              </span>
                {item.title}
              </ListItemText>              
            </ListItem>
            </NextLink>
        </AccordionSummary>
        {item.href === "" && item.id === Id ? (
            <AccordionDetails
              className={`${
                item.id !== Id
                  ? "w-full inline-block transition-all-all pl-0 px-3 py-7px active delay-400 duration-500 ease-in-out transition-all transform "
                  : "delay-150 deactive delay-400 duration-500 ease-in-out transition-all transform padding-left"
              }`}
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              exit={{ height: 0 }}
            >
              {item.child.map((sub, index) => (
                <>
                  <List
                    component="li"
                    className="w-full flex items-center tracking-2 text-black pl-0 px-3 py-10px text-base hover:text-primary-color"
                    disablePadding
                    key={sub.title}
                    item={item}
                  >
                    <span
                    className={`${
                      location === sub.href ? "text-lg text-primary-color mr-2" : "hover:text-primary-color mr-2"
                    }`}
                    >
                      <i className="text-custom-black">{sub.icon}</i>
                    </span>
                    <NextLink
                      className={`${
                        location === sub.href ? "text-primary-color" : "hover:text-primary-color"
                      }`}
                      href={sub.href}
                    >
                      {sub.title}
                    </NextLink>
                  </List>
                </>
              ))}
            </AccordionDetails>
          ) : (
            <></>
          )}        
      </Accordion>
      ))}



{Menuitems.map((item, index) => (
  <List
          className="Sidebar-menu hidden SidebarLink py-2px"
          component="li"
          disablePadding
          key={item.title}
          onClick={() => handleClick(index)}
        >
          <NextLink href={item.href}>
            <ListItem
              onClick={() => SubMenuOpen(item.id)}
              id={`${item.id}`}
              button
              selected={location === item.href}
              key={index}
              className={`div-item ${activeDivIndex === item.id ? 'border-l-4 active' : ''}`}
              
            >
              <ListItemIcon className={`${ location === item.href ? "text-black" : "text-custom-black" }`}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                className={`${location === item.href ? "text-black" : ""}`}
                id={`${item.id}`}
              >
                {item.title}
              </ListItemText>
              <ListItemIcon
                className="transition ease-in-out delay-150 duration-300"                
              >
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
              className={`${
                item.id !== Id
                  ? "w-full inline-block transition-all-all pl-0 px-3 py-7px active delay-400 duration-500 ease-in-out transition-all transform "
                  : "delay-150 deactive delay-400 duration-500 ease-in-out transition-all transform padding-left"
              }`}
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              exit={{ height: 0 }}
            >
              {item.child.map((sub, index) => (
                <>
                  <List
                    component="li"
                    className="w-full flex items-center tracking-2 text-black pl-0 px-3 py-10px text-base hover:text-primary-color"
                    disablePadding
                    key={sub.title}
                    item={item}
                  >
                    <span
                    className={`${
                      location === sub.href ? "text-lg text-primary-color mr-2" : "hover:text-primary-color mr-2"
                    }`}
                    >
                      <i className="text-custom-black">{sub.icon}</i>
                    </span>
                    <NextLink
                      className={`${
                        location === sub.href ? "text-primary-color" : "hover:text-primary-color"
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
};
export default SidebarItems;
