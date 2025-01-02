/* eslint-disable no-unused-vars */
import React from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DivisionPopup from './division-popup';

export default function ConfirmationDeductionPersons() {
  let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
  let [TableExpandOpen2, setTableExpandOpen2] = React.useState(false);
  let [OpenModalPopup, setOpenModalPopup] = React.useState(false);

  let HeirList = [
    { id: 1, name: "Shree", value: "Cash savings_1", value_1: "Cash_1", total: 1500 },
    { id: 2, name: "Prakashraj", value: "Cash savings_2", value_1: "Cash_2", total: 500 },
    { id: 3, name: "Gowtham", value: "", value_1: "Cash_3", total: 3000 },
    { id: 4, name: "Dhinesh", value: "", value_1: "Cash_3", total: 700 },
    { id: 5, name: "Nisar", value: "", value_1: "Cash_3", total: 1800 },
  ];
  let HeirLists = [
    { id: 1, amount: "" },
    { id: 2, amount: "" },
    { id: 3, amount: "" },
    { id: 4, amount: "" },
    { id: 5, amount: "" },
  ];


  //Modal popup open and close function
  const handleModalOpen = () => {
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


  return (
    <>
      <DivisionPopup OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose} />
      <div className="py-2">
        <Table aria-label="collapsible table">
          <TableHead className="table-head-50">
            <TableRow>
              <TableCell className="border border-light-gray border-l" align="left"><span className="font-medium">障害者控除の確認（控除不足額の扶養義務者への按分指定）</span></TableCell>
              <TableCell className="border border-light-gray border-l cursor-pointer" align="left" onClick={handleExpandFun}><span className="font-medium text-red-500">確認・入力</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="border border-light-gray border-l" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Box className="my-2">
                    <Table aria-label="collapsible table">
                      <TableBody>
                        <TableRow>
                          <TableCell className="" style={{ padding: 0, border: 'none'}} colSpan={10}>
                            <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                              <Box className="my-2">
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={10}><span className="font-medium">分割情報の入力</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      {HeirList.map((heir) => (
                                        <>
                                          <TableCell id={heir.id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>
                                        </>
                                      ))}
                                      <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      {HeirLists.map((heir_lists) => (
                                        <>
                                          <TableCell id={heir_lists.id} className="border border-light-gray border-l" align="right">{heir_lists.amount}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
                                        </>
                                      ))}
                                      <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon className="cursor-pointer" onClick={handleModalOpen} /></TableCell>
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