import { useMediaQuery, Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }: ItemType) => {

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = '300px';

  if (lgUp) {
    return (
      <Box sx={{ height: '100%' }}>
        <SidebarItems />
      </Box>
    );
  }

  return (
    <>
      <SidebarItems />
    </>
  );
};

export default Sidebar;
