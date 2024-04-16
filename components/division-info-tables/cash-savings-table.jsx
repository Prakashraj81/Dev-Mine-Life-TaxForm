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
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
  
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

export default function CashSavingsTable({heir_details_list}) {
    let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
    //let [TableExpandOpen2, setTableExpandOpen2] = React.useState(false);
    let [TableExpandOpen2, setTableExpandOpen2] = React.useState({});
    let [OpenModalPopup, setOpenModalPopup] = React.useState(false); 
      
    let [ApiCallRoute, setApiCallRoute] = useState("cash_deposit");
    let [HeirList, setHeirList] = useState([]);
    let [HeirDetailsList, setHeirDetailsList] = useState([]);
    let [HeirId, setHeirId] = useState(0);
    let [PropertyId, setPropertyId] = useState(0);
    let [TotalAmount, setTotalAmount] = useState(0); 
    let [ListTotalAmount, setListTotalAmount] = useState(0); 
    let [cashSavingsList, setcashSavingsList] = useState([]);
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [SnackbarMsg, setSnackbarMsg] = useState("Cash savings split details saved successfully.");

    
  useEffect(() => {
      GetCashSavingsList();
      setHeirList(heir_details_list);
      setHeirDetailsList(heir_details_list);
  }, []);
    
  //Load cash savings list
  const GetCashSavingsList = async()=>{
    let auth_key = atob(sessionStorage.getItem("auth_key"));
    const params = { auth_key: auth_key };
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_cash_deposit', {params});
            if(response.status === 200){
                setcashSavingsList(response.data.cash_deposit_details);
                {response.data.cash_deposit_details.map((list) => {
                  if(list.amount !== 0){
                    TotalAmount = TotalAmount + list.amount;
                    setTotalAmount(TotalAmount);
                  }
                })};
            }
            else{
                setcashSavingsList([]);
            }
        }catch(error){
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
  const handleExpandFun2 =(event)=>{
    const iconClickId = Number(event.currentTarget.id);
    const customerId = Number(event.currentTarget.name);
    ListTotalAmount = event.currentTarget.value;
    setListTotalAmount(ListTotalAmount);  
    setPropertyId(iconClickId);

    setTableExpandOpen2((prevExpandState) => ({
      ...prevExpandState,
      [iconClickId]: !prevExpandState[iconClickId],
    }));

    if (!TableExpandOpen2[iconClickId]) {
      HeirList = heir_details_list;
    }
  }
   
  return (
    <>
    <DivisionPopup OpenModalPopup={OpenModalPopup} ListTotalAmount={ListTotalAmount} PropertyId={PropertyId} ApiCallRoute={ApiCallRoute} handleModalClose={handleModalClose}/>
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
          <TableHead className="table-head">
            <TableRow>
                <TableCell className="border border-light-gray border-l" align="left"><span className="font-semibold">現金預金</span></TableCell>
                <TableCell className="border border-light-gray border-l invisible" align="left"><span className="font-semibold">Column</span></TableCell>
                <TableCell className="border border-light-gray border-l invisible" align="left"><span className="font-semibold">Column</span></TableCell>
                <TableCell className="border border-light-gray border-l" align="right">{TotalAmount.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
                <TableCell className="border border-light-gray border-l cursor-pointer" align="center" onClick={handleExpandFun}><span className="font-semibold">入力</span></TableCell>
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
                                <TableCell className="border border-light-gray border-l" align="left"><span className="font-semibold">預金の種類</span></TableCell>
                                <TableCell className="border border-light-gray border-l"><span className="font-semibold">金融機関名</span></TableCell>
                                <TableCell className="border border-light-gray border-l" align="right"><span className="font-semibold">金額</span></TableCell>
                                <TableCell className="border border-light-gray border-l" align="center"><span className="font-semibold text-red-300">分割情報入力</span></TableCell>
                                <TableCell className="border border-light-gray border-l invisible"><span className="font-semibold">Column</span></TableCell>
                            </TableRow>                          
                            {cashSavingsList.map((list, index) => (
                              <React.Fragment key={list.id}>
                                <TableRow key={list.id} id={list.id} value={list.customer_id}>
                                  <TableCell className="border border-light-gray border-l">{list.deposit_type}</TableCell>
                                    {list.address ?
                                        <TableCell className="border border-light-gray border-l">{list.address}</TableCell>
                                        :
                                        <TableCell className="border border-light-gray border-l">{list.financial_institution_name}</TableCell>
                                    }                                  
                                  <TableCell className="border border-light-gray border-l w-20" align="right">
                                    {list.amount.toLocaleString()}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span>
                                  </TableCell>
                                  <TableCell className="border border-light-gray border-l w-15" align="center">
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
                                  <TableCell className="border border-light-gray border-l" align="center"></TableCell>
                                </TableRow>
                                <TableRow className="w-full">
                                  <TableCell className="border border-light-gray border-l" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                                      <Collapse in={TableExpandOpen2[list.id]} timeout="auto" unmountOnExit>
                                        <Box>
                                            <Table>
                                              <TableHead>
                                                <TableRow>
                                                    <TableCell className="border border-light-gray border-l bg-table-light" align="left" colSpan={10}><span className="font-semibold">分割情報の入力</span></TableCell>
                                                </TableRow>          
                                                <TableRow>      
                                                    {HeirList.map((heir)=>(
                                                    <>
                                                      <TableCell id={heir.heir_id} className="border border-light-gray border-l bg-table-gray" align="center">{heir.name}</TableCell>            
                                                    </>
                                                    ))}                  
                                                    <TableCell className="border border-light-gray border-l bg-table-gray" align="center">入力</TableCell>
                                                    <TableCell className="border border-light-gray border-l bg-table-gray invisible" align="center">Column</TableCell>
                                                </TableRow>                    
                                              </TableHead>
                                                  <TableBody>
                                                    <TableRow>  
                                                      {HeirDetailsList.map((heir_lists)=>(
                                                      <>
                                                          <TableCell id={heir_lists.heir_id} className="border border-light-gray border-l" align="right">{heir_lists.amount}<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>       
                                                      </>
                                                      ))}                   
                                                      <TableCell className="border border-light-gray border-l cursor-pointer" align="center"><EditNoteIcon id={""} value={""} className="cursor-pointer" onClick={handleModalOpen}/></TableCell>
                                                      <TableCell className="border border-light-gray border-l bg-table-gray invisible" align="center">Column</TableCell>
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