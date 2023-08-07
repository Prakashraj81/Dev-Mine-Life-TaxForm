"use client";
import Link from "next/link";
import { useState, Fragment, Controller, useEffect } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/back-btn";

export default function CashSavingsAdd() {
    let DepositList = [
        { id: 1, value: '現金', label: '現金' },
        { id: 2, value: '普通預金', label: '普通預金' },
        { id: 3, value: '定期預金', label: '定期預金' },
        { id: 4, value: '当座預金', label: '当座預金' },
        { id: 5, value: '通常貯金', label: '通常貯金' },
        { id: 6, value: '普通貯金', label: '普通貯金' },
        { id: 7, value: '定期貯金', label: '定期貯金' },
        { id: 8, value: 'その他', label: 'その他' },
    ];

    const [DepositType, setDepositType] = useState("");
    const [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    const [PostCode, setPostCode] = useState(0);
    const [Address, setAddress] = useState("");
    const [AmountofMoney, setAmountofMoney] = useState(0);

    let [ShowFinancialInstitutionName, setShowFinancialInstitutionName] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    //let [ShowFinancialInstitutionName, setShowFinancialInstitutionName] = useState(false);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            DepositType: "",
            FinancialInstitutionBranchName: "",
            PostCode: 0,
            Address: "",
            AmountofMoney: 0,
        }
    });

    useEffect (() => {
        setShowFinancialInstitutionName(true);
        setShowPostCode(false);
        setShowAddress(false);
    }, []);

    const handleDepositType = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = Number(selectedOption.value);
        setDepositType(selectedOption.text);
        if (selectedId === 1) {
            setShowFinancialInstitutionName(false);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 2 || selectedId === 3 || selectedId === 4 || selectedId === 5 || selectedId === 6 || selectedId === 7 || selectedId === 8) {
            setShowPostCode(false);
            setShowAddress(false);
            setShowFinancialInstitutionName(true);
        }
        else {

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


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.DepositType != "") {
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
    return (
        <>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            現金・預貯金1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>
                <div className="w-full inline-block">
                    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Deposit" className="form-label">
                                        預金の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleDepositType}>
                                        <option value=''>Select an option</option>
                                        {DepositList.map((option) => (
                                            <option key={option.value} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {ShowPostCode && (
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
                                            onKeyPress={handleKeyPress}
                                        />                                        
                                    </div>
                                </div>
                            </div>
                        )}

                        {ShowAddress && (
                            <div className="w-full inline-block items-center justify-between mb-7">
                                <div className="w-full inline-block float-left">
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
                                        {errors.Address && <p className="text-red-500" role="alert">{errors.Address?.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {ShowFinancialInstitutionName && (
                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="FinancialInstitutionBranchName" className="form-label">
                                            金融機関名
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="FinancialInstitutionBranchName"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("FinancialInstitutionBranchName", { required: "FinancialInstitutionBranchName is required" })}
                                            aria-invalid={errors.FinancialInstitutionBranchName ? "true" : "false"}
                                        />
                                        {errors.FinancialInstitutionBranchName && <p className="text-red-500" role="alert">{errors.FinancialInstitutionBranchName?.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}



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
                                        id="AmountofMoney"
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onKeyPress={handleKeyPress}
                                    />                                    
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
                                        <span>0</span>
                                    </li>
                                    <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                        <span>相続人未決定</span>
                                        <span>0</span>
                                    </li>
                                    <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                        <span>合計</span>
                                        <span>0</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton />
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
            </div>
        </>
    )
}