import React, { useState, useEffect } from "react";
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
import { IconEye, IconCirclePlus, IconTrashX, IconEdit  } from "@tabler/icons-react";
import FullLayout from "../../../../admin-components/layouts/full/FullLayout";
import theme from "../../../../admin-components/theme";
import DashboardCard from "../../../../admin-components/shared/DashboardCard";
import AddAdminUserModal from "../../../../admin-components/modal/add-admin-user-modal";
import DeleteModal from "../../../../admin-components/modal/delete-modal";


const products = [
  {
    id: "1",
    name: "Prakashraj",
    email: "prakash.raj@g-japan.com",    
    date: "2023-06-05",
    status: "Active",
    password: "123456",
  },  
  {
    id: "2",
    name: "Dhinesh",
    email: "ra.dhinesh@g-japan.com",    
    date: "2023-06-05",
    status: "InActive",
    password: "123456",
  },  
];

export default function AdminUser() {
  let [page, setPage] = React.useState(0);   
  let [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [OpenModalPopup, setOpenModalPopup] = useState(false);   
  let [AdminUserData, setAdminUserData] = useState([]);
  let [DeleteModalOpen, setDeleteModalOpen] = useState(false);   

   //Modal popup open and close function
    const handleModalOpen =(rowData)=>{ 
      let adminUserId = Number(rowData.id);
      if(adminUserId !== 0){
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
  const handleDeleteUser = (event) => {
    setDeleteModalOpen(!DeleteModalOpen);
  }
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
                    Date
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.name} sx={{ border: "2px solid #f6f9fc" }}>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>
                        {product.id}
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
                            {product.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{product.email}</Typography>
                    </TableCell>                    
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{product.date}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderRight: "2px solid #f6f9fc" }}>
                    {product.status === "Active" ? (
                          <Chip
                              className="text-xs"
                              style={{
                                  backgroundColor: theme.palette.success.light,
                                  color: theme.palette.success.main,
                              }}
                              size="small"
                              label={product.status}
                          />
                      ) : product.status === "InActive" ? (
                          <Chip
                              className="text-xs"
                              style={{
                                  backgroundColor: theme.palette.error.light,
                                  color: theme.palette.error.main,
                              }}
                              size="small"
                              label={product.status}
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
                                <IconEdit onClick={() => handleModalOpen(product)} className="mx-auto text-primary-blue cursor-pointer" />
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
          count={products.length}
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