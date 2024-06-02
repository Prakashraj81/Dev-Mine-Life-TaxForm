import type { ReactElement } from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import Link  from 'next/link';
import BlankLayout from '../../../admin-components/layouts/blank/BlankLayout';
import PageContainer from '../../../admin-components/container/PageContainer';
import Logo from '../../../admin-components/layouts/full/shared/logo/Logo';
import CustomTextField from '../../../admin-components/forms/theme-elements/CustomTextField';

const Register2 = () => (
  <PageContainer title="Register" description="this is Register page">
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <Box>
            <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={500} fontSize={14} component="label" htmlFor='name' mb="5px">Name</Typography>
                <CustomTextField id="name" variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={500} fontSize={14} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={500} fontSize={14} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth />
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/admin/auth/login">                
                <Typography fontWeight={500} fontSize={14}>Sign Up</Typography>
            </Button>
        </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register2;

Register2.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};