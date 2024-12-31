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
import CustomPostalcodeInput from "../../../components/inputbox-icon/custom-postalcode-input";

export default function FuneralExpensesAdd() {

    let [FeePayeeName, setFeePayeeName] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [DatePaid, setDatePaid] = useState("");
    let [AmountPaid, setAmountPaid] = useState("0");

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [TotalPrice, setTotalPrice] = useState("0");

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [FeePayeeNameError, setFeePayeeNameError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [DatePaidError, setDatePaidError] = useState(false);
    let [AmountPaidError, setAmountPaidError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let funeralExpensesId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams !== null) {
            funeralExpensesId = Number(atob(searchParams));
            GetFuneralExpensesList(funeralExpensesId);
        }
    }, []);


    //Load cash savings details    
    const GetFuneralExpensesList = async (funeralExpensesId) => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null && funeralExpensesId !== 0) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/get_funeral_expenses_details?auth_key=${auth_key}&id=${funeralExpensesId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.status === 200) {
                    setFeePayeeName(data.funeral_expenses_details.payee_name);
                    setPostCode(data.funeral_expenses_details.postal_code);
                    setAddress(data.funeral_expenses_details.address);
                    setDatePaid(data.funeral_expenses_details.date_of_paid);
                    setAmountPaid(data.funeral_expenses_details.amount.toLocaleString());
                }
            } catch (error) {
                console.error('Error:', error);
            }
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


    const AmountPaidKeyPress = (e) => {
        let value = e.target.value;
        value = parseFloat(value.replace(/,/g, '').replace('.', ''));
        if (value > 0) {
            value = value.toLocaleString();
            setAmountPaid(value);
            setUndecidedHeir(value);
            setTotalPrice(value);
        }
        else {
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
        else if (inputId === "AmountPaid") {
            setAmountPaid(inputValue);
            setAmountPaidError(false);
        }
        else {
            setDatePaid(inputValue);
            setDatePaidError(false);
        }
        setisSumbitDisabled(false);
    };

    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async () => {
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
        if (defaultValues.AmountPaid === "" || defaultValues.AmountPaid === "0") {
            setAmountPaidError(true);
            isSumbitDisabled = true;
        }
        

        //Api setup
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let response = "";
            let funeralExpensesId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                funeralExpensesId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", funeralExpensesId);
            formData.append("payee_name", FeePayeeName);
            formData.append("address", Address);
            formData.append("postal_code", PostCode);
            formData.append("date_of_paid", DatePaid);
            AmountPaid = AmountPaid.replace(/,/g, '').replace('.', '');
            formData.append("paid_amount", parseFloat(AmountPaid));
            try {
                if (funeralExpensesId === 0) {
                    response = await fetch(`https://minelife-api.azurewebsites.net/add_funeral_expenses`, {
                        method: 'POST',
                        body: formData
                    });
                }
                else {
                    response = await fetch(`https://minelife-api.azurewebsites.net/edit_funeral_expenses`, {
                        method: 'POST',
                        body: formData
                    });
                }
                if (response.ok) {
                    router.push(`/declaration-printing/funeral-expenses`);
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
                            葬儀費用1
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
                            <Box className="user-details">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} htmlFor="FeePayeeName" className="form-label">
                                        費用支払先氏名<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <CustomInput type={"text"} id={"FeePayeeName"} onChange={inputHandlingFunction} value={FeePayeeName} error={FeePayeeNameError} />
                                    {FeePayeeNameError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-10">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label">
                                    支払先の所在場所
                                </Typography>
                                <Typography component={"label"} htmlFor="PostCode" className="form-label mt-2">
                                    郵便番号
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
                        <Box className="user-details w-full">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="Address" className="form-label">
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



                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="DatePaid" className="form-label">
                                    支払った日<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <JapaneseCalendar id={"DatePaid"} DateValue={DatePaid} inputHandlingFunction={inputHandlingFunction} error={DatePaidError} />
                                {DatePaidError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>


                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="AmountPaid" className="form-label">
                                    支払った金額<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomInput type={"text"} id={"AmountPaid"} onChange={AmountPaidKeyPress} onKeyPress={handleKeyPress} value={AmountPaid} textAlign={"right"} error={AmountPaidError} />
                                {AmountPaidError && (
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
        </>
    )
}

FuneralExpensesAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};