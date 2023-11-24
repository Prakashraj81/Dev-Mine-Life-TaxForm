import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import UnitPriceIcon from "../../../components/inputbox-icon/textbox-unitprice-icon";
import InfoIcon from '@mui/icons-material/Info';


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

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [SecuritiesTypeError, setSecuritiesTypeError] = useState(false);
    let [UnitDetailsError, setUnitDetailsError] = useState(false);
    let [NameofSecuritiesError, setNameofSecuritiesError] = useState(false);
    let [UnitPriceError, setUnitPriceError] = useState(false);
    let [FinancialInstitutionNameError, setFinancialInstitutionNameError] = useState(false);
    let [AmountofMoneyError, setAmountofMoneyError] = useState(false);    

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
    }, []);

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

    let flag = 0;
    function onchangeUnitPrice(e) {
        let unit_price = parseFloat(e.target.value);
        if(isNaN(unit_price)){
            setUnitPrice(0);
        }
        else{
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
            setAmountofMoney(totalPrice.toLocaleString());
            setUndecidedHeir(totalPrice.toLocaleString());
            AmountToTotalCalculation(totalPrice.toLocaleString());
        }
        else {
            setQuantity(0);
            AmountToTotalCalculation(0);
        }
        setisSumbitDisabled(false);
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


    const handleBoxValueChange = (e, index) => {
        setBoxValues([0]);
        let newValue = parseFloat(e.target.value);
        let updatedBoxValues = [...boxValues];
        updatedBoxValues[index] = isNaN(newValue) ? 0 : newValue;
        updatedBoxValues = updatedBoxValues.map((value) => (value === undefined ? 0 : value));
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
        totalBoxValues = isNaN(totalBoxValues) ? 0 : totalBoxValues;
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
            SecuritiesType: SecuritiesType,
            UnitDetails: UnitDetails,
            NameofSecurities: NameofSecurities,
            FinancialInstitutionName: FinancialInstitutionName,
            UnitPrice: UnitPrice,
            Quantity: Quantity,
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

        if (defaultValues.UndecidedHeir !== "") {
            if(defaultValues.UndecidedHeir === 0){
                UndecidedHeir = 0;
            }    
            else{
                UndecidedHeir = defaultValues.UndecidedHeir.replace(/,/g, '').replace('.', '');
                UndecidedHeir = parseFloat(UndecidedHeir);
            }        
            if (defaultValues.UndecidedHeir < 0) {
                setShowIncorrectError(true);
                isSumbitDisabled = true;
            }
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('securities', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/securities`);
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    };

    return (
        <>
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
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={SecuritiesDropdownChange}>
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
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center">
                                        単位 
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"                                            
                                            autocomplete="off"
                                            className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                        />
                                        <UnitPriceIcon />
                                        {UnitPriceError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                    />
                                </div>
                            </div>
                        </div>

                    

                    <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                    金額<i className="text-red-500">*</i>
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
                        </div>
                    
                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">                        
                        <BackButton />
                        <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled}/>
                    </div>
                    <div className="heading text-center pt-8">
                        <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                    </div>
                </form>
            </div>
        </>
    )
}

SecuritiesAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};