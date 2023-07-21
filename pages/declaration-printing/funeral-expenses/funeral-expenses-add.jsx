"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function FuneralExpensesAdd() {
    let KindsList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [FeePayeeName, setFeePayeeName] = useState("");    
    const [PostCode, setPostCode] = useState("");
    const [Address, setAddress] = useState("");
    const [DatePaid, setDatePaid] = useState("");
    const [AmountPaid, setAmountPaid] = useState("");    

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            KindsLIst: "",
            FeePayeeName: "",            
            PostCode: "",
            Address: "",
            DatePaid: "",
            AmountPaid: "",
            ReductionRate: "",            
        }
    });

    const handleDropdownChange = (event) => {
        setKinds(event.target.value);
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
                            葬儀費用1
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
                                        費用支払先氏名
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="FeePayeeName"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("FeePayeeName", { required: "FeePayeeName is required" })}
                                        aria-invalid={errors.FeePayeeName ? "true" : "false"}
                                    />
                                    <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">タグで下記のタグから選択</p>
                                </div>
                                    {errors.FeePayeeName && <p className="text-red-500 mt-2" role="alert">{errors.FeePayeeName?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="郵便番号" className="form-label">
                                支払先の所在場所
                                </label>
                                <label htmlFor="PostCode" className="form-label mt-2">
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
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                </div>
                                {errors.PostCode && <p className="text-red-500 mt-2" role="alert">{errors.PostCode?.message}</p>}
                            </div>
                        </div>
                    </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="Valuation" className="form-label">
                                    所在場所
                                </label>
                                <label htmlFor="PostCode" className="form-label">
                                    郵便番号
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
                                {errors.PostCode && <p className="text-red-500 mt-2" role="alert">{errors.PostCode?.message}</p>}
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
                    


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="DatePaid" className="form-label">
                                支払った日
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="DatePaid"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("DatePaid", { required: "DatePaid is required" })}
                                    aria-invalid={errors.DatePaid ? "true" : "false"}
                                />
                                {errors.DatePaid && <p className="text-red-500 mt-2" role="alert">{errors.DatePaid?.message}</p>}
                            </div>
                        </div>
                    </div>


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="AmountPaid" className="form-label">
                                支払った金額
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="AmountPaid"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("AmountPaid", { required: "AmountPaid is required" })}
                                    aria-invalid={errors.AmountPaid ? "true" : "false"}
                                />
                                {errors.AmountPaid && <p className="text-red-500 mt-2" role="alert">{errors.AmountPaid?.message}</p>}
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