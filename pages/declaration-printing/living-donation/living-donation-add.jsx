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
import JapaneseCalendar from "../../../components/inputbox-icon/japanese-calender";
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomAmountInput from "../../../components/inputbox-icon/custom-amount-input";
import CustomDropdownInput from "../../../components/inputbox-icon/custom-dropdown";

export default function LivingDonationAdd() {
    let [HeirList, setHeirList] = useState([]);
    let [HeirId, setHeirId] = useState(0);
    let [NameofthePerson, setNameofthePerson] = useState("");
    let [DateOfDonation, setDateOfDonation] = useState("");
    let [DonatedPropertyType, setDonatedPropertyType] = useState("");
    let [DonatedPropertyDetail, setDonatedPropertyDetail] = useState("");
    let [DonatedPropertyAmount, setDonatedPropertyAmount] = useState("0");
    let [DonatedPropertyAmountTax, setDonatedPropertyAmountTax] = useState("0");
    let [WhereTaxReturn, setWhereTaxReturn] = useState("");

    //Error state and button disabled
    let [HeirListTypeError, setHeirListTypeError] = useState(false);
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameofthePersonError, setNameofthePersonError] = useState(false);
    let [DateOfDonationError, setDateOfDonationError] = useState(false);
    let [DonatedPropertyTypeError, setDonatedPropertyTypeError] = useState(false);
    let [DonatedPropertyDetailError, setDonatedPropertyDetailError] = useState(false);
    let [DonatedPropertyAmountError, setDonatedPropertyAmountError] = useState(false);
    let [DonatedPropertyAmountTaxError, setDonatedPropertyAmountTaxError] = useState(false);
    let [WhereTaxReturnError, setWhereTaxReturnError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let LivingDonationId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams !== null) {
            LivingDonationId = Number(atob(searchParams));
            //GetLivingDonationDetails(LivingDonationId);
        }
        GetHeirList();
    }, []);


    //Load heir details list
    const GetHeirList = async () => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', { params });
                if (response.status === 200) {
                    setHeirList(response.data.heir_list || []);
                }
                else {
                    setHeirList([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            //Logout();
        }
    };


    //Load living donation details 
    const GetLivingDonationDetails = async (LivingDonationId) => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const params = { auth_key: auth_key, id: LivingDonationId };
        if (auth_key !== null && LivingDonationId !== 0) {
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

    const handleChangeHeir = (event) => {
        let selectedId = Number(event.target.value);
        setisSumbitDisabled(false);
        setHeirListTypeError(false);
        setHeirId(selectedId);
    };

    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const DonatedPropertyAmountKeyPress = (e) => {
        let valuation = e.target.value;
        valuation = valuation.replace(/,/g, '').replace('.', '');
        valuation = parseFloat(valuation);
        valuation = valuation.toLocaleString();
        if (valuation === "NaN") {
            setDonatedPropertyAmount(0);
        }
        else {
            setDonatedPropertyAmountError(false);
            setDonatedPropertyAmount(valuation);
        }
        setisSumbitDisabled(false);
    }

    const DonatedPropertyAmountTaxKeyPress = (e) => {
        let valuation = e.target.value;
        valuation = valuation.replace(/,/g, '').replace('.', '');
        valuation = parseFloat(valuation);
        valuation = valuation.toLocaleString();
        if (valuation === "NaN") {
            setDonatedPropertyAmountTax(0);
        }
        else {
            setDonatedPropertyAmountTaxError(false);
            setDonatedPropertyAmountTax(valuation);
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
        else if (inputId === "DonatedPropertyType") {
            setDonatedPropertyType(inputValue);
            setDonatedPropertyTypeError(false);
        }
        else if (inputId === "DonatedPropertyDetail") {
            setDonatedPropertyDetail(inputValue);
            setDonatedPropertyDetailError(false);
        }
        else if (inputId === "DonatedPropertyAmount") {
            //If amount enter is 0 value it's needs to be accepted
            setDonatedPropertyAmount(inputValue);
            setDonatedPropertyAmountError(false);
        }
        else if (inputId === "DonatedPropertyAmountTax") {
            //If amount enter is 0 value it's needs to be accepted
            setDonatedPropertyAmountTax(inputValue);
            setDonatedPropertyAmountTaxError(false);
        }
        else if (inputId === "DonatedPropertyAmount") {
            //If amount enter is 0 value it's needs to be accepted
            setDonatedPropertyAmount(inputValue);
            setDonatedPropertyAmountError(false);
        }

        setisSumbitDisabled(false);
    }



    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async () => {
        defaultValues = {
            NameofthePerson: NameofthePerson,
            DateOfDonation: DateOfDonation,
            DonatedPropertyType: DonatedPropertyType,
            DonatedPropertyDetail: DonatedPropertyDetail,
            DonatedPropertyAmount: DonatedPropertyAmount,
            DonatedPropertyAmountTax: DonatedPropertyAmountTax,
            WhereTaxReturn: WhereTaxReturn
        }

        //input Validation        
        if (defaultValues.NameofthePerson === "") {
            setNameofthePersonError(true);
            setHeirListTypeError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DateOfDonation === "") {
            setDateOfDonationError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyType === "") {
            setDonatedPropertyTypeError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyDetail === "") {
            setDonatedPropertyDetailError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyAmount === "0") {
            setDonatedPropertyAmountError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.WhereTaxReturn === "") {
            setWhereTaxReturnError(true);
            isSumbitDisabled = true;
        }
        //Api setup
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let response = "";
            let LivingDonationId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                LivingDonationId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", LivingDonationId);
            //formData.append("NameofthePerson", NameofthePerson);            
            //formData.append("DateOfDonation", DateOfDonation);
            //formData.append("DonatedPropertyType", DonatedPropertyType);
            //formData.append("DonatedPropertyDetail", DonatedPropertyDetail);
            //formData.append("DonatedPropertyAmount", DonatedPropertyAmount);
            //Valuation = Valuation.replace(/,/g, '').replace('.', '');
            //formData.append("valuation", parseFloat(Valuation));
            //formData.append("DonatedPropertyAmountTax", DonatedPropertyAmountTax);
            //formData.append("WhereTaxReturn", WhereTaxReturn);            
            try {
                if (LivingDonationId === 0) {
                    //response = await axios.post('https://minelife-api.azurewebsites.net/add_other_assets', formData);
                }
                else {
                    //response = await axios.post('https://minelife-api.azurewebsites.net/edit_other_assets', formData);
                }
                if (response.status === 200) {
                    router.push(`/declaration-printing/living-donation`);
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
                            生前贈与1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">                    
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    以下の内容を入力して[保存]ボタンを押して下さい。<br/>
                    <Typography component={"span"}>※精算課税制度の適用を受けていた場合は当システムでは作成できません。</Typography>
                    </Typography>
                </Box>

                <form action="#" method="POST">
                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    贈与を受けた方の氏名<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomDropdownInput id={"HeirListType"} lists={HeirList} onChange={handleChangeHeir} value={HeirId} error={HeirListTypeError} />
                                {HeirListTypeError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    贈与年月日<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2 relative">
                                <JapaneseCalendar id={"DateOfDonation"} DateValue={DateOfDonation} inputHandlingFunction={inputHandlingFunction} error={DateOfDonationError} />
                                {DateOfDonationError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    贈与財産の種類<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2 relative">
                                <CustomInput type={"text"} id={"DonatedPropertyType"} onChange={inputHandlingFunction} value={DonatedPropertyType} error={DonatedPropertyTypeError} />
                                {DonatedPropertyTypeError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>


                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    贈与財産の詳細<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomInput type={"text"} id={"DonatedPropertyDetail"} onChange={inputHandlingFunction} value={DonatedPropertyDetail} error={DonatedPropertyDetailError} />
                                {DonatedPropertyDetailError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    贈与財産の金額<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2 relative">
                                <CustomAmountInput type={"text"} id={"DonatedPropertyAmount"} onChange={DonatedPropertyAmountKeyPress} onKeyPress={handleKeyPress} value={DonatedPropertyAmount} textAlign={"right"} error={DonatedPropertyAmountError} />
                                {DonatedPropertyAmountError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    納付した贈与税額
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2 relative">
                                <CustomAmountInput type={"text"} id={"DonatedPropertyAmountTax"} onChange={DonatedPropertyAmountTaxKeyPress} onKeyPress={handleKeyPress} value={DonatedPropertyAmountTax} textAlign={"right"} error={DonatedPropertyAmountTaxError} />
                                {DonatedPropertyAmountTaxError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    申告書を提出した税務署<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full relative inline-block mt-2">
                                <CustomInput type={"text"} id={"WhereTaxReturn"} onChange={inputHandlingFunction} value={WhereTaxReturn} error={WhereTaxReturnError} />
                                <Typography component={"span"} fontSize={14} className="absolute right-0 top-0 bg-input-color text-black rounded-r p-3.5 text-sm">
                                    税務署
                                </Typography>
                                {WhereTaxReturnError && (
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
                        <Box className="mt-5 w-full">
                            <Typography component={"p"} fontSize={13} className="text-red-600 text-center tracking-2">※精算課税制度の適用を受けていた場合は当システムでは作成できません。</Typography>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

LivingDonationAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};