import {
  IconLayoutDashboard, IconTicket, IconUsersGroup, IconAtom, IconAddressBook, IconArticle, IconHelpOctagon, IconBuildingCommunity, IconUserShield
} from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: false,
    subheader: 'Home',
  },
  {
    id: 1,
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/admin/pages/dashboard',
  },  
  {
    id: 2,
    title: 'Users',
    icon: IconUsersGroup,
    href: '/admin/pages/users',
  },  
  // {
  //   id: uniqueId(),
  //   title: 'Consultations',
  //   icon: IconAtom,
  //   href: '/admin/pages/consultation',
  // },  
  {
    id: 3,
    title: 'Contact Us',
    icon: IconAddressBook,
    href: '/admin/pages/contact-us',
  },  

  {
    id: 4,
    title: 'Admin users',
    icon: IconUserShield,
    href: '/admin/pages/admin-user',
  },  
  //Heading
  // {
  //   navlabel: false,
  //   subheader: 'Contents management',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Blog',
  //   icon: IconArticle,
  //   href: '/pages/blog',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'FAQ',
  //   icon: IconHelpOctagon,
  //   href: '/pages/faq',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Company Info',
  //   icon: IconBuildingCommunity,
  //   href: '/pages/company-information',
  // },
  //Heading
  // {
  //   navlabel: true,
  //   subheader: 'Support ticket',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Ticket',
  //   icon: IconTicket,
  //   href: '/pages/tickets',
  // },
];

export default Menuitems;
