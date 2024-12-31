import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { IconCirclePlus, IconTrashX, IconEdit  } from "@tabler/icons-react";
import FullLayout from "../../../../admin-components/layouts/full/FullLayout";
import theme from "../../../../admin-components/theme";
import DashboardCard from "../../../../admin-components/shared/DashboardCard";
import AddAdminUserModal from "../../../../admin-components/modal/add-admin-user-modal";
import DeleteModal from "../../../../admin-components/modal/delete-modal";



export default function AdminUser() {
  let [page, setPage] = React.useState(0);   
  let [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [OpenModalPopup, setOpenModalPopup] = useState(false);   
  let [AdminUserData, setAdminUserData] = useState([]);
  let [DeleteModalOpen, setDeleteModalOpen] = useState(false);   
  let [AdminUsersList, setAdminUsersList] = useState([]);

useEffect(() => {        
    GetAdminUsersList();
}, []);


//Load users list
const GetAdminUsersList = async()=>{
    const auth_key = atob(sessionStorage.getItem("admin_auth_key"));
    if(auth_key !== null){
        try{
            const response = await fetch(`https://minelife-api.azurewebsites.net/admin/list_admin?auth_key=${auth_key}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data);

            if(response.ok){
                setAdminUsersList(data.admin_details);
            }
            else{
                setAdminUsersList([]);
            }
        }catch(error){
            console.log("Errro", error);
        }
    }        
}

   //Modal popup open and close function
    const handleModalOpen =(rowData)=>{ 
      //let adminUserId = Number(rowData.id);
      if(rowData !== null){
        setAdminUserData(rowData);   
      }
      else{
        setAdminUserData([]);  
      }
      setOpenModalPopup(true);        
    }    
    const handleModalClose =()=>{ 
        setOpenModalPopup(false);    
    } 

  //Delete admin user function
  const handleDeleteUser = () => {
    setDeleteModalOpen(!DeleteModalOpen);
  };
  
  const DeleteModalFunction = (event) => {
    let value = event.currentTarget.id;
    let rowId = "ModalId";
    if (value === "Yes") {
      console.log(rowId);
      setDeleteModalOpen(false);
    }
    else {
      setDeleteModalOpen(false);
    }
  };


  return (
    <>
      <AddAdminUserModal AdminUserData={AdminUserData} OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose}/>
      {DeleteModalOpen && (
        <DeleteModal DeleteModalOpen={DeleteModalOpen} DeleteModalFunction={DeleteModalFunction} />
      )}
      <DashboardCard>    
        <Box className="block md:flex lg:flex xl:flex 2xl:flex justify-between items-center">
          <Typography variant="h5">Admin User List</Typography>
          <Button className="flex justify-between items-center bg-primary-blue text-white hover:bg-blue-400" onClick={handleModalOpen}><IconCirclePlus className="pr-2" />Add user</Button>
        </Box>
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    S.No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </TableCell>                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Role
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="subtitle2" fontWeight={600}>
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AdminUsersList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lists, index) => (
                  <TableRow key={lists.admin_name} sx={{ border: "2px solid #f6f9fc" }}>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography>
                            {lists.admin_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{lists.email}</Typography>
                    </TableCell>                    
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{lists.role_name}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderRight: "2px solid #f6f9fc" }}>
                    {lists.is_active === "Yes" ? (
                          <Chip
                              className="text-xs"
                              style={{
                                  backgroundColor: theme.palette.success.light,
                                  color: theme.palette.success.main,
                              }}
                              size="small"
                              label={"Active"}
                          />
                      ) : lists.is_active === "No" ? (
                          <Chip
                              className="text-xs"
                              style={{
                                  backgroundColor: theme.palette.error.light,
                                  color: theme.palette.error.main,
                              }}
                              size="small"
                              label={"InActive"}
                          />
                      ) : (
                          <Chip
                              className="text-xs"
                              size="small"
                              color="error"
                              label="Unknown Status"
                          />
                      )}
                    </TableCell>   
                    <TableCell>
                        <Box className="text-center">
                          <IconButton>
                              <Tooltip title="View" arrow>
                                <IconEdit onClick={() => handleModalOpen(lists)} className="mx-auto text-primary-blue cursor-pointer" />
                              </Tooltip>
                            </IconButton>
                            <IconButton>
                              <Tooltip title="Delete" arrow>
                                <IconTrashX onClick={handleDeleteUser} className="mx-auto text-error-main cursor-pointer" />
                              </Tooltip>
                            </IconButton>  
                        </Box>   
                    </TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={AdminUsersList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </DashboardCard>
    </>
  )
}

AdminUser.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};