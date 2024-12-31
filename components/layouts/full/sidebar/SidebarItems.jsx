/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
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

const SidebarItems = () => {
  let curl = useRouter();
  let location = curl.pathname;
  const paths = location.split('/');

  if (paths.length >= 4) {
    paths.splice(3, 1);
    location = paths.join('/');
  }

  let [open, setOpen] = React.useState(true);
  let [ShowLoader, setShowLoader] = useState(false);
  let [activeDivIndex, setActiveDivIndex] = useState(null);
  let [isClassRemoved, setIsClassRemoved] = useState(false);

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const [Id, setId] = useState(0);
  const [visible, setvisible] = useState(false);
  //Accordion function
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const SubMenuOpen = (id) => {
    setShowLoader(true);
    let menu_id = id;
    if (Id === menu_id) {
      setActiveDivIndex(null);
      setvisible(false);
      setId(0);
    } else {
      setIsClassRemoved(true);
      setActiveDivIndex(menu_id === activeDivIndex ? null : menu_id);
      sessionStorage.setItem("menu_id", menu_id);
      sessionStorage.setItem("activeDivIndex", activeDivIndex);
      setvisible(true);
      setId(menu_id);
    }
    setShowLoader(true);
  };

  // useEffect(() => {
  //   let sessionMenuId = Number(sessionStorage.getItem("menu_id"));
  //   if(sessionMenuId !== 0){
  //     setIsClassRemoved(true);
  //     setActiveDivIndex(sessionMenuId === activeDivIndex ? null : sessionMenuId); 
  //     setvisible(true);
  //     setId(sessionMenuId);
  //     let menu_items;
  //     if(sessionMenuId === 1){
  //       menu_items = Menuitems[0].child;
  //     }
  //     else if(sessionMenuId === 2){
  //       menu_items = Menuitems[1].child;
  //     }
  //     else if(sessionMenuId === 3){
  //       menu_items = Menuitems[2].child;
  //     }
  //     else if(sessionMenuId === 4){
  //       menu_items = Menuitems[3].child;
  //     }
  //     else {
  //       menu_items = Menuitems[4].child;
  //     }
  //     sessionStorage.setItem("menu_items", JSON.stringify(menu_items));
  //     let Menuitems_two = menu_items;
  //     setExpanded(true);
  //     SubMenuOpen(sessionMenuId);
  //   }
  // },[]);  

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


  // const [isMenuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };  

  return (
    <Box sx={{ px: 0 }}>
      {Menuitems.map((item, index) => (
        <Accordion className="py-1 shadow-none accordion-top-div border-0 p-0"
          expanded={expanded === item.id} onChange={handleChange(item.id)}
        >
          <AccordionSummary
            className="p-0 inline-block accordion-div-main w-full"
            aria-controls="panel1a-content"
            disablePadding
            id={item.id}
            key={item.title}
          // onClick={() => handleClick(index)}                     
          >
            <NextLink className="accordion-link" href={item.href}>
              <ListItem
                onClick={() => SubMenuOpen(item.id)}
                id={`${item.id}`}
                button
                selected={location === item.href}
                key={index}
                className={`Main_Menu_${item.id} div-item accordion-div-item inline-block w-full p-0 ${activeDivIndex === item.id ? 'border-l-4 active-0' : ''}`}
              >
                <ListItemIcon className={`${location === item.href ? "text-black" : "text-primary-color"}`}>
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
          </AccordionSummary>
          {item.href === "" && item.id === Id ? (
            <AccordionDetails
              className={`${item.id !== Id
                ? "w-full inline-block transition-all-all pl-0 px-3 py-7px active delay-400 duration-500 ease-in-out transition-all transform "
                : "delay-150 deactive delay-400 duration-500 ease-in-out transition-all transform padding-left"
                }`}
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              exit={{ height: 0 }}
            >
              {item.child.map((sub) => (
                <>
                  <NextLink
                    className={`${location === sub.href ? "text-primary-color" : "hover:text-primary-color"
                      }`}
                    href={sub.href}
                  >
                    <List
                      component="li"
                      className={`${location === sub.href ? "w-full flex items-center tracking-2 sub-li-active text-primary-color pl-0 px-3 py-10px text-base" : "w-full flex items-center tracking-2 text-custom-black pl-0 px-3 py-10px text-base hover:text-primary-color mr-2"
                        }`}

                      disablePadding
                      key={sub.title}
                    >
                      <span>
                        <i className={`${location === sub.href ? "text-lg text-primary-color mr-2" : " hover:text-primary-color mr-2"
                          }`}>{sub.icon}</i>
                      </span>
                      <span
                        className={`${location === sub.href ? "text-primary-color" : "hover:text-primary-color"
                          }`}
                        href={sub.href}
                      >
                        {sub.title}
                      </span>
                    </List>
                  </NextLink>
                </>
              ))}
            </AccordionDetails>
          ) : (
            <>
            </>
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
              <ListItemIcon className={`${location === item.href ? "text-black" : "text-custom-black"}`}>
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
              className={`${item.id !== Id
                ? "w-full inline-block transition-all-all pl-0 px-3 py-7px active delay-400 duration-500 ease-in-out transition-all transform "
                : "delay-150 deactive delay-400 duration-500 ease-in-out transition-all transform padding-left"
                }`}
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              exit={{ height: 0 }}
            >
              {item.child.map((sub) => (
                <>
                  <List
                    component="li"
                    className="w-full flex items-center tracking-2 text-black pl-0 px-3 py-10px text-base hover:text-primary-color"
                    disablePadding
                    key={sub.title}
                    item={item}
                  >
                    <span
                      className={`${location === sub.href ? "text-lg text-primary-color mr-2" : "hover:text-primary-color mr-2"
                        }`}
                    >
                      <i className="text-custom-black">{sub.icon}</i>
                    </span>
                    <NextLink
                      className={`${location === sub.href ? "text-primary-color" : "hover:text-primary-color"
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
