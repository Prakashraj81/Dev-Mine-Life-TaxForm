"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function LifeInsuranceAdd() {
    let KindsList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [Kinds, setKinds] = useState("");
    const [NameofLifeInsurance, setNameofLifeInsurance] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [Address, setAddress] = useState("");
    const [ReceiptDate, setReceiptDate] = useState("");
    const [AmountReceived, setAmountReceived] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Kinds: "",
            NameofLifeInsurance: "",
            PostCode: "",
            Address: "",
            ReceiptDate: "",
            AmountReceived: "",
        }
    });

    const handleDropdownChange = (event) => {
        setProperty(event.target.value);
    };


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.PropertyName != "") {
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
                            生命保険金・死亡退職手当金1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>

                <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Kinds" className="form-label">
                                        種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={KindsList} onChange={handleDropdownChange}>
                                        {KindsList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="w-full inline-block float-left mt-2">
                                        <p className="text-sm text-black tracking-2 font-medium leading-7">生命保険会社・勤務先会社の所在地</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="NameofLifeInsurance" className="form-label">
                                    生命保険会社・勤務先会社の名称
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="NameofLifeInsurance"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("NameofLifeInsurance", { required: "NameofLifeInsurance is required" })}
                                    aria-invalid={errors.NameofLifeInsurance ? "true" : "false"}
                                />
                                {errors.NameofLifeInsurance && <p className="text-red-500 mt-2" role="alert">{errors.NameofLifeInsurance?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
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
                                    {...register("PostCode", { required: "PostCode is required" })}
                                    aria-invalid={errors.PostCode ? "true" : "false"}
                                />
                                {errors.PostCode && <p className="text-red-500 mt-2" role="alert">{errors.PostCode?.message}</p>}
                            </div>
                            <div className="w-full inline-block float-left mt-2">
                                <p className="text-sm text-black tracking-2 font-medium leading-7">ハイフン抜きで入力してください</p>
                            </div>
                        </div>
                    </div>

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

                    <div className="w-full inline-block float-left mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="ReceiptDate" className="form-label">
                                受取年月日
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="date"
                                    id="ReceiptDate"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-3"
                                    {...register("ReceiptDate", { required: "ReceiptDate is required" })}
                                    aria-invalid={errors.ReceiptDate ? "true" : "false"}
                                />
                                {errors.ReceiptDate && <p className="text-red-500" role="alert">{errors.ReceiptDate?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="AmountReceived" className="form-label">
                                受け取った金額
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="AmountReceived"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("AmountReceived", { required: "AmountReceived is required" })}
                                    aria-invalid={errors.AmountReceived ? "true" : "false"}
                                />
                                {errors.AmountReceived && <p className="text-red-500 mt-2" role="alert">{errors.AmountReceived?.message}</p>}
                            </div>                            
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
                            <Link href="/declaration-printing/life-insurance/life-insurance-rights">
                                <button

                                    className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        保存
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