/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';
import BackdropLoader from '../../../components/loader/backdrop-loader';
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomAmountInput from "../../../components/inputbox-icon/custom-amount-input";

export default function OtherPropertyAdd() {
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
    let [ShowContent, setShowContent] = useState(false);
    let [ShowCompensatoryProperty, setShowCompensatoryProperty] = useState(false);

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
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
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null && OtherPropertyId !== 0) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/get_other_assets_details?auth_key=${auth_key}?id=${OtherPropertyId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    setPropertyName(data.other_assets_details.property_name);
                    setOtherParty(data.other_assets_details.other_party);
                    setValuation(data.other_assets_details.valuation.toLocaleString());
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
        if (reduction_amount > 0) {
            var amount = previousAmountofmoney;
            amount = amount - reduction_amount;
            setValuation(amount.toLocaleString());
            setUndecidedHeir(amount.toLocaleString());
        }
        else {
            amount = previousAmountofmoney - reduction_amount;
            setValuation(amount.toLocaleString());
            setUndecidedHeir(amount.toLocaleString());
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
        if (defaultValues.Valuation === "" || defaultValues.Valuation === "0") {
            if (ShowValuation === true) {
                setValuationError(true);
                isSumbitDisabled = true;
            }
        }
        //Api setup
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
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
                    response = await fetch(`https://minelife-api.azurewebsites.net/add_other_assets`, {
                        method: 'POST',
                        body: formData
                    });
                }
                else {
                    response = await fetch(`https://minelife-api.azurewebsites.net/edit_other_assets`, {
                        method: 'POST',
                        body: formData
                    });
                }
                if (response.ok) {
                    router.push(`/declaration-printing/other-property`);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        else {
            setisSumbitDisabled(true);
            setShowLoader(false);
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
                                <CustomInput type={"text"} id={"PropertyName"} onChange={inputHandlingFunction} value={PropertyName} error={PropertyNameError} />
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
                                        autoComplete="off"
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
                                    <CustomAmountInput type={"text"} id={"Valuation"} onChange={ValuationKeyPress} onKeyPress={handleKeyPress} value={Valuation} textAlign={"right"} error={ValuationError} />
                                    {ValuationError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
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