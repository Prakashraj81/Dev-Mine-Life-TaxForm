import React, { useState } from "react";
import { useEffect } from "react";
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
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";

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

  // useEffect(() => {
  //   const isLoggedIn = 0;

  //   if (isLoggedIn == 1) {
  //     router.push("/auth/login");
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  let auth_token = "abcd";
  function validateSession(auth_token) {
    console.log("Success");
    return auth_token !== "" ? true : false;
  }
  const [register, setregister] = useState(true);
  function Register(){
    setregister(false);
  }

  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <>
      {validateSession(auth_token) ? (
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
              <Footer />
            </Container>
          </PageWrapper>
        </MainWrapper>
      ) : (
        <>
        {!register ? <Login showregister={Register}/> : <><Register/></>}
        {/* <Register/> */}
        </>        
      )}
    </>
  );
};

export default FullLayout;
