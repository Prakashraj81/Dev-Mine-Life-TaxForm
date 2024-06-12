"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { List, ListItem, ListItemText, ListItemIcon, Boxider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../../components/loader/backdrop-loader';
import UnitPriceIcon from "../../../components/inputbox-icon/textbox-unitprice-icon";
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomAmountInput from "../../../components/inputbox-icon/custom-amount-input";

export default function OtherPropertyAdd() {
    let PropertyList = [
        { id: 1, value: 'その他', label: 'その他' },
        { id: 2, value: '立木', label: '立木' },
        { id: 3, value: '代償財産', label: '代償財産' },
        { id: 4, value: '管理残額（教育資金）', label: '管理残額（教育資金）' },
        { id: 5, value: '管理残額（結婚・子育て資金）', label: '管理残額（結婚・子育て資金）' },
    ];

    let [Property, setProperty] = useState("");
    let [PropertyName, setPropertyName] = useState("");
    let [OtherParty, setOtherParty] = useState("");
    let [DateofAcquisition, setDateofAcquisition] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Valuation, setValuation] = useState("0");
    let [Address, setAddress] = useState("");
    let [UnitPrice, setUnitPrice] = useState("0");
    let [Quantity, setQuantity] = useState("0");
    let [ReductionRate, setReductionRate] = useState("0");

    let [ShowDateofAcquisition, setShowDateofAcquisition] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowValuation, setShowValuation] = useState(true);
    let [ShowAddress, setShowAddress] = useState(false);
    let [ShowUnitPriceQuantity, setShowUnitPriceQuantity] = useState(false);
    let [ShowReductionRate, setShowReductionRate] = useState(false);
    let [ShowValuationDisabled, setShowValuationDisabled] = useState(false);
    let [ShowContent, setShowContent] = useState(false);
    let [ShowCompensatoryProperty, setShowCompensatoryProperty] = useState(false);

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [TotalPrice, setTotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [PropertyNameError, setPropertyNameError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [DateofAcquisitionError, setDateofAcquisitionError] = useState(false);
    let [ReductionRateError, setReductionRateError] = useState(false);
    let [ValuationError, setValuationError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let OtherPropertyId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams !== null) {
            OtherPropertyId = Number(atob(searchParams));
            GetOtherPropertyDetails(OtherPropertyId);
        }
    }, []);


    //Load other property details    
    const GetOtherPropertyDetails = async (OtherPropertyId) => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key, id: OtherPropertyId };
        if (auth_key !== null && OtherPropertyId !== 0) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_other_assets_details', { params });
                if (response.status === 200) {
                    setPropertyName(response.data.other_assets_details.property_name);
                    setOtherParty(response.data.other_assets_details.other_party);
                    setValuation(response.data.other_assets_details.valuation.toLocaleString());
                }
                else {

                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            //Logout();
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


    const handlePropertyType = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = PropertyList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);
        setProperty(selectedValue);
        setisSumbitDisabled(false);
        if (selectedId === 1) {
            setShowContent(false);
            setShowCompensatoryProperty(false);
            setShowValuationDisabled(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowUnitPriceQuantity(true);
            setShowValuation(true);
        }
        else if (selectedId === 2) {
            setShowContent(false);
            setShowCompensatoryProperty(false);
            setShowValuationDisabled(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(true);
            setShowPostCode(true);
            setShowAddress(true);
            setShowUnitPriceQuantity(true);
            setShowValuation(true);
        }
        else if (selectedId === 3) {
            setShowContent(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(false);
            setShowPostCode(false);
            setShowAddress(false);
            setShowUnitPriceQuantity(false);
            setShowValuation(true);
            setShowValuationDisabled(true);
            setShowCompensatoryProperty(true);
        }
        else if (selectedId === 4) {
            setShowCompensatoryProperty(false);
            setShowValuationDisabled(false);
            setShowReductionRate(false);
            setShowUnitPriceQuantity(false);
            setShowValuation(true);
            setShowContent(true);
            setShowDateofAcquisition(true);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 5) {
            setShowCompensatoryProperty(false);
            setShowValuationDisabled(false);
            setShowReductionRate(false);
            setShowUnitPriceQuantity(false);
            setShowValuation(true);
            setShowContent(false);
            setShowDateofAcquisition(true);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else {
            setShowContent(false);
            setShowCompensatoryProperty(false);
            setShowValuationDisabled(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(false);
            setShowPostCode(false);
            setShowAddress(false);
            setShowUnitPriceQuantity(false);
            setShowValuation(true);
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

    const ReductionRateKeyPress = (e) => {
        let reduction_amount = Number(e.target.value);
        var previousAmountofmoney = (10 / 100) * Quantity;
        setReductionAmount(reduction_amount);
        if (reduction_amount > 0) {
            var amount = previousAmountofmoney;
            amount = amount - reduction_amount;
            setValuation(amount.toLocaleString());
            setUndecidedHeir(amount.toLocaleString());
            AmountToTotalCalculation(amount.toLocaleString());
        }
        else {
            amount = previousAmountofmoney - reduction_amount;
            setValuation(amount.toLocaleString());
            setUndecidedHeir(amount.toLocaleString());
            AmountToTotalCalculation(amount.toLocaleString());
            setReductionAmount(0);
        }
        setisSumbitDisabled(false);
    }


    let flag = 0;
    function onchangeUnitPrice(e) {
        let unit_price = parseFloat(e.target.value);
        if (isNaN(unit_price)) {
            setUnitPrice(0);
        }
        else {
            setUnitPrice(unit_price);
        }
        let qty = Quantity;
        if (qty > 0) {
            flag = 1;
            onchangeQuantity(e);
        }
        else {
            flag = 0;
        }
    }

    function onchangeQuantity(e) {
        let u_price = UnitPrice;
        let quantity;
        if (flag == 1) {
            quantity = Quantity;
        }
        else {
            quantity = parseFloat(e.target.value);
        }
        if (quantity > 0) {
            let totalPrice = u_price * quantity;
            setQuantity(quantity);
            setValuation(totalPrice.toLocaleString());
            setUndecidedHeir(totalPrice.toLocaleString());
        }
        else {
            setQuantity(0);
        }
        setisSumbitDisabled(false);
    }

    const ValuationKeyPress = (e) => {
        let valuation = e.target.value;
        valuation = valuation.replace(/,/g, '').replace('.', '');
        valuation = parseFloat(valuation);
        valuation = valuation.toLocaleString();
        if (valuation === "NaN") {
            setValuation(0);
            setUndecidedHeir(0);
        }
        else {
            setValuationError(false);
            setValuation(valuation);
            setUndecidedHeir(valuation);
        }
        setisSumbitDisabled(false);
    }



    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "PropertyName") {
            setPropertyName(inputValue);
            setPropertyNameError(false);
        }
        else if (inputId === "OtherParty") {
            setOtherParty(inputValue);
        }
        else if (inputId === "DateofAcquisition") {
            setDateofAcquisition(inputValue);
            setDateofAcquisitionError(false);
        }
        else {
            setAddress(inputValue);
            setAddressError(false);
        }
        setisSumbitDisabled(false);
    }



    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async () => {
        defaultValues = {
            Property: Property,
            PropertyName: PropertyName,
            DateofAcquisition: DateofAcquisition,
            PostCode: PostCode,
            Address: Address,
            UnitPrice: UnitPrice,
            Quantity: Quantity,
            ReductionRate: ReductionRate,
            Valuation: Valuation,
            UndecidedHeir: UndecidedHeir,
            TotalPrice: Valuation,
            boxValues: boxValues,
        }

        //input Validation        
        if (defaultValues.PropertyName === "") {
            setPropertyNameError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DateofAcquisition === "") {
            if (ShowDateofAcquisition === true) {
                setDateofAcquisitionError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.Address === "") {
            if (ShowAddress === true) {
                setAddressError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.ReductionRate === "") {
            if (ShowReductionRate === true) {
                setReductionRateError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.Valuation === "") {
            if (ShowValuation === true) {
                setValuationError(true);
                isSumbitDisabled = true;
            }
        }
        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let response = "";
            let OtherPropertyId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                OtherPropertyId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", OtherPropertyId);
            formData.append("property_name", PropertyName);
            formData.append("other_party", OtherParty);
            Valuation = Valuation.replace(/,/g, '').replace('.', '');
            formData.append("valuation", parseFloat(Valuation));
            try {
                if (OtherPropertyId === 0) {
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_other_assets', formData);
                }
                else {
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_other_assets', formData);
                }
                if (response.status === 200) {
                    router.push(`/declaration-printing/other-property`);
                }
            } catch (error) {
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

            <Box className="other-property-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            その他の財産1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>

                <form action="#" method="POST">

                    <Box className="w-full flex items-center justify-between mb-7">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    財産の名称<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">                                
                                <CustomInput type={"text"} id={"PropertyName"} onChange={inputHandlingFunction} value={PropertyName} />
                                {PropertyNameError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>

                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="user-details">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        相手先
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">                                    
                                    <CustomInput type={"text"} id={"OtherParty"} onChange={inputHandlingFunction} value={OtherParty} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {ShowContent && (
                        <Box className="py-3"><Typography component={"p"}>相続人が<span className="font-semibold">23歳未満、在学中、教育訓練給付⾦の⽀給対象となる教育訓練を受講している</span>のいずれかに該当する場合は相続税の課税対象外ですので⼊⼒は不要です。</Typography></Box>
                    )}

                    {ShowDateofAcquisition && (
                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        財産の取得日<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="DateofAcquisition"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={inputHandlingFunction}
                                        value={DateofAcquisition}
                                    />
                                    {DateofAcquisitionError && (
                                        <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {ShowPostCode && (
                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        郵便番号
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"
                                        id="PostCode"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-12"
                                        onKeyPress={handleKeyPress}
                                        onChange={postalcodeDigit}
                                        value={PostCode}
                                    />
                                </Box>
                                <Box className="mt-3">
                                    <Typography component={"p"} className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</Typography>
                                </Box>
                                {!isValid && <Typography component={"p"}>数字7桁で入力して下さい。海外の場合は入力不要です。</Typography>}
                            </Box>
                        </Box>
                    )}


                    {ShowAddress && (
                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details w-full block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        住所<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">                                 
                                    <CustomInput type={"text"} id={"Address"} onChange={inputHandlingFunction} value={Address} />
                                    {AddressError && (
                                        <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {ShowUnitPriceQuantity && (
                        <Box className="w-full flex items-center justify-between mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="user-details">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label">
                                            単価
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">                                        
                                        <CustomInput type={"text"} id={"UnitPrice"} onChange={onchangeUnitPrice} onKeyPress={handleKeyPress} value={UnitPrice} />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} htmlFor="Quantity" className="form-label">
                                        数量
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">                                   
                                    <CustomInput type={"text"} id={"Quantity"} onChange={onchangeQuantity} onKeyPress={handleKeyPress} value={Quantity} textAlign={"right"} />
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {ShowReductionRate && (
                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        減額割合<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="ReductionRate"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={ReductionRateKeyPress}
                                        onKeyPress={handleKeyPress}
                                        autocomplete="off"
                                    />
                                    {ReductionRateError && (
                                        <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}


                    {ShowValuation && (
                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        評価額<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2 relative">                                  
                                    <CustomAmountInput type={"text"} id={"Valuation"} onChange={ValuationKeyPress} onKeyPress={handleKeyPress} value={Valuation} textAlign={"right"}/>
                                    {ValuationError && (
                                        <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}


                    {ShowCompensatoryProperty && (
                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        代償財産の分割方法
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">

                                </Box>
                            </Box>
                        </Box>
                    )}
                    <Box className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <Box className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton />
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

OtherPropertyAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};