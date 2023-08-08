"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function CashSavingsCash() {
    let DepositList = [
        { value: '現金', label: '現金' },
        { value: '普通預普通預金金', label: '普通預普通預金金' },
        { value: '定期預金', label: '定期預金' },
        { value: '当座預金', label: '当座預金' },
        { value: '通常貯金', label: '通常貯金' },
        { value: '普通貯金', label: '普通貯金' },
        { value: '定期貯金', label: '定期貯金' },
        { value: 'その他', label: 'その他' },
    ];

    const [DepositType, setDepositType] = useState("");
    const [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    const [BranchName, setBranchName] = useState("");
    const [AmountofMoney, setAmountofMoney] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            DepositType: "",
            FinancialInstitutionName: "",
            BranchName: "",
            AmountofMoney: "",
        }
    });

    const DepositDropdownChange = (event) => {
        setDepositType(event.target.value);
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
                        外貨建て預金の場合には相続開始時のレートで邦貨換算した金額を計上してください。
                    </p>
                </div>
                <div className="w-full inline-block">
                    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full inline-block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Deposit" className="form-label">
                                        預金の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={DepositDropdownChange}>
                                        <option value=''>Select an option</option>
                                        {DepositList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
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
                                        {...register("FinancialInstitutionName", { required: "FinancialInstitutionName is required" })}
                                        aria-invalid={errors.FinancialInstitutionName ? "true" : "false"}
                                    />
                                    {errors.FinancialInstitutionName && <p className="text-red-500" role="alert">{errors.FinancialInstitutionName?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="BranchName" className="form-label">
                                        支店名
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="BranchName"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("BranchName", { required: "BranchName is required" })}
                                        aria-invalid={errors.BranchName ? "true" : "false"}
                                    />
                                    {errors.BranchName && <p className="text-red-500" role="alert">{errors.BranchName?.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="w-full inline-block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
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
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("AmountofMoney", { required: "AmountofMoney is required" })}
                                        aria-invalid={errors.AmountofMoney ? "true" : "false"}
                                    />
                                    {errors.AmountofMoney && <p className="text-red-500" role="alert">{errors.AmountofMoney?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="Total-property-section  py-5 md:py-10 lg:py-20 xl:py-20 2xl:py-20 px-5 md:px-10 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
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

                        <div className="w-full flex justify-evenly items-center py-5">
                            <BackButton />
                            <div className="save-btn text-center">
                                <Link href="/declaration-printing/cash-savings/cash-savings-list">
                                    <button
                                        className="bg-primary-color rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                            保存して戻る
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="heading text-center pt-2 md:pt-5 lg:pt-8 xl:pt-8 2xl:pt-8">
                            <h5 className="text-xs text-black tracking-2 font-medium">必須入力項目があります。</h5>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

CashSavingsCash.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};