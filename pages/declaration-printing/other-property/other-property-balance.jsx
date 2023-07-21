"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function OtherPropertyBalance() {
    let PropertyList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [Property, setProperty] = useState("");
    const [PropertyName, setPropertyName] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [DateofAcquisition, setDateofAcquisition] = useState("");
    const [ManagementBalance, setManagementBalance] = useState("");


    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Property: "",
            PropertyName: "",
            DateofAcquisition: "",
            PostCode: "",
            ManagementBalance: "",
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
                            その他の財産1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>

                <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full inline-block  mb-7">
                        <div className="w-full flex items-center justify-between">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="UnitPrice" className="form-label">
                                            財産の種類
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={PropertyList} onChange={handleDropdownChange}>
                                            {PropertyList.map((option) => (
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
                                    <label htmlFor="PropertyName" className="form-label">
                                        財産の名称
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="PropertyName"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("PropertyName", { required: "PropertyName is required" })}
                                        aria-invalid={errors.PropertyName ? "true" : "false"}
                                    />
                                    {errors.PropertyName && <p className="text-red-500 mt-2" role="alert">{errors.PropertyName?.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="w-full inline-block mt-3">
                            <p className="text-sm text-black tracking-2 font-medium leading-7">相続人が23歳未満、在学中、教育訓練給付⾦の⽀給対象となる教育訓練を受講しているのいずれかに該当する場合は相続税の課税対象外ですので⼊⼒は不要です。</p>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="DateofAcquisition" className="form-label">
                                    財産の取得日
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="DateofAcquisition"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("DateofAcquisition", { required: "DateofAcquisition is required" })}
                                    aria-invalid={errors.DateofAcquisition ? "true" : "false"}
                                />
                                {errors.DateofAcquisition && <p className="text-red-500 mt-2" role="alert">{errors.DateofAcquisition?.message}</p>}
                            </div>
                        </div>
                    </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="所在場所" className="w-full inline-block form-label">
                                    所在場所
                                </label>
                                <label htmlFor="PostCode" className="w-full inline-block form-label mt-1">
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
                        </div>
                        <div className="w-full inline-block mt-2">
                            <p className="text-sm text-black tracking-2 font-medium leading-7">ハイフン抜きで入力してください</p>
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





                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="ManagementBalance" className="form-label">
                                    管理残高
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="ManagementBalance"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("ManagementBalance", { required: "ManagementBalance is required" })}
                                    aria-invalid={errors.ManagementBalance ? "true" : "false"}
                                />
                                {errors.ManagementBalance && <p className="text-red-500 mt-2" role="alert">{errors.ManagementBalance?.message}</p>}
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