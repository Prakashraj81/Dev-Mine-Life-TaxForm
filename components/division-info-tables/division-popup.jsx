import React, { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import HeirListAmountShowSkeleton from './heirList-amountshow-skeleton';
import HeirListFractionShowSkeleton from './heirList-fractionshow-skeleton';
import PropTypes from 'prop-types';
import { data } from "autoprefixer";

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
    const [selectedValue, setSelectedValue] = useState('Amount');
    const [AmountShow, setAmountShow] = useState(false);
    const [FractionShow, setFractionShow] = useState(false);

    const [AmountofMoney, setAmountofMoney] = useState(0);
    const [UndecidedHeir, setUndecidedHeir] = useState(0);
    const [CalculatedAmounts, setCalculatedAmounts] = useState({});
    const [ShowIncorrectError, setShowIncorrectError] = useState(false);
    const [BoxValues, setBoxValues] = useState([0]);
    const [HeirListArray, setHeirListArray] = useState([]);
    const [heir_sharing, setheir_sharing] = useState([]);

    const [HeirList, setHeirList] = useState([]);

    useEffect(() => {
        const updateAmounts = async () => {
            if (OpenModalPopup) {
                await GetHeirList();
                if (ListTotalAmount) {
                    let amountUpdate = parseFloat(ListTotalAmount.toString().replace(/,/g, '').replace('.', '') || 0);
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
                    }
                }
            }
        };

        updateAmounts();
    }, [OpenModalPopup, ListTotalAmount, HeirSharingDetails]);

    const GetHeirList = async () => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/heir_details?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    const heirListData = data.heir_list || [];
                    setHeirList(heirListData);
                    setHeirListArray(heirListData.map(() => ({ fractionBoxValue1: 0, fractionBoxValue2: 0 })));
                } else {
                    setHeirList([]);
                    setHeirListArray([]);
                }
            } catch (error) {
                console.error('Error:', error);
                setHeirList([]);
                setHeirListArray([]);
            }
        }
    };

    const handleOpenRadio = (event) => {
        let val = event.currentTarget.value;
        if (val === "Amount") {
            setAmountShow(true);
            setFractionShow(false);
            setUndecidedHeir(AmountofMoney);
            setBoxValues([0]);
            setheir_sharing([]);
        } else {
            setAmountShow(false);
            setFractionShow(true);
            setUndecidedHeir(AmountofMoney);
            setBoxValues([0]);
            setheir_sharing([]);
        }
    };

    const divisionInputKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const divisionBoxCalculation = (e, index) => {
        //let newValue = e.target.value.replace(/,/g, '');
        let newValue = e.target.value;
        newValue = parseFloat(newValue);
        let updatedBoxValues = [...BoxValues];
        updatedBoxValues[index] = isNaN(newValue) ? 0 : newValue;
        updatedBoxValues = updatedBoxValues.map((value) => (value === undefined ? 0 : value));
        setBoxValues(updatedBoxValues);

        let convertedAmount = parseFloat(AmountofMoney.toString().replace(/,/g, '').replace('.', ''));
        if (isNaN(convertedAmount)) convertedAmount = 0;

        let totalBoxValues = updatedBoxValues.reduce((total, value) => total + value, 0);
        totalBoxValues = isNaN(totalBoxValues) ? 0 : totalBoxValues;
        let heirValue = convertedAmount - totalBoxValues;
        setAmountofMoney(convertedAmount.toLocaleString());
        if (heirValue < 0) {
            setUndecidedHeir(heirValue.toLocaleString());
            setShowIncorrectError(true);
        } else {
            setShowIncorrectError(false);
            setUndecidedHeir(heirValue.toLocaleString());
        }

        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {
            heir_sharing[existingIndex] = { "index": index, "id": e.currentTarget.id.toString(), "amount": newValue.toString(), "numerator": "", "denominator": "" };
        } else {
            heir_sharing.push({ "index": index, "id": e.currentTarget.id.toString(), "amount": newValue.toString(), "numerator": "", "denominator": "" });
        }
        setheir_sharing([...heir_sharing]);
    };

    //Fraction box calculation (Box-1)
    const fractionBoxCalculation_1 = (e, index) => {
        let id = e.currentTarget.id;
        let numerator = parseFloat(e.target.value) || 0;
        let updatedHeirListArray = [...HeirListArray];
        updatedHeirListArray[index].fractionBoxValue1 = numerator;
        setHeirListArray(updatedHeirListArray);

        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {
            heir_sharing[existingIndex] = { "index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": heir_sharing[existingIndex].denominator || "" };
        } else {
            heir_sharing.push({ "index": index, "id": id.toString(), "amount": "", "numerator": numerator.toString(), "denominator": "" });
        }
        setheir_sharing([...heir_sharing]);

        recalculateTotalAmount(updatedHeirListArray);
    };

    //Fraction box calculation (Box-2)
    const fractionBoxCalculation_2 = async(e, index) => {
        let id = e.currentTarget.id;
        let denominator = parseFloat(e.target.value) || 0;
        let updatedHeirListArray = [...HeirListArray];
        updatedHeirListArray[index].fractionBoxValue2 = denominator;
        setHeirListArray(updatedHeirListArray);

        const existingIndex = heir_sharing.findIndex(item => item.index === index);
        if (existingIndex !== -1) {
            heir_sharing[existingIndex] = { "index": index, "id": id.toString(), "amount": "", "numerator": heir_sharing[existingIndex].numerator || "", "denominator": denominator.toString() };
        } else {
            heir_sharing.push({ "index": index, "id": id.toString(), "amount": "", "numerator": "", "denominator": denominator.toString() });
        }
        setheir_sharing([...heir_sharing]);

        await recalculateTotalAmount(updatedHeirListArray);
    };

    //Fraction box calculation (Both)
    const recalculateTotalAmount = async(HeirListArray) => {
        let dividedAmount = 0;
        let undecidedHeirAmount = parseFloat(AmountofMoney.toString().replace(/,/g, '').replace('.', ''));
        let calculatedAmounts = {};

        for (let i = 0; i < HeirListArray.length; i++) {
            const heir = HeirListArray[i];
            if (heir.fractionBoxValue1 !== undefined && heir.fractionBoxValue2 !== undefined && heir.fractionBoxValue2 > 0) {
                const fractionTotal = heir.fractionBoxValue1 / heir.fractionBoxValue2;
                const calAmount = fractionTotal * undecidedHeirAmount;
                dividedAmount += calAmount;
                calculatedAmounts[i] = calAmount;
            }
        }
        undecidedHeirAmount = parseFloat(AmountofMoney.toString().replace(/,/g, '').replace('.', '')) - dividedAmount;

        if (undecidedHeirAmount < 0) {
            setUndecidedHeir(undecidedHeirAmount.toLocaleString());
            setCalculatedAmounts(calculatedAmounts);
            setShowIncorrectError(true);
        } else {
            setShowIncorrectError(false);
            setUndecidedHeir(undecidedHeirAmount.toLocaleString());
            setCalculatedAmounts(calculatedAmounts);
        }       
    };

    //Save api
    const onSubmit = async () => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null && PropertyId !== 0) {
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", Number(PropertyId));
            formData.append("heir_sharing", JSON.stringify(heir_sharing));
            if (formData !== null) {
                try {
                    const response = await fetch(`https://minelife-api.azurewebsites.net/split_${ApiCallRoute}_by_heirs`, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    if(!response.ok) throw new Error(data);

                    if (response.ok) {
                        handleModalClose();
                    } else {
                        handleModalClose();
                    }
                } catch (error) {
                    console.log("Error", error);
                }
            }
        }
    };

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
                        <Box sx={style} className="rounded-md">
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
                                    <HeirListAmountShowSkeleton
                                        HeirList={HeirList}
                                        HeirSharingDetails={HeirSharingDetails}
                                        divisionBoxCalculation={divisionBoxCalculation}
                                        BoxValues={BoxValues}
                                        divisionInputKeyPress={divisionInputKeyPress}
                                        UndecidedHeir={UndecidedHeir}
                                        AmountofMoney={AmountofMoney}
                                        CalculatedAmounts={CalculatedAmounts}
                                    />
                                )}
                                {FractionShow && (
                                    <HeirListFractionShowSkeleton
                                        HeirList={HeirList}
                                        HeirSharingDetails={HeirSharingDetails}
                                        fractionBoxCalculation_1={fractionBoxCalculation_1}
                                        divisionInputKeyPress={divisionInputKeyPress}
                                        fractionBoxCalculation_2={fractionBoxCalculation_2}
                                        UndecidedHeir={UndecidedHeir}
                                        AmountofMoney={AmountofMoney}
                                        CalculatedAmounts={CalculatedAmounts}
                                    />
                                )}
                                {ShowIncorrectError && (
                                    <Box className="py-2 text-center">
                                        <Typography fontSize={14} component={"p"} variant="p" className="tracking-1 text-red-600">金額配分が正しくありません</Typography>
                                    </Box>
                                )}
                                <div className="w-full block pt-3 lg:flex xl:flex 2xl:flex justify-evenly items-center">
                                    
                                    <Button
                                        type="button"
                                        onClick={handleModalClose}
                                        variant="contained"
                                        sx={{
                                            width: 'auto',
                                            backgroundColor: 'gray',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'lightgray',
                                                color: 'black',
                                            },
                                            borderRadius: '3px',
                                            paddingLeft: 3,
                                            paddingRight: 3,
                                            py: 1,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        戻る
                                        </span>
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={onSubmit}
                                        disabled={ShowIncorrectError}
                                        variant="contained"
                                        sx={{
                                            width: 'auto',
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                                color: 'primary.main',
                                            },
                                            borderRadius: '3px',
                                            paddingLeft: 3,
                                            paddingRight: 3,
                                            py: 1,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                            保存
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}

// Define prop types
DivisionPopup.propTypes = {
    OpenModalPopup: PropTypes.bool.isRequired, // Boolean to show/hide modal
    HeirSharingDetails: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        shareAmount: PropTypes.number.isRequired,
      })
    ).isRequired, // Array of objects with name and shareAmount
    ListTotalAmount: PropTypes.number.isRequired, // Total amount as a number
    PropertyId: PropTypes.string.isRequired, // Property ID as a string
    ApiCallRoute: PropTypes.string.isRequired, // API route as a string
    handleModalClose: PropTypes.func.isRequired, // Function to handle modal close
  };
