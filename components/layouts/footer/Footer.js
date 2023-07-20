import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <footer>
        <div className="footer-wrapper bg-custom-light py-10">
          <div className="text-center">
            <Typography className="text-black text-sm tracking-2 text-center font-medium">
            © 税理士法人マインライフ             
            </Typography>
          </div>
        </div>
      </footer>
    </Box>
  );
};

export default Footer;
