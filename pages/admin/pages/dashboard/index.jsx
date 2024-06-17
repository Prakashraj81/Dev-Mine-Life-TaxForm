import React from "react";
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

import TopCards from '../../../../admin-components/dashboard/TopCard';
import CustomerTickets from '../../../../admin-components/dashboard/CustomerTickets';
import SalesOverview from '../../../../admin-components/dashboard/SalesOverview';
import YearlyBreakup from '../../../../admin-components/dashboard/YearlyBreakup';
import MonthlyEarnings from '../../../../admin-components/dashboard/MonthlyEarnings';
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