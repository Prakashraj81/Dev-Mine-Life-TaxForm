import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

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
        icon: "disc",
        href: "/basic-information",    
      },
      {
        title: "被相続人",
        icon: "disc",
        href: "/basic-information/decendent",
      },
      {
        title: "相続人",
        icon: "disc",
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
        icon: "disc",
        href: "/summary-pages/summary-property", 
        translateHeading: "summary-property",
        text: "summary-property",   
      },
      {        
        title: "現金預金(外貨含む)",
        icon: "disc",
        href: "/declaration-printing/cash-savings", 
        translateHeading: "Cash deposit (including foreign currency)",
        text: "Cash/savings",   
      },
      {
        title: "有価証券",
        icon: "disc",
        href: "/declaration-printing/securities",
        translateHeading: "Securities",
        text: "Securities - stocks, bonds, corporate bonds, etc.",
      },      
      {
        title: "建物",
        icon: "disc",
        href: "/declaration-printing/building",
        translateHeading: "building",
        text: "House - home, rental, etc.",
      },     
      {
        title: "土地",
        icon: "disc",
        href: "/declaration-printing/land",
        translateHeading: "land",
        text: "land",
      },     
      {
        title: "家庭用財産",
        icon: "disc",
        href: "/declaration-printing/household-property",
        translateHeading: "household property",
        text: "Other Assets - Automobile balance under management Compensatory assets, etc.",
      },
      //doubt
      {
        title: "その他財産",
        icon: "disc",
        href: "/declaration-printing/other-property",
        translateHeading: "Other assets",
        text: "Other Assets - Automobile balance under management Compensatory assets, etc.",
      },
      {
        title: "債務",
        icon: "disc",
        href: "/declaration-printing/debt",        
        translateHeading: "debt",
        text: "debt",
      },  
      {
        title: "葬式費用",
        icon: "disc",
        href: "/declaration-printing/funeral-expenses",
        translateHeading: "funeral expenses",
        text: "funeral expenses",
      },
    ],
  },
  //Third  
  {
    id:3,
    title: "贈与・各種控除",    
    href: "",
    icon: <NoteAltIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    child: [
      {        
        title: "まとめ",
        icon: "disc",
        href: "/summary-pages/summary-gifts-various", 
        translateHeading: "summary-gifts-various",
        text: "summary-gifts-various",   
      },
      {
        title: "小規模宅地等の特例",
        icon: "disc",
        translateHeading: "Exceptions for small-scale residential land, etc.",
        href: "/gift-various/exceptions-residential-land",
      },
      {        
        title: "生前贈与",
        icon: "disc",
        translateHeading: "lifetime gift",
        href: "/gift-various/gifts-taxation",    
      },      
      {
        title: "未成年控除",
        icon: "disc",
        translateHeading: "deduction for minors",
        href: "/gift-various/deduction-minors",
      },
      {
        title: "障害者控除",
        icon: "disc",
        translateHeading: "Disabled deduction",
        href: "/gift-various/allocation-amount",
      },      
      {        
        title: "相次相続控除",
        icon: "disc",
        translateHeading: "successive inheritance deduction",
        href: "/gift-various/successive-inheritance",    
      },
      // //doubt
      // {
      //   title: "相次相続控除-1",
      //   icon: "disc",
      //   translateHeading: "funeral",
      //   href: "/gift-various/allocation-disability",
      // },
      // //doubt
      // {        
      //   title: "公益法人等への寄附・遺贈",
      //   icon: "disc",
      //   translateHeading: "Donations and bequests to public interest corporations, etc.",
      //   href: "/404",    
      // },
    ],
  },
  {
    id:4,
    title: "申告書の印刷",    
    translateHeading: "funeral",
    href: "/property/declaration-printing",
    icon: <CardGiftcardIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
  },
];

export default Menuitems;
