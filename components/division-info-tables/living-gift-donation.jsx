/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DivisionPopup from './division-popup';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PropTypes from 'prop-types';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 450,
    maxHeight: 200,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    overflowY: 'auto',
    overflowX: 'auto',
    padding: '15px 20px',
  },
}));

export default function LivingDonationTable({ heir_details_list }) {
  let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
  let [TableExpandOpen1, setTableExpandOpen1] = React.useState(false);
  let [OpenModalPopup, setOpenModalPopup] = React.useState(false);

  let [ApiCallRoute, setApiCallRoute] = useState("");
  //let [HeirList, setHeirList] = useState([]);
  let [HeirDetailsList, setHeirDetailsList] = useState([]);
  let [PropertyId, setPropertyId] = useState(0);
  let [TotalAmount, setTotalAmount] = useState(0);
  let [ListTotalAmount, setListTotalAmount] = useState(0);
  let [LivingDonationList, setLivingDonationList] = useState([]);
  let [SnackbarOpen, setSnackbarOpen] = useState(false);
  let [SnackbarMsg, setSnackbarMsg] = useState("Living gift donation split details saved successfully.");

  let HeirList = [
    { id: 1, name: "Shree", value: "Cash savings_1", value_1: "Cash_1", total: 1500 },
    { id: 2, name: "Prakashraj", value: "Cash savings_2", value_1: "Cash_2", total: 500 },
    { id: 3, name: "Gowtham", value: "", value_1: "Cash_3", total: 3000 },
    { id: 4, name: "Dhinesh", value: "", value_1: "Cash_3", total: 700 },
    { id: 5, name: "Nisar", value: "", value_1: "Cash_3", total: 1800 },
  ];
 
  useEffect(() => {
    GetLivingDonationList();
    //setHeirList(heir_details_list);
    setHeirDetailsList(heir_details_list);
  }, []);

  //Load cash savings list
  const GetLivingDonationList = async () => {
    let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
    const params = { auth_key: auth_key };
    if (auth_key !== null) {
      try {
        const response = await fetch(`https://minelife-api.azurewebsites.net/`, { params });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        
        if (response.ok) {
          setTotalAmount(0);
          // setLivingDonationList(response.data.funeral_expenses_details);
          // {response.data.funeral_expenses_details.map((list) => {
          //   if(list.amount !== 0){
          //     TotalAmount = TotalAmount + list.amount;
          //     setTotalAmount(TotalAmount);
          //   }
          // })};
        }
        else {
          setLivingDonationList([]);
        }
      } catch (error) {
        console.log("Errro", error);
      }
    }
  }


  //Modal popup open and close function
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleModalClose = () => {
    setOpenModalPopup(false);
  }

  //Table row expand function
  const handleExpandFun = () => {
    setTableExpandOpen(!TableExpandOpen);
    setTableExpandOpen1(false);
  }

  return (
    <>
      <DivisionPopup OpenModalPopup={OpenModalPopup} ListTotalAmount={ListTotalAmount} PropertyId={PropertyId} ApiCallRoute={ApiCallRoute} handleModalClose={handleModalClose} />
      <>
        <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert
            onClose={handleSnackbarClose}
            severity={SnackbarMsg}
            variant="filled"
            sx={{ width: '100%', color: "#FFF" }}
          >
            {SnackbarMsg}
          </Alert>
        </Snackbar>
      </>
      <div className="py-0">
        <Table aria-label="collapsible table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="" align="left" sx={{border: 'none'}}><span className="font-medium">生前贈与</span></TableCell>
              <TableCell className="invisible" align="left" sx={{border: 'none'}}><span className="font-medium">Column</span></TableCell>
              <TableCell className="invisible" align="left" sx={{border: 'none'}}><span className="font-medium">Column</span></TableCell>
              <TableCell className="" align="right" sx={{border: 'none'}}>{TotalAmount.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
              <TableCell className="cursor-pointer" align="right" sx={{border: 'none'}}>
                <Box className="invisible inline-block">
                  <HtmlTooltip>
                    <QuestionMarkIcon style={{ fontSize: 18 }} className="mr-2 p-1 bg-warning-main rounded-lg text-black" />
                  </HtmlTooltip>
                </Box>
                <span onClick={handleExpandFun} className="font-medium bg-blue-500 rounded-sm py-1 px-2 text-white">確認</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
              <TableCell className="" style={{ paddingBottom: 0, paddingTop: 0, padding: '0'}} colSpan={10}>
                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Box>
                    <Table>
                      <TableHead>                       
                        <TableRow>
                          {HeirList.map((heir) => (
                            <>
                              <TableCell id={heir.heir_id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>
                            </>
                          ))}
                          {/* <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {HeirList.map((heir_lists) => (
                            <>
                              <TableCell id={heir_lists.heir_id} className="border border-light-gray border-l" align="right">{heir_lists.amount}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
                            </>
                          ))}
                          {/* <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon id={""} value={""} className="cursor-pointer" onClick={handleModalOpen} /></TableCell> */}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

// Add PropTypes validation
LivingDonationTable.propTypes = {
  heir_details_list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      benefitAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
};