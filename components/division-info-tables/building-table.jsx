import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DivisionPopup from './division-popup';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export default function BuildingsTable({ heir_details_list }) {
  let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
  let [TableExpandOpen2, setTableExpandOpen2] = React.useState({});    
  let [HeirList, setHeirList] = useState([]);
  let [HeirDetailsList, setHeirDetailsList] = useState([]);
  let [HeirId, setHeirId] = useState(0);
  let [PropertyId, setPropertyId] = useState(0);
  let [TotalAmount, setTotalAmount] = useState(0);
  let [ListTotalAmount, setListTotalAmount] = useState(0);
  const [ApiCallRoute, setApiCallRoute] = useState("buildings");
  const [BuildingsList, setBuildingsList] = useState([]);
  const [HeirSharingDetails, setHeirSharingDetails] = useState([]);  
  const [OpenModalPopup, setOpenModalPopup] = React.useState(false);
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [SnackbarMsg, setSnackbarMsg] = useState("Buildings split details saved successfully.");

  useEffect(() => {
    setHeirList(heir_details_list);
    setHeirDetailsList(heir_details_list);
    GetBuildingsList();
  }, []);

  //Load Heir sharing details
  const GetHeirSharingDetails = async (Id) => {
    let data;
    let auth_key = atob(sessionStorage.getItem("auth_key"));
    const params = { auth_key: auth_key, id: Id };
    if (!auth_key && !Id) {
      return;
    }
    try {
      const response = await fetch(`https://minelife-api.azurewebsites.net/get_buildings?auth_key=${params.auth_key}&id=${params.id}`);
      data = await response.json();
      if (!response.ok) throw new Error(data);

      if (response.ok) {
        setHeirSharingDetails(data.heir_sharing_details);
      }      
    } catch (error) {
      setHeirSharingDetails([]);
      console.log("Error", error);
    }
  }

  //Load cash savings list
  const GetBuildingsList = async () => {
    let data;
    const auth_key = atob(sessionStorage.getItem("auth_key"));
    if (!auth_key) {
      return;
    }
    try {
      const response = await fetch(`https://minelife-api.azurewebsites.net/list_buildings?auth_key=${auth_key}`);
      data = await response.json();
      if (!response.ok) throw new Error(data);

      if (response.ok) {
        TotalAmount = 0;
        setBuildingsList(data?.buildings_details);
        {data?.buildings_details?.map((list) => {
            if (list.appraisal_value !== 0) {
              TotalAmount = TotalAmount + list.appraisal_value;
              setTotalAmount(TotalAmount);
            }
          })
        };
      }
    } catch (error) {
      setBuildingsList([]);
      setTotalAmount(0);
      console.log("Error", error);
    }
  };

  //Modal popup open and close function
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleModalOpen = (event) => {
    setOpenModalPopup(true);
  }
  const handleModalClose = () => {
    setOpenModalPopup(false);
    GetHeirSharingDetails(PropertyId);
  }

  //Table row expand function
  const handleExpandFun = () => {
    setTableExpandOpen(!TableExpandOpen);
    setTableExpandOpen2(false);
  }

  //Table row expand function-2
  const handleExpandFun2 = (event) => {
    const iconClickId = Number(event.currentTarget.id);
    const customerId = Number(event.currentTarget.name);
    const ListTotalAmount = event.currentTarget.value;

    setListTotalAmount(ListTotalAmount);
    setPropertyId(iconClickId);

    // Reset all expand states to false and then open the current one
    setTableExpandOpen2((prevExpandState) => {
      const newExpandState = Object.keys(prevExpandState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      newExpandState[iconClickId] = !prevExpandState[iconClickId];
      return newExpandState;
    });

    if (!TableExpandOpen2[iconClickId]) {
      HeirList = heir_details_list;
      GetHeirSharingDetails(iconClickId);
    }
  };

  return (
    <>
      <DivisionPopup OpenModalPopup={OpenModalPopup} HeirSharingDetails={HeirSharingDetails} ListTotalAmount={ListTotalAmount} PropertyId={PropertyId} ApiCallRoute={ApiCallRoute} handleModalClose={handleModalClose} />
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
      <div className="">
        <Table aria-label="collapsible table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="" align="left"><span className="font-medium">建物</span></TableCell>
              <TableCell className="invisible" align="left"><span className="font-medium">Column</span></TableCell>
              <TableCell className="invisible" align="left"><span className="font-medium">Column</span></TableCell>
              <TableCell className="table-20" align="right">{TotalAmount.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
              <TableCell className="cursor-pointer" align="right">
                <Box className="invisible inline-block">
                  <HtmlTooltip>
                    <QuestionMarkIcon style={{ fontSize: 18 }} className="mr-2 p-1 bg-warning-main rounded-lg text-black" />
                  </HtmlTooltip>
                </Box>
                <span onClick={handleExpandFun} className="font-medium bg-blue-500 rounded-sm py-1 px-2 text-white">入力</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="border border-light-gray border-l" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Box className="my-2">
                    <Table>
                      <TableHead className="table-head-2">
                        <TableRow>
                          <TableCell className="border-light-gray border-l border-t" align="left"><span className="font-medium">所在</span></TableCell>
                          <TableCell className="border-light-gray border-l border-t"><span className="font-medium">床面積</span></TableCell>
                          <TableCell className="border-light-gray border-l border-t" align="right"><span className="font-medium">金額</span></TableCell>
                          <TableCell className="border-light-gray border-l border-t border-r" align="center"><span className="font-medium text-red-300">分割情報入力</span></TableCell>
                        </TableRow>
                        {BuildingsList.map((list, index) => (
                          <React.Fragment key={list.id}>
                            <TableRow key={list.id} id={list.id} value={list.customer_id}>
                              <TableCell className="border-light-gray border-l">{list.location}</TableCell>
                              <TableCell className="border-light-gray border-l">{list.location_and_lot_number}</TableCell>
                              <TableCell className=" border-light-gray border-l w-20" align="right">
                                {list.appraisal_value.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span>
                              </TableCell>
                              <TableCell className="border-light-gray border-l border-r w-15" align="center">
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  id={list.id}
                                  name={list.customer_id}
                                  value={list.appraisal_value.toLocaleString()}
                                  onClick={handleExpandFun2}
                                >
                                  {TableExpandOpen2[list.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            <TableRow className="w-full">
                              <TableCell className="border-light-gray border-l border-r" style={{ padding: 0 }} colSpan={10}>
                                <Collapse in={TableExpandOpen2[list.id]} timeout="auto" unmountOnExit>
                                  <Box>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={10}><span className="font-medium">分割情報の入力</span></TableCell>
                                        </TableRow>
                                        <TableRow>
                                          {HeirList.map((heir) => (
                                            <>
                                              <TableCell id={heir.heir_id} className="border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>
                                            </>
                                          ))}
                                          <TableCell className="border-light-gray border-l border-r w-15 bg-table-gray" align="center">入力</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow>
                                          {HeirSharingDetails.map((heir_lists) => (
                                            <React.Fragment key={heir_lists.heir_id}>
                                              {heir_lists.numerator == 0 && heir_lists.denominator == 0 ? (
                                                <TableCell
                                                  id={heir_lists.heir_id}
                                                  className="border border-light-gray border-l"
                                                  align="right"
                                                >
                                                  {heir_lists.share_amount.toLocaleString()}
                                                  <span className="inline-block float-right border-l text-right border-light-gray pl-1">
                                                    円
                                                  </span>
                                                </TableCell>
                                              ) : (
                                                <TableCell
                                                  id={heir_lists.heir_id}
                                                  className="border border-light-gray border-l"
                                                  align="right"
                                                >
                                                  {heir_lists.numerator}/{heir_lists.denominator}
                                                </TableCell>
                                              )}
                                            </React.Fragment>
                                          ))}
                                          <TableCell className="border-light-gray border-l border-r cursor-pointer" align="center"><EditNoteIcon id={""} value={""} className="cursor-pointer" onClick={handleModalOpen} /></TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableHead>
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