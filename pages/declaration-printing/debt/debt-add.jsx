"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../../components/loader/backdrop-loader';
import UnitPriceIcon from "../../../components/inputbox-icon/textbox-unitprice-icon";
import JapaneseCalendar from "../../../components/inputbox-icon/japanese-calender";

export default function DebtAdd() {
    let DebtList = [
        { id: 1, value: '公租公課', label: '公租公課' },
        { id: 2, value: '銀行借入金', label: '銀行借入金' },
        { id: 3, value: '未払金', label: '未払金' },
        { id: 4, value: '買掛金', label: '買掛金' },
        { id: 5, value: 'その他債務', label: 'その他債務' },
    ];

    let [DebtType, setDebtType] = useState("");
    let [NameofDebt, setNameofDebt] = useState("");
    let [OtherParty, setOtherParty] = useState("");
    let [CauseofUnpaidBalance, setCauseofUnpaidBalance] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [ObligationDate, setObligationDate] = useState("");
    let [DebtPaymentDeadline, setDebtPaymentDeadline] = useState("");
    let [AmountofMoney, setAmountofMoney] = useState("0");
    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [TotalPrice, setTotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    let [ShowNameDebt, setShowNameDebt] = useState(false);
    let [ShowCauseofUnpaidBalance, setShowCauseofUnpaidBalance] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    let [ShowObligationDateDebtPaymentDeadline, setShowObligationDateDebtPaymentDeadline] = useState(false);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameofDebtError, setNameofDebtError] = useState(false);
    let [CauseofUnpaidBalanceError, setCauseofUnpaidBalanceError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [ShowObligationDateDebtPaymentDeadlineError, setShowObligationDateDebtPaymentDeadlineError] = useState(false);
    let [ObligationDateError, setObligationDateError] = useState(false);
    let [AmountofMoneyError, setAmountofMoneyError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);


    useEffect(() => {
        let debtId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if(searchParams !== null){
            debtId = Number(atob(searchParams));
            GetDebtDetails(debtId);
        }
    }, []);

    
    //Load cash savings details    
    const GetDebtDetails = async(debtId) => {       
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = {auth_key: auth_key, id: debtId };
        if(auth_key !== null && debtId !== 0){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_debt_details', {params});
                if(response.status === 200){                    
                    setNameofDebt(response.data.debt_details.name); 
                    setOtherParty(response.data.debt_details.other_party);
                    setPostCode(response.data.debt_details.postal_code);
                    setAddress(response.data.debt_details.address);  
                    setObligationDate(response.data.debt_details.obligation_date);   
                    setDebtPaymentDeadline(response.data.debt_details.payment_deadline);                
                    setAmountofMoney(response.data.debt_details.amount.toLocaleString());                                                      
                }
                else{

                }
            }catch (error){
                console.error('Error:', error);
            }
        }  
        else{
            //Logout();
        }      
    };
    

    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
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
    }


    useEffect(() => {
        setShowCauseofUnpaidBalance(false);
        setShowNameDebt(true);
        setShowPostCode(true);
        setShowAddress(true);        
        setShowObligationDateDebtPaymentDeadline(true);
    }, []);

    const handleDebitType = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = DebtList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);        
        setDebtType(selectedValue);
        setisSumbitDisabled(false);        
    };

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

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "NameofDebt") {
            setNameofDebt(inputValue);            
        } 
        else if (inputId === "OtherParty") {
            setOtherParty(inputValue);            
        }  
        else if (inputId === "CauseofUnpaidBalance") {
            setCauseofUnpaidBalance(inputValue);
            setCauseofUnpaidBalanceError(false);
        }
        else if (inputId === "ObligationDate") {
            setObligationDate(inputValue);
            setObligationDateError(false);
        }
        else if (inputId === "DebtPaymentDeadline") {
            setDebtPaymentDeadline(inputValue);            
        }
        else {
            setAddress(inputValue);
            setAddressError(false);
        }
        setisSumbitDisabled(false);
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
    const onSubmit = async() => {
        defaultValues = {
            DebtType: DebtType,
            NameofDebt: NameofDebt,
            OtherParty: OtherParty,
            CauseofUnpaidBalance: CauseofUnpaidBalance,
            PostCode: PostCode,
            Address: Address,
            ObligationDate: ObligationDate,
            DebtPaymentDeadline: DebtPaymentDeadline,
            AmountofMoney: AmountofMoney,
            UndecidedHeir: UndecidedHeir,
            TotalPrice: AmountofMoney,
            boxValues:boxValues,
        };

        //input Validation  
        if (defaultValues.NameofDebt === "") {
            setNameofDebtError(true);
            isSumbitDisabled = true;
        }     
        if (defaultValues.Address === "") {
            if (ShowAddress === true) {
                setAddressError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.ObligationDate === "") {
            if (ShowObligationDateDebtPaymentDeadline === true) {
                setShowObligationDateDebtPaymentDeadlineError(true);
                isSumbitDisabled = true;
            }
        }
        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {     
            let response = "";
            let debtId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if(searchParams !== null){
                debtId = Number(atob(searchParams));
            }              
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", debtId);
            formData.append("name", NameofDebt);      
            formData.append("other_party", OtherParty);      
            formData.append("address", Address);            
            formData.append("postal_code", PostCode);
            formData.append("obligation_date", ObligationDate);
            formData.append("payment_deadline", DebtPaymentDeadline);
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            formData.append("amount", parseFloat(AmountofMoney));
            try{
                if(debtId === 0){
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_debt', formData);
                }
                else{
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_debt', formData);
                }               
                if(response.status === 200){
                    router.push(`/declaration-printing/debt`); 
                }                
            }catch(error){
                console.log('Error:', error);
            }
        }
        else {
            setisSumbitDisabled(true);
            setShowLoader(false);
            //Logout();
        }            
    };

    
    return (
        <>
        <>
        {ShowLoader && (
            <BackdropLoader ShowLoader={ShowLoader} />
        )}
        </>
            
            <div className="other-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            債務1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>

                <form action="#" method="POST">                    
                        <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                    債務の名称<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="NameofDebt"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"  
                                    onChange={inputHandlingFunction}
                                    value={NameofDebt}                                 
                                />                                 
                                </div>
                                {NameofDebtError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    相手先
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="OtherParty"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={OtherParty}
                                />
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">15文字以内で入力して下さい</p>
                                </div>                                
                            </div>
                        </div>

                    {ShowCauseofUnpaidBalance && (
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    未払い金の発生原因<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="CauseofUnpaidBalance"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={CauseofUnpaidBalance}
                                />
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">15文字以内で入力して下さい</p>
                                </div>
                                {CauseofUnpaidBalanceError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    )}
                    

                    <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        郵便番号
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"
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

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        住所<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
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
                    
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">
                                            債務発生日<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">                                        
                                        <JapaneseCalendar id={"ObligationDate"} DateValue={ObligationDate} inputHandlingFunction={inputHandlingFunction}/>
                                        {ObligationDateError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                    債務の弁済期限（確定している場合)
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">                                    
                                    <JapaneseCalendar id={"DebtPaymentDeadline"} DateValue={DebtPaymentDeadline} inputHandlingFunction={inputHandlingFunction}/>
                                </div>
                            </div>
                        </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    金額<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    id="AmountofMoney"
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    value={AmountofMoney}
                                    onChange={AmountofMoneyKeyPress}
                                    onKeyPress={handleKeyPress}
                                />
                                <UnitPriceIcon />
                                {AmountofMoneyError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton/>              
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </div>                                           
                        </div>     
                </form>
            </div>
        </>
    )
}

DebtAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};