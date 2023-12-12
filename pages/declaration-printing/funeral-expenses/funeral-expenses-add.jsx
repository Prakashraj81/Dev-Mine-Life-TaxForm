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
import BackdropLoader from '../../../components/loader/backdrop-loader';

export default function FuneralExpensesAdd() {

    let [FeePayeeName, setFeePayeeName] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [DatePaid, setDatePaid] = useState("");
    let [AmountPaid, setAmountPaid] = useState("0");

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [TotalPrice, setTotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [FeePayeeNameError, setFeePayeeNameError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [DatePaidError, setDatePaidError] = useState(false);
    let [AmountPaidError, setAmountPaidError] = useState(false);


     // Proceed to next step
     let [ShowLoader, setShowLoader] = useState(false);
     

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


    const AmountPaidKeyPress = (e) => {
        let value = e.target.value;
        value = parseFloat(value.replace(/,/g, '').replace('.', ''));              
        if(value > 0){
            value = value.toLocaleString();
            setAmountPaid(value);
            setUndecidedHeir(value);
            setTotalPrice(value);
        }
        else{
            setAmountPaid("0");
            setUndecidedHeir("0");
            setTotalPrice("0");
        }
    };

     //All input validation check and handling function
     const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "FeePayeeName") {
            setFeePayeeName(inputValue);
            setFeePayeeNameError(false);
        }
        else if (inputId === "Address") {
            setAddress(inputValue);
            setAddressError(false);
        }   
        else if(inputId === "AmountPaid") {
            setAmountPaid(inputValue);
            setAmountPaidError(false);
        }
        else {
            setDatePaid(inputValue);
            setDatePaidError(false);
        }
        setisSumbitDisabled(false);
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
        if (AmountPaid === 0) {
            AmountPaid = 0;
        }
        else {            
            AmountPaid = parseFloat(AmountPaid.replace(/,/g, '').replace('.', ''));            
        }
        let totalBoxValues = updatedBoxValues.reduce((total, value) => total + value, 0);
        if (isNaN(totalBoxValues)) {
            totalBoxValues = 0;
        }
        let heirValue = AmountPaid - totalBoxValues;
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
        defaultValues = {            
            FeePayeeName: FeePayeeName,
            PostCode: PostCode,
            Address: Address,
            DatePaid: DatePaid,            
            AmountPaid: AmountPaid,            
            UndecidedHeir: UndecidedHeir,
            TotalPrice: AmountPaid,
        }
         //input Validation
         if (defaultValues.FeePayeeName === "") {
            setFeePayeeNameError(true);
            isSumbitDisabled = true;
        } 
        if (defaultValues.Address === "") {
            setAddressError(true);
            isSumbitDisabled = true;
        } 
        if (defaultValues.DatePaid === "") {
            setDatePaidError(true);
            isSumbitDisabled = true;
        } 
        if (defaultValues.AmountPaid === "") {
            setAmountPaidError(true);
            isSumbitDisabled = true;
        }        
        if (defaultValues.UndecidedHeir !== "") {
            if (defaultValues.UndecidedHeir === 0) {
                UndecidedHeir = 0;
            }
            else {
                UndecidedHeir = defaultValues.UndecidedHeir.replace(/,/g, '').replace('.', '');
                UndecidedHeir = parseFloat(UndecidedHeir);
            }
            if (defaultValues.UndecidedHeir < 0) {
                setShowIncorrectError(true);
                isSumbitDisabled = true;
            }
            else {
                setShowIncorrectError(true);
            }
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('FuneralExpenses', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/funeral-expenses`);           
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
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
                            葬儀費用1
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
                                    <label htmlFor="FeePayeeName" className="form-label">
                                        費用支払先氏名<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="FeePayeeName"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"  
                                        onChange={inputHandlingFunction}
                                        value={FeePayeeName}                                      
                                    />
                                    {FeePayeeNameError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-10">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    支払先の所在場所
                                </label>
                                <label htmlFor="PostCode" className="form-label mt-2">
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
                                <label htmlFor="Address" className="form-label">
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



                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="DatePaid" className="form-label">
                                    支払った日<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="date"
                                    id="DatePaid"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={DatePaid}                                      
                                />
                                {DatePaidError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}                                                  
                            </div>
                        </div>
                    </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="AmountPaid" className="form-label">
                                    支払った金額<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="AmountPaid"
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={AmountPaidKeyPress}
                                    onKeyPress={handleKeyPress}                                 
                                />
                                {AmountPaidError && (
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

FuneralExpensesAdd.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};