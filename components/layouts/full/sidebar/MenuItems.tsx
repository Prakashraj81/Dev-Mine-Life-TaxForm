import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonOffIcon from '@mui/icons-material/PersonOff';

//sub-menu icons list
import EscalatorWarningOutlinedIcon from '@mui/icons-material/EscalatorWarningOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
//
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CardMembershipSharpIcon from '@mui/icons-material/CardMembershipSharp';

import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

//pages
import PostAddIcon from '@mui/icons-material/PostAdd';

const Menuitems = [
  //First
  {
    id: 1,
    title: "基礎情報の入力",    
    href: "",
    icon: <HomeIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    child: [
      {        
        title: "基礎情報の入力",
        icon: <CreditScoreOutlinedIcon className="text-custom-black"/>,
        href: "/basic-information",    
      },
      {
        title: "被相続人",
        icon: <PersonOffIcon/>,
        href: "/basic-information/decendent",
      },
      {
        title: "相続人",
        icon: <EscalatorWarningOutlinedIcon/>,
        href: "/basic-information/heir",
      },      
    ],
  },  

  //Second  
  {
    id:2,
    title: "財産の入力",    
    href: "",
    text: "Enter property",
    icon: <FileOpenIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    child: [
      {        
        title: "まとめ",
        icon: <SummarizeOutlinedIcon/>,
        href: "/summary-pages/summary-property", 
        translateHeading: "summary-property",
        text: "summary-property",   
      },
      {        
        title: "現金預金(外貨含む)",
        icon: <PaymentsOutlinedIcon/>,
        href: "/declaration-printing/cash-savings", 
        translateHeading: "Cash deposit (including foreign currency)",
        text: "Cash/savings",   
      },
      {
        title: "有価証券",
        icon: <SecurityOutlinedIcon/>,
        href: "/declaration-printing/securities",
        translateHeading: "Securities",
        text: "Securities - stocks, bonds, corporate bonds, etc.",
      },          
      {
        title: "建物",
        icon: <ApartmentOutlinedIcon/>,
        href: "/declaration-printing/building",
        translateHeading: "building",
        text: "House - home, rental, etc.",
      },     
      {
        title: "土地",
        icon: <LandscapeOutlinedIcon/>,
        href: "/declaration-printing/land",
        translateHeading: "land",
        text: "land",
      },     
      {
        title: "家庭用財産",
        icon: <HouseOutlinedIcon/>,
        href: "/declaration-printing/household-property",
        translateHeading: "household property",
        text: "House hold property",
      },
      {
        title: "死亡保険金等",
        icon: <LoyaltyIcon/>,
        href: "/declaration-printing/death-benefit",
        translateHeading: "Death benefit etc",
        text: "Death benefit etc",
      },
      {
        title: "死亡退職金等",
        icon: <CardMembershipSharpIcon/>,
        href: "/declaration-printing/death-retirement-allowance",
        translateHeading: "Death retirement allowance, etc",
        text: "Death retirement allowance, etc",
      },     
      {
        title: "その他財産",
        icon: <OtherHousesOutlinedIcon/>,
        href: "/declaration-printing/other-property",
        translateHeading: "Other assets",
        text: "Other Assets - Automobile balance under management Compensatory assets, etc.",
      },
      {
        title: "債務",
        icon: <DevicesOutlinedIcon/>,
        href: "/declaration-printing/debt",        
        translateHeading: "debt",
        text: "debt",
      },  
      {
        title: "葬儀費用",
        icon: <PaymentOutlinedIcon/>,
        href: "/declaration-printing/funeral-expenses",
        translateHeading: "funeral expenses",
        text: "funeral expenses",
      },  
      {        
        title: "生前贈与",
        icon: <VolunteerActivismOutlinedIcon/>,
        translateHeading: "living donation",
        href: "/declaration-printing/living-donation",    
      },        
    ],
  },
  //Third  
  {
    id:3,
    title: "分割情報、特例等の入力",    
    translateHeading: "Entering division information",
    href: "/division-info/division-information",
    icon: <PostAddIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
  },     
 //Fourth
  {
    id:4,
    title: "申告書、分割協議書の印刷",    
    translateHeading: "funeral",
    href: "/property/declaration-printing",
    icon: <CardGiftcardIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
  },      
];

export default Menuitems;
