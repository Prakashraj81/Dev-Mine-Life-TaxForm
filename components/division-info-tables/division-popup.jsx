import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
  
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
  

export default function DivisionPopup({OpenModalPopup, ListTotalAmount, PropertyId, ApiCallRoute, handleModalClose}){
    let [selectedValue, setSelectedValue] = useState('Amount');
    let [AmountShow, setAmountShow] = useState(true);
    let [FractionShow, setFractionShow] = useState(false);

    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(AmountofMoney);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [BoxValues, setBoxValues] = useState([0]);
    let [HeirListArray, setHeirListArray] = useState([]);
    let [updatedHeirList, setupdatedHeirList] = useState([]);

    let [FractionHeir1, setFractionHeir1] = useState(0);
    let [FractionHeir2, setFractionHeir2] = useState(0);
    let [UserAmount, setUserAmount] = useState(0);

    let [HeirList, setHeirList] = useState([]);
    let [HeirDetailsList, setHeirDetailsList] = useState([]);
    let [heir_sharing, setheir_sharing] = useState([]);
    let [HeirId, setHeirId] = useState(0);
    let [TotalAmount, setTotalAmount] = useState(0);  

  useEffect(() => { 
    if(OpenModalPopup === true){
        GetHeirList(); 
        setAmountofMoney(ListTotalAmount);
    }    
  }, [OpenModalPopup]);

  
  //Load heir details list
  const GetHeirList = async() => {
      let auth_key = atob(sessionStorage.getItem("auth_key"));
      const params = { auth_key: auth_key };
      if(auth_key !== null){
          try{
              const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', {params});
              if(response.status === 200){
                    console.log("count");
                  setHeirList(response.data.heir_list || []);                  
              }
              else{
                  setHeirList([]);
              }
          }catch (error){
              console.error('Error:', error);
          }
      }  
      else{
          //Logout();
      }      
  };


    //Amount and fraction open
    const handleOpenRadio =(event)=> {
        let val = event.currentTarget.value; 
        if(val === "Amount"){
            setAmountShow(true);
            setFractionShow(false);
            setUndecidedHeir(AmountofMoney);
            setBoxValues([0]);
            setFractionHeir1(0);
            setFractionHeir2(0);
            setUserAmount(0);
            setheir_sharing([]);
        }
        else{
            setAmountShow(false);
            setFractionShow(true);
            setUndecidedHeir(AmountofMoney);
            setBoxValues([0]);
            setFractionHeir1(0);
            setFractionHeir2(0);
            setUserAmount(0);
            setheir_sharing([]);
        }
    }

    //Division input keypree function
    const divisionInputKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    }

    //Division box calculation function
    const divisionBoxCalculation = (e, index) => {   
        let id = e.currentTarget.id;     
        let newValue = e.target.value.replace(/,/g, '');        
        newValue = parseFloat(newValue);
        setBoxValues([0]);
        let updatedBoxValues = [...BoxValues];
        updatedBoxValues[index] = isNaN(newValue) ? 0 : newValue;
        updatedBoxValues = updatedBoxValues.map((value) => (value === undefined ? 0 : value));
        setBoxValues(updatedBoxValues);

        //Amount of money convert
        if (AmountofMoney == 0) {
            AmountofMoney = 0;
        }
        else {
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            AmountofMoney = parseFloat(AmountofMoney);
        }
        let totalBoxValues = updatedBoxValues.reduce((total, value) => total + value, 0);
        totalBoxValues = isNaN(totalBoxValues) ? 0 : totalBoxValues;
        let heirValue = AmountofMoney - totalBoxValues;
        if (heirValue < 0) {
            setUndecidedHeir(heirValue.toLocaleString());
            setShowIncorrectError(true);
        }
        else {
            setShowIncorrectError(false);
            setUndecidedHeir(heirValue.toLocaleString());
        }

        //JSON array add and update              
        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {
            heir_sharing[existingIndex] = {"index": index, "id": id.toString(), "amount": newValue.toString(), "numerator": "", "denominator": ""};
        } else {
            heir_sharing.push({"index": index, "id": id.toString(), "amount": newValue.toString(), "numerator": "", "denominator": ""});
        }              
        setheir_sharing([...heir_sharing]);
    };

    const fractionBoxCalculation_1 = (e, index) => {
        let id = e.currentTarget.id;
        let numerator = parseFloat(e.target.value) || 0;          
        if(HeirListArray.length !== 0){
            HeirListArray = [...HeirListArray];
        }
        else{
            HeirListArray = [...HeirList];
        }
        HeirListArray[index].fractionBoxValue1 = numerator;
        setHeirListArray(HeirListArray);   

        //JSON array add and update  
        let denominator = 0;
        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {   
            let denominator1 = heir_sharing[existingIndex].denominator;        
            heir_sharing[existingIndex] = {"index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": denominator1.toString()};          
        } else {
            heir_sharing.push({"index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": denominator.toString()});
        }              
        setheir_sharing([...heir_sharing]);
        
        recalculateTotalAmount(HeirListArray, index);
    };
    
    const fractionBoxCalculation_2 = (e, index) => {
        let id = e.currentTarget.id;
        let denominator = parseFloat(e.target.value) || 0;
        HeirListArray = [...HeirListArray];
        HeirListArray[index].fractionBoxValue2 = denominator;
        setHeirListArray(HeirListArray);
        
        //JSON array add and update  
        let numerator = 0;
        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {   
            let numerator1 = heir_sharing[existingIndex].numerator;        
            heir_sharing[existingIndex] = {"index": index, "id": id.toString(), "amount": "", "numerator": numerator1.toString(), "denominator": denominator.toString()};          
        } else {
            heir_sharing.push({"index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": denominator.toString()});
        }              
        setheir_sharing([...heir_sharing]);

        recalculateTotalAmount(HeirListArray, index);
    };   
    
    
    const recalculateTotalAmount = (HeirListArray, index) => {
        let totalAmount = 0;
        let undecidedHeirCount = 0;
        let dividedAmount = 0;
        UndecidedHeir = UndecidedHeir.replace(/,/g, '').replace('.', '');
        UndecidedHeir = parseFloat(UndecidedHeir);
        AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
        AmountofMoney = parseFloat(AmountofMoney);

        for (let i = 0; i < HeirListArray.length; i++) {
            const heir = HeirListArray[i];
            if(i === index){
                if (heir.fractionBoxValue1 !== undefined && heir.fractionBoxValue2 !== undefined) {
                    var TotalValue = heir.fractionBoxValue1 * AmountofMoney;
                    if (heir.fractionBoxValue2 > 0 && TotalValue > 0) {
                        TotalValue = TotalValue / heir.fractionBoxValue2;
                        UndecidedHeir = UndecidedHeir - TotalValue;
                    }   
                    else{
                        for (let j = 0; j < HeirListArray.length; j++) {
                            const heirloop = HeirListArray[j];
                            var TotalValue = heirloop.fractionBoxValue1 * AmountofMoney;
                            TotalValue = TotalValue / heirloop.fractionBoxValue2;                        
                            if (!isNaN(TotalValue) && isFinite(TotalValue)) {
                                dividedAmount = dividedAmount + TotalValue;
                            }
                        }                        
                        UndecidedHeir = AmountofMoney - dividedAmount;
                    }                                  
                    setUndecidedHeir(UndecidedHeir.toLocaleString());
                    setUserAmount(UndecidedHeir.toLocaleString());               
                } else {
                    setUserAmount(0);
                    if(UndecidedHeir !== 0){
                        setUndecidedHeir(UndecidedHeir.toLocaleString());
                    }
                    else{
                        setUndecidedHeir(AmountofMoney.toLocaleString());
                    }
                }  
            }              
        }     
    };

    //Split heir 
    const onSubmit = async()=> {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if(auth_key !== null && PropertyId !== 0){
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", Number(PropertyId));
            formData.append("heir_sharing", JSON.stringify(heir_sharing));
            if(formData !== null){
                try{
                    const response = await axios.post(`https://minelife-api.azurewebsites.net/split_${ApiCallRoute}_by_heirs`, formData);
                    if(response.status === 200){
                        handleModalClose();
                    }
                    else{

                    }
                }catch(error){
                    console.log("Error", error);
                }
            }
        }
    }


    return(
        <>
            <div>      
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={OpenModalPopup}
                onClose={handleModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    TransitionComponent: Fade,
                },
                }}
            >
                <Fade in={OpenModalPopup}>
                <Box sx={style}>
                    <Typography id="spring-modal-title" variant="h3" component="h2">
                    分割情報の入力
                    </Typography>
                    <div className="py-3">              
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"    
                            defaultValue={selectedValue}                      
                        >
                            <FormControlLabel value="Amount" onChange={handleOpenRadio} control={<Radio />} label="金額" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 14,
                                },
                            }} />
                            <FormControlLabel value="Fraction" onChange={handleOpenRadio} control={<Radio />} label="分数" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 14,
                                },
                            }} />
                        </RadioGroup>                  
                    </FormControl>     
                    {AmountShow && (
                        <>
                        <ul>     
                        {HeirList.map((heirlist, index) => (
                            <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                <span>{heirlist.name}</span>
                                <div className="text-right"><input id={heirlist.heir_id} type="text" autoComplete="off" className="border-2 h-10 text-right form-control w-50 outline-none"
                                    onChange={(e) => divisionBoxCalculation(e, index)}
                                    value={BoxValues[index] ? BoxValues[index].toLocaleString() : ''}
                                    onKeyPress={divisionInputKeyPress}
                                /></div>
                            </li>
                        ))}                
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>相続人未決定</span>
                            <span>{UndecidedHeir.toLocaleString()}</span>
                        </li>    
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>合計</span>
                            <span>{AmountofMoney.toLocaleString()}</span>
                        </li>            
                    </ul> 
                        </>
                    )}
                    {FractionShow &&(
                    <>
                    <ul>                
                        {HeirList.map((heirlist, index) => (
                            <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <div className="w-70">
                                <span>{heirlist.name}</span>
                            </div>
                            <div className="w-30 text-right">
                                <div className="w-full inline-block">
                                    <div className="flex justify-between items-center">
                                        <div><input
                                            type="text"
                                            className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
                                            id={heirlist.heir_id}
                                            onChange={(e) => fractionBoxCalculation_1(e, index)}
                                            onKeyPress={divisionInputKeyPress}
                                        /></div>
                                        <div>
                                            <span className="text-3xl text-gray-400">/</span>
                                        </div>
                                        <div><input
                                            type="text"
                                            className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
                                            id={heirlist.heir_id}
                                            onChange={(e) => fractionBoxCalculation_2(e, index)}
                                            onKeyPress={divisionInputKeyPress}
                                        /></div>
                                    </div>
                                </div>
                            </div>
                            </li>                    
                        ))}  
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>相続人未決定</span>
                            <span>{UndecidedHeir.toLocaleString()}</span>
                        </li> 
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>合計</span>
                            <span>{AmountofMoney.toLocaleString()}</span>
                        </li>             
                    </ul>   
                    </>
                    )}      
                    
                    <div className="w-full block pt-3 lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <button
                            type='button'
                            onClick={handleModalClose}                    
                            className="bg-return-bg rounded px-8 py-2 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                        >
                            <span className="text-sm font-medium">
                            戻る
                            </span>
                        </button>       
                        <button
                            type="button"   
                            onClick={onSubmit}                 
                            className="cursor-pointer bg-primary-color rounded px-8 py-2 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                        >                   
                            <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                保存
                            </span>
                        </button>
                    </div>     
                    </div>
                </Box>
                </Fade>
            </Modal>
            </div>
        </>
    )
}