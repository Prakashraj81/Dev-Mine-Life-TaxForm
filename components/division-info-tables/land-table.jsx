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


export default function LandTable({heir_details_list}) {  
  let [TableExpandOpen, setTableExpandOpen] = React.useState(false);
  let [TableExpandOpen1, setTableExpandOpen1] = React.useState(false);
  let [TableExpandOpen2, setTableExpandOpen2] = React.useState(false);
  let [TableExpandOpenInput, setTableExpandOpenInput] = React.useState(false);
  let [OpenModalPopup, setOpenModalPopup] = React.useState(false); 
    
  let [ApiCallRoute, setApiCallRoute] = useState("Land");
  let [HeirList, setHeirList] = useState([]);
  let [HeirDetailsList, setHeirDetailsList] = useState([]);
  let [HeirId, setHeirId] = useState(0);
  let [PropertyId, setPropertyId] = useState(0);
  let [TotalAmount, setTotalAmount] = useState(0); 
  let [ListTotalAmount, setListTotalAmount] = useState(0); 
  let [LandList, setLandList] = useState([]);
  let [HeirSharingDetails, setHeirSharingDetails] = useState([]);
  let [SnackbarOpen, setSnackbarOpen] = useState(false);
  let [SnackbarMsg, setSnackbarMsg] = useState("Land split details saved successfully.");  

  useEffect(() => {
    //GetLandList();
    setHeirList(heir_details_list);
    setHeirDetailsList(heir_details_list);
}, []);  

//Load Heir sharing details
const GetHeirSharingDetails = async (Id) => {
  let auth_key = atob(sessionStorage.getItem("auth_key"));
  const params = { auth_key: auth_key, id: Id };
  if (auth_key !== null && Id !== 0) {
    try {
      const response = await axios.get('https://minelife-api.azurewebsites.net/get_Land', { params });
      if (response.status === 200) {
        setHeirSharingDetails(response.data.heir_sharing_details);          
      }
      else {
        setHeirSharingDetails([]);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
}

//Load cash savings list
const GetLandList = async()=>{
  let auth_key = atob(sessionStorage.getItem("auth_key"));
  const params = { auth_key: auth_key };
  if(auth_key !== null){
      try{
          const response = await axios.get('https://minelife-api.azurewebsites.net/list_Land', {params});
          if(response.status === 200){
              TotalAmount = 0;
              setLandList(response.data.Land_details);
              {response.data.Land_details.map((list) => {
                if(list.amount !== 0){
                  TotalAmount = TotalAmount + list.amount;
                  setTotalAmount(TotalAmount);
                }
              })};
          }
          else{
              setLandList([]);
          }
      }catch(error){
          console.log("Errro", error);
      }
  }        
}

  //Modal popup open and close function
  const handleModalOpen = (event) => {
    setOpenModalPopup(true);
  }
  const handleModalClose = () => {
    setOpenModalPopup(false);
  }

  //Table row expand function
  const handleExpandFun = () => {
    setTableExpandOpen(!TableExpandOpen);
    setTableExpandOpen1(false);
    setTableExpandOpen2(false);
  }

  //Table row expand function-2
  const handleExpandFun2 = () => {
    setTableExpandOpen2(!TableExpandOpen2);
  }

  const handleRadioScale = (event) => {
    let radioValue = event.target.value;
    if (radioValue === "Yes") {
      //setTableExpandOpen1(true);
      setTableExpandOpenInput(true);
    }
    else {
      //setTableExpandOpen1(false);
      setTableExpandOpenInput(false);
    }
  };

  return (
    <>
      <DivisionPopup OpenModalPopup={OpenModalPopup} handleModalClose={handleModalClose} />
      <div className="py-0">
        <Table aria-label="collapsible table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="" align="left"><span className="font-medium">土地</span></TableCell>
              <TableCell className="invisible" align="left"><span className="font-medium">Column</span></TableCell>
              <TableCell className="invisible" align="left"><span className="font-medium">Column</span></TableCell>
              <TableCell className="table-20" align="right">0<span className="inline-block float-right border-l text-right border-light-gray pl-1">円</span></TableCell>
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
              <TableCell className="border border-light-gray border-l" style={{ padding: 0 }} colSpan={10}>
                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Box className="my-2">
                    <Table>
                      <TableRow>
                        <TableCell className="border border-light-gray border-l">
                          <div className="page-description">
                            <p className="text-sm tracking-2 text-black text-left font-medium">
                              当システムでは「特定居住用（被相続人の居住のように供していた宅地）」のみ小規模宅地等の特例の適用が可能です。※適用要件を満たしているかの確認等ご不明な点は税理士への有料相談でご確認ください。
                            </p>
                          </div>
                          <Box className="mt-3">
                            <FormControl>
                              <label className="form-label text-sm" id="demo-row-radio-buttons-group-label">小規模宅地等の特例の適用を受ける</label>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel value="Yes" control={<Radio />} onChange={handleRadioScale} label="はい" sx={{
                                  '& .MuiSvgIcon-root': {
                                    fontSize: 12,
                                  },
                                }} />
                                <FormControlLabel value="No" control={<Radio />} onChange={handleRadioScale} label="いいえ" sx={{
                                  '& .MuiSvgIcon-root': {
                                    fontSize: 12,
                                  },
                                }} />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Box>
                </Collapse>

                <Collapse in={TableExpandOpen} timeout="auto" unmountOnExit>
                  <Collapse in={TableExpandOpenInput} timeout="auto" unmountOnExit>
                    <Box>
                      <Table>
                        <TableRow>
                          <TableCell colSpan={2} className="border border-light-gray border-l bg-table-gray" align="center">小規模宅地を適用する土地</TableCell>
                          <TableCell colSpan={2} className="border border-light-gray border-l bg-table-gray" align="center">適用面積</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell colSpan={2} className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                        </TableRow>
                      </Table>
                    </Box>
                  </Collapse>
                  <Box>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="center">所在</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="center">地積</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="center">評価額</TableCell>
                          <TableCell className="border border-light-gray border-l bg-table-gray" align="center">分割情報入力</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l p-0" align="center"><input className="border p-0 border-light-gray focus:outline-none" type="text" /></TableCell>
                          <TableCell className="border border-light-gray border-l w-15" align="center">
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={handleExpandFun2}
                            >
                              {TableExpandOpen2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                        </TableRow>

                        <TableRow className="w-full">
                          <TableCell className="border border-light-gray border-l" style={{ padding: 0 }} colSpan={10}>
                            <Collapse in={TableExpandOpen2} timeout="auto" unmountOnExit>
                              <Box>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="border border-light-gray border-l w-15 bg-table-light" align="left" colSpan={10}><span className="font-medium">分割情報の入力</span></TableCell>
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
                                      <TableCell className="border border-light-gray border-l w-15 cursor-pointer" align="center"><EditNoteIcon id={""} value={""} className="cursor-pointer" onClick={handleModalOpen} /></TableCell>
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