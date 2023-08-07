"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import BackButton from "../../../components/back-btn";

export default function SecuritiesAdd() {
    let SecuritiesList = [
        { id: 1, value: '特定同族会社の株式出資（配当還元方式）', label: '特定同族会社の株式出資（配当還元方式）' },
        { id: 2, value: '特定同族会社の株式出資（その他の方式）', label: '特定同族会社の株式出資（その他の方式）' },
        { id: 3, value: '上記以外の株式（上場株式など）', label: '上記以外の株式（上場株式など）' },
        { id: 4, value: '出資', label: '出資' },
        { id: 5, value: '公債', label: '公債' },
        { id: 6, value: '社債', label: '社債' },
        { id: 7, value: '証券投資信託の受益証券', label: '証券投資信託の受益証券' },
        { id: 8, value: '貸付信託の受益証券', label: '貸付信託の受益証券' },
    ];

    let UnitDetailsList = [
        { id: 9, value: 'MRF', label: 'MRF' },
        { id: 10, value: '外貨建てMMF', label: '外貨建てMMF' },
        { id: 11, value: '一般的な投資信託', label: '一般的な投資信託' },
        { id: 12, value: '上場投資信託', label: '上場投資信託' },

    ];

    let [SecuritiesType, setSecuritiesType] = useState("");
    let [UnitDetails, setUnitDetails] = useState("");
    let [NameofSecurities, setNameofSecurities] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    let [Address, setAddress] = useState("");
    let [UnitPrice, setUnitPrice] = useState(0);
    let [Quantity, setQuantity] = useState(0);
    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [MoneyOrder, setMoneyOrder] = useState(0);
    let [ReductionAmount, setReductionAmount] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [totalPrice, settotalPrice] = useState(0);

    //Hide and Show Input   
    let [showAmountMoney, setshowAmountMoney] = useState(false);
    let [ShowFinancial, setShowFinancial] = useState(false);
    let [showQuantityPrice, setshowQuantityPrice] = useState(false);
    let [showAddress, setshowAddress] = useState(true);
    let [showPostcode, setshowPostcode] = useState(true);
    let [showNameSecurities, setshowNameSecurities] = useState(true);
    let [Equitydividendmethod, setEquitydividendmethod] = useState(false);
    let [showUnitDetails, setshowUnitDetails] = useState(false);
    let [showMoneyOrderQuantity, setshowMoneyOrderQuantity] = useState(false);
    let [showReducationAmount, setshowReducationAmount] = useState(false);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            SecuritiesType: "",
            NameofSecurities: "",
            PostCode: "",
            FinancialInstitutionBranchName: "",
            Address: "",
            UnitPrice: 0,
            Quantity: 0,
            MoneyOrder: 0,
            ReductionAmount: 0,
            AmountofMoney: 0,
        }
    });

    let selectId = 0;
    const SecuritiesDropdownChange = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        console.log("selectedOption:" + selectedOption.value + ",event.target.value:" + selectedOption.text);
        setSecuritiesType(selectedOption.text);
        selectId = Number(selectedOption.value)
        handleInputChange(selectId);
    };

    const UnitDetailsDropdownChange = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        console.log("selectedOption:" + selectedOption.value + ",event.target.value:" + selectedOption.text);
        setSecuritiesType(selectedOption.text);
        selectId = Number(selectedOption.value);
        handleInputChange(selectId);
    }


    useEffect(() => {
        setshowNameSecurities(true);
        setshowPostcode(true);
        setshowAddress(true);
        setshowAmountMoney(true);
    }, []);

    function inputClear() {
        setUnitDetails("");
        setNameofSecurities("");
        setPostCode("");
        setFinancialInstitutionName("");
        setAddress("");
        setUnitPrice("");
        setQuantity("");
        setAmountofMoney("");
        setMoneyOrder("");
        setReductionAmount("");
        setUndecidedHeir(0);
        settotalPrice(0);
    }

    const handleInputChange = (selectId) => {
        inputClear();
        if (selectId === 0 || selectId === 4) {
            setshowNameSecurities(true);
            setshowPostcode(true);
            setshowAddress(true);
            setshowAmountMoney(true);
            setShowFinancial(false);
            setshowQuantityPrice(false);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 1 || selectId === 2) {
            setshowNameSecurities(true);
            setshowPostcode(true);
            setshowAddress(true);
            setshowAmountMoney(false);
            setshowQuantityPrice(true);
            setShowFinancial(false);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 3) {
            setshowPostcode(false);
            setshowAddress(false);
            setshowAmountMoney(false);
            setshowQuantityPrice(true);
            setShowFinancial(true);
            setshowNameSecurities(true);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 5 || selectId === 6 || selectId === 8) {
            setshowNameSecurities(true);
            setshowAmountMoney(true);
            setShowFinancial(true);
            setshowPostcode(false);
            setshowAddress(false);
            setshowQuantityPrice(false);
            setshowUnitDetails(false);
            setshowReducationAmount(false);
            setshowMoneyOrderQuantity(false);
        }
        else if (selectId === 7 || selectId === 9 || selectId === 12) {
            setshowUnitDetails(true);
            setshowNameSecurities(true);
            setshowAmountMoney(true);
            setShowFinancial(true);
            setshowPostcode(false);
            setshowAddress(false);
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
            setShowFinancial(true);
            setshowPostcode(false);
            setshowAddress(false);
            setshowQuantityPrice(false);
        }
        else if (selectId === 11) {
            setshowQuantityPrice(true);
            setshowReducationAmount(true);
            setshowUnitDetails(true);
            setshowNameSecurities(true);
            setshowAmountMoney(false);
            setShowFinancial(true);
            setshowPostcode(false);
            setshowAddress(false);
            setshowMoneyOrderQuantity(false);
        }
        else {

        }
    }

    const onSubmit = async (defaultValues) => {
        if (defaultValues.AmountofMoney > 0) {
            setAmountofMoney(false);
        }
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.SecuritiesType != "") {
            var Apiurl = "/";
            const urlresponse = await fetch(Apiurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(defaultValues),
                mode: "no-cors",
            });
        }
        else {

        }
        //res.status(200).end()
    };

    const AmountofMoneyKeyPress = (e) => {
        let amount_of_money = Number(e.target.value);
        console.log("amount_of_money:" + amount_of_money);
        setAmountofMoney(amount_of_money);
    }

    const MoneyOrderKeyPress = (e) => {
        let money_order = Number(e.target.value);
        setMoneyOrder(money_order);
    }

    const ReductionAmountKeyPress = (e) => {
        let reduction_amount = Number(e.target.value);
        var previousAmountofmoney = (10 / 100) * Quantity;
        setReductionAmount(reduction_amount);
        if (reduction_amount > 0) {
            var amount = previousAmountofmoney;
            amount = amount - reduction_amount;
            setAmountofMoney(amount);
        }
        else {
            amount = previousAmountofmoney - reduction_amount;
            setAmountofMoney(amount);
            setReductionAmount(0);
        }
    }

    const MoneyOrderQuantityKeyPress = (e) => {
        let money_Quantity = Number(e.target.value);
        setQuantity(money_Quantity);
        if (money_Quantity >= 10) {
            var percentage = (10 / 100) * money_Quantity;
            setAmountofMoney(percentage);
        }
        else {
            setAmountofMoney(0);
        }
    }

    //Footer box calculation
    const FooterboxKeyPress = (e) => {
        let footer_box_value = Number(e.target.value);
        if (footer_box_value > 0) {
            var value = AmountofMoney - footer_box_value;
            setUndecidedHeir(value);
        }
        else {
            setUndecidedHeir(AmountofMoney);
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

    let flag = 0;
    function onchangeUnitPrice(e) {
        let unit_price = Number(e.target.value);
        console.log("keyValue:" + unit_price);
        setUnitPrice(unit_price);
        let val = Quantity;
        if (val > 0) {
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
            quantity = Number(e.target.value);
        }
        if (quantity > 0) {
            let totalPrice = u_price * quantity;
            console.log("keyValue---x:" + quantity + ":" + totalPrice);
            setQuantity(quantity);
            setAmountofMoney(totalPrice);
            setUndecidedHeir(totalPrice);
        }
    }


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
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>
            </div>
            <div className="w-full inline-block">
                <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="SecuritiesType" className="form-label">
                                    有価証券の種類
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={SecuritiesDropdownChange}>
                                    <option value="0">Select an option</option>
                                    {SecuritiesList.map((option) => (
                                        <option key={option.value} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {showUnitDetails && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="UnitDetails" className="form-label">
                                        受益証券の詳細
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={UnitDetailsDropdownChange}>
                                        <option value="0">Select an option</option>
                                        {UnitDetailsList.map((option) => (
                                            <option key={option.value} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {showNameSecurities && (
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="NameofSecurities" className="form-label">
                                        有価証券の名称、銘柄
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="NameofSecurities"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("NameofSecurities", { required: "この項目は必須です" })}
                                        aria-invalid={errors.NameofSecurities ? "true" : "false"}
                                    />
                                    {errors.NameofSecurities && <p className="text-red-500" role="alert">{errors.NameofSecurities?.message}</p>}
                                </div>
                            </div>
                        </div>

                    )}

                    {showPostcode && (
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="PostCode" className="form-label">
                                        郵便番号
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="PostCode"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("PostCode", { required: "この項目は必須です" })}
                                        aria-invalid={errors.PostCode ? "true" : "false"}
                                    />
                                    {errors.PostCode && <p className="text-red-500" role="alert">{errors.PostCode?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {showAddress && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Address" className="form-label">
                                        住所
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Address"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Address", { required: "この項目は必須です" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.Address && <p className="text-red-500" role="alert">{errors.Address?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowFinancial && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="FinancialInstitutionName" className="form-label">
                                        金融機関名
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="FinancialInstitutionName"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("FinancialInstitutionName", { required: "この項目は必須です" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.FinancialInstitutionName && <p className="text-red-500" role="alert">{errors.FinancialInstitutionName?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {showQuantityPrice && (
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="UnitPrice" className="form-label">
                                            一株当たりの単価
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="UnitPrice"
                                            value={UnitPrice}
                                            onChange={onchangeUnitPrice}
                                            onKeyPress={handleKeyPress}
                                            className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
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
                                        value={Quantity}
                                        onChange={onchangeQuantity}
                                        onKeyPress={handleKeyPress}
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {showMoneyOrderQuantity && (
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">
                                            為替
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            value={MoneyOrder}
                                            onChange={MoneyOrderKeyPress}
                                            onKeyPress={handleKeyPress}
                                            className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        数量
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        value={Quantity}
                                        onChange={MoneyOrderQuantityKeyPress}
                                        onKeyPress={handleKeyPress}
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    />
                                </div>
                            </div>
                        </div>
                    )}



                    {showReducationAmount && (
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="ReductionAmount" className="form-label">
                                        減額金額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="ReductionAmount"
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        value={ReductionAmount}
                                        onChange={ReductionAmountKeyPress}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {showQuantityPrice && (
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="AmountofMoney" className="form-label">
                                        金額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        value={AmountofMoney}
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("AmountofMoney", { required: "この項目は必須です" })}
                                        aria-invalid={errors.AmountofMoney ? "true" : "false"}
                                    />
                                    {errors.AmountofMoney && <p className="text-red-500" role="alert">{errors.AmountofMoney?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {showAmountMoney && (
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        金額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        value={AmountofMoney}
                                        onChange={AmountofMoneyKeyPress}
                                        onKeyPress={handleKeyPress}
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    />
                                </div>
                            </div>
                        </div>

                    )}


                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                        <div className="heading text-center">
                            <h5 className="text-sm text-black tracking-2 font-medium">財産の合計</h5>
                        </div>
                        <div className="total-list pt-10">
                            <ul>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>受取人</span>
                                    <span>取得財産の価額</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>山田　太郎</span>
                                    <div className="text-right"><input type="text" className="border-2 h-10 text-right form-control w-50 outline-none"
                                        onChange={FooterboxKeyPress}
                                        onKeyPress={handleKeyPress}
                                    /></div>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>相続人未決定</span>
                                    <span>{UndecidedHeir}</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>合計</span>
                                    <span>{AmountofMoney}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <div className="save-btn text-center">
                            <BackButton />
                        </div>
                        <div className="save-btn text-center">
                            <button
                                type="submit"
                                className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                    保存して戻る
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="heading text-center pt-8">
                        <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                    </div>
                </form>
            </div>
        </>
    )
}