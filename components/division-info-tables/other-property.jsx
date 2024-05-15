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


export default function OthersPropertyTable() {
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
          <TableHead className="table-head">
              <TableRow>
                  <TableCell className="border border-light-gray border-l" align="left"><span className="font-medium">その他財産</span></TableCell>
                  <TableCell className="border border-light-gray border-l invisible" align="left"><span className="font-medium">Column</span></TableCell>
                  <TableCell className="border border-light-gray border-l invisible" align="left"><span className="font-medium">Column</span></TableCell>
                  <TableCell className="border border-light-gray border-l" align="right">1500<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
                  <TableCell className="border border-light-gray border-l cursor-pointer" align="center" onClick={handleExpandFun}><span className="font-medium bg-blue-500 rounded-sm px-1 py-1 px-2 text-white">入力</span></TableCell>
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
                            <TableCell className="border border-light-gray border-l" align="left"><span className="font-medium">財産の名称</span></TableCell>
                            <TableCell className="border border-light-gray border-l"><span className="font-medium">相手先</span></TableCell>
                            <TableCell className="border border-light-gray border-l" align="right"><span className="font-medium">評価額</span></TableCell>
                            <TableCell className="border border-light-gray border-l" align="center"><span className="font-medium text-red-300">分割情報入力</span></TableCell>
                            <TableCell className="border border-light-gray border-l invisible"><span className="font-medium">Column</span></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableRow>      
                          <TableCell className="border border-light-gray border-l">Other property</TableCell>   
                            <TableCell className="border border-light-gray border-l">Other amount</TableCell>   
                            <TableCell className="border border-light-gray border-l" align="right">1500<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell> 
                            <TableCell className="border border-light-gray border-l" align="center">
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={handleExpandFun2}
                              >
                                {TableExpandOpen2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                            <TableCell className="border border-light-gray border-l" align="center"></TableCell>
                        </TableRow>  
                      </Table>                       
                    </Box>
                  </Collapse>

                  <Collapse in={TableExpandOpen2} timeout="auto" unmountOnExit>
                    <Box>
                        <Table>
                          <TableHead>
                            <TableRow>
                                <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={10}><span className="font-medium">分割情報の入力</span></TableCell>
                            </TableRow>          
                            <TableRow>      
                                {HeirList.map((heir)=>(
                                <>
                                  <TableCell id={heir.id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>            
                                </>
                                ))}                  
                                <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell>
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
                                  <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon className="cursor-pointer" onClick={handleModalOpen}/></TableCell>
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