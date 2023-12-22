import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { styled, Container, Box } from "@mui/material";
import Header from "./header/Header";
import Footer from './../../footer';
import TopStepper from "./stepper/top-stepper";
import SideBarWidgetList from "./header/sidebar-widget-list";
import Sidebar from "./sidebar/Sidebar";

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

interface Props {
  children: React.ReactNode;
}


const FullLayout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  let [activeStep, setactiveStep] = useState(0);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  //Stepper get path function 
  const router = useRouter();
    const fullPath = router.pathname;    
  useEffect (() => {       
    const pathSegments = fullPath.split('/');
    const desiredPath = pathSegments[1] || ''; 
    const desiredPath2 = pathSegments[2] || ''; 
    if(desiredPath === "basic-information"){
      setactiveStep(0);
      activeStep = 0;
    }
    else if(desiredPath2 === "summary-property"){
      setactiveStep(1);
      activeStep = 1;
    }
    else if(desiredPath === "declaration-printing"){
      setactiveStep(1);
      activeStep = 1;
    }
    else if(desiredPath === "division-information" || desiredPath === "division-info"){
      setactiveStep(2);
      activeStep = 2;
    }
    else if(desiredPath2 === "summary-gifts-various"){
      setactiveStep(3);
      activeStep = 3;
    }
    else if(desiredPath === "gift-various"){
      setactiveStep(3);
      activeStep = 3;
    }
    else if(desiredPath === "property"){
      setactiveStep(4);
      activeStep = 4;
    }
    else {
      setactiveStep(0);
      activeStep = 0;
    }
  }, [activeStep, fullPath]);  
  return (
    <MainWrapper className="mainwrapper">      
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />      
      <PageWrapper className="page-wrapper">      
        <Header
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
          <div className="wrapper relative w-full inline-block">
            <div className="layout-wrapper">
              <div className="w-full inline-block">
                <div className="w-full lg:w-80 xl:w-80 2xl:w-80 inline-block float-left px-0 lg:px-10 xl:px-10 2xl:px-10 py-0 lg:py-10 xl:py-10 2xl:py-10">
                  <div className="top-stepper-sec max-w-screen-md mx-auto">
                    <TopStepper activeStep={activeStep}/>                    
                  </div>
                  <div className="page-wrapper">
                    {children}
                    <div className="footer-sec pt-10">
                    <Footer />
                    </div>
                  </div>
                </div>
                <div className="w-20 hidden lg:inline-block xl:inline-block 2xl:inline-block float-left border-l-2">
                  <div className="">
                    <SideBarWidgetList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>        
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
