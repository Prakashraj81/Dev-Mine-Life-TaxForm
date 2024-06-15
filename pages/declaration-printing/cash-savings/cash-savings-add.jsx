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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomDropdownInput from "../../../components/inputbox-icon/custom-dropdown";

export default function CashSavingsAdd() {
    let DepositList = [
        { id: 1, value: '現金', name: '現金' },
        { id: 2, value: '普通預金', name: '普通預金' },
        { id: 3, value: '定期預金', name: '定期預金' },
        { id: 4, value: '当座預金', name: '当座預金' },
        { id: 5, value: '通常貯金', name: '通常貯金' },
        { id: 6, value: '普通貯金', name: '普通貯金' },
        { id: 7, value: '定期貯金', name: '定期貯金' },
        { id: 8, value: 'その他', name: 'その他' },
    ];

    let HeirList = [
        { id: 1, name: "User", name1: "山田　太郎" },
        { id: 2, name: "Shree", name1: "Shree" },
        { id: 3, name: "Prakashraj", name1: "Prakashraj" },
        { id: 4, name: "Gowtham", name1: "Gowtham" },
    ];

    let [DepositType, setDepositType] = useState("");
    let [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [AmountofMoney, setAmountofMoney] = useState("0");

    let [ShowFinancialInstitutionName, setShowFinancialInstitutionName] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [totalPrice, settotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [DepositTypeError, setDepositTypeError] = useState(false);
    let [FinancialInstitutionNameError, setFinancialInstitutionNameError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [AmountofMoneyError, setAmountofMoneyError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);


    useEffect(() => {
        setShowFinancialInstitutionName(true);
        setShowPostCode(false);
        setShowAddress(false);

        let depositId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams !== null) {
            depositId = Number(atob(searchParams));
            GetCashSavingsDetails(depositId);
        }
    }, []);

    //Clear function
    function clearFunction() {
        // setFinancialInstitutionName("");
        // setPostCode("");
        // setAddress("");
        // setAmountofMoney(0);
        // setUndecidedHeir(0);
        // settotalPrice(0);
    }


    //Load cash savings details    
    const GetCashSavingsDetails = async (depositId) => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key, id: depositId };
        if (auth_key !== null && depositId !== 0) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_cash_deposit', { params });
                if (response.status === 200) {
                    setDepositType(response.data.cash_deposit_details.deposit_type);
                    setAmountofMoney(response.data.cash_deposit_details.amount.toLocaleString());
                    if (response.data.cash_deposit_details.financial_institution_name !== "") {
                        setShowPostCode(false);
                        setShowAddress(false);
                        setFinancialInstitutionName(response.data.cash_deposit_details.financial_institution_name);
                    }
                    else {
                        setShowPostCode(response.data.cash_deposit_details.postal_code);
                        setShowAddress(response.data.cash_deposit_details.address);
                        setFinancialInstitutionName(false);
                    }
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

    //Deposit type dropdown
    const handleDepositType = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = DepositList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);
        setDepositType(selectedValue);
        setisSumbitDisabled(false);
        clearFunction();
        if (selectedId === 1) {
            setDepositTypeError(false);
            setShowFinancialInstitutionName(false);
            setShowPostCode(false);
            setShowAddress(false);
        }
        else if (selectedId === 2 || selectedId === 3 || selectedId === 4 || selectedId === 5 || selectedId === 6 || selectedId === 7 || selectedId === 8) {
            setDepositTypeError(false);
            setShowPostCode(false);
            setShowAddress(false);
            setShowFinancialInstitutionName(true);
        }
        else {
            setDepositTypeError(true);
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
        setisSumbitDisabled(false);
    }

    //Amount input calculation function
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


    //Input keypress
    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "FinancialInstitutionName") {
            setFinancialInstitutionName(inputValue);
            setFinancialInstitutionNameError(false);
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


    //Submit insert and edit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async () => {
        defaultValues = {
            DepositType: DepositType,
            FinancialInstitutionName: FinancialInstitutionName,
            PostCode: PostCode,
            Address: Address,
            AmountofMoney: AmountofMoney,
            UndecidedHeir: UndecidedHeir,
            totalPrice: AmountofMoney,
        };

        //input Validation
        if (defaultValues.DepositType === "") {
            setDepositTypeError(true);
            isSumbitDisabled = true;
        }

        if (defaultValues.FinancialInstitutionName === "") {
            if (ShowFinancialInstitutionName === true) {
                setFinancialInstitutionNameError(true);
                isSumbitDisabled = true;
            }
        }

        if (defaultValues.Address === "") {
            if (ShowAddress === true) {
                setAddressError(true);
                isSumbitDisabled = true;
            }
        }

        if (defaultValues.AmountofMoney !== "" || defaultValues.AmountofMoney === 0) {
            valueConvertFun(defaultValues.AmountofMoney);
        }

        if (defaultValues.UndecidedHeir < 0) {
            setShowIncorrectError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let response = "";
            let depositId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                depositId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", depositId);
            formData.append("deposit_type", DepositType);
            formData.append("address", Address);
            formData.append("financial_institution_name", FinancialInstitutionName);
            formData.append("postal_code", PostCode);
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            formData.append("amount", parseFloat(AmountofMoney));
            try {
                if (depositId === 0) {
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_cash_deposit', formData);
                }
                else {
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_cash_deposit', formData);
                }
                if (response.status === 200) {
                    router.push(`/declaration-printing/cash-savings`);
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
                            現金・預貯金1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>
                <Box className="w-full inline-block">
                    <form action="#" method="POST">
                        <Box className="w-full inline-block items-center justify-between mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} htmlFor="DepositType" className="form-label">
                                        預金の種類<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">                                    
                                    <CustomDropdownInput id={DepositType} lists={DepositList} onChange={handleDepositType} value={DepositType} error={DepositTypeError}/>
                                    {DepositTypeError && (
                                        <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        {ShowPostCode && (
                            <Box className="w-full inline-block items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} htmlFor="PostCode" className="form-label">
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
                                        <Typography fontSize={14} component={"p"} ostcodeIcon />
                                    </Box>
                                    <Box className="mt-3">
                                        <Typography fontSize={14} component={"p"} className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</Typography>
                                    </Box>
                                    {!isValid && <Typography fontSize={14} component={"p"}>数字7桁で入力して下さい。海外の場合は入力不要です。</Typography>}
                                </Box>
                            </Box>
                        )}

                        {ShowAddress && (
                            <Box className="w-full inline-block items-center justify-between mb-7">
                                <Box className="w-full inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} htmlFor="Address" className="form-label">
                                            住所<i className="text-red-500">*</i>
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">                                        
                                        <CustomInput type={"text"} id={"Address"} onChange={inputHandlingFunction} value={Address} error={AddressError} />
                                        {AddressError && (
                                            <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        {ShowFinancialInstitutionName && (
                            <Box className="w-full block items-center justify-between mb-7">
                                <Box className="user-details">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} htmlFor="FinancialInstitutionName" className="form-label">
                                            金融機関名<i className="text-red-500">*</i> <span>（例：みずほ銀行　新宿支店）</span>
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <CustomInput type={"text"} id={"FinancialInstitutionName"} onChange={inputHandlingFunction} value={FinancialInstitutionName} error={FinancialInstitutionNameError} />
                                        {FinancialInstitutionNameError && (
                                            <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        <Box className="w-full inline-block items-center justify-between mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"}>
                                        金額<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <CustomInput type={"text"} id={"AmountofMoney"} onChange={AmountofMoneyKeyPress} value={AmountofMoney} onKeyPress={handleKeyPress} textAlign={"right"} error={AmountofMoneyError} />
                                    {AmountofMoneyError && (
                                        <Typography fontSize={14} component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
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


CashSavingsAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};