/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { styled, Container, Box } from "@mui/material";
import Header from "./header/Header";
import Footer from '../../footer';
import TopStepper from "./stepper/top-stepper";
import SideBarWidgetList from "./header/sidebar-widget-list";
import Sidebar from "./sidebar/Sidebar";
import AuthKeyPopup from "../../modal/auth-popup";
import PageLoader from "../../loader/page-loader";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));


const FullLayout = ({ children }) => {
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
  };    
  
  // Fetch the recent save list
  const GetRecentSaveList = async () => {
    const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
    if (auth_key !== null) {
      try {
        const response = await fetch(`https://minelife-api.azurewebsites.net/get_user_activities?auth_key=${auth_key}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data);

        if (response.ok) {
          setRecentSaveList(data.user_actrivities_details);
        } else {
          setRecentSaveList([]);
        }
      } catch (error) {
        if(error.response.status === 440 && error.response.data.error.message === "Session Expired. Please login again."){
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

  return (
    <MainWrapper className="mainwrapper">
      <PageLoader loading={loading} /> 
      <AuthKeyPopup open={openAuthPopup} handleCloseAuthPopup={handleCloseAuthPopup}/>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
          <Box className="wrapper relative w-full inline-block">
            <Box className="layout-wrapper">
              <Box className="w-full inline-block">
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
        </Box>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
