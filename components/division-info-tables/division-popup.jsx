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
import HeirListAmountShowSkeleton from './heirList-amountshow-skeleton';
import HeirListFractionShowSkeleton from './heirList-fractionshow-skeleton';
import { tr } from "date-fns/locale";

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


export default function DivisionPopup({ OpenModalPopup, HeirSharingDetails, ListTotalAmount, PropertyId, ApiCallRoute, handleModalClose }) {
    let [selectedValue, setSelectedValue] = useState('Amount');
    let [AmountShow, setAmountShow] = useState(false);
    let [FractionShow, setFractionShow] = useState(false);

    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
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

    // useEffect(() => {
    //     if (OpenModalPopup === true) {
    //         GetHeirList();
    //         let amountUpdate = parseFloat(ListTotalAmount.toString().replace(/,/g, '').replace('.', ''));
    //         AmountofMoney = amountUpdate;
    //         setAmountofMoney(AmountofMoney);
    //         setAmountShow(true);

    //         if (HeirSharingDetails && Array.isArray(HeirSharingDetails)) {
    //             HeirSharingDetails
    //                 .map(shareDetails => {
    //                     if (shareDetails.share_amount !== 0) {
    //                         setAmountShow(true);
    //                         setFractionShow(false);
    //                         selectedValue = 'Amount';
    //                         setSelectedValue(selectedValue);
    //                     }
    //                     else if (shareDetails.share_amount == 0 && shareDetails.denominator === 0 || shareDetails.numerator === 0) {
    //                         setAmountShow(true);
    //                         setFractionShow(false);
    //                         selectedValue = 'Amount';
    //                         setSelectedValue(selectedValue);
    //                     }
    //                     else {
    //                         setAmountShow(false);
    //                         setFractionShow(true);
    //                         selectedValue = 'Fraction';
    //                         setSelectedValue(selectedValue);
    //                     }
    //                     setUndecidedHeir(AmountofMoney);
    //                     setBoxValues([0]);
    //                     setFractionHeir1(0);
    //                     setFractionHeir2(0);
    //                     setUserAmount(0);
    //                     setheir_sharing([]);
    //                 });
    //         } else {
    //             console.error('HeirSharingDetails is not defined or not an array.');
    //         }
    //     }
    // }, [OpenModalPopup, AmountofMoney, UndecidedHeir, HeirSharingDetails, selectedValue]);


    useEffect(() => {
        const updateAmounts = async () => {
            if (OpenModalPopup) {
                await GetHeirList(); // Ensure GetHeirList is awaited if it's a promise
                if (ListTotalAmount != "") { // Check if ListTotalAmount is defined
                    let amountUpdate = parseFloat(ListTotalAmount.toString().replace(/,/g, '').replace('.', ''));
                    setAmountofMoney(amountUpdate);

                    setAmountShow(true);

                    if (HeirSharingDetails && Array.isArray(HeirSharingDetails)) {
                        HeirSharingDetails.forEach(shareDetails => {
                            if (shareDetails.share_amount !== 0) {
                                setAmountShow(true);
                                setFractionShow(false);
                                setSelectedValue('Amount');
                            } else if (shareDetails.share_amount === 0 && (shareDetails.denominator === 0 || shareDetails.numerator === 0)) {
                                setAmountShow(true);
                                setFractionShow(false);
                                setSelectedValue('Amount');
                            } else {
                                setAmountShow(false);
                                setFractionShow(true);
                                setSelectedValue('Fraction');
                            }
                        });

                        // setUndecidedHeir(amountUpdate); // use the updated amountUpdate
                        // setBoxValues([0]);
                        // setFractionHeir1(0);
                        // setFractionHeir2(0);
                        // setUserAmount(0);
                        // setheir_sharing([]);
                    } else {
                        console.error('HeirSharingDetails is not defined or not an array.');
                    }
                } else {
                    console.error('ListTotalAmount is not defined.');
                }
            }
        };

        updateAmounts();
    }, [OpenModalPopup, ListTotalAmount, HeirSharingDetails]);


    //Load heir details list
    const GetHeirList = async () => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', { params });
                if (response.status === 200) {
                    console.log("count");
                    setHeirList(response.data.heir_list || []);
                }
                else {
                    setHeirList([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            //Logout();
        }
    };

    //Amount and fraction open
    const handleOpenRadio = (event) => {
        let val = event.currentTarget.value;
        if (val === "Amount") {
            setAmountShow(true);
            setFractionShow(false);
            setUndecidedHeir(AmountofMoney);
            setBoxValues([0]);
            setFractionHeir1(0);
            setFractionHeir2(0);
            setUserAmount(0);
            setheir_sharing([]);
        }
        else {
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
        //setBoxValues([0]);
        let updatedBoxValues = [...BoxValues];
        updatedBoxValues[index] = isNaN(newValue) ? 0 : newValue;
        updatedBoxValues = updatedBoxValues.map((value) => (value === undefined ? 0 : value));
        BoxValues = updatedBoxValues;
        setBoxValues(updatedBoxValues);

        //Amount of money convert
        let convertedAmount = parseFloat(AmountofMoney.toString().replace(/,/g, '').replace('.', ''));
        if (isNaN(convertedAmount)) convertedAmount = 0;

        let totalBoxValues = BoxValues.reduce((total, value) => total + value, 0);
        totalBoxValues = isNaN(totalBoxValues) ? 0 : totalBoxValues;
        let heirValue = convertedAmount - totalBoxValues;
        setAmountofMoney(convertedAmount.toLocaleString());
        if (heirValue < 0) {
            setUndecidedHeir(heirValue.toLocaleString());
            ShowIncorrectError = true;
            setShowIncorrectError(true);
        }
        else {
            ShowIncorrectError = false;
            setShowIncorrectError(false);
            setUndecidedHeir(heirValue.toLocaleString());
        }

        //JSON array add and update              
        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {
            heir_sharing[existingIndex] = { "index": index, "id": id.toString(), "amount": newValue.toString(), "numerator": "", "denominator": "" };
        } else {
            heir_sharing.push({ "index": index, "id": id.toString(), "amount": newValue.toString(), "numerator": "", "denominator": "" });
        }
        setheir_sharing([...heir_sharing]);
    };

    //Fraction box 1 calculation
    const fractionBoxCalculation_1 = (e, index) => {
        let id = e.currentTarget.id;
        let numerator = parseFloat(e.target.value) || 0;
        if (HeirListArray.length !== 0) {
            HeirListArray = [...HeirListArray];
        }
        else {
            HeirListArray = [...HeirList];
        }
        HeirListArray[index].fractionBoxValue1 = numerator;
        setHeirListArray(HeirListArray);

        //JSON array add and update  
        let denominator = 0;
        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {
            let denominator1 = heir_sharing[existingIndex].denominator;
            heir_sharing[existingIndex] = { "index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": denominator1.toString() };
        } else {
            heir_sharing.push({ "index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": denominator.toString() });
        }
        setheir_sharing([...heir_sharing]);

        recalculateTotalAmount(HeirListArray, index);
    };

    //Fraction box 2 calculation
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
            heir_sharing[existingIndex] = { "index": index, "id": id.toString(), "amount": "", "numerator": numerator1.toString(), "denominator": denominator.toString() };
        } else {
            heir_sharing.push({ "index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": denominator.toString() });
        }
        setheir_sharing([...heir_sharing]);

        recalculateTotalAmount(HeirListArray, index);
    };


    const recalculateTotalAmount = (HeirListArray, index) => {
        let totalAmount = 0;
        let TotalValue = 0;
        let undecidedHeirCount = 0;
        let dividedAmount = 0;
        UndecidedHeir = UndecidedHeir.toLocaleString();
        AmountofMoney = AmountofMoney.toLocaleString();
        UndecidedHeir = UndecidedHeir.replace(/,/g, '').replace('.', '');
        UndecidedHeir = parseFloat(UndecidedHeir);
        AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
        AmountofMoney = parseFloat(AmountofMoney);

        for (let i = 0; i < HeirListArray.length; i++) {
            const heir = HeirListArray[i];
            if (i === index) {
                if (heir.fractionBoxValue1 !== undefined && heir.fractionBoxValue2 !== undefined) {
                    //TotalValue = heir.fractionBoxValue1 * AmountofMoney;
                    if (heir.fractionBoxValue2 > 0) {
                        // TotalValue = TotalValue / heir.fractionBoxValue2;
                        // UndecidedHeir = UndecidedHeir - TotalValue;
                        var fractionTotal = heir.fractionBoxValue1 / heir.fractionBoxValue2;
                        UndecidedHeir = fractionTotal * AmountofMoney;
                        UndecidedHeir = AmountofMoney - UndecidedHeir;
                    }
                    else {
                        for (let j = 0; j < HeirListArray.length; j++) {
                            const heirloop = HeirListArray[j];
                            TotalValue = heirloop.fractionBoxValue1 * AmountofMoney;
                            TotalValue = TotalValue / heirloop.fractionBoxValue2;
                            if (!isNaN(TotalValue) && isFinite(TotalValue)) {
                                dividedAmount = dividedAmount + TotalValue;
                            }
                        }
                        UndecidedHeir = AmountofMoney - dividedAmount;
                    }
                    setUndecidedHeir(UndecidedHeir);
                    setUserAmount(UndecidedHeir);
                } else {
                    setUserAmount(0);
                    if (UndecidedHeir !== 0) {
                        setUndecidedHeir(UndecidedHeir);
                    }
                    else {
                        setUndecidedHeir(AmountofMoney);
                    }
                }
            }
        }
    };

    //Split heir 
    const onSubmit = async () => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (auth_key !== null && PropertyId !== 0) {
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", Number(PropertyId));
            formData.append("heir_sharing", JSON.stringify(heir_sharing));
            if (formData !== null) {
                try {
                    const response = await axios.post(`https://minelife-api.azurewebsites.net/split_${ApiCallRoute}_by_heirs`, formData);
                    if (response.status === 200) {
                        handleModalClose();
                    }
                    else {
                        handleModalClose();
                    }
                } catch (error) {
                    console.log("Error", error);
                }
            }
        }
    }


    return (
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
                                        <HeirListAmountShowSkeleton HeirList={HeirList} HeirSharingDetails={HeirSharingDetails} divisionBoxCalculation={divisionBoxCalculation} BoxValues={BoxValues} divisionInputKeyPress={divisionInputKeyPress} UndecidedHeir={UndecidedHeir} AmountofMoney={AmountofMoney} />
                                    </>
                                )}
                                {FractionShow && (
                                    <>
                                        <HeirListFractionShowSkeleton HeirList={HeirList} HeirSharingDetails={HeirSharingDetails} fractionBoxCalculation_1={fractionBoxCalculation_1} divisionInputKeyPress={divisionInputKeyPress} fractionBoxCalculation_2={fractionBoxCalculation_2} UndecidedHeir={UndecidedHeir} AmountofMoney={AmountofMoney} />
                                    </>
                                )}
                                {ShowIncorrectError && (
                                    <>
                                        <Box className="py-2 text-center">
                                            <Typography fontSize={14} component={"p"} variant="p" className="tracking-1 text-red-600">金額配分が正しくありません</Typography>
                                        </Box>
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
                                    {ShowIncorrectError ?
                                        <>
                                            <Button
                                                type="button"
                                                onClick={onSubmit}
                                                disabled
                                                variant="contained"
                                                className="cursor-pointer bg-primary-color rounded px-8 py-2 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                            >
                                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                                    保存
                                                </span>
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <button
                                                type="button"
                                                onClick={onSubmit}
                                                className="cursor-pointer bg-primary-color rounded px-8 py-2 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                            >
                                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                                    保存
                                                </span>
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}