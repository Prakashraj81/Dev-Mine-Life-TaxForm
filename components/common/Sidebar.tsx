import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const SidebarReact = () => {
  return (
    <Drawer
      variant="permanent"      
    >
      <List disablePadding>       
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarReact;