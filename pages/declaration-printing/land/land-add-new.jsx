"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TableOne from '../../../components/land-tables/table-one';
import TableTwo from '../../../components/land-tables/table-two';
import TableThree from '../../../components/land-tables/table-three';
import TableFour from '../../../components/land-tables/table-four';

export default function LandAdd() {
    let [Name, setName] = useState("");
    let [LotNumber, setLotNumber] = useState("");
    let [ResidenceDisplay, setResidenceDisplay] = useState("");
    let [Owner, setOwner] = useState([]);
    let [User, setUser] = useState([]);
    let [SurName, setSurName] = useState("");
    let [GivenName, setGivenName] = useState("");
    let [Address, setAddress] = useState("");
    let [Acreage, setAcreage] = useState("0");
    let [AmountofMoney, setAmountofMoney] = useState("0");

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [totalPrice, settotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [ShowImageOne, setShowImageOne] = useState(true);
    let [ShowImageTwo, setShowImageTwo] = useState(false);
    let [ShowImageThree, setShowImageThree] = useState(false);
    let [ShowImageFour, setShowImageFour] = useState(false);
    let [ShowTableOne, setShowTableOne] = useState(true);
    let [ShowTableTwo, setShowTableTwo] = useState(false);
    let [ShowTableThree, setShowTableThree] = useState(false);
    let [ShowTableFour, setShowTableFour] = useState(false);
    let [NameError, setNameError] = useState(false);
    let [LotNumberError, setLotNumberError] = useState(false);
    let [ResidenceDisplayError, setResidenceDisplayError] = useState(false);
    let [SurNameError, setSurNameError] = useState(false);
    let [GivenNameError, setGivenNameError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [AcreageError, setAcreageError] = useState(false);

    let [DisabledRadioValue, setDisabledRadioValue] = useState('1');
 

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

    //Input keypress
    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    //Acreage function
    let onChangeAcreage = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        setAcreage(inputValue);
    };

    //ownership-ratio calculation 
    const Ownershipfunction = (e) => {
        setShowIncorrectError(false);
        let ownership_value = Number(e.target.value);
        setOwnership(ownership_value);
        let propertyValue = PropertyTaxAssessmentValue;
        if (propertyValue !== "") {
            propertyValue = propertyValue.replace(/,/g, '').replace('.', '');
            propertyValue = parseFloat(propertyValue);
        }
        if (Ratio > 0 && propertyValue > 0) {
            ownership_value = ownership_value * propertyValue;
            ownership_value = ownership_value / Ratio;
            ownership_value = ownership_value.toLocaleString()
            setValuation(ownership_value);
            setUndecidedHeir(ownership_value);
            setTotalPrice(ownership_value);
        }
        else {

        }
    }

    const Ratiofunction = (e) => {
        setShowIncorrectError(false);
        let ratio_value = Number(e.target.value);
        setRatio(ratio_value);
        let propertyValue = PropertyTaxAssessmentValue;
        if (propertyValue !== "") {
            propertyValue = propertyValue.replace(/,/g, '').replace('.', '');
            propertyValue = parseFloat(propertyValue);
        }
        if (propertyValue > 0 && Ownership > 0) {
            var value = Ownership * propertyValue;
            if (ratio_value > 0) {
                value = value / ratio_value;
                value = value.toLocaleString();
            }
            else {
                value = propertyValue;
            }
            setAmountofMoney(value.toLocaleString());
            setUndecidedHeir(value.toLocaleString());
            setTotalPrice(value.toLocaleString());
        }
        else {
            setAmountofMoney(propertyValue.toLocaleString());
            setUndecidedHeir(propertyValue.toLocaleString());
            setTotalPrice(propertyValue.toLocaleString());
        }
    }

    //Disabled deduction radio button
    const handleDisabledRadio = (event) => {
        let SelectValue = Number(event.target.value);
        setDisabledRadioValue(SelectValue);
        if (SelectValue === 1) {
            setShowImageOne(true);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowTableOne(true);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(false);
        }
        else if (SelectValue === 2) {
            setShowImageOne(false);
            setShowImageTwo(true);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowTableOne(false);
            setShowTableTwo(true);
            setShowTableThree(false);
            setShowTableFour(false);
        }
        else if (SelectValue === 3) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(true);
            setShowImageFour(false);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(true);
            setShowTableFour(false);
        }
        else {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(true);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(true);
        }
    };

    const RightSiteRatiofunction = (event) => {

    }

    const RightRatiofunction = (event) => {

    }

    const CondominiumsDropdownChange = (event) => {

    }

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "ResidenceDisplay") {
            setResidenceDisplay(inputValue);
            setResidenceDisplayError(false);
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
    const onSubmit = () => {
        let defaultValues = {

        };

        //input Validation


        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('Land', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/land`);
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    };

    return (
        <>
            <div className="land-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            土地1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
                <div className="w-full inline-block mb-7">
                        <img src="/images/screenshot-1.jpg" className="w-full" alt="image" height={300} width={200}/>
                    </div>    
                <form action="#" method="POST">
                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">1</text>
                                    </svg>
                                    </span> <span>所在</span><i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                {NameError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">2</text>
                                    </svg>
                                    </span> 建物の名称<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                {LotNumberError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">3</text>
                                    </svg>
                                    </span> 構造</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={ResidenceDisplay}
                                />
                                {ResidenceDisplayError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="label w-full inline-block">
                        <label className="form-label">
                            所有者<i className="text-red-500">*</i>
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-between mt-3 mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">4</text>
                                    </svg>
                                    </span> 床面積 ㎡</label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                />
                                <AreaIcon/>
                                {SurNameError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">5</text>
                                    </svg>
                                    </span> 所在及び地番</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                {GivenNameError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">6</text>
                                    </svg>
                                    </span> 地目</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
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


                    <div className="label w-full inline-block">
                        <label className="form-label">
                            使用者<i className="text-red-500">*</i>
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-between mt-3 mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">7</text>
                                    </svg>
                                    </span> 地積㎡</label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                <AreaIcon/>
                                {SurNameError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">8</text>
                                    </svg>
                                    </span> 家屋番号</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                {GivenNameError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">9</text>
                                    </svg>
                                    </span> 種類</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
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

                    <div className="w-full flex items-center justify-between mt-3 mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 block float-left">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">10</text>
                                    </svg>
                                    </span> 構造<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="Acreage"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    onKeyPress={handleKeyPress}
                                    onChange={onChangeAcreage}
                                    value={Acreage}
                                />
                                {AcreageError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">11</text>
                                    </svg>
                                    </span> 床面積 ㎡</label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"                                    
                                />
                                <AreaIcon />                                
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">12</text>
                                    </svg>
                                    </span> 敷地権の種類</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                            <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"                                    
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-14">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                            <label className="form-label flex items-center">
                                <span className="MuiStepLabel-iconContainer mui-style-vnkopk-MuiStepLabel-iconContainer"><svg className="cricle-mui MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiStepIcon-root mui-style-dnt8r5-MuiSvgIcon-root-MuiStepIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12"></circle>
                                    <text className="text-mui MuiStepIcon-text mui-style-1kdffsf-MuiStepIcon-text" x="12" y="12" text-anchor="middle" dominant-baseline="central">13</text>
                                    </svg>
                                    </span> 敷地権の割合</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <div className="flex justify-between items-center">
                                    <div><input
                                        type="text"
                                        id="RightSiteRatio"
                                        onKeyPress={handleKeyPress}
                                        onChange={RightSiteRatiofunction}
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                    <div>
                                        <span className="text-3xl text-gray-500">/</span>
                                    </div>
                                    <div><input
                                        type="text"
                                        id="Ratio"
                                        onChange={RightRatiofunction}
                                        onKeyPress={handleKeyPress}
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                </div>
                            </div>
                        </div>
                    </div>                                    

                    <div className="bg-custom-light py-3 px-5 w-full inline-block">
                        <label className="form-label" id="demo-row-radio-buttons-group-label">土地の詳細の入力</label>
                    </div>
                    <div className="w-full flex items-center justify-between mt-3 mb-7">
                        <div className="w-full lg:w-65 xl:w-65 2xl:w-65 block float-left">
                            <div className="w-full inline-block mt-2 relative">                            
                                <FormControl>                                    
                                    <RadioGroup
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={DisabledRadioValue}
                                    >
                                        <FormControlLabel value="1" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン１（１つの道路（正面）のみに接している場合）" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 16,
                                            },
                                        }} />
                                        <FormControlLabel value="2" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン２（２つの道路（正面と裏面）に接している場合）" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 16,
                                            },
                                        }} />
                                        <FormControlLabel value="3" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン３（２つの道路（正面と側方）に接している場合）" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 16,
                                            },
                                        }} />
                                        <FormControlLabel value="4" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン４（３つの道路に接している場合）" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 16,
                                            },
                                        }} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        <div className="w-full lg:w-35 xl:w-35 2xl:w-35 inline-block float-left">
                            <div className="w-full inline-block mt-2">
                                {ShowImageOne && (
                                    <Image className="mx-auto w-full" src="/land_item01.png" alt="image-one" height={100} width={200} priority />
                                )}
                                {ShowImageTwo && (
                                    <Image className="mx-auto w-full" src="/land_item02.png" alt="image-one" height={100} width={200} priority />
                                )}
                                {ShowImageThree && (
                                    <Image className="mx-auto w-full" src="/land_item03.png" alt="image-one" height={100} width={200} priority />
                                )}
                                {ShowImageFour && (
                                    <Image className="mx-auto w-full" src="/land_item04.png" alt="image-one" height={100} width={200} priority />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full inline-block py-5">
                        <div classsName="table-columns">
                            {ShowTableOne && (
                                <TableOne/>
                            )}           
                            {ShowTableTwo && (
                                <TableTwo/>
                            )}     
                            {ShowTableThree && (
                                <TableThree/>
                            )}           
                            {ShowTableFour && (
                                <TableFour/>     
                            )}          
                        </div>
                    </div>

                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="heading text-center">
                            <h5 className="text-sm text-black tracking-2 font-medium">財産の合計</h5>
                        </div>
                        <div className="total-list pt-10">
                            <HeirListBox FunhandleBoxValueChange={handleBoxValueChange} FunHandleKeyPress={handleKeyPress} VarUndecidedHeir={UndecidedHeir} VarAmountofMoney={AmountofMoney} />
                        </div>
                        <IncorrectError IncorrectError={ShowIncorrectError} />
                    </div>

                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <BackButton />
                        <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                    </div>
                    <div className="heading text-center pt-8">
                        <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                    </div>
                </form>


            </div>
        </>
    )
}

LandAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};