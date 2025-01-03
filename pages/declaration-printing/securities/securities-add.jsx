/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';
import BackdropLoader from '../../../components/loader/backdrop-loader';
import CustomInput from "../../../components/inputbox-icon/custom-input";
import CustomDropdownInput from "../../../components/inputbox-icon/custom-dropdown";

export default function SecuritiesAdd() {
    let SecuritiesList = [
        { id: 1, value: '上場株式及び出資', name: '上場株式及び出資' },
        { id: 2, value: '公債及び社債', name: '公債及び社債' },
        { id: 3, value: '証券投資信託・貸付信託の受益証券', name: '証券投資信託・貸付信託の受益証券' },
        // { id: 1, value: '特定同族会社の株式出資（配当還元方式）', label: '特定同族会社の株式出資（配当還元方式）' },
        // { id: 2, value: '特定同族会社の株式出資（その他の方式）', label: '特定同族会社の株式出資（その他の方式）' },
        // { id: 3, value: '上記以外の株式（上場株式など）', label: '上記以外の株式（上場株式など）' },
        // { id: 4, value: '出資', label: '出資' },
        // { id: 5, value: '公債', label: '公債' },
        // { id: 6, value: '社債', label: '社債' },
        // { id: 7, value: '証券投資信託の受益証券', label: '証券投資信託の受益証券' },
        // { id: 8, value: '貸付信託の受益証券', label: '貸付信託の受益証券' },
    ];

    let UnitsList = [
        { id: 1, value: '株', name: '株' },
        { id: 2, value: '口', name: '口' },
        { id: 3, value: 'その他', name: 'その他（フリー入力）' },
    ];

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
        if (selectedValue !== "0") {
            let selectedOptions = SecuritiesList.find(option => option.value === selectedValue);
            selectId = Number(selectedOptions.id);
        }
        else {
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
        if (selectId === 3) {
            setShowOtherFreeInput(true);
        }
        else {
            setShowOtherFreeInput(false);
        }
    };

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
        if (searchParams !== null) {
            securityId = Number(atob(searchParams));
            GetSecuritiesDetails(securityId);
        }
    }, []);

    //Load cash savings details    
    const GetSecuritiesDetails = async (securityId) => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null && securityId !== 0) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/get_securities?auth_key=${auth_key}&id=${securityId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    setSecuritiesType(data.securities_details.securities_type);
                    setNameofSecurities(data.securities_details.name_and_brand);
                    setFinancialInstitutionName(data.securities_details.financial_institution_name);
                    setUnitDetails(data.securities_details.unit_details);
                    setUnitPrice(data.securities_details.unit_1_details);
                    setQuantity(data.securities_details.quantity);
                    setAmountofMoney(data.securities_details.amount.toLocaleString());
                }
            } catch (error) {
                console.error('Error:', error);
            }
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

    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

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
    };


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
    const onSubmit = async () => {
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
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {
            let response = "";
            let securityId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
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
            formData.append("unit_1_details", OthersUnitInput);
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            formData.append("amount", parseFloat(AmountofMoney));
            try {
                if (securityId === 0) {
                    response = await fetch(`https://minelife-api.azurewebsites.net/add_securities`, {
                        method: 'POST',
                        body: formData
                    });
                }
                else {
                    response = await fetch(`https://minelife-api.azurewebsites.net/edit_securities`, {
                        method: 'POST',
                        body: formData
                    });
                }
                if (response.ok) {
                    router.push(`/declaration-printing/securities`);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        else {
            console.log("API not allowed");
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

            <Box className="securities-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            有価証券1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>
            </Box>
            <Box className="w-full inline-block">
                <form action="#" method="POST">
                    <Box className="w-full flex items-center  mb-12">
                        <Box className="label w-25 inline-block">
                            <Typography component={"label"} htmlFor="SecuritiesType" className="form-label">
                                有価証券の種類<i className="text-red-500">*</i>
                            </Typography>
                        </Box>
                        <Box className="w-50 inline-block mt-2">                            
                            <CustomDropdownInput id={"SecuritiesType"} lists={SecuritiesList} onChange={SecuritiesDropdownChange} value={SecuritiesType} error={SecuritiesTypeError} />
                            {SecuritiesTypeError && (
                                <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                            )}
                        </Box>

                    </Box>

                    <Box className="w-full inline-block items-center justify-between mb-7">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="NameofSecurities" className="form-label">
                                    有価証券の名称・銘柄 <i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomInput type={"text"} id={"NameofSecurities"} onChange={inputHandlingFunction} value={NameofSecurities} error={NameofSecuritiesError} />
                                {NameofSecuritiesError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full block items-center justify-between mb-7">
                        <Box className="user-details">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="FinancialInstitutionName" className="form-label">
                                    金融機関名<i className="text-red-500">*</i>
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomInput type={"text"} id={"FinancialInstitutionName"} onChange={inputHandlingFunction} value={FinancialInstitutionName} error={FinancialInstitutionNameError} />
                                {FinancialInstitutionNameError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-full flex items-center justify-between mb-7">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="Quantity" className="form-label">
                                    数量
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomInput type={"text"} id={"Quantity"} onChange={QuantityKeyPress} value={Quantity} onKeyPress={handleKeyPress} textAlign={"right"} />
                            </Box>
                        </Box>
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="user-details">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label flex items-center">
                                        単位
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2 relative">                                    
                                    <CustomDropdownInput id={"UnitPrice"} lists={UnitsList} onChange={UnitsDropdownChange} value={UnitPrice} error={UnitDetailsError} />
                                    {UnitPriceError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>


                    <Box className="w-full flex items-center justify-between mb-7">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} htmlFor="AmountofMoney" className="form-label">
                                    金額
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <CustomInput type={"text"} id={"AmountofMoney"} onChange={AmountofMoneyKeyPress} value={AmountofMoney} onKeyPress={handleKeyPress} textAlign={"right"} error={AmountofMoneyError} />
                                {AmountofMoneyError && (
                                    <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                        {ShowOtherFreeInput && (
                            <>
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="user-details">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center">
                                                その他を選択した場合、単位を記載
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2 relative">
                                            <CustomInput type={"text"} id={"OthersUnitInput"} onChange={inputHandlingFunction} value={OthersUnitInput} onKeyPress={handleKeyPress} textAlign={"right"} />
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
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

SecuritiesAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};