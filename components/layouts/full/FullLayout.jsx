/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import Header from "./header/Header";
import Footer from '../../footer';
import TopStepper from "./stepper/top-stepper";
import SideBarWidgetList from "./header/sidebar-widget-list";
import Sidebar from "./sidebar/Sidebar";
import AuthKeyPopup from "../../modal/auth-popup";
import PageLoader from "../../loader/page-loader";
import BackdropLoader from "../../loader/backdrop-loader";
import Logo from './shared/logo/Logo';

const drawerWidth = 300;

function FullLayout(props) {
  const { children, window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  let [openAuthPopup, setOpenAuthPopup] = useState(false);
  let [isSidebarOpen, setSidebarOpen] = useState(true);
  let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  let [activeStep, setActiveStep] = useState(0);
  let [RecentSaveList, setRecentSaveList] = useState([]);
  let [loading, setLoading] = useState(false);
  let router = useRouter();


  // Function to determine the active step based on the path
  const determineActiveStep = (fullPath) => {
    const pathSegments = fullPath.split('/');
    const desiredPath = pathSegments[1] || '';
    const desiredPath2 = pathSegments[2] || '';

    if (desiredPath === "basic-information") {
      setActiveStep(0);
    } else if (desiredPath2 === "summary-property") {
      setActiveStep(1);
    } else if (desiredPath === "declaration-printing") {
      setActiveStep(1);
    } else if (desiredPath === "division-information" || desiredPath === "division-info") {
      setActiveStep(2);
    } else if (desiredPath === "property") {
      setActiveStep(3);
    } else {
      setActiveStep(0);
    }
  };

  //Session expired authkey handle
  const handleAuthKeyUpdate = () => {
    const authKey = localStorage.getItem("mine_life_auth_key");
    if (authKey === null) {
      setOpenAuthPopup(true);
    }
    else{
      setOpenAuthPopup(false);
    }
  };

  // Fetch the recent save list
  const GetRecentSaveList = async () => {
    let data;
    const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
    if (auth_key !== null) {
      try {
        const response = await fetch(`https://minelife-api.azurewebsites.net/get_user_activities?auth_key=${auth_key}`);
        data = await response.json();
        if (!response.ok) throw new Error(data);

        if (response.ok) {
          setRecentSaveList(data?.user_activities_details);
        } else {
          setRecentSaveList([]);
        }
      } catch (error) {
        if (error.error.message === "Session Expired. Please login again.") {
          setOpenAuthPopup(true);
        }
      } finally {
        setLoading(false); // Hide loader
      }
    }
  };

  // Initial load
  useEffect(() => {
    determineActiveStep(router.pathname);
    handleAuthKeyUpdate();
    GetRecentSaveList();
  }, []);

  // Update on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      determineActiveStep(url);
      handleAuthKeyUpdate();
      GetRecentSaveList();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const handleCloseAuthPopup = () => {
    setOpenAuthPopup(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box className={'sidebar-menus'}>
      <Logo />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <PageLoader loading={loading} />
      <BackdropLoader ShowLoader={children.ShowLoader} />
      <AuthKeyPopup open={openAuthPopup} handleCloseAuthPopup={handleCloseAuthPopup} />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            className={'sidebar-menus'}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Box className="wrapper relative w-full inline-block layout-wrapper">
            <Box className="w-full lg:w-80 xl:w-80 2xl:w-80 inline-block float-left px-0 lg:px-10 xl:px-10 2xl:px-10 py-0 lg:py-10 xl:py-10 2xl:py-10">
              <Box className="top-stepper-sec max-w-screen-md mx-auto">
                <TopStepper activeStep={activeStep} />
              </Box>
              <Box className="page-wrapper">
                {children}
                <Box className="footer-sec pt-10">
                  <Footer />
                </Box>
              </Box>
            </Box>
            <Box className="w-20 hidden lg:inline-block xl:inline-block 2xl:inline-block float-left border-l sticky-scroll">
              <SideBarWidgetList RecentSaveList={RecentSaveList} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

FullLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default FullLayout;
