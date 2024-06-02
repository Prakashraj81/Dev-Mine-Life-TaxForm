import React from "react";
import { Grid, Box, Card, Stacck, Typography } from '@mui/material';

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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopCards />
          </Grid>          
          <Grid item xs={12} lg={12}>
            <CustomerTickets />
          </Grid> 
        </Grid>
      </Box>
    </>
  )
}

AdminDashboard.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};