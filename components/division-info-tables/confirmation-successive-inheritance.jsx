/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DivisionPopup from './division-popup';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function ConfirmationSuccessiveInheritance({ heir_details_list }) {
  let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
  //let [TableExpandOpen2, setTableExpandOpen2] = React.useState(false);
  let [TableExpandOpen2, setTableExpandOpen2] = React.useState({});
  let [OpenModalPopup, setOpenModalPopup] = React.useState(false);

  let [ApiCallRoute, setApiCallRoute] = useState("successive");
  let [HeirList, setHeirList] = useState([]);
  let [HeirDetailsList, setHeirDetailsList] = useState([]);
  let [HeirId, setHeirId] = useState(0);
  let [PropertyId, setPropertyId] = useState(0);
  let [TotalAmount, setTotalAmount] = useState(0);
  let [ListTotalAmount, setListTotalAmount] = useState(0);
  let [DebtList, setDebtList] = useState([]);
  let [HeirSharingDetails, setHeirSharingDetails] = useState([]);
  let [SnackbarOpen, setSnackbarOpen] = useState(false);
  let [SnackbarMsg, setSnackbarMsg] = useState("Successive split details saved successfully.");

  useEffect(() => {
    setHeirList(heir_details_list);
    setHeirDetailsList(heir_details_list);
  }, []);

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
  }

  //Table row expand function
  const handleExpandFun = () => {
    setTableExpandOpen(!TableExpandOpen);
    setTableExpandOpen2(false);
  }

  //Table row expand function-2
  // const handleExpandFun = (event) => {
  //   const iconClickId = Number(event.currentTarget.id);
  //   const customerId = Number(event.currentTarget.name);
  //   const ListTotalAmount = event.currentTarget.value;

  //   setListTotalAmount(ListTotalAmount);
  //   setPropertyId(iconClickId);

  //   // Reset all expand states to false and then open the current one
  //   setTableExpandOpen2((prevExpandState) => {
  //     const newExpandState = Object.keys(prevExpandState).reduce((acc, key) => {
  //       acc[key] = false;
  //       return acc;
  //     }, {});
  //     newExpandState[iconClickId] = !prevExpandState[iconClickId];
  //     return newExpandState;
  //   });

  //   if (!TableExpandOpen2[iconClickId]) {
  //     HeirList = heir_details_list;
  //   }
  // };

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

      <div className="py-2">
        <Table aria-label="collapsible table">
          <TableHead className="table-head-50">
            <TableRow>
              <TableCell className="border border-light-gray border-l" align="left"><span className="font-medium">相次相続控除</span></TableCell>
              <TableCell className="border border-light-gray border-l cursor-pointer" align="left" onClick={handleExpandFun}><span className="font-medium text-red-500">確認・入力</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="border border-light-gray border-l" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Box>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="left">前相続の被相続人氏名</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="left">前の相続に係る被相続人と今回の相続に係る被相続人との続柄</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="left">前の相続に係る相続税の申告書の提出先</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="left">前相続の発生日</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="left">今回の相続人が前相続において取得した財産額（相続時精算課税適用財産含む）</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="left">前相続で今回の被相続人が支払った相続税額</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                        </TableRow>

                        <TableRow className="w-full">
                          <TableCell className="border border-light-gray border-l" style={{ padding: 0 }} colSpan={10}>
                            <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                              <Box>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={10}><span className="font-medium">分割情報の入力</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      {HeirList.map((heir) => (
                                        <>
                                          <TableCell id={heir.heir_id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>
                                        </>
                                      ))}
                                      <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      {HeirList.map((heir_lists) => (
                                        <>
                                          <TableCell id={heir_lists.heir_id} className="border border-light-gray border-l" align="right">{heir_lists.amount}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
                                        </>
                                      ))}
                                      <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon id={""} value={""} className="cursor-pointer" onClick={handleModalOpen} /></TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
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