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

export default function GiftDuringLifeTable() {
    let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
    let [TableExpandOpen2, setTableExpandOpen2] = React.useState(false);
    let [OpenModalPopup, setOpenModalPopup] = React.useState(false);   

    let HeirList = [
      { id: 1, name: "Shree", value: "Cash savings_1", value_1: "Cash_1", total: 1500 },
      { id: 2, name: "Prakashraj", value: "Cash savings_2", value_1: "Cash_2", total: 500  },
      { id: 3, name: "Gowtham", value: "", value_1: "Cash_3", total: 3000  },    
      { id: 4, name: "Dhinesh", value: "", value_1: "Cash_3", total: 700  }, 
      { id: 5, name: "Nisar", value: "", value_1: "Cash_3", total: 1800  },      
  ];

  let HeirLists = [
      { id: 1, amount: 300 },
      { id: 2, amount: 150 },
      { id: 3, amount: 1000 },      
      { id: 4, amount: 1800 }, 
      { id: 5, amount: 1800 },      
  ]; 

    //Modal popup open and close function
    const handleModalOpen =()=>{ 
        setOpenModalPopup(true);    
    }    
    const handleModalClose =()=>{ 
        setOpenModalPopup(false);    
    }    

    //Table row expand function
    const handleExpandFun =()=>{
        setTableExpandOpen(!TableExpandOpen);    
        setTableExpandOpen2(false);
    }

   
  return (
    <>
    <DivisionPopup OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose}/>
    <div className="py-2">
      <Table aria-label="collapsible table">
          <TableHead className="table-head-55">
              <TableRow>
                  <TableCell className="border border-light-gray border-l" align="left"><span className="font-medium">贈与税額控除</span></TableCell>
                  {/* <TableCell className="border border-light-gray border-l invisible" align="left"><span className="font-medium">Column</span></TableCell> */}
                  {/* <TableCell className="border border-light-gray border-l invisible" align="left"><span className="font-medium">Column</span></TableCell> */}
                  <TableCell className="table-20 border border-light-gray border-l" align="right">0<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
                  <TableCell onClick={handleExpandFun} className="border border-light-gray border-l cursor-pointer" align="left">                    
                    <span className="font-medium text-red-500">確認</span>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                     
            <TableRow>
              <TableCell className="border border-light-gray border-l" style={{ paddingBottom: TableExpandOpen ? '10px' : '0px', paddingTop: TableExpandOpen ? '10px' : '0px'}} colSpan={10}>                  
                  <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                    <Box>
                        <Table>
                          <TableHead>                                   
                            <TableRow>      
                                {HeirList.map((heir)=>(
                                <>
                                  <TableCell id={heir.id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>            
                                </>
                                ))}                  
                                <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell>
                            </TableRow>                    
                          </TableHead>
                              <TableBody>
                                <TableRow>  
                                  {HeirLists.map((heir_lists)=>(
                                  <>
                                      <TableCell id={heir_lists.id} className="border border-light-gray border-l" align="right">{heir_lists.amount}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>       
                                  </>
                                  ))}                   
                                  <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon className="cursor-pointer" onClick={handleModalOpen}/></TableCell>
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