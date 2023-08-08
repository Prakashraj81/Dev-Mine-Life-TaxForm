"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function SuccessiveInheritanceAdd() {
    let AmountGiftList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [NameofDecedent, setNameofDecedent] = useState("");
    const [RelationshipDecedent, setRelationshipDecedent] = useState("");
    const [OccurrenceDate, setOccurrenceDate] = useState("");
    const [AmountGiftType, setAmountGiftType] = useState("");
    const [AssetValue, setAssetValue] = useState("");
    const [InheritanceTax, setInheritanceTax] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            NameofDecedent: "",
            RelationshipDecedent: "",
            OccurrenceDate: "",
            AmountGiftType: "",
            AssetValue: "",
            InheritanceTax: "",
        }
    });

    const handleDropdownChange = (event) => {
        setAmountGiftType(event.target.value);
    };


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.NameofDecedent != "") {
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
                            相次相続控除1
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
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="NameofDecedent" className="form-label">
                                            前相続の被相続人氏名
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="NameofDecedent "
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("NameofDecedent", { required: "NameofDecedent is required" })}
                                            aria-invalid={errors.NameofDecedent ? "true" : "false"}
                                        />
                                        {errors.NameofDecedent && <p className="text-red-500 mt-2" role="alert">{errors.NameofDecedent?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="RelationshipDecedent" className="form-label">
                                        今回の被相続人と前回の被相続人の間柄
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="RelationshipDecedent"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("RelationshipDecedent", { required: "RelationshipDecedent is required" })}
                                        aria-invalid={errors.RelationshipDecedent ? "true" : "false"}
                                    />
                                    {errors.RelationshipDecedent && <p className="text-red-500 mt-2" role="alert">{errors.RelationshipDecedent?.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="OccurrenceDate" className="form-label">
                                            前相続の発生日
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="date"
                                            id="OccurrenceDate"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("OccurrenceDate", { required: "OccurrenceDate is required" })}
                                            aria-invalid={errors.OccurrenceDate ? "true" : "false"}
                                        />
                                        {errors.OccurrenceDate && <p className="text-red-500 mt-2" role="alert">{errors.OccurrenceDate?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="AmountGiftType" className="form-label">
                                        贈与に伴って支払った贈与税額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={AmountGiftList} onChange={handleDropdownChange}>
                                        <option value=''></option>
                                    </select>
                                    {errors.RelationshipDecedent && <p className="text-red-500 mt-2" role="alert">{errors.RelationshipDecedent?.message}</p>}
                                </div>
                            </div>
                        </div>



                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="postcode" className="w-full inline-block mt-1 form-label">
                                        今回の被相続人が前相続において取得した財
                                    </label>
                                    <label htmlFor="AssetValue" className="w-full inline-block mt-1 form-label">
                                        産額（相続時精算課税適用財産含む）
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="AssetValue"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("AssetValue", { required: "AssetValue is required" })}
                                        aria-invalid={errors.AssetValue ? "true" : "false"}
                                    />
                                    {errors.AssetValue && <p className="text-red-500 mt-2" role="alert">{errors.AssetValue?.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="InheritanceTax" className="w-full inline-block mt-1 form-label">
                                        前相続で今回の被相続人が支払った相続税額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="InheritanceTax"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("InheritanceTax", { required: "InheritanceTax is required" })}
                                        aria-invalid={errors.InheritanceTax ? "true" : "false"}
                                    />
                                    {errors.InheritanceTax && <p className="text-red-500 mt-2" role="alert">{errors.InheritanceTax?.message}</p>}
                                </div>
                            </div>
                        </div>



                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <div className="save-btn text-center">
                                <BackButton/>
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
                    </form>
                </div>
            </div>
        </>
    )
}

SuccessiveInheritanceAdd.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};