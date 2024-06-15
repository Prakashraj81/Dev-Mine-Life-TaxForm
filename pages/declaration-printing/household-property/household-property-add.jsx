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
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomPostalcodeInput from "../../../components/inputbox-icon/custom-postalcode-input";

export default function HouseholdPropertyAdd() {

    let [PropertyContent, setPropertyContent] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [Valuation, setValuation] = useState("0");

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [PropertyContentError, setPropertyContentError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [ValuationAmountError, setValuationAmountError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);


    useEffect(() => {
        let houseHoldId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams !== null) {
            houseHoldId = Number(atob(searchParams));
            GetHouseHoldDetails(houseHoldId);
        }
    }, []);


    //Load cash savings details    
    const GetHouseHoldDetails = async (houseHoldId) => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key, id: houseHoldId };
        if (auth_key !== null && houseHoldId !== 0) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_household_details', { params });
                if (response.status === 200) {
                    setPropertyContent(response.data.household_details.property_details);
                    setPostCode(response.data.household_details.postal_code);
                    setAddress(response.data.household_details.address);
                    setValuation(response.data.household_details.valuation.toLocaleString());
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

    const ValuationKeyPress = (e) => {
        let amount_of_money = e.target.value;
        amount_of_money = amount_of_money.replace(/,/g, '').replace('.', '');
        amount_of_money = parseFloat(amount_of_money);
        amount_of_money = amount_of_money.toLocaleString();
        if (amount_of_money === "NaN") {
            setValuation(0);
            setValuationAmountError(true);
        }
        else {
            setValuation(amount_of_money.toLocaleString());
            setValuationAmountError(false);
        }
    }

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

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "PropertyContent") {
            setPropertyContent(inputValue);
            setPropertyContentError(false);
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
            PropertyContent: PropertyContent,
            PostCode: PostCode,
            Address: Address,
            Valuation: Valuation,            
        };

        //input Validation
        if (defaultValues.PropertyContent === "") {
            setPropertyContentError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.Address === "") {
            setAddressError(true);
            isSumbitDisabled = true;
        }
        if(defaultValues.Valuation === "" || defaultValues.Valuation === "0"){
            setValuationAmountError(true);
            isSumbitDisabled = true;
        }
        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let response = "";
            let houseHoldId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                houseHoldId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", houseHoldId);
            formData.append("property_details", PropertyContent);
            formData.append("address", Address);
            formData.append("postal_code", PostCode);
            Valuation = Valuation.replace(/,/g, '').replace('.', '');
            formData.append("valuation", parseFloat(Valuation));
            try {
                if (houseHoldId === 0) {
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_household', formData);
                }
                else {
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_household', formData);
                }
                if (response.status === 200) {
                    router.push(`/declaration-printing/household-property`);
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

            <Box className="cash-savings-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家庭用財産1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8 pb-4">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>
                <Box className="w-full inline-block">
                    <form action="#" method="POST">
                        <Box className="w-full inline-block items-center justify-between mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} htmlFor="PropertyContent" className="form-label">
                                        財産の内容<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <CustomInput type={"text"} id={"PropertyContent"} onChange={inputHandlingFunction} value={PropertyContent} error={PropertyContentError} />
                                    {PropertyContentError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="w-full inline-block items-center justify-between mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} htmlFor="Location" className="form-label">
                                        所在場所
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2 relative">
                                    <CustomPostalcodeInput type={"text"} id={"PostCode"} onChange={postalcodeDigit} onKeyPress={handleKeyPress} value={PostCode} />
                                </Box>
                                <Box className="mt-3">
                                    <Typography component={"p"} fontSize={14} className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</Typography>
                                </Box>
                                {!isValid && <Typography component={"p"} fontSize={14}>数字7桁で入力して下さい。海外の場合は入力不要です。</Typography>}
                            </Box>
                        </Box>

                        <Box className="w-full block items-center justify-between mb-7">
                            <Box className="user-details">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        住所<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <CustomInput type={"text"} id={"Address"} onChange={inputHandlingFunction} value={Address} error={AddressError} />
                                    {AddressError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="w-full inline-block items-center justify-between mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="label w-full inline-block">
                                    <label className="form-label">
                                        評価額<i className="text-red-500">*</i>
                                    </label>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <CustomInput type={"text"} id={"Valuation"} onChange={ValuationKeyPress} onKeyPress={handleKeyPress} value={Valuation} textAlign={"right"} error={ValuationAmountError} />
                                    {ValuationAmountError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                            <Box className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                                <BackButton />
                                <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}


HouseholdPropertyAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};