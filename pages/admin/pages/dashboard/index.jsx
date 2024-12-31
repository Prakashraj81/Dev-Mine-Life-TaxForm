import React from "react";
import { Box } from '@mui/material';

import TopCards from '../../../../admin-components/dashboard/TopCard';
import CustomerTickets from '../../../../admin-components/dashboard/CustomerTickets';
import FullLayout from '../../../../admin-components/layouts/full/FullLayout';

export default function AdminDashboard() {
  return (
    <>
      <Box>
        <TopCards />
        <CustomerTickets />        
      </Box>
    </>
  )
}

AdminDashboard.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};