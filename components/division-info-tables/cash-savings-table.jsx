/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditNoteIcon from '@mui/icons-material/EditNote';
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


export default function CashSavingsTable({ heir_details_list }) {
  let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
  //let [TableExpandOpen2, setTableExpandOpen2] = React.useState(false);
  let [TableExpandOpen2, setTableExpandOpen2] = React.useState({});
  let [OpenModalPopup, setOpenModalPopup] = React.useState(false);

  let [ApiCallRoute, setApiCallRoute] = useState("cash_deposit");
  let [HeirList, setHeirList] = useState([]);
  let [HeirDetailsList, setHeirDetailsList] = useState([]);
  let [PropertyId, setPropertyId] = useState(0);
  let [TotalAmount, setTotalAmount] = useState(0);
  let [ListTotalAmount, setListTotalAmount] = useState(0);
  let [cashSavingsList, setcashSavingsList] = useState([]);
  let [HeirSharingDetails, setHeirSharingDetails] = useState([]);
  let [SnackbarOpen, setSnackbarOpen] = useState(false);
  let [SnackbarMsg, setSnackbarMsg] = useState("Cash savings split details saved successfully.");


  useEffect(() => {
    GetCashSavingsList();
    setHeirList(heir_details_list);
    setHeirDetailsList(heir_details_list);    
  }, []);

  //Load Heir sharing details
  const GetHeirSharingDetails = async (Id) => {
    const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
    if (auth_key !== null && Id !== 0) {
      try {
        const response = await fetch(`https://minelife-api.azurewebsites.net/get_cash_deposit?auth_key=${auth_key}&id=${Id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data);

        if (response.ok) {
          setHeirSharingDetails(data.heir_sharing_details);          
        }
        else {
          setHeirSharingDetails([]);
        }
      } catch (error) {
        console.log("Error", error);
        setHeirSharingDetails([]);
      }
    }
  }

  //Load cash savings list
  const GetCashSavingsList = async () => {
    const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
    if (auth_key) {
      try {
        const response = await fetch(`https://minelife-api.azurewebsites.net/list_cash_deposit?auth_key=${auth_key}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data);

        if (response.ok) {
          TotalAmount = 0;
          setcashSavingsList(data.cash_deposit_details);
          {data.cash_deposit_details.map((list) => {
              if (list.amount !== 0) {
                TotalAmount = TotalAmount + list.amount;
                setTotalAmount(TotalAmount);
              }
            })
          };
        }
        else {
          setcashSavingsList([]);
        }
      } catch (error) {
        console.log("Error", error);
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

  const handleModalOpen = () => {
    setHeirDetailsList(HeirSharingDetails);
    setListTotalAmount(ListTotalAmount);
    setPropertyId(PropertyId);
    setOpenModalPopup(true);
  }
  const handleModalClose = () => {
    setOpenModalPopup(false);
    GetHeirSharingDetails(PropertyId);      
  }

  //Table row expand function
  const handleExpandFun = () => {
    setTableExpandOpen(!TableExpandOpen);
    setTableExpandOpen2(true);
  }

  //Table row expand function-2 
  const handleExpandFun2 = (event) => {
    const iconClickId = Number(event.currentTarget.id);
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
              <TableCell className="" align="left"><span className="font-medium">現金預金</span></TableCell>
              <TableCell className="invisible" align="left"><span className="font-medium">Column</span></TableCell>
              <TableCell className="invisible" align="left"><span className="font-medium">Column</span></TableCell>
              <TableCell className="table-20" align="right">{TotalAmount.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
              <TableCell className="cursor-pointer" align="right">
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit"></Typography>
                    <p>1. 上場株式
                      原則として次の(1)から(4)までの価額のうち、最も低い価額で評価します。
                      <Box>
                        <ul>
                          <li>(1) 相続の開始があった日の終値</li>
                          <li>(2) 相続の開始があった月の毎日の終値の月平均額</li>
                          <li>(3)相続の開始があった月の前月の毎日の終値の月平均額</li>
                          <li>(4)相続の開始があった月の前々月の毎日の終値の月平均額</li>
                        </ul>
                      </Box>
                      ※上場株式の評価には国税庁発行の「上場株式の評価明細書」をご利用ください。
                      添付書類としてそのまま提出可能です。                      
                    </p>
                    <br/>
                    <h4>【参考】</h4>
                    <Box>
                        <ul>
                          <li>(1) 相続の開始があった日の終値</li>
                          <li>(2) 相続の開始があった月の毎日の終値の月平均額</li>
                          <li>(3)相続の開始があった月の前月の毎日の終値の月平均額</li>
                          <li>(4)相続の開始があった月の前々月の毎日の終値の月平均額</li>
                        </ul>
                      </Box>
                      <Box>
                        <image src="https://minatosc.kspot.net/images/aisouzoku-logo.png"/>
                      </Box>
                  </React.Fragment>
                }
              >
                <QuestionMarkIcon style={{ fontSize: 18 }} className="mr-2 p-1 bg-warning-main rounded-lg text-black"/>                
              </HtmlTooltip>
              <span onClick={handleExpandFun} className="font-medium bg-blue-500 rounded-sm py-1 px-2 text-white">入力</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Box className="my-2">
                    <Table>
                      <TableHead className="table-head-2">
                        <TableRow>
                          <TableCell className="border-light-gray border-t border-l" align="left"><span className="font-medium">預金の種類</span></TableCell>
                          <TableCell className="border-light-gray border-t border-l"><span className="font-medium">金融機関名</span></TableCell>
                          <TableCell className="border-light-gray border-t border-l" align="right"><span className="font-medium">金額</span></TableCell>
                          <TableCell className="border-light-gray border-t border-l border-r" align="center"><span className="font-medium text-red-300">分割情報入力</span></TableCell>
                        </TableRow>
                        {cashSavingsList.map((list) => (
                          <React.Fragment key={list.id}>
                            <TableRow key={list.id} id={list.id} value={list.customer_id}>
                              <TableCell className="border-light-gray border-l">{list.deposit_type}</TableCell>
                              {list.address ?
                                <TableCell className="border-light-gray border-l">{list.address}</TableCell>
                                :
                                <TableCell className="border-light-gray border-l">{list.financial_institution_name}</TableCell>
                              }
                              <TableCell className=" border-light-gray border-l w-20" align="right">
                                {list.amount.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span>
                              </TableCell>
                              <TableCell className="border-light-gray border-l border-r w-15" align="center">
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  id={list.id}
                                  name={list.customer_id}
                                  value={list.amount.toLocaleString()}
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

// Add PropTypes validation
CashSavingsTable.propTypes = {
  heir_details_list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      benefitAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
};