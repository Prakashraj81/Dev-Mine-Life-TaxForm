import React, { useEffect, useState } from "react";
import axios from "axios";
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
  TablePagination,
  Tooltip,
} from "@mui/material";
import { IconEye, IconCirclePlus, IconTrashX } from "@tabler/icons-react";
import FullLayout from "../../../../admin-components/layouts/full/FullLayout";
import DashboardCard from "../../../../admin-components/shared/DashboardCard";
import EnquiryViewModal from '../../../../admin-components/modal/enquiry-view-modal';

export default function ContactUs() {
  let [page, setPage] = React.useState(0);   
  let [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [OpenModalPopup, setOpenModalPopup] = useState(false);   
  let [EnquiryData, setEnquiryData] = useState([]);
  let [AdminContactList, setAdminContactList] = useState([]);

  useEffect(() => {        
    GetAdminContactUsList();
}, []);


//Load users list
const GetAdminContactUsList = async()=>{
    let auth_key = atob(sessionStorage.getItem("admin_auth_key"));
    const params = { auth_key: auth_key };
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/admin/list_contact_us', {params});
            if(response.status === 200){
              setAdminContactList(response.data.contact_us_details);
            }
            else{
              setAdminContactList([]);
            }
        }catch(error){
            console.log("Errro", error);
        }
    }        
}

   //Modal popup open and close function
    const handleModalOpen =(rowData)=>{ 
      let RowId = Number(rowData.id);      
      if(RowId !== 0){     
        setEnquiryData(rowData);   
        setOpenModalPopup(true);  
      }          
      setOpenModalPopup(true); 
    }    
    const handleModalClose =()=>{ 
        setOpenModalPopup(false);    
    } 

  return (
    <>
      <EnquiryViewModal EnquiryData={EnquiryData} OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose}/>
      <DashboardCard title="Contact Us List">        
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
                    Phone no
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Inquiry type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date
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
              {AdminContactList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lists, index) => (
                  <TableRow key={lists.name} sx={{ border: "2px solid #f6f9fc" }}>
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
                            {lists.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{lists.email}</Typography>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{lists.phone}</Typography>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{lists.inquiry_details}</Typography>
                    </TableCell>
                    <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                      <Typography>{lists.created_at}</Typography>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-between items-center">
                        <Tooltip title="View" arrow>
                          <IconEye id={lists.id} value={lists.email} onClick={() => handleModalOpen(lists)} className="mx-auto text-primary-blue cursor-pointer" />
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconTrashX className="mx-auto text-error-main cursor-pointer" />
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={AdminContactList.length}
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

ContactUs.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};