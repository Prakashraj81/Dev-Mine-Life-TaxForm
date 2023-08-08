"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function SecuritiesStocksOther() {
    let SecuritiesList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [SecuritiesType, setSecuritiesType] = useState("");
    const [NameofSecurities, setNameofSecurities] = useState("");
    const [FinancialInstitutionName, setFinancialInstitutionName] = useState("");
    const [AmountofMoney, setAmountofMoney] = useState("");
    const [UnitPrice, setUnitPrice] = useState("");
    const [Quantity, setQuantity] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            SecuritiesType: "",
            NameofSecurities: "",
            FinancialInstitutionBranchName: "",
            UnitPrice: "",
            Quantity: "",
            AmountofMoney: "",
        }
    });

    const handleDropdownChange = (event) => {
        setDepositType(event.target.value);
    };


    const onSubmit = async (defaultValues) => {
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
    return (
        <>
            <div className="securities-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            有価証券
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
                    <div className="w-full inline-block items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="SecuritiesType" className="form-label">
                                    有価証券の種類
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={SecuritiesList} onChange={handleDropdownChange}>
                                    {SecuritiesList.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

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
                                    {...register("NameofSecurities", { required: "NameofSecurities is required" })}
                                    aria-invalid={errors.NameofSecurities ? "true" : "false"}
                                />
                                {errors.NameofSecurities && <p className="text-red-500" role="alert">{errors.NameofSecurities?.message}</p>}
                            </div>
                        </div>
                    </div>



                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details">
                            <div className="label w-full inline-block">
                                <label htmlFor="FinancialInstitutionBranchName" className="form-label">
                                    金融機関名 支店名
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
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("UnitPrice", { required: "UnitPrice is required" })}
                                        aria-invalid={errors.NameofSecurities ? "true" : "false"}
                                    />
                                    {errors.UnitPrice && <p className="text-red-500" role="alert">{errors.UnitPrice?.message}</p>}
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
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("Quantity", { required: "Quantity is required" })}
                                    aria-invalid={errors.Quantity ? "true" : "false"}
                                />
                                {errors.Quantity && <p className="text-red-500" role="alert">{errors.Quantity?.message}</p>}
                            </div>
                        </div>
                    </div>


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
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("AmountofMoney", { required: "AmountofMoney is required" })}
                                    aria-invalid={errors.AmountofMoney ? "true" : "false"}
                                />
                                {errors.AmountofMoney && <p className="text-red-500" role="alert">{errors.AmountofMoney?.message}</p>}
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
                        <div className="save-btn text-center">
                            <Link href="/">
                                <button
                                    className="bg-return-bg rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        戻る
                                    </span>
                                </button>
                            </Link>
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

SecuritiesStocksOther.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};