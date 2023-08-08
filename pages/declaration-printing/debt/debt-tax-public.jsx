"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function DebtTaxtPublic() {
    let DebtList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [Debt, setDebt] = useState("");
    const [NameofDebt, setNameofDebt] = useState("");
    const [AmountReceived, setAmountReceived] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [Address, setAddress] = useState("");
    const [ReceiptDate, setReceiptDate] = useState("");
    const [ReceiptDate1, setReceiptDate1] = useState("");
    const [AmountReceived1, setAmountReceived1] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Debt: "",
            NameofDebt: "",
            AmountReceived: "",
            PostCode: "",
            Address: "",
            ReceiptDate: "",
            ReceiptDate1: "",
            AmountReceived1: "",
        }
    });

    const handleDropdownChange = (event) => {
        setDebt(event.target.value);
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

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                        <div className="label w-full inline-block">
                                    <label htmlFor="FeePayeeName" className="form-label">
                                    債務の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={DebtList} onChange={handleDropdownChange}>
                                        {DebtList.map((option) => (
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
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">生命保険会社・勤務先会社の所在地</p>
                                </div>
                                {errors.AmountReceived && <p className="text-red-500 mt-2" role="alert">{errors.AmountReceived?.message}</p>}
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
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                </div>
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


                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="ReceiptDate" className="form-label">
                                        受取年月日
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="ReceiptDate"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("ReceiptDate", { required: "ReceiptDate is required" })}
                                        aria-invalid={errors.ReceiptDate ? "true" : "false"}
                                    />
                                    {errors.ReceiptDate && <p className="text-red-500 mt-2" role="alert">{errors.ReceiptDate?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                        <div className="label w-full inline-block">
                                <label htmlFor="ReceiptDate1" className="form-label">
                                受取年月日
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="date"
                                    id="ReceiptDate1"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("ReceiptDate1", { required: "ReceiptDate1 is required" })}
                                    aria-invalid={errors.ReceiptDate1 ? "true" : "false"}
                                />
                                {errors.ReceiptDate1 && <p className="text-red-500 mt-2" role="alert">{errors.ReceiptDate1?.message}</p>}
                            </div>
                        </div>
                    </div>

                    


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="AmountReceived1" className="form-label">
                                受け取った金額
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="AmountReceived1"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("AmountReceived1", { required: "AmountReceived1 is required" })}
                                    aria-invalid={errors.AmountReceived1 ? "true" : "false"}
                                />
                                {errors.AmountReceived1 && <p className="text-red-500 mt-2" role="alert">{errors.AmountReceived1?.message}</p>}
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

DebtTaxtPublic.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};