import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <>
    <Image className="mx-auto py-5" src="/images/logos/main-logo.svg" alt="logo" height={70} width={174} priority />
    </>
  );
};

export default Logo;
