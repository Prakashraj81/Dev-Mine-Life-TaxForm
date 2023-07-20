import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/" legacyBehavior>
      <Image
        className="logo mx-auto"
        src="../logo/main-logo.svg"
        alt="mine-life"
        width={180}
        height={35}
        priority
      />
    </Link>
  );
};

export default LogoIcon;
