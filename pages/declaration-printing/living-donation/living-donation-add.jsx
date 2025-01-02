/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';
import BackdropLoader from '../../../components/loader/backdrop-loader';
import JapaneseCalendar from "../../../components/inputbox-icon/japanese-calender";
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomAmountInput from "../../../components/inputbox-icon/custom-amount-input";
import CustomDropdownInput from "../../../components/inputbox-icon/custom-dropdown";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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

    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [VariantSnackbar, setVariantSnackbar] = useState("success");
    let [SnackbarMsg, setSnackbarMsg] = useState("");

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
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/heir_details?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    setHeirList(data.heir_list || []);
                }
                else {
                    setHeirList([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
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
        if (inputId === "DonatedPropertyType") {
            setDonatedPropertyType(inputValue);
            setDonatedPropertyTypeError(false);
        }
        else if (inputId === "DateOfDonation") {
            setDateOfDonation(inputValue);
            setDateOfDonationError(false);
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
        else if (inputId === "WhereTaxReturn") {
            //If amount enter is 0 value it's needs to be accepted
            setWhereTaxReturn(inputValue);
            setWhereTaxReturnError(false);
        }
        setisSumbitDisabled(false);
    }



    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async () => {
        defaultValues = {
            gift_recipient: HeirId,
            date_of_donation: DateOfDonation,
            gift_type: DonatedPropertyType,
            details_of_gift_property: DonatedPropertyDetail,
            amount_donated: DonatedPropertyAmount,
            amount_on_gift_tax_paid: DonatedPropertyAmountTax,            
            where_to_submit_tax_return: WhereTaxReturn
        }

        //input Validation        
        if (defaultValues.gift_recepient === 0) {
            setNameofthePersonError(true);
            setHeirListTypeError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DateOfDonation === "") {
            setDateOfDonationError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.gift_type === "") {
            setDonatedPropertyTypeError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.details_of_gift_property === "") {
            setDonatedPropertyDetailError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.amount_donated === "0") {
            setDonatedPropertyAmountError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.amount_on_gift_tax_paid === "0") {
            setDonatedPropertyAmountError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.where_to_submit_tax_return === "") {
            setWhereTaxReturnError(true);
            isSumbitDisabled = true;
        }
        //Api setup
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let data;
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
            formData.append("gift_recipient", HeirId);         
            formData.append("date_of_donation", DateOfDonation);      
            formData.append("gift_type", DonatedPropertyType);
            formData.append("details_of_gift_property", DonatedPropertyDetail);
            DonatedPropertyAmount = DonatedPropertyAmount.replace(/,/g, '').replace('.', '');
            formData.append("amount_donated", parseFloat(DonatedPropertyAmount));
            DonatedPropertyAmountTax = DonatedPropertyAmountTax.replace(/,/g, '').replace('.', '');
            formData.append("amount_on_gift_tax_paid", parseFloat(DonatedPropertyAmountTax));            
            formData.append("where_to_submit_tax_return", WhereTaxReturn);
            try {
                if (LivingDonationId === 0) {
                    response = await fetch(`https://minelife-api.azurewebsites.net/add_gift_during_life`, {
                        method: 'POST',
                        body: formData                        
                    });
                }
                else {
                    response = await fetch(`https://minelife-api.azurewebsites.net/edit_gift_during_life`, {
                        method: 'POST',
                        body: formData,
                    });
                }
                data = await response.json();  
                if(!response.ok) throw new Error(data);
                if (response.ok) {
                    setVariantSnackbar("success");
                    setSnackbarMsg(data.message);                    
                    setSnackbarOpen(true);
                    await router.push(`/declaration-printing/living-donation`);
                }
            } catch (error) {
                console.log('Error:', error);
                setVariantSnackbar("error");
                setSnackbarMsg(data.error.message);                    
                setSnackbarOpen(true);
            }
        }
        else {
            setisSumbitDisabled(true);
            setShowLoader(false);
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <>
                {ShowLoader && (
                    <BackdropLoader ShowLoader={ShowLoader} />
                )}

<Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={VariantSnackbar}
                        variant="filled"
                        sx={{ width: '100%', color: "#FFF" }}
                    >
                        {SnackbarMsg}
                    </Alert>
                </Snackbar>
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