"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";

export default function HouseHouse() {
    let KindsList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    let HowToUseList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [Kinds, setKinds] = useState("");
    const [HowToUse, setHowToUse] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [ResidenceDisplay, setResidenceDisplay] = useState("");
    const [Area, setArea] = useState("");
    const [PropertyTaxAssessmentValue, setPropertyTaxAssessmentValue] = useState("");
    const [OwnershipRadio, setOwnershipRadio] = useState("");
    const [InsertCertificate, setInsertCertificate] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Kinds: "",
            HowToUse: "",
            PostCode: "",
            ResidenceDisplay: "",
            Area: "",
            PropertyTaxAssessmentValue: "",
            OwnershipRadio: "",
            InsertCertificate: "",
        }
    });

    const handleDropdownChange = (event) => {
        setDepositType(event.target.value);
    };


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.Kinds != "") {
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
            <div className="house-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家屋1
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
                                    <label htmlFor="UnitPrice" className="form-label">
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
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="HowToUse" className="form-label">
                                    利用方法
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={HowToUseList} onChange={handleDropdownChange}>
                                    {HowToUseList.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="UnitPrice" className="form-label">
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
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="HowToUse" className="form-label">
                                    利用方法
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={HowToUseList} onChange={handleDropdownChange}>
                                    {HowToUseList.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="postcode" className="form-label">
                                    郵便番号
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="postcode"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("postcode", { required: "postcode is required" })}
                                    aria-invalid={errors.postcode ? "true" : "false"}
                                />
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                </div>
                                {errors.postcode && <p className="text-red-500 mt-2" role="alert">{errors.postcode?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details">
                            <div className="label w-full inline-block">
                                <label htmlFor="ResidenceDisplay" className="form-label">
                                    住居表示
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="ResidenceDisplay"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("ResidenceDisplay", { required: "ResidenceDisplay is required" })}
                                    aria-invalid={errors.ResidenceDisplay ? "true" : "false"}
                                />
                                {errors.ResidenceDisplay && <p className="text-red-500" role="alert">{errors.ResidenceDisplay?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="Area" className="form-label">
                                    面積
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="Area"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("Area", { required: "Area is required" })}
                                    aria-invalid={errors.postcode ? "true" : "false"}
                                />
                                {errors.Area && <p className="text-red-500 mt-2" role="alert">{errors.Area?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="PropertyTaxAssessmentValue" className="form-label">
                                    固定資産税評価額
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="PropertyTaxAssessmentValue"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("PropertyTaxAssessmentValue", { required: "PropertyTaxAssessmentValue is required" })}
                                    aria-invalid={errors.PropertyTaxAssessmentValue ? "true" : "false"}
                                />
                                {errors.PropertyTaxAssessmentValue && <p className="text-red-500 mt-2" role="alert">{errors.PropertyTaxAssessmentValue?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="PropertyTaxAssessmentValue" className="form-label">
                                    持分比率(ある場合)
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <div className="flex justify-between items-center">
                                    <div><input
                                        type="text"
                                        id="OwnershipRadio"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("OwnershipRadio", { required: "OwnershipRadio is required" })}
                                        aria-invalid={errors.OwnershipRadio ? "true" : "false"}
                                    /></div>
                                    <div>
                                        <span>/</span>
                                    </div>
                                    <div><input
                                        type="text"
                                        id="Radio"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                </div>
                                {errors.OwnershipRadio && <p className="text-red-500 mt-2" role="alert">{errors.OwnershipRadio?.message}</p>}
                            </div>
                            <div className="mt-3">
                                <p className="text-sm text-black tracking-2 font-medium">評価額</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="InsertCertificate" className="form-label">
                                    証明書を挿入
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <div class="custom-file">
                                    <input type="file" className="flex form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3" id="InsertCertificate" aria-describedby="inputGroupFileAddon06" accept="image/x-png,image/gif,image/jpeg,image/svg"
                                        {...register("InsertCertificate", { required: "InsertCertificate is required" })}
                                        aria-invalid={errors.InsertCertificate ? "true" : "false"}
                                    />
                                    <label className="custom-file-label" for="InsertCertificate">Upload</label>
                                </div>
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