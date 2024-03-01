import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };
  
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
  

export default function DivisionPopup({OpenModalPopup, handleModalClose}){
    let [selectedValue, setSelectedValue] = useState('Amount');
    let [AmountShow, setAmountShow] = useState(true);
    let [FractionShow, setFractionShow] = useState(false);

    let [AmountofMoney, setAmountofMoney] = useState("2,000");
    let [UndecidedHeir, setUndecidedHeir] = useState(AmountofMoney);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [BoxValues, setBoxValues] = useState([0]);
    let [HeirListArray, setHeirListArray] = useState([]);
    let [updatedHeirList, setupdatedHeirList] = useState([]);

    let [FractionHeir1, setFractionHeir1] = useState(0);
    let [FractionHeir2, setFractionHeir2] = useState(0);
    let [UserAmount, setUserAmount] = useState(0);

    let HeirList = [
        { id: 1, name: "Shree", name1: "Shree" },
        { id: 2, name: "Prakashraj", name1: "Prakashraj" },
        { id: 3, name: "Gowtham", name1: "Gowtham" },
        { id: 4, name: "Dhinesh", name1: "Dhinesh" },
        { id: 5, name: "Nisar", name1: "Nisar" },
        // { id: 6, name: "Muthu", name1: "Muthu" },
        // { id: 7, name: "Yogesh", name1: "Yogesh" },
    ];

    let TotalPrice = "10,000";
    let totalValuation = 0;
    let total = 0;  
    

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
        }
        else{
            setAmountShow(false);
            setFractionShow(true);
            setUndecidedHeir(AmountofMoney);
            setBoxValues([0]);
            setFractionHeir1(0);
            setFractionHeir2(0);
            setUserAmount(0);
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
    };


    //Fraction box calculation function-1
    const fractionBoxCalculation_1_ = (e, index) => {
        FractionHeir1 = parseFloat(e.target.value);
        setFractionHeir1(FractionHeir1);
        if (FractionHeir2 > 0 && Number(AmountofMoney) > 0) {
            var value = FractionHeir1 * AmountofMoney;
            value = value / FractionHeir2;
            UndecidedHeir = AmountofMoney - value;
        }
        setUserAmount(value);
        setUndecidedHeir(UndecidedHeir);
    }

    //Fraction box calculation function-2
    const fractionBoxCalculation_2_ = (e, index) => {
        FractionHeir2 = parseFloat(e.target.value);
        if (!isNaN(FractionHeir2)) {
            setFractionHeir2(FractionHeir2);
        }
        else {
            FractionHeir2 = 0;
            setFractionHeir2(0);
        }
        UndecidedHeir = UndecidedHeir.replace(/,/g, '').replace('.', '');
        UndecidedHeir = parseFloat(UndecidedHeir);
        AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
        AmountofMoney = parseFloat(AmountofMoney);
        if (FractionHeir1 > 0 && FractionHeir2 > 0 && UndecidedHeir > 0) {
            var value = FractionHeir1 * UndecidedHeir;
            if (FractionHeir2 > 0 && value > 0) {
                value = value / FractionHeir2;
                UndecidedHeir = UndecidedHeir - value;
                UndecidedHeir = UndecidedHeir.toFixed(0);
            }            
            setUndecidedHeir(UndecidedHeir.toLocaleString());
            setUserAmount(UndecidedHeir.toLocaleString());
        }
        else {
            setUserAmount(0);
            if(UndecidedHeir !== 0){
                setUndecidedHeir(UndecidedHeir.toLocaleString());
            }
            else{
                setUndecidedHeir(AmountofMoney.toLocaleString());
            }
        }
    }





    const fractionBoxCalculation_1 = (e, index) => {
        const newValue = parseFloat(e.target.value) || 0;          
        if(HeirListArray.length !== 0){
            HeirListArray = [...HeirListArray];
        }
        else{
            HeirListArray = [...HeirList];
        }
        HeirListArray[index].fractionBoxValue1 = newValue;
        setHeirListArray(HeirListArray);    
    };
    
    const fractionBoxCalculation_2 = (e, index) => {
        const newValue = parseFloat(e.target.value) || 0;
        HeirListArray = [...HeirListArray];
        HeirListArray[index].fractionBoxValue2 = newValue;
        setHeirListArray(HeirListArray);
        recalculateTotalAmount(HeirListArray);
    };
    
    const recalculateTotalAmount = (HeirListArray) => {
        let totalAmount = 0;
        let undecidedHeirCount = 0;
        UndecidedHeir = UndecidedHeir.replace(/,/g, '').replace('.', '');
        UndecidedHeir = parseFloat(UndecidedHeir);
        AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
        AmountofMoney = parseFloat(AmountofMoney);

        for (let i = 0; i < HeirListArray.length; i++) {
            const heir = HeirListArray[i];
            if (heir.fractionBoxValue1 !== undefined && heir.fractionBoxValue2 !== undefined) {
                var TotalValue = heir.fractionBoxValue1 * AmountofMoney;
                if (heir.fractionBoxValue2 > 0 && TotalValue > 0) {
                    TotalValue = TotalValue / heir.fractionBoxValue2;
                    UndecidedHeir = UndecidedHeir - TotalValue;
                    UndecidedHeir = UndecidedHeir.toFixed(0);
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
    };

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
                                <div className="text-right"><input id={heirlist.id} type="text" autoComplete="off" className="border-2 h-10 text-right form-control w-50 outline-none"
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
                                            onChange={(e) => fractionBoxCalculation_1(e, index)}
                                            onKeyPress={divisionInputKeyPress}
                                        /></div>
                                        <div>
                                            <span className="text-3xl text-gray-400">/</span>
                                        </div>
                                        <div><input
                                            type="text"
                                            className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
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