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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BackdropLoader from '../../../../components/loader/backdrop-loader';

export default function ContactUs() {
  let [page, setPage] = React.useState(0);
  let [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [OpenModalPopup, setOpenModalPopup] = useState(false);
  let [EnquiryData, setEnquiryData] = useState([]);
  let [AdminContactList, setAdminContactList] = useState([]);
  let [Message, setMessage] = useState("");

  let [ShowLoader, setShowLoader] = useState(false);
  let [ShowAlert, setShowAlert] = useState(false);
  let [AlertMessage, setAlertMessage] = useState("");
  let [AlertVariant, setAlertVariant] = useState("");

  useEffect(() => {
    GetAdminContactUsList();
  }, []);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }  
    setShowAlert(false);
  };

  //Load users list
  const GetAdminContactUsList = async () => {
    let auth_key = atob(sessionStorage.getItem("admin_auth_key"));
    const params = { auth_key: auth_key };
    if (auth_key !== null) {
      try {
        const response = await axios.get('https://minelife-api.azurewebsites.net/admin/list_contact_us', { params });
        if (response.status === 200) {
          setAdminContactList(response.data.contact_us_details);
        }
        else {
          setAdminContactList([]);
        }
      } catch (error) {
        console.log("Errro", error);
      }
    }
  }

  //Modal popup open and close function
  const handleModalOpen = async (id) => {
    let auth_key = atob(sessionStorage.getItem("admin_auth_key"));
    if (id !== null && auth_key !== null) {
      const params = { auth_key: auth_key, detail_id: id };
      try {
        const response = await axios.get('https://minelife-api.azurewebsites.net/admin/get_contact_us_details_by_id', { params });
        if (response.status === 200) {
          setEnquiryData(response.data.contact_us_details);
          setOpenModalPopup(true);
        }
        else {
          setEnquiryData([]);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    setOpenModalPopup(true);
  }
  const handleModalClose = async (paramsData) => {
    setOpenModalPopup(false);
    setOpenModalPopup(true);
    let auth_key = atob(sessionStorage.getItem("admin_auth_key"));
    if (paramsData.detail_id !== null && auth_key !== null) {
      const formData = new FormData();
      formData.append("auth_key", auth_key);
      formData.append("detail_id", paramsData.detail_id);
      formData.append("messsage", paramsData.Message);
      try {
        let response = await axios.post('https://minelife-api.azurewebsites.net/admin/reply_contact_us_details_by_id', formData);
        if (response.status === 200) {   
          setOpenModalPopup(false);       
          setShowLoader(false);
          setAlertVariant("success");
          setAlertMessage(response.data.message);
          setShowAlert(true);
        }
        else{
          setAlertVariant("error");
          setAlertMessage("Please try again");
          setShowAlert(true);
        }
      } catch (error) {
        setOpenModalPopup(false);
        setShowLoader(false);
        console.log('Error:', error);
        if (error.response && error.response.data && typeof error.response.data.error.message === 'string' && error.response.data.error.message.startsWith("'phone'")) {
          setAlertVariant("error");
          setAlertMessage(error.response.data.error.message);
          setShowAlert(true);
        }
        else if (error.response && error.response.data && typeof error.response.data.error.message === 'string' && error.response.data.error.message.startsWith("'postal'")) {
          setAlertVariant("error");
          setAlertMessage(error.response.data.error.message);
          setShowAlert(true);
        }
        else {
          setAlertVariant("error");
          setAlertMessage(error.response.data.error.message);
          setShowAlert(true);
        }
      }
    }
    else {
      setOpenModalPopup(false);
    }
  }

  return (
    <>
      {ShowLoader && (
        <BackdropLoader ShowLoader={ShowLoader} />
      )}
      {ShowAlert && (
        <>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={ShowAlert} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={AlertVariant} variant="filled" sx={{ width: '100%', color: '#FFF' }}>
              {AlertMessage}
            </Alert>
          </Snackbar>
        </>
      )}
      <EnquiryViewModal EnquiryData={EnquiryData} OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose} />
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
                .map((lists, index) => {
                  // Split the date and time
                  let splitActivity = lists.created_at.split('T');
                  let formattedDate = splitActivity[0];
                  //let formattedTime = splitActivity[1];

                  return (
                    <TableRow key={lists.name} sx={{ border: "2px solid #f6f9fc" }}>
                      <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                        <Typography>
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                        <Typography>{formattedDate}</Typography>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-between items-center">
                          <Tooltip title="View" arrow>
                            <IconEye id={lists.contact_form_id} onClick={() => handleModalOpen(lists.contact_form_id)} className="mx-auto text-primary-blue cursor-pointer" />
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconTrashX className="mx-auto text-error-main cursor-pointer" />
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}


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