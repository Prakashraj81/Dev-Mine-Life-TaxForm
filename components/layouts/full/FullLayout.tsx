import React, { useState } from "react";
import { styled, Container, Box } from "@mui/material";
import Header from "./header/Header";
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
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {/* <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        > */}
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
          <div className="wrapper relative w-full inline-block">
                  <div className="layout-wrapper">
                    <div className="w-full inline-block">
                      <div className="w-full lg:w-80 xl:w-80 2xl:w-80 inline-block float-left px-0 lg:px-10 xl:px-10 2xl:px-10 py-0 lg:py-10 xl:py-10 2xl:py-10">
                        <div className="top-stepper-sec max-w-screen-md mx-auto">
                          <TopStepper />
                        </div>
                        <div className="page-wrapper">{children}</div>
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
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        {/* </Container> */}
      </PageWrapper>      
    </MainWrapper>
  );
};

export default FullLayout;
