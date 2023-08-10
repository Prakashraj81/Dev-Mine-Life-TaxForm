"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import BackButton from "../../../components/back-btn";
import { useEffect } from 'react';
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";

export default function DebtAdd() {
    let DebtList = [
        { id: 1, value: '公租公課', label: '公租公課' },
        { id: 2, value: '銀行借入金', label: '銀行借入金' },
        { id: 3, value: '未払金', label: '未払金' },
        { id: 4, value: '買掛金', label: '買掛金' },
        { id: 5, value: 'その他債務', label: 'その他債務' },
    ];

    const [DebtType, setDebtType] = useState("");
    const [NameofDebt, setNameofDebt] = useState("");
    const [CauseofUnpaidBalance, setCauseofUnpaidBalance] = useState("");
    const [CreditorName, setCreditorName] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [Address, setAddress] = useState("");
    const [ObligationDate, setObligationDate] = useState("");
    const [DebtPaymentDeadline, setDebtPaymentDeadline] = useState("");
    const [AmountofMoney, setAmountofMoney] = useState(0);

    let [ShowNameDebt, setShowNameDebt] = useState(false);
    let [ShowCauseofUnpaidBalance, setShowCauseofUnpaidBalance] = useState(false);
    let [ShowCreditorName, setShowCreditorName] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    let [ShowObligationDateDebtPaymentDeadline, setShowObligationDateDebtPaymentDeadline] = useState(false);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            DebtType: "",
            NameofDebt: "",
            CauseofUnpaidBalance: "",
            CreditorName: "",
            PostCode: "",
            Address: "",
            ObligationDate: "",
            DebtPaymentDeadline: "",
            AmountofMoney: 0,
        }
    });

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


    useEffect(() => {
        setShowCauseofUnpaidBalance(false);
        setShowNameDebt(true);
        setShowPostCode(true);
        setShowAddress(true);
        setShowCreditorName(true);
        setShowObligationDateDebtPaymentDeadline(true);
    }, []);

    const handleDebitType = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = Number(selectedOption.value);
        setDebtType(selectedOption.text);
        if (selectedId === 1) {
            setShowPostCode(false);
            setShowAddress(false);
            setShowCauseofUnpaidBalance(false);
            setShowNameDebt(true);
            setShowCreditorName(true);
            setShowObligationDateDebtPaymentDeadline(true);
        }
        else if (selectedId === 2) {
            setShowCauseofUnpaidBalance(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowNameDebt(true);
            setShowCreditorName(true);
            setShowObligationDateDebtPaymentDeadline(true);
        }
        else if (selectedId === 3) {
            setShowNameDebt(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowCauseofUnpaidBalance(true);
            setShowCreditorName(true);
            setShowObligationDateDebtPaymentDeadline(true);
        }
        else if (selectedId === 4) {
            setShowCauseofUnpaidBalance(false);
            setShowNameDebt(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowCreditorName(true);
            setShowObligationDateDebtPaymentDeadline(true);
        }
        else if (selectedId === 5) {
            setShowCauseofUnpaidBalance(false);
            setShowNameDebt(true);
            setShowPostCode(true);
            setShowAddress(true);
            setShowCreditorName(true);
            setShowObligationDateDebtPaymentDeadline(true);
        }
        else {
            setShowCauseofUnpaidBalance(false);
            setShowNameDebt(true);
            setShowPostCode(true);
            setShowAddress(true);
            setShowCreditorName(true);
            setShowObligationDateDebtPaymentDeadline(true);
        }
    };


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.PostCode != "") {
            var Apiurl = "/";
            const urlresponse = await fetch(Apiurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(defaultValues),
                mode: "no-cors",
            });
        }
        else {
            router.push('/declaration-printing/other-property/other-property-others');
        }
        //res.status(200).end()
    };
    return (
        <>
            <div className="other-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            債務1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>

                <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="FeePayeeName" className="form-label">
                                        債務の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleDebitType}>
                                        <option value=''></option>
                                        {DebtList.map((option) => (
                                            <option key={option.value} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        {ShowNameDebt && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="NameofDebt" className="form-label">
                                        債務の名称
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="NameofDebt"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("NameofDebt", { required: "NameofDebt is required" })}
                                        aria-invalid={errors.NameofDebt ? "true" : "false"}
                                    />
                                    <div className="mt-3">
                                        <p className="text-sm text-black tracking-2 font-medium">15文字以内で入力して下さい</p>
                                    </div>
                                    {errors.NameofDebt && <p className="text-red-500 mt-2" role="alert">{errors.NameofDebt?.message}</p>}
                                </div>
                            </div>
                        )}

                        {ShowCauseofUnpaidBalance && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="CauseofUnpaidBalance" className="form-label">
                                        未払い金の発生原因
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="CauseofUnpaidBalance"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("CauseofUnpaidBalance", { required: "CauseofUnpaidBalance is required" })}
                                        aria-invalid={errors.CauseofUnpaidBalance ? "true" : "false"}
                                    />
                                    <div className="mt-3">
                                        <p className="text-sm text-black tracking-2 font-medium">15文字以内で入力して下さい</p>
                                    </div>
                                    {errors.CauseofUnpaidBalance && <p className="text-red-500 mt-2" role="alert">{errors.CauseofUnpaidBalance?.message}</p>}
                                </div>
                            </div>
                        )}
                    </div>

                    {ShowCreditorName && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="CreditorName" className="form-label">
                                        債権者名
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="CreditorName"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("CreditorName", { required: "CreditorName is required" })}
                                        aria-invalid={errors.CreditorName ? "true" : "false"}
                                    />
                                    <div className="mt-3">
                                        <p className="text-sm text-black tracking-2 font-medium">生命保険会社・勤務先会社の所在地</p>
                                    </div>
                                    {errors.CreditorName && <p className="text-red-500 mt-2" role="alert">{errors.CreditorName?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowPostCode && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="PostCode" className="form-label">
                                        郵便番号
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"
                                        id="PostCode"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-12"
                                        onKeyPress={handleKeyPress}
                                        onChange={postalcodeDigit}
                                        value={PostCode}
                                    />
                                    <PostcodeIcon />
                                </div>
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                </div>
                                {!isValid && <p>数字7桁で入力して下さい。海外の場合は入力不要です。</p>}
                            </div>
                        </div>
                    )}

                    {ShowAddress && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full">
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
                                        {...register("Address", { required: "Address is required" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.Address && <p className="text-red-500 mt-2" role="alert">{errors.Address?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowObligationDateDebtPaymentDeadline && (
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="ObligationDate" className="form-label">
                                            債務発生日
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="date"
                                            id="ObligationDate"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("ObligationDate", { required: "ObligationDate is required" })}
                                            aria-invalid={errors.ObligationDate ? "true" : "false"}
                                        />
                                        {errors.ObligationDate && <p className="text-red-500 mt-2" role="alert">{errors.ObligationDate?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="DebtPaymentDeadline" className="form-label">
                                        債務の弁済期限（あれば）
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="DebtPaymentDeadline"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("DebtPaymentDeadline", { required: "DebtPaymentDeadline is required" })}
                                        aria-invalid={errors.DebtPaymentDeadline ? "true" : "false"}
                                    />
                                    {errors.DebtPaymentDeadline && <p className="text-red-500 mt-2" role="alert">{errors.DebtPaymentDeadline?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}




                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="AmountofMoney" className="form-label">
                                    金額
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="AmountofMoney"
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("AmountofMoney", { required: "AmountofMoney is required" })}
                                    aria-invalid={errors.AmountofMoney ? "true" : "false"}
                                />
                                {errors.AmountofMoney && <p className="text-red-500 mt-2" role="alert">{errors.AmountofMoney?.message}</p>}
                            </div>
                        </div>
                    </div>



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
                                        onKeyPress={handleKeyPress}
                                    /></div>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>相続人未決定</span>
                                    <span>{0}</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>合計</span>
                                    <span>{0}</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <div className="save-btn text-center">
                            <BackButton />
                        </div>
                        <div className="save-btn text-center">

                            <Link href="/declaration-printing/debt/debt-tax-public">
                                <button

                                    className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        保存して戻る
                                    </span>
                                </button>
                            </Link>
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

DebtAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};