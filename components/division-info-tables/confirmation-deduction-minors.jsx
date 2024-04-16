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


export default function ConfirmationDeductionMinors() {
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


    let TotalPrice = "10,000";
    let totalValuation = 0;
    let total = 0; 

    //Modal popup open and close function
    const handleModalOpen =(event)=>{ 
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

    //Table row expand function-2
    const handleExpandFun2 =()=>{
      setTableExpandOpen2(!TableExpandOpen2);    
  }
   
  return (
    <>
    <DivisionPopup OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose}/>
    <div className="py-2">
        <Table aria-label="collapsible table">
          <TableHead className="table-head-50">
            <TableRow>
                <TableCell className="border border-light-gray border-l" align="left"><span className="font-semibold">未成年控除の確認（控除不足額の扶養義務者への按分指定）</span></TableCell>
                <TableCell className="border border-light-gray border-l cursor-pointer" align="center" onClick={handleExpandFun}><span className="font-semibold text-red-500">確認・入力</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>                     
            <TableRow>
              <TableCell className="border border-light-gray border-l" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                  <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                    <Box className="my-2">
                        <Table>
                          <TableHead>                                  
                            <TableRow>      
                                {HeirList.map((heir)=>(
                                <>
                                  <TableCell id={heir.id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>            
                                </>
                                ))}                  
                                {/* <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell> */}
                                <TableCell className="border border-light-gray border-l bg-table-gray invisible" align="center">Column</TableCell>
                            </TableRow>                    
                          </TableHead>
                              <TableBody>
                                <TableRow>  
                                  {HeirLists.map((heir_lists)=>(
                                  <>
                                      <TableCell id={heir_lists.id} className="border border-light-gray border-l" align="right">{heir_lists.amount}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>       
                                  </>
                                  ))}                   
                                  {/* <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon className="cursor-pointer" onClick={handleModalOpen}/></TableCell> */}
                                  <TableCell className="border border-light-gray border-l bg-table-gray invisible" align="center">Column</TableCell>
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