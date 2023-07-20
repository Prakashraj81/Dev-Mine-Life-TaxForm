import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Heir1 from './../../../pages/basic-information/heir-1';
import BasicInformation from '../../../pages/basic-information';


const appRoutes = [
    {
        index: true,
        element: <Heir1 />,
        state: "home"
    },
    {
        path: "/basic-information",
        element: <BasicInformation />,
        state: "installation",
        sidebarProps: {
            displayText: "Installation",
            icon: <DashboardOutlinedIcon />
        }
    },
    {
        path: "/basic-information",
        element: <Heir1 />,
        state: "dashboard",
        sidebarProps: {
            displayText: "Dashboard",
            icon: <DashboardOutlinedIcon />
        },
        child: [
            {
                index: true,
                element: <Heir1 />,
                state: "dashboard.index"
            },
            {
                path: "/declaration-printing/cash-savings",
                element: <Heir1 />,
                state: "cash-savings",
                sidebarProps: {
                    displayText: "cash-savings"
                },
            },
            {
                path: "/dashboard/analytics",
                element: <Heir1 />,
                state: "dashboard.analytics",
                sidebarProps: {
                    displayText: "Analytic"
                }
            },
            {
                path: "/dashboard/saas",
                element: <Heir1 />,
                state: "dashboard.saas",
                sidebarProps: {
                    displayText: "Saas"
                }
            }
        ]
    },
    {
        path: "/component",
        element: <Heir1 />,
        state: "component",
        sidebarProps: {
            displayText: "Components",
            icon: <AppsOutlinedIcon />
        },
        child: [
            {
                path: "/component/alert",
                element: <Heir1 />,
                state: "component.alert",
                sidebarProps: {
                    displayText: "Alert"
                },
            },
            {
                path: "/component/button",
                element: <Heir1 />,
                state: "component.button",
                sidebarProps: {
                    displayText: "Button"
                }
            }
        ]
    },
    {
        path: "/documentation",
        element: <Heir1 />,
        state: "documentation",
        sidebarProps: {
            displayText: "Documentation",
            icon: <ArticleOutlinedIcon />
        }
    },
    {
        path: "/changelog",
        element: <Heir1 />,
        state: "changelog",
        sidebarProps: {
            displayText: "Changelog",
            icon: <FormatListBulletedOutlinedIcon />
        }
    }
];

export default appRoutes;