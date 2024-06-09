// import React, { useState, useEffect } from "react";
// import { Grid, Box, Card, Stack, Typography } from '@mui/material';
// import PageContainer from '../../admin-components/container/PageContainer';
// import AdminLogin from '../admin/auth/login';
// // components
// import Dashboard from './pages/dashboard';
// import FullLayout from '../../admin-components/layouts/full/FullLayout';
// import BlankLayout from '../../admin-components/layouts/blank/BlankLayout';

// export default function Home() {
//   let [Authkey, setAuthkey] = useState(0);
//   let sessionValue = 0;
//   let value;
//   useEffect(() => {
//     let AdminLoginvalue = sessionStorage.getItem('admin_user_login');
//     let admin_auth_key = sessionStorage.getItem('admin_auth_key');
//     if(AdminLoginvalue !== null && admin_auth_key !== null){
//       value = atob(AdminLoginvalue);   
//       setAuthkey(1);
//     }   
//     else{
//       setAuthkey(0);
//     } 
//   }, [Authkey]);
//   return (
//     <>
//       {Authkey ?
//         <>
//           <FullLayout>
//             <PageContainer title="Admin dashboard" description="Admin dashboard">
//               <AdminDashboard />
//             </PageContainer>
//           </FullLayout>
//         </>
//         :
//         <>
//           <BlankLayout>
//             <PageContainer title="Mine life admin-login" description="Mine life admin-login">
//               <Box>
//                 <AdminLogin />
//               </Box>
//             </PageContainer>
//           </BlankLayout>
//         </>
//       }
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import PageContainer from '../../admin-components/container/PageContainer';
import AdminLogin from '../admin/auth/login';
// components
import Dashboard from './pages/dashboard';
import FullLayout from '../../admin-components/layouts/full/FullLayout';
import BlankLayout from '../../admin-components/layouts/blank/BlankLayout';

export default function Home() {
  const [Authkey, setAuthkey] = useState(0);

  useEffect(() => {
    const AdminLoginvalue = sessionStorage.getItem('admin_user_login');
    const admin_auth_key = sessionStorage.getItem('admin_auth_key');
    if (AdminLoginvalue !== null && admin_auth_key !== null) {
      setAuthkey(1);
    } else {
      setAuthkey(0);
    }
  }, []);

  return (
    <>
      {Authkey ?
        <FullLayout>
          <PageContainer title="Admin dashboard" description="Admin dashboard">
            <Dashboard />
          </PageContainer>
        </FullLayout>
        :
        <BlankLayout>
          <PageContainer title="Mine life admin-login" description="Mine life admin-login">
            <Box>
              <AdminLogin />
            </Box>
          </PageContainer>
        </BlankLayout>
      }
    </>
  );
}
