import React from "react";
import { useEffect } from 'react';
import { useRouter } from "next/router";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import TopStepper from "../stepper/top-stepper";
import SideBarWidgetList from "./sidebar/sidebar-widget-list";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const router = useRouter();
  
  useEffect(() => {
    const isLoggedIn = 0;

    if (isLoggedIn == 1) {
      router.push("/auth/login");
    } else {
      router.push("/");
    }
  }, []);

  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <>
      <MainWrapper>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#fbfbfb",
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: "20px",
              paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
              {/********Middle Content**********/}
              <div className="wrapper relative w-full inline-block">
                <div className="layout-wrapper">
                  <div className="w-full inline-block">
                    <div className="w-80 inline-block float-left px-10 py-10 ">
                      <div className="top-stepper-sec max-w-screen-md mx-auto">
                        <TopStepper />
                      </div>
                      <div className="page-wrapper">{children}</div>
                    </div>
                    <div className="w-20 inline-block float-left border-l-2">
                      <div className="">
                        <SideBarWidgetList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <Footer />
          </Container>
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
