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


export default function CashSavingsTable() {
    let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
    let [OpenModalPopup, setOpenModalPopup] = React.useState(false);   

    let HeirList = [
        { id: 2, name: "Shree", value: "Cash savings_1", value_1: "Cash_1", total: 1500 },
        { id: 3, name: "Prakashraj", value: "Cash savings_2", value_1: "Cash_2", total: 500  },
        { id: 4, name: "Gowtham", value: "", value_1: "Cash_3", total: 3000  },
    ];
    let HeirLists = [
        { id: 2, amount: 300 },
        { id: 3, amount: 150 },
        { id: 4, amount: 1000 },
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
    }
   
  return (
    <>
    <DivisionPopup OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose}/>
    <div className="py-5">
    <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
                <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={5}><span className="font-semibold">現金預金</span></TableCell>
            </TableRow>   
          <TableRow>            
            <TableCell className="border border-light-gray border-l bg-table-gray">預金の種類</TableCell>
            <TableCell className="border border-light-gray border-l bg-table-gray">金融機関名</TableCell>
            <TableCell className="border border-light-gray border-l bg-table-gray" align="right">金額</TableCell>
            <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>      
        <TableCell className="border border-light-gray border-l">Cash savings</TableCell>   
        <TableCell className="border border-light-gray border-l">Cash</TableCell>   
        <TableCell className="border border-light-gray border-l" align="right">1500<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell> 
        <TableCell className="border border-light-gray border-l" align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandFun}
          >
            {TableExpandOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
      <TableCell className="border border-light-gray border-l" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
          <Box sx={{margin: 1}}>          
          <Table>
            <TableHead>
            <TableRow>
                <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={5}><span className="font-semibold">分割情報の入力</span></TableCell>
            </TableRow>          
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