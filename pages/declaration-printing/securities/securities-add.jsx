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
import UnitPriceIcon from "../../../components/inputbox-icon/textbox-unitprice-icon";
import InfoIcon from '@mui/icons-material/Info';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import { list } from "postcss";
import axios from "axios";

export default function SecuritiesAdd() {
    let SecuritiesList = [
        { id: 1, value: '上場株式及び出資', label: '上場株式及び出資' },
        { id: 2, value: '公債及び社債', label: '公債及び社債' },
        { id: 3, value: '証券投資信託・貸付信託の受益証券', label: '証券投資信託・貸付信託の受益証券' },
        // { id: 1, value: '特定同族会社の株式出資（配当還元方式）', label: '特定同族会社の株式出資（配当還元方式）' },
        // { id: 2, value: '特定同族会社の株式出資（その他の方式）', label: '特定同族会社の株式出資（その他の方式）' },
        // { id: 3, value: '上記以外の株式（上場株式など）', label: '上記以外の株式（上場株式など）' },
        // { id: 4, value: '出資', label: '出資' },
        // { id: 5, value: '公債', label: '公債' },
        // { id: 6, value: '社債', label: '社債' },
        // { id: 7, value: '証券投資信託の受益証券', label: '証券投資信託の受益証券' },
        // { id: 8, value: '貸付信託の受益証券', label: '貸付信託の受益証券' },
    ];

    let UnitDetailsList = [
        { id: 9, value: 'MRF', label: 'MRF' },
        { id: 10, value: '外貨建てMMF', label: '外貨建てMMF' },
        { id: 11, value: '一般的な投資信託', label: '一般的な投資信託' },
        { id: 12, value: '上場投資信託', label: '上場投資信託' },
    ];

    let UnitsList = [
        { id: 1, value: '株', label: '株' },
        { id: 2, value: '口', label: '口' },
        { id: 3, value: 'その他', label: 'その他（フリー入力）' },
    ];

    let HeirList = [
        { id: 1, name: "User", name1: "山田　太郎" },
        { id: 2, name: "Shree", name1: "Shree" },
        { id: 3, name: "Prakashraj", name1: "Prakashraj" },
        { id: 4, name: "Gowtham", name1: "Gowtham" },
    ];

    const buttonStyle = {
        width: '18px',
        height: '18px',
    };


    let [SecuritiesType, setSecuritiesType] = useState("");
    let [UnitDetails, setUnitDetails] = useState("");
    let [NameofSecurities, setNameofSecurities] = useState("");
    let [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    let [UnitPrice, setUnitPrice] = useState(0);
    let [Quantity, setQuantity] = useState(0);
    let [OthersUnitInput, setOthersUnitInput] = useState(0);
    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [MoneyOrder, setMoneyOrder] = useState(0);
    let [ReductionAmount, setReductionAmount] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [totalPrice, settotalPrice] = useState(0);
    let [boxValues, setBoxValues] = useState([]);

    //Hide and Show Input   
    let [showAmountMoney, setshowAmountMoney] = useState(false);
    let [showFinancialInstitutionName, setshowFinancialInstitutionName] = useState(false);
    let [showQuantityPrice, setshowQuantityPrice] = useState(false);
    let [showNameSecurities, setshowNameSecurities] = useState(true);
    let [Equitydividendmethod, setEquitydividendmethod] = useState(false);
    let [showUnitDetails, setshowUnitDetails] = useState(false);
    let [showMoneyOrderQuantity, setshowMoneyOrderQuantity] = useState(false);
    let [showReducationAmount, setshowReducationAmount] = useState(false);
    let [ShowOtherFreeInput, setShowOtherFreeInput] = useState(false);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [SecuritiesTypeError, setSecuritiesTypeError] = useState(false);
    let [UnitDetailsError, setUnitDetailsError] = useState(false);
    let [NameofSecuritiesError, setNameofSecuritiesError] = useState(false);
    let [UnitPriceError, setUnitPriceError] = useState(false);
    let [FinancialInstitutionNameError, setFinancialInstitutionNameError] = useState(false);
    let [AmountofMoneyError, setAmountofMoneyError] = useState(false);   
    
    
    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);    


    //Securities dropdown
    let selectId = 0;
    const SecuritiesDropdownChange = (event) => {        
        let selectedValue = event.target.value;
        if(selectedValue !== "0"){
            let selectedOptions = SecuritiesList.find(option => option.value === selectedValue);
            selectId = Number(selectedOptions.id);  
        }
        else{
            selectId = 0;
        }          
        setSecuritiesType(selectedValue);   
        console.log(selectedValue);  
        if (selectId !== 0) {
            setSecuritiesTypeError(false);
            handleInputChange(selectId);
        }
        else {
            setSecuritiesTypeError(true);
        }
    };

    const UnitsDropdownChange = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = UnitsList.find(option => option.value === selectedValue);
        selectId = Number(selectedOptions.id);    
        setUnitPrice(selectedValue);    
        if(selectId === 3){
            setShowOtherFreeInput(true);
        }
        else{
            setShowOtherFreeInput(false);
        }
    }

    const UnitDetailsDropdownChange = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = UnitDetailsList.find(option => option.value === selectedValue);
        selectId = Number(selectedOptions.id);    
        setUnitDetails(selectedValue);       
        if (selectId !== 0) {
            setUnitDetailsError(false);
            handleInputChange(selectId);
        }
        else {
            setUnitDetailsError(true);
        }
    }


    useEffect(() => {
        setshowNameSecurities(true);
        setshowAmountMoney(true);
        setshowAmountMoney(true);
        setshowQuantityPrice(true);
        setshowFinancialInstitutionName(true);
        setshowAmountMoney(false);

        let securityId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if(searchParams !== null){
            securityId = Number(atob(searchParams));
            GetSecuritiesDetails(securityId);
        }        
    }, []);
    
    //Load cash savings details    
    const GetSecuritiesDetails = async(securityId) => {       
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = {auth_key: auth_key, id: securityId };
        if(auth_key !== null && securityId !== 0){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_securities', {params});
                if(response.status === 200){                    
                    setSecuritiesType(response.data.securities_details.securities_type);  
                    setNameofSecurities(response.data.securities_details.name_and_brand);                                     
                    setFinancialInstitutionName(response.data.securities_details.financial_institution_name);
                    setUnitDetails(response.data.securities_details.unit_details);     
                    setUnitPrice(response.data.securities_details.unit_1_details);
                    setQuantity(response.data.securities_details.quantity);
                    setAmountofMoney(response.data.securities_details.amount.toLocaleString());                                                     
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

    function inputClear() {
        setUnitDetails("");
        setNameofSecurities("");
        setFinancialInstitutionName("");
        setUnitPrice(0);
        setQuantity(0);
        setAmountofMoney(0);
        setMoneyOrder(0);
        setReductionAmount(0);
        setUndecidedHeir(0);
        settotalPrice(0);
    }

    const handleInputChange = (selectId) => {
        setisSumbitDisabled(false);
        inputClear();
        if (selectId === 0 || selectId === 4) {
            setshowNameSecurities(true);
            setshowAmountMoney(true);
            setshowFinancialInstitutionName(false);
            setshowQuantityPrice(false);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 1 || selectId === 2) {
            setshowNameSecurities(true);
            setshowAmountMoney(false);
            setshowQuantityPrice(true);
            setshowFinancialInstitutionName(true);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 3) {
            setshowAmountMoney(false);
            setshowQuantityPrice(true);
            setshowFinancialInstitutionName(true);
            setshowNameSecurities(true);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 5 || selectId === 6 || selectId === 8) {
            setshowNameSecurities(true);
            setshowAmountMoney(true);
            setshowFinancialInstitutionName(true);
            setshowQuantityPrice(false);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 7 || selectId === 9 || selectId === 12) {
            setshowUnitDetails(true);
            setshowNameSecurities(true);
            setshowAmountMoney(true);
            setshowFinancialInstitutionName(true);
            setshowQuantityPrice(false);
            setshowMoneyOrderQuantity(false);
            setshowReducationAmount(false);
        }
        else if (selectId === 10) {
            setshowMoneyOrderQuantity(true);
            setshowReducationAmount(true);
            setshowUnitDetails(true);
            setshowNameSecurities(true);
            setshowAmountMoney(true);
            setshowFinancialInstitutionName(true);
            setshowQuantityPrice(false);
        }
        else if (selectId === 11) {
            setshowQuantityPrice(true);
            setshowReducationAmount(true);
            setshowUnitDetails(true);
            setshowNameSecurities(true);
            setshowAmountMoney(false);
            setshowFinancialInstitutionName(true);
            setshowMoneyOrderQuantity(false);
        }
    }

    //Amount input
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

    const MoneyOrderKeyPress = (e) => {
        let money_order = Number(e.target.value);
        setMoneyOrder(money_order);
        setisSumbitDisabled(false);
    }

    const ReductionAmountKeyPress = (e) => {
        let reduction_amount = Number(e.target.value);
        var previousAmountofmoney = (10 / 100) * Quantity;
        setReductionAmount(reduction_amount);
        if (reduction_amount > 0) {
            var amount = previousAmountofmoney;
            amount = amount - reduction_amount;
            setAmountofMoney(amount.toLocaleString());
            setUndecidedHeir(amount.toLocaleString());
            AmountToTotalCalculation(amount.toLocaleString());
        }
        else {
            amount = previousAmountofmoney - reduction_amount;
            setAmountofMoney(amount.toLocaleString());
            setUndecidedHeir(amount.toLocaleString());
            AmountToTotalCalculation(amount.toLocaleString());
            setReductionAmount(0);
        }
        setisSumbitDisabled(false);
    }

    const MoneyOrderQuantityKeyPress = (e) => {
        let money_Quantity = Number(e.target.value);
        setQuantity(money_Quantity);
        if (money_Quantity >= 10) {
            var percentage = (10 / 100) * money_Quantity;
            setAmountofMoney(percentage.toLocaleString());
        }
        else {
            setAmountofMoney(0);
        }
        setisSumbitDisabled(false);
    }


    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const UnitPriceKeyPress = (e) => {
        let unit_price = parseFloat(e.target.value);
        setUnitPrice(unit_price);
    }

    const QuantityKeyPress = (e) => {
        let unit_price = parseFloat(e.target.value);
        setQuantity(unit_price);
    }    

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "NameofSecurities") {
            setNameofSecurities(inputValue);
            setNameofSecuritiesError(false);
        }
        else if (inputId === "FinancialInstitutionName") {
            setFinancialInstitutionName(inputValue);
            setFinancialInstitutionNameError(false);
        }
        else {
            setOthersUnitInput(inputValue);
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
    

    //Submit insert and edit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async() => {
        defaultValues = {
            SecuritiesType: SecuritiesType,
            UnitDetails: UnitDetails,
            NameofSecurities: NameofSecurities,
            FinancialInstitutionName: FinancialInstitutionName,
            UnitPrice: UnitPrice,
            Quantity: Quantity,
            OthersUnitInput: OthersUnitInput,
            MoneyOrder: MoneyOrder,
            ReductionAmount: ReductionAmount,
            AmountofMoney: AmountofMoney,
            UndecidedHeir: UndecidedHeir,
            totalPrice: totalPrice,
        };
        if (defaultValues.SecuritiesType === "") {
            setSecuritiesTypeError(true);
            isSumbitDisabled = true;
        }

        if (defaultValues.UnitDetails === "") {
            if (showUnitDetails === true) {
                setUnitDetailsError(true);
                isSumbitDisabled = true;
            }

        }

        if (defaultValues.NameofSecurities === "") {
            setNameofSecuritiesError(true);
            isSumbitDisabled = true;
        }

        if (defaultValues.FinancialInstitutionName === "") {
            if (showFinancialInstitutionName === true) {
                setFinancialInstitutionNameError(true);
                isSumbitDisabled = true;
            }
        }        

        if (defaultValues.AmountofMoney !== "" || defaultValues.AmountofMoney === 0) {
            valueConvertFun(defaultValues.AmountofMoney);
        }        

        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {     
            let response = "";
            let securityId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if(searchParams !== null){
                securityId = Number(atob(searchParams));
            }            
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", securityId);
            formData.append("securities_type", SecuritiesType);            
            formData.append("name_and_brand", NameofSecurities);
            formData.append("quantity", Quantity);
            formData.append("financial_institution_name", FinancialInstitutionName);
            formData.append("unit_details", UnitDetails);
            formData.append("unit_1_details",  OthersUnitInput);
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            formData.append("amount", parseFloat(AmountofMoney));
            try{
                if(securityId === 0){
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_securities', formData);
                }
                else{
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_securities', formData);
                }               
                if(response.status === 200){
                    router.push(`/declaration-printing/securities`); 
                }                
            }catch(error){
                console.log('Error:', error);
            }
        }
        else {
            console.log("API not allowed");
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
            
            <div className="securities-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            有価証券1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
            </div>
            <div className="w-full inline-block">
                <form action="#" method="POST">                   
                        <div className="w-full flex items-center  mb-12">
                            <div className="label w-25 inline-block">
                                <label htmlFor="SecuritiesType" className="form-label">
                                    有価証券の種類<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-50 inline-block mt-2">
                                <select id="SecuritiesType" value={SecuritiesType} className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={SecuritiesDropdownChange}>
                                    <option value='0' id="0"></option>
                                    {SecuritiesList.map((option) => (
                                        <option key={option.value} id={option.id} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {SecuritiesTypeError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                                      
                    </div>

                    <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="NameofSecurities" className="form-label">
                                    有価証券の名称・銘柄 <i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="NameofSecurities"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={inputHandlingFunction}
                                        value={NameofSecurities}
                                    />
                                    {NameofSecuritiesError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="FinancialInstitutionName" className="form-label">
                                    金融機関名<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
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
                    
                    
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Quantity" className="form-label">
                                    数量
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Quantity"                                       
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        value={Quantity}
                                        onChange={QuantityKeyPress}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center">
                                        単位 
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <select id="UnitsType" className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={UnitsDropdownChange}>
                                            <option value='' id="0"></option>
                                            {UnitsList.map((option) => (
                                                <option key={option.value} id={option.id} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {UnitPriceError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="AmountofMoney" className="form-label">
                                        金額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="AmountofMoney"
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
                            {ShowOtherFreeInput && (
                            <>
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center">
                                        その他を選択した場合、単位を記載
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            id="OthersUnitInput"  
                                            value={OthersUnitInput} 
                                            onChange={inputHandlingFunction}
                                            onKeyPress={handleKeyPress}                              
                                            className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
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

SecuritiesAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};