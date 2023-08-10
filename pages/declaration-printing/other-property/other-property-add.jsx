"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";

export default function OtherPropertyAdd() {
    let PropertyList = [
        { id: 1, value: 'その他', label: 'その他' },
        { id: 2, value: '立木', label: '立木' },
        { id: 3, value: '代償財産', label: '代償財産' },
        { id: 4, value: '管理残額（教育資金）', label: '管理残額（教育資金）' },
        { id: 5, value: '管理残額（結婚・子育て資金）', label: '管理残額（結婚・子育て資金）' },
    ];

    const [Property, setProperty] = useState("");
    const [PropertyName, setPropertyName] = useState("");
    const [DateofAcquisition, setDateofAcquisition] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [Valuation, setValuation] = useState(0);
    const [Address, setAddress] = useState("");
    const [UnitPrice, setUnitPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [ReductionRate, setReductionRate] = useState(0);
    const [ManagementBalance, setManagementBalance] = useState(0);

    let [ShowDateofAcquisition, setShowDateofAcquisition] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAmountofMoney, setShowAmountofMoney] = useState(true);
    let [ShowAddress, setShowAddress] = useState(false);
    let [ShowUnitPriceQuantity, setShowUnitPriceQuantity] = useState(false);
    let [ShowReductionRate, setShowReductionRate] = useState(false);
    let [ShowAmountofMoneyDisabled, setShowAmountofMoneyDisabled] = useState(false);
    let [ShowManagementBalance, setShowManagementBalance] = useState(false);
    let [ShowContent, setShowContent] = useState(false);
    let [ShowCompensatoryProperty, setShowCompensatoryProperty] = useState(false);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Property: "",
            PropertyName: "",
            DateofAcquisition: "",
            PostCode: "",
            Address: "",
            UnitPrice: 0,
            Quantity: 0,
            ReductionRate: 0,
            ManagementBalance: 0,
            Valuation: 0,
        }
    });

    //Postal code 7 digit limit function
    const [isValid, setIsValid] = useState(true);
    const postalcodeDigit = (e) => {
        let digit_value = e.target.value;
        let isValidInput = /^\d{7}$/.test(digit_value);
        if (digit_value.length == 8 || digit_value.length == 9 || digit_value.length == 10) {
            digit_value = digit_value.slice(0, 7)
            setPostCode(digit_value);
        }
        setPostCode(digit_value);
        setIsValid(isValidInput);
    }


    const handlePropertyType = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = Number(selectedOption.value);
        setProperty(selectedOption.text);
        if (selectedId === 1) {
            setShowContent(false);
            setShowCompensatoryProperty(false);
            setShowManagementBalance(false);
            setShowAmountofMoneyDisabled(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowUnitPriceQuantity(true);
            setShowAmountofMoney(true);
        }
        else if (selectedId === 2) {
            setShowContent(false);
            setShowCompensatoryProperty(false);
            setShowManagementBalance(false);
            setShowAmountofMoneyDisabled(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(true);
            setShowPostCode(true);
            setShowAddress(true);
            setShowUnitPriceQuantity(true);
            setShowAmountofMoney(true);
        }
        else if (selectedId === 3) {
            setShowContent(false);
            setShowManagementBalance(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(false);
            setShowPostCode(false);
            setShowAddress(false);
            setShowUnitPriceQuantity(false);
            setShowAmountofMoney(false);
            setShowAmountofMoneyDisabled(true);
            setShowCompensatoryProperty(true);
        }
        else if (selectedId === 4) {
            setShowCompensatoryProperty(false);
            setShowAmountofMoneyDisabled(false);
            setShowReductionRate(false);
            setShowUnitPriceQuantity(false);
            setShowAmountofMoney(false);
            setShowContent(true);
            setShowDateofAcquisition(true);
            setShowPostCode(true);
            setShowAddress(true);
            setShowManagementBalance(true);
        }
        else if (selectedId === 5) {
            setShowCompensatoryProperty(false);
            setShowAmountofMoneyDisabled(false);
            setShowReductionRate(false);
            setShowUnitPriceQuantity(false);
            setShowAmountofMoney(false);
            setShowContent(false);
            setShowDateofAcquisition(true);
            setShowPostCode(true);
            setShowAddress(true);
            setShowManagementBalance(true);
        }
        else {
            setShowContent(false);
            setShowCompensatoryProperty(false);
            setShowManagementBalance(false);
            setShowAmountofMoneyDisabled(false);
            setShowDateofAcquisition(false);
            setShowReductionRate(false);
            setShowPostCode(false);
            setShowAddress(false);
            setShowUnitPriceQuantity(false);
            setShowAmountofMoney(true);
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
                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        財産の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handlePropertyType}>
                                        <option value=''></option>
                                        {PropertyList.map((option) => (
                                            <option key={option.value} value={option.id}>
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

                    {ShowContent && (
                        <div className="py-3"><p>相続人が<span className="font-semibold">23歳未満、在学中、教育訓練給付⾦の⽀給対象となる教育訓練を受講している</span>のいずれかに該当する場合は相続税の課税対象外ですので⼊⼒は不要です。</p></div>
                    )}

                    {ShowDateofAcquisition && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="DateofAcquisition" className="form-label">
                                        財産の取得日
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="DateofAcquisition"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("DateofAcquisition", { required: "DateofAcquisition is required" })}
                                        aria-invalid={errors.DateofAcquisition ? "true" : "false"}
                                    />
                                    {errors.DateofAcquisition && <p className="text-red-500 mt-2" role="alert">{errors.DateofAcquisition?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowPostCode && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="PostCode" className="form-label">
                                        郵便番号
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"
                                        id="PostCode"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-12"
                                        onKeyPress={handleKeyPress}
                                        onChange={postalcodeDigit}
                                        value={PostCode}
                                    />
                                    <PostcodeIcon />
                                </div>
                                <div className="mt-3">
                                    <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                </div>
                                {!isValid && <p>数字7桁で入力して下さい。海外の場合は入力不要です。</p>}
                            </div>
                        </div>
                    )}


                    {ShowAddress && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full block">
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
                    )}

                    {ShowUnitPriceQuantity && (
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">
                                            単価
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="UnitPrice"
                                            className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("UnitPrice", { required: "UnitPrice is required" })}
                                            aria-invalid={errors.UnitPrice ? "true" : "false"}
                                        />
                                        {errors.UnitPrice && <p className="text-red-500 mt-2" role="alert">{errors.UnitPrice?.message}</p>}
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
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Quantity", { required: "Quantity is required" })}
                                        aria-invalid={errors.Quantity ? "true" : "false"}
                                    />
                                    {errors.Quantity && <p className="text-red-500 mt-2" role="alert">{errors.Quantity?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowReductionRate && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="ReductionRate" className="form-label">
                                        減額割合
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="ReductionRate"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("ReductionRate", { required: "ReductionRate is required" })}
                                        aria-invalid={errors.ReductionRate ? "true" : "false"}
                                    />
                                    {errors.ReductionRate && <p className="text-red-500 mt-2" role="alert">{errors.ReductionRate?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}


                    {ShowAmountofMoney && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
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
                                        {...register("Valuation", { required: "Valuation is required" })}
                                        aria-invalid={errors.Valuation ? "true" : "false"}
                                    />
                                    {errors.Valuation && <p className="text-red-500 mt-2" role="alert">{errors.Valuation?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowManagementBalance && (
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
                                        disabled
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("ManagementBalance", { required: "ManagementBalance is required" })}
                                        aria-invalid={errors.ManagementBalance ? "true" : "false"}
                                    />
                                    {errors.ManagementBalance && <p className="text-red-500 mt-2" role="alert">{errors.ManagementBalance?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowAmountofMoneyDisabled && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Valuation" className="form-label">
                                        評価額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        disabled
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Valuation", { required: "Valuation is required" })}
                                        aria-invalid={errors.Valuation ? "true" : "false"}
                                    />
                                    {errors.Valuation && <p className="text-red-500 mt-2" role="alert">{errors.Valuation?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowCompensatoryProperty && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        代償財産の分割方法
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">

                                </div>
                            </div>
                        </div>
                    )}


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
                                        onKeyPress={handleKeyPress}
                                    /></div>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>相続人未決定</span>
                                    <span>{0}</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>合計</span>
                                    <span>{0}</span>
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
                            <Link href="/declaration-printing/other-property/other-property-others">
                                <button

                                    className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        保存して戻る
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

OtherPropertyAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};