"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import StepForm from "./stepper";
import BackdropLoader from '../../../components/loader/backdrop-loader';


export default function CashSavingsAdd() {
    let DepositList = [
        { id: 1, value: '現金', label: '現金' },
        { id: 2, value: '普通預金', label: '普通預金' },
        { id: 3, value: '定期預金', label: '定期預金' },
        { id: 4, value: '当座預金', label: '当座預金' },
        { id: 5, value: '通常貯金', label: '通常貯金' },
        { id: 6, value: '普通貯金', label: '普通貯金' },
        { id: 7, value: '定期貯金', label: '定期貯金' },
        { id: 8, value: 'その他', label: 'その他' },
    ];

    let HeirList = [
        { id: 1, name: "User", name1: "山田　太郎" },
        { id: 2, name: "Shree", name1: "Shree" },
        { id: 3, name: "Prakashraj", name1: "Prakashraj" },
        { id: 4, name: "Gowtham", name1: "Gowtham" },
    ];
    
    let [DepositType, setDepositType] = useState("");
    let [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [AmountofMoney, setAmountofMoney] = useState("0");

    let [ShowFinancialInstitutionName, setShowFinancialInstitutionName] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [totalPrice, settotalPrice] = useState("0");    
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [DepositTypeError, setDepositTypeError] = useState(false);
    let [FinancialInstitutionNameError, setFinancialInstitutionNameError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [AmountofMoneyError, setAmountofMoneyError] = useState(false);

     // Proceed to next step
     let [ShowLoader, setShowLoader] = useState(false);
     let [InputFocus, setInputFocus] = useState(false);
     let [activeStep, setActiveStep] = useState(0);
     let [StepOne, setStepOne] = useState(true);
     let [StepTwo, setStepTwo] = useState(false);
     let [StepThree, setStepThree] = useState(false);
     let [PrevButton, setPrevButton] = useState(true);
     let [submitTitle, setsubmitTitle] = useState("Next");
     let [PageValidation, setPageValidation] = useState(false);

     const inputRef1 = useRef(null);
     const inputRef2 = useRef(null);
     const inputRef3 = useRef(null);
     const inputRef4 = useRef(null);
     const inputRef5 = useRef(null);   
     
  // Edit button click and focus on specific input function
  const handleButtonClick = (inputId) => {    
    const inputRef = getInputRefById(inputId);
    if (inputRef.current) {
      inputRef.current.focus();
    }   
    handleBack(); 
    console.log("inputRef1.current.value:" + inputRef);
    setDepositType(DepositType);
  };

  //Input ref based on Id function
  const getInputRefById = (inputId) => {
    switch (inputId) {
      case 'DepositType':
        return inputRef1;
      case 'PostCode':
        return inputRef2;
        case 'FinancialInstitutionName':
        return inputRef3;
        case 'Address':
        return inputRef4;
        case 'AmountofMoney':
        return inputRef5;
      default:
        return null;
    }        
  };

     //Stepper "Next" function
     let handleNext = () => {
        setActiveStep((prev) => prev + 1);
        if(activeStep === 0){
            activeStep = 1;
            setStepOne(false);
            setStepTwo(true);
            setStepThree(false);
            setPrevButton(false);
            setShowLoader(false);
        }
        else if(activeStep === 1){
            activeStep = 2;
            setStepOne(false);
            setStepTwo(false);
            setStepThree(true);
            setPrevButton(false);
            setsubmitTitle("保存");
            setShowLoader(false);
        }
        else {
            setShowLoader(false);   
            setPageValidation(true);  
            PageValidation = true;
            SubmitFinalFunction(PageValidation); 
        }
     }
     //Stepper "Back" function
     let handleBack = () => {                
        setActiveStep((prev) => prev - 1);
        if(activeStep === 0 || activeStep < 0){
            activeStep = 0;
            setStepOne(true);
            setStepTwo(false);
            setStepThree(false);
            setPrevButton(false);
            setShowLoader(false);
        }
        else if(activeStep === 1){
            activeStep = 0;
            setStepOne(true);
            setStepTwo(false);
            setStepThree(false);
            setPrevButton(true);
            setsubmitTitle("Next");
            setShowLoader(false);
        }
        else if(activeStep === 2){
            activeStep = 1;
            setStepOne(false);
            setStepTwo(true);
            setStepThree(false);
            setPrevButton(false);
            setsubmitTitle("Next");
            setShowLoader(false);
        }
        else {
            setShowLoader(false);            
        }
     } 
    
    useEffect(() => {
        setShowFinancialInstitutionName(true);
        setShowPostCode(false);
        setShowAddress(false);
    }, []);

    //Clear function
    function clearFunction() {
        setFinancialInstitutionName("");
        setPostCode("");
        setAddress("");
        setAmountofMoney(0);
        setUndecidedHeir(0);
        settotalPrice(0);
    }

    //Deposit type dropdown
    const handleDepositType = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = DepositList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);        
        setDepositType(selectedValue);
        setisSumbitDisabled(false);
        clearFunction();
        if (selectedId === 1) {
            setDepositTypeError(false);
            setShowFinancialInstitutionName(false);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 2 || selectedId === 3 || selectedId === 4 || selectedId === 5 || selectedId === 6 || selectedId === 7 || selectedId === 8) {
            setDepositTypeError(false);
            setShowPostCode(false);
            setShowAddress(false);
            setShowFinancialInstitutionName(true);
        }
        else {
            setDepositTypeError(true);
        }
    };

    //Postal code 7 digit limit function
    const [isValid, setIsValid] = useState(true);
    const postalcodeDigit = (e) => {
        let digit_value = e.target.value;
        let isValidInput = /^\d{7}$/.test(digit_value);
        if (digit_value.length == 8 || digit_value.length == 9 || digit_value.length == 10) {
            digit_value = digit_value.slice(0, 7)
            setPostCode(digit_value);
        }
        setPostCode(digit_value);
        setIsValid(isValidInput);
        setisSumbitDisabled(false);
    }

    //Amount input calculation function
    const AmountofMoneyKeyPress = (e) => {
        let amount_of_money = e.target.value;
        amount_of_money = amount_of_money.replace(/,/g, '').replace('.', '');
        amount_of_money = parseFloat(amount_of_money);
        amount_of_money = amount_of_money.toLocaleString();
        if (amount_of_money === "NaN") {
            setAmountofMoney(0);
            setUndecidedHeir(0);
        }
        else {
            setAmountofMoneyError(false);
            setAmountofMoney(amount_of_money);
            setUndecidedHeir(amount_of_money);
        }
        setisSumbitDisabled(false);
        AmountToTotalCalculation(amount_of_money);
    }


    //Input keypress
    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "FinancialInstitutionName") {
            setFinancialInstitutionName(inputValue);
            setFinancialInstitutionNameError(false);
        }
        else {
            setAddress(inputValue);
            setAddressError(false);
        }
        setisSumbitDisabled(false);
    }
    

    function valueConvertFun(convertValue) {
        if (convertValue === 0) {
            convertValue = 0;
            setAmountofMoneyError(true);
            setisSumbitDisabled(true);
        }
        else {
            convertValue = convertValue.replace(/,/g, '').replace('.', '');
            convertValue = parseFloat(convertValue);
            if (convertValue === 0) {
                setAmountofMoneyError(true);
                setisSumbitDisabled(true);
            }
            else {
                setAmountofMoneyError(false);
            }
        }
    }

    //Box value calculation function    
    function AmountToTotalCalculation(AmountofMoney) {
        //Amount of money convert
        if (AmountofMoney == 0 || AmountofMoney == "NaN") {
            AmountofMoney = 0;
        }
        else {
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            AmountofMoney = parseFloat(AmountofMoney);
        }
        let totalBoxValues = boxValues.reduce((total, value) => total + value, 0);
        if (isNaN(totalBoxValues)) {
            totalBoxValues = 0;
        }
        let heirValue = AmountofMoney - totalBoxValues;
        if (heirValue < 0) {
            setUndecidedHeir(heirValue.toLocaleString());
            setShowIncorrectError(true);
        }
        else {
            setShowIncorrectError(false);
            setUndecidedHeir(heirValue.toLocaleString());
        }
    }

     //Footer box values and calculation
    let handleBoxValueChange = (e, index) => {
        let newValue = parseFloat(e.target.value);
        if (isNaN(newValue)) {
            newValue = 0;
        }
        const updatedBoxValues = [...boxValues];
        updatedBoxValues[index] = newValue;
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
        if (isNaN(totalBoxValues)) {
            totalBoxValues = 0;
        }
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


    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = () => {
        setShowLoader(true);
        defaultValues = {
            DepositType: DepositType,
            FinancialInstitutionName: FinancialInstitutionName,
            PostCode: PostCode,
            Address: Address,
            AmountofMoney: AmountofMoney,
            UndecidedHeir: UndecidedHeir,
            totalPrice: AmountofMoney,
        };

        //input Validation
        if (defaultValues.DepositType === "") {
            setDepositTypeError(true);
            isSumbitDisabled = true;
        }

        if (defaultValues.FinancialInstitutionName === "") {
            if (ShowFinancialInstitutionName === true) {
                setFinancialInstitutionNameError(true);
                isSumbitDisabled = true;
            }            
        }

        if (defaultValues.Address === "") {
            if (ShowAddress === true) {
                setAddressError(true);
                isSumbitDisabled = true;
            }            
        }

        if (defaultValues.AmountofMoney !== "" || defaultValues.AmountofMoney === 0) {
            valueConvertFun(defaultValues.AmountofMoney);
        }

        if (defaultValues.UndecidedHeir < 0) {
            setShowIncorrectError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            handleNext();              
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    };

    const SubmitFinalFunction = (PageValidation) => {
        if(PageValidation === true){
            console.log("API allowed");
            sessionStorage.setItem('cashSavings', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/cash-savings`);
        }    
        else{
            setPageValidation(false);
        }      
    }

   
    return (        
        <>
        <>
        {ShowLoader && (
            <BackdropLoader ShowLoader={ShowLoader} />
        )}
        </>
            <div className="top-stepper-sec max-w-screen-md mx-auto pt-0 py-10">
                <StepForm handleBack={handleBack} activeStep={activeStep} handleNext={handleNext} />
            </div>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            現金・預貯金1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
                <div className="w-full inline-block">
                    <form action="#" method="POST">
                        {StepOne && (
                            <>
                            <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="DepositType" className="form-label">
                                        預金の種類<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select ref={inputRef1} id="DepositType" className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2" onChange={handleDepositType}>
                                        <option value='' id="0"></option>
                                        {DepositList.map((option) => (
                                            <option key={option.value} id={option.id} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {DepositTypeError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {ShowPostCode && (
                            <div className="w-full inline-block items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="PostCode" className="form-label">
                                            郵便番号
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            ref={inputRef2}
                                            id="PostCode"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-12"
                                            onKeyPress={handleKeyPress}
                                            onChange={postalcodeDigit}
                                            value={PostCode}
                                        />
                                        <PostcodeIcon />
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                    </div>
                                    {!isValid && <p>数字7桁で入力して下さい。海外の場合は入力不要です。</p>}
                                </div>
                            </div>
                        )}

                        {ShowAddress && (
                            <div className="w-full inline-block items-center justify-between mb-7">
                                <div className="w-full inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Address" className="form-label">
                                            住所<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            ref={inputRef3}
                                            id="Address"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            onChange={inputHandlingFunction}
                                            value={Address}
                                        />
                                        {AddressError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {ShowFinancialInstitutionName && (
                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="FinancialInstitutionName" className="form-label">
                                            金融機関名<i className="text-red-500">*</i> <span>（例：みずほ銀行　新宿支店）</span>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            ref={inputRef4}
                                            id="FinancialInstitutionName"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            onChange={inputHandlingFunction}
                                            value={FinancialInstitutionName}
                                        />
                                        {FinancialInstitutionNameError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}



                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        金額<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        ref={inputRef5}
                                        value={AmountofMoney}
                                        onChange={AmountofMoneyKeyPress}
                                        onKeyPress={handleKeyPress}
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"

                                    />
                                    {AmountofMoneyError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>
                            </>
                        )}
                        {StepTwo && (
                            <>
                            <Fragment>
                                <List disablePadding>
                                    <ListItem>
                                    <ListItemText className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium" primary="預金の種類" secondary={DepositType ? DepositType : "提供されていない"} />
                                    {DepositType ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"DepositType"} onClick={() => handleButtonClick('DepositType')}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="郵便番号" secondary={PostCode ? PostCode : "提供されていない"} />
                                    {PostCode ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"PostCode"}  onClick={() => handleButtonClick('PostCode')}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="住所" secondary={Address ? Address : "提供されていない"} />
                                    {Address ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"Address"}  onClick={() => handleButtonClick('Address')}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="金融機関名" secondary={FinancialInstitutionName ? FinancialInstitutionName : "提供されていない"} />
                                    {FinancialInstitutionName ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"FinancialInstitutionName"}  onClick={() => handleButtonClick('FinancialInstitutionName')}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="金額" secondary={AmountofMoney ? AmountofMoney : "提供されていない"} />
                                    {AmountofMoney ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"AmountofMoney"}  onClick={() => handleButtonClick('AmountofMoney')}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />                                    
                                </List>      
                            </Fragment>
                            </>
                        )}

                        {StepThree && (
                            <>
                            <Box className="py-7">
                            <Typography variant="h4" className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium" align="center">
                                ありがとう！
                            </Typography>
                            <Typography component="p" align="center" className="pt-7 text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                                現金・預貯金 詳細は正常に保存されました...
                            </Typography>
                            </Box>                           
                            </>
                        )}

                        <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            {StepThree ? <></> : 
                            <>
                            {PrevButton ? <BackButton /> : 
                            <>
                            <button
                                type='button'
                                onClick={handleBack}
                                className="bg-return-bg rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                戻る
                                </span>
                            </button>
                            </>
                            }
                            </>
                            }                            
                            <SubmitButton title={submitTitle} onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </div>
                        {StepThree || StepTwo ? <></> : 
                        <div className="heading text-center pt-8">
                            <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                        </div>
                        }                        
                        </div>        
                    </form>   
                </div>
            </div>
        </>
    )
}


CashSavingsAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};