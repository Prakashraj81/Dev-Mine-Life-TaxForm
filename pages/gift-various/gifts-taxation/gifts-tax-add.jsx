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
import FloorIcon from "../../../components/inputbox-icon/textbox-floor-icon";
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";

export default function GiftTaxAdd() {

    let GiftTypeList = [
        { id: 1, value: '暦年贈与', label: '暦年贈与' },
        { id: 2, value: '相続時精算課税贈与', label: '相続時精算課税贈与' },
        //{ id: 3, value: '相続時精算課税', label: '相続時精算課税' },
        //{ id: 4, value: '特定贈与', label: '特定贈与' },
    ];

    let PropertyList = [
        { id: 1, value: '現金・預貯金', label: '現金・預貯金' },
        { id: 2, value: '有価証券', label: '有価証券' },
        { id: 3, value: '家屋', label: '家屋' },
        { id: 4, value: '土地', label: '土地' },
        { id: 5, value: 'その他財産', label: 'その他財産' },
        { id: 6, value: '事業用財産', label: '事業用財産' },
        { id: 7, value: '外貨', label: '外貨' },
    ];

    let CashSavingsList = [
        { id: 1, value: '現金', label: '現金' },
        { id: 2, value: '普通預金', label: '普通預金' },
        { id: 3, value: '当座預金', label: '当座預金' },
        { id: 4, value: '定期預金', label: '定期預金' },
        { id: 5, value: '決済用預金', label: '決済用預金' },
        { id: 6, value: '貯蓄預金', label: '貯蓄預金' },
        { id: 7, value: '仕組預金', label: '仕組預金' },
        { id: 8, value: '通知預金', label: '通知預金' },
        { id: 9, value: '納税準備預金', label: '納税準備預金' },
        { id: 10, value: '普通貯金', label: '普通貯金' },
        { id: 11, value: '通常貯金', label: '通常貯金' },
        { id: 12, value: '貯蓄貯金', label: '貯蓄貯金' },
        { id: 13, value: '定期貯金', label: '定期貯金' },
        { id: 13, value: '定額貯金', label: '定額貯金' },
        { id: 14, value: '定期積金', label: '定期積金' },
        { id: 15, value: '金銭信託', label: '金銭信託' },
        { id: 16, value: 'その他', label: 'その他' },
    ];

    let SecuritiesList = [
        { id: 1, value: '特定同族会社の株式出資（配当還元方式）', label: '特定同族会社の株式出資（配当還元方式）' },
        { id: 2, value: '特定同族会社の株式出資（その他の方式）', label: '特定同族会社の株式出資（その他の方式）' },
        { id: 3, value: '上記以外の株式（上場株式など）', label: '上記以外の株式（上場株式など）' },
        { id: 4, value: '出資', label: '出資' },
        { id: 5, value: '公債', label: '公債' },
        { id: 6, value: '社債', label: '社債' },
        { id: 7, value: '証券投資信託の受益証券', label: '証券投資信託の受益証券' },
        { id: 8, value: '貸付信託の受益証券', label: '貸付信託の受益証券' },
    ];

    let HouseList = [
        { id: 1, value: '家屋', label: '家屋' },
        { id: 2, value: '構築物', label: '構築物' },
    ];

    let HeirList = [
        { id: 1, value: 'Shree', label: 'Shree' },
        { id: 2, value: 'Prakashraj', label: 'Prakashraj' },
        { id: 3, value: 'Gowtham', label: 'Gowtham' },
    ];

    let LandList = [
        { id: 1, value: '宅地', label: '宅地' },
        { id: 2, value: '借地権', label: '借地権' },
        { id: 3, value: '田', label: '田' },
        { id: 4, value: '畑', label: '畑' },
        { id: 5, value: '山林', label: '山林' },
        { id: 6, value: 'その他の土地', label: 'その他の土地' },
    ];

    let BusinessPropertyList = [
        { id: 1, value: '機械', label: '機械' },
        { id: 2, value: '器具', label: '器具' },
        { id: 3, value: '農機具', label: '農機具' },
        { id: 4, value: 'その他の減価償却資産', label: 'その他の減価償却資産' },
        { id: 5, value: '商品', label: '商品' },
        { id: 6, value: '製品', label: '製品' },
        { id: 7, value: '半製品', label: '半製品' },
        { id: 8, value: '原材料', label: '原材料' },
        { id: 9, value: '農産物等', label: '農産物等' },
        { id: 10, value: '売掛金', label: '売掛金' },
        { id: 11, value: 'その他財産', label: 'その他財産' },
    ]


    let [GiftType, setGiftType] = useState("");
    let [AmountDonated, setAmountDonated] = useState("");
    let [GiftTaxAmount, setGiftTaxAmount] = useState("");
    let [GiftTaxReturnType, setGiftTaxReturnType] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [Quantity, setQuantity] = useState("0");
    let [GiftAmount, setGiftAmount] = useState("0");
    let [AmountofGiftTax, setAmountofGiftTax] = useState("0");
    let [Location, setLocation] = useState("");
    let [Breadth, setBreadth] = useState("0");
    let [HeirListType, setHeirListType] = useState("");

    let [PropertyOptionsData, setPropertyOptionsData] = useState([]);
    let [SelectedPropertList, setSelectedPropertList] = useState('');

    let [ShowPostCode, setShowPostCode] = useState(true);
    let [ShowAddress, setShowAddress] = useState(true);
    let [ShowQuantity, setShowQuantity] = useState(true);
    let [ShowLocation, setShowLocation] = useState(true);
    let [ShowGiftAmountandGiftTax, setShowGiftAmountandGiftTax] = useState(true);
    let [ShowBreadth, setShowBreadth] = useState(true);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [GiftTypeError, setGiftTypeError] = useState(false);
    let [AmountDonatedError, setAmountDonatedError] = useState(false);
    let [GiftTaxAmountError, setGiftTaxAmountError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [LocationError, setLocationError] = useState(false);
    let [GiftAmountError, setGiftAmountERror] = useState(false);
    let [AmountofGiftTaxError, setAmountofGiftTaxError] = useState(false);
    let [GiftRecipientError, setGiftRecipientError] = useState(false);
    let [HeirListTypeError, setHeirListTypeError] = useState(false);


    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);
    
    //Gift type
    const handleGiftType = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = Number(selectedOption.value);
        setisSumbitDisabled(false);
        setShowIncorrectError(false);
        setGiftType(selectedOption.text);
        setGiftTypeError(false);
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

    const handleDropdownChange = (event) => {
        var selectedId = Number(event.target.value);
        setGiftType(selectedId);
    };



    //Property select box
    const handlePropertyChange = (event) => {
        var selectedOption = event.target.options[event.target.selectedIndex];
        setTypeofProperty(selectedOption.text);
        let selectedId = Number(selectedOption.value);
        if (selectedId === 1) {
            setPropertyOptionsData(CashSavingsList);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else if (selectedId === 2) {
            setPropertyOptionsData(SecuritiesList);
            setShowPostCode(false);
            setShowAddress(false);
            setShowBreadth(false);
            setShowLocation(true);
            setShowQuantity(true);
        }
        else if (selectedId === 3) {
            setPropertyOptionsData(HouseList);
            setShowLocation(false);
            setShowQuantity(false);
            setShowBreadth(true);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 4) {
            setPropertyOptionsData(LandList);
            setShowLocation(false);
            setShowQuantity(false);
            setShowBreadth(true);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 5) {
            setPropertyOptionsData([]);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else if (selectedId === 6) {
            setPropertyOptionsData(BusinessPropertyList);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else if (selectedId === 7) {
            setPropertyOptionsData(CashSavingsList);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else {
            setPropertyOptionsData([]);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
    };

    const handleChangeHeir = () => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = Number(selectedOption.value);
        setisSumbitDisabled(false);
        setShowIncorrectError(false);
        setHeirListType(selectedOption.text);
        setHeirListTypeError(false);
    }

    function onchangeQuantity(e) {
        let quantity = parseFloat(e.target.value);
        setQuantity(quantity);
        setisSumbitDisabled(false);
    }

    const handleGiftTaxReturnType = (e) => {
        setGiftTaxReturnType("");
    }

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "GiftType") {
            setGiftType(inputValue);
            setGiftTypeError(false);
        }
        else if (inputId === "AmountDonated") {
            setAmountDonated(inputValue);
            setAmountDonatedError(false);
        }
        else if (inputId === "GiftTaxAmount"){
            setGiftTaxAmount(inputValue);
        }
        else if (inputId === "GiftTaxReturnType"){
            setGiftTaxReturnType(inputValue);
        }
        else if (inputId === "Address") {
            setAddress(inputValue);
            setAddressError(false);
        }
        else if (inputId === "Location") {
            setLocation(inputValue);
            setLocationError(false);
        }
        else {

        }
        setisSumbitDisabled(false);
    }

    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = () => {
        defaultValues = {
            GiftType: GiftType,
            Location: Location,
            Quantity: Quantity,
            AmountDonated: AmountDonated,
            GiftTaxAmount: GiftTaxAmount,
            GiftTaxReturnType: GiftTaxReturnType,
            GiftTaxReturnType: GiftTaxReturnType,            
            HeirListType: HeirListType,
        };

        //input Validation
        if (defaultValues.GiftType === "") {
            setGiftTypeError(true);
            isSumbitDisabled = true;
        }        
        if (defaultValues.Location === "") {
            setLocationError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.AmountDonated === "") {
            setAmountDonatedError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.GiftTaxAmount === "") {
            setGiftTaxAmountError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.HeirListType === "") {
            setHeirListTypeError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('securities', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/securities`);         
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
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
                        生前贈与
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
                                        贈与の種類<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select id="GiftType" className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleGiftType}>
                                        <option value=''></option>
                                        {GiftTypeList.map((option) => (
                                            <option key={option.value} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {GiftTypeError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                所在場所・財産の種類（例：現金、不動産の場合所在地）<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="Location"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={Location}
                                />
                                {LocationError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    数量（㎡、株数等）
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    id="Quantity"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12"
                                    onChange={onchangeQuantity}
                                    onKeyPress={handleKeyPress}
                                    value={Quantity}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        贈与を受けた額<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="AmountDonated"
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={inputHandlingFunction}
                                        value={AmountDonated}
                                    />
                                    {AmountDonatedError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与に伴って支払った贈与税額<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="GiftTaxAmount"
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={GiftTaxAmount}
                                />
                                {GiftTaxAmountError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                贈与税申告書の提出先  
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">                               
                                <input
                                    type="text"
                                    id="GiftTaxReturnType"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={GiftTaxReturnType}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                贈与を受けた人<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select id="HeirListType" onChange={handleChangeHeir} className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                    <option value='' id="0"></option>
                                    {HeirList.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {HeirListTypeError && (
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

GiftTaxAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};