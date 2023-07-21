import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomePage from '../pages/home';
import { RouteType } from './config';


const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },  
  {
    path: "/dashboard",
    element: <HomePage />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard-1",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <HomePage />,
        state: "dashboard.index"
      },
      {
        path: "/dashboard/default",
        element: <HomePage />,
        state: "dashboard.default",
        displayText: "Default"
      }     
    ]
  }
];

export default appRoutes;