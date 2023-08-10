"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";

export default function HouseholdPropertyAdd() {

    const [PropertyContent, setPropertyContent] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [Address, setAddress] = useState("");
    const [Valuation, setValuation] = useState(0);

    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [TotalPrice, setTotalPrice] = useState(0);
    let [UserAmount, setUserAmount] = useState(0);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            PropertyContent: "",
            PostCode: "",
            Address: "",
            Valuation: 0,
            UndecidedHeir: 0,
            TotalPrice: 0,
            UserAmount: 0,
        }
    });

    const ValuationKeyPress = (e) => {
        let value = Number(e.target.value);
        setValuation(value);
        setUndecidedHeir(value);
        setTotalPrice(value);
    };
    

    //Footer box calculation
    const FooterboxKeyPress = (e) => {
        let footer_box_value = Number(e.target.value);
        if (footer_box_value > 0) {
            var value = AmountofMoney - footer_box_value;
            setUndecidedHeir(value);
        }
        else {
            setUndecidedHeir(AmountofMoney);
        }
    }

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
        var Apiurl = "/";
        const urlresponse = await fetch(Apiurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(defaultValues),
            mode: "no-cors",
        });
    };
    return (
        <>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家庭用財産1
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
                                    <label htmlFor="PropertyContent" className="form-label">
                                        財産の内容
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="PropertyContent"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("PropertyContent", { required: "この項目は必須です" })}
                                        aria-invalid={errors.PropertyContent ? "true" : "false"}
                                    />
                                    {errors.PropertyContent && <p className="text-red-500" role="alert">{errors.PropertyContent?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Location" className="form-label">
                                        所在場所
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"
                                        id="PostCode"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-12"
                                        onKeyPress={handleKeyPress}
                                        {...register("PostCode", { required: "数字7桁で入力して下さい。海外の場合は入力不要です。" })}
                                        aria-invalid={errors.PostCode ? "true" : "false"}
                                    />
                                    <PostcodeIcon />
                                </div>
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                </div>
                                {errors.PostCode && <p className="text-red-500" role="alert">{errors.PostCode?.message}</p>}
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details">
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
                                        {...register("Address", { required: "この項目は必須です" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.Address && <p className="text-red-500" role="alert">{errors.Address?.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Valuation" className="form-label">
                                        評価額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Valuation"
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={ValuationKeyPress}
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
                                        <div className="text-right"><input type="text" className="border-2 h-10 text-right form-control w-50 outline-none"
                                            onChange={FooterboxKeyPress}
                                            onKeyPress={handleKeyPress}
                                        /></div>
                                    </li>
                                    <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                        <span>相続人未決定</span>
                                        <span>{UndecidedHeir}</span>
                                    </li>
                                    <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                        <span>合計</span>
                                        <span>{TotalPrice}</span>
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


HouseholdPropertyAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};