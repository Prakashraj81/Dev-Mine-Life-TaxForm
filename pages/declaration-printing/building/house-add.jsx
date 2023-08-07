"use client";
import Link from "next/link";
import { useEffect, useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/back-btn";

export default function HouseAdd() {
    let KindsList = [
        { id: 1, value: ' 家屋 ', label: ' 家屋 ' },
        { id: 2, value: ' 構築物 ', label: ' 構築物 ' },
    ];

    let HowToUseList = [];

    let HowToUseList_House = [
        { id: "House_1", value: '自用家屋', label: '自用家屋' },
        { id: "RentRadio", value: '貸家', label: '貸家' },
    ];

    let HowToUseList_Structure = [
        { id: "Structure_1", value: '駐車場', label: '駐車場' },
        { id: "Structure_2", value: '養魚池', label: '養魚池' },
        { id: "Structure_3", value: '広告塔', label: '広告塔' },
    ];

    let StructureList = [
        { id: 1, value: '鉄骨鉄筋コンクリート', label: '鉄骨鉄筋コンクリート' },
        { id: 2, value: '鉄筋コンクリート', label: '鉄筋コンクリート' },
        { id: 3, value: '鉄骨コンクリート', label: '鉄骨コンクリート' },
        { id: 4, value: '無筋コンクリート', label: '無筋コンクリート' },
        { id: 5, value: 'プレストレスコンクリート', label: 'プレストレスコンクリート' },
        { id: 6, value: 'プレキャストコンクリート', label: 'プレキャストコンクリート' },
        { id: 7, value: 'コンクリートブロック', label: 'コンクリートブロック' },
        { id: 8, value: '骨格材が3mm以下の鉄骨造', label: '骨格材が3mm以下の鉄骨造' },
        { id: 9, value: '骨格材が3〜4mmの鉄骨造', label: '骨格材が3〜4mmの鉄骨造' },
        { id: 10, value: '骨格材が4mm超の鉄骨造', label: '骨格材が4mm超の鉄骨造' },
        { id: 11, value: '木造', label: '木造' },
        { id: 12, value: '合成樹脂造', label: '合成樹脂造' },
        { id: 13, value: '木骨モルタル造', label: '木骨モルタル造' },
        { id: 14, value: 'れんが造', label: 'れんが造' },
        { id: 15, value: '石造', label: '石造' },
        { id: 16, value: 'ブロック造', label: 'ブロック造' },
        { id: 17, value: '土蔵造', label: '土蔵造' },
    ];

    let UsageList = [
        { id: 1, value: '居宅', label: '居宅' },
        { id: 2, value: '店舗', label: '店舗' },
        { id: 3, value: '倉庫', label: '倉庫' },
    ]

    const [Kinds, setKinds] = useState("");
    const [HowToUse, setHowToUse] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [ResidenceDisplay, setResidenceDisplay] = useState("");
    const [Area, setArea] = useState("");
    const [PropertyTaxAssessmentValue, setPropertyTaxAssessmentValue] = useState(0);
    const [RentRatio, setRentRatio] = useState(0);
    const [Ownership, setOwnership] = useState(0);
    const [Ratio, setRatio] = useState(0);
    const [InsertCertificate, setInsertCertificate] = useState("");
    const [Valuation, setValuation] = useState(0);
    const [Structure, setStructure] = useState("");
    const [Usage, setUsage] = useState("");
    const [NumberofFloors, setNumberofFloors] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [TotalPrice, setTotalPrice] = useState(0);
    let [Undecidedheir1, setUndecidedheir1] = useState(0);
    let [Undecidedheir2, setUndecidedheir2] = useState(0);
    let [UserAmount, setUserAmount] = useState(0);
    //Hide and show input
    let [ShowStructureUsage, setShowStructureUsage] = useState(false);
    let [ShowRentRadio, setShowRentRadio] = useState(false);
    let [ShowHowtoList0, setShowHowtoList0] = useState(false);
    let [ShowHowtoList1, setShowHowtoList1] = useState(false);
    let [ShowHowtoList2, setShowHowtoList2] = useState(false);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Kinds: "",
            HowToUse: "",
            PostCode: 0,
            ResidenceDisplay: "",
            Area: 0,
            PropertyTaxAssessmentValue: 0,
            RentRatio: 0,
            Ownership: 0,
            Ratio: 0,
            InsertCertificate: "",
            Valuation: 0,
            Structure: "",
            Usage: "",
            NumberofFloors: 0,
            UndecidedHeir: 0,
            TotalPrice: 0,
        }
    });

    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const NumberofFloorsKeyPress = (e) => {
        var value = Number(event.target.value);
        setNumberofFloors(value);
    }

    //inputClear function
    function inputClear() {
        setPostCode("");
        setResidenceDisplay("");
        setArea("");
        setPropertyTaxAssessmentValue(0);
        setRentRatio("");
        setOwnership(0);
        setRatio(0);
        setInsertCertificate("");
        setValuation("");
        setStructure("");
        setUsage("");
        setNumberofFloors("");
        setUndecidedHeir(0);
        setTotalPrice(0);
    }

    const handleKinds = (event) => {
        inputClear();
        var dropdown_id = Number(event.target.value);
        setKinds(event.target.value);
        if (dropdown_id === 1) {
            setShowStructureUsage(true);
            HowToUseList = HowToUseList_House;
            setShowHowtoList0(false);
            setShowHowtoList1(true);
            setShowHowtoList2(false);
        }
        else if (dropdown_id === 2) {
            setShowStructureUsage(false);
            setShowHowtoList0(false);
            setShowHowtoList1(false);
            setShowHowtoList2(true);
        }
        else {
            setShowStructureUsage(false);
            setShowHowtoList0(true);
            setShowHowtoList1(false);
            setShowHowtoList2(false);
        }
    };



    const handleHowToUse = (event) => {
        var dropdown_id = event.target.value;
        setHowToUse(dropdown_id);
        if (dropdown_id === "RentRadio") {
            setShowRentRadio(true);
        }
        else {
            setShowRentRadio(false);
        }
    };

    const handleStructure = (event) => {
        var dropdown_id = Number(event.target.value);
        setStructure(event.target.value);
    };

    const handleUsage = (event) => {
        var dropdown_id = Number(event.target.value);
        setUsage(event.target.value);
    };

    const PropertyTaxAssessmentKeyPress = (event) => {
        var value = Number(event.target.value);
        setPropertyTaxAssessmentValue(value);
        setValuation(value);
        setUndecidedHeir(value);
        setTotalPrice(value);
    };

    //ownership-ratio calculation 
    const Ownershipfunction = (e) => {
        let ownership_value = Number(e.target.value);
        setOwnership(ownership_value);
        if (Ratio > 0 && PropertyTaxAssessmentValue > 0) {
            ownership_value = ownership_value * PropertyTaxAssessmentValue;
            ownership_value = ownership_value / Ratio;
            setValuation(ownership_value);
            setUndecidedHeir(ownership_value);
            setTotalPrice(ownership_value);
        }
        else {

        }
    }

    const Ratiofunction = (e) => {
        let ratio_value = Number(e.target.value);
        setRatio(ratio_value);
        if (PropertyTaxAssessmentValue > 0 && Ownership > 0) {
            var value = Ownership * PropertyTaxAssessmentValue;
            if (ratio_value > 0) {
                value = value / ratio_value;
                value = value.toFixed(0);
            }
            else {
                value = PropertyTaxAssessmentValue;
            }
            setValuation(value);
            setUndecidedHeir(value);
            setTotalPrice(value);
        }
        else {
            setValuation(PropertyTaxAssessmentValue);
            setUndecidedHeir(PropertyTaxAssessmentValue);
            setTotalPrice(PropertyTaxAssessmentValue);
        }
    }

    //Footer box calculation
    const Undecided_heir_1 = (e) => {
        var undecided_heir_1 = Number(e.target.value);
        setUndecidedheir1(undecided_heir_1);
        if (Undecidedheir2 > 0 && Number(Valuation) > 0) {
            var value = undecided_heir_1 * Valuation;
            value = value / Undecidedheir2;
            UndecidedHeir = Valuation - value;
        }
        setUserAmount(value);
        setUndecidedHeir(UndecidedHeir);
    }

    const Undecided_heir_2 = (e) => {
        var undecided_heir_2 = Number(e.target.value);
        setUndecidedheir2(undecided_heir_2);
        if (Undecidedheir1 > 0 && undecided_heir_2 > 0 && Number(Valuation) > 0) {
            var value = Undecidedheir1 * Valuation;
            if (undecided_heir_2 > 0) {
                value = value / undecided_heir_2;
                UndecidedHeir = Valuation - value;
                UndecidedHeir = UndecidedHeir.toFixed(0);
                value = value.toFixed(0);
            }
            else {
                value = PropertyTaxAssessmentValue;
            }
            setUndecidedHeir(UndecidedHeir);
            setUserAmount(value);
        }
        else {
            setUserAmount(0);
            setUndecidedHeir(Valuation);
        }
    }


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
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleKinds}>
                                        <option value=''>Select an option</option>
                                        {KindsList.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {ShowHowtoList0 && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="HowToUse" className="form-label">
                                        利用方法
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleHowToUse}>
                                        <option value=''>Select an option</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {ShowHowtoList1 && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="HowToUse" className="form-label">
                                        利用方法
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleHowToUse}>
                                        <option value=''>Select an option</option>
                                        {HowToUseList_House.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {ShowHowtoList2 && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="HowToUse" className="form-label">
                                        利用方法
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleHowToUse}>
                                        <option value=''>Select an option</option>
                                        {HowToUseList_Structure.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {ShowStructureUsage && (
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Structure" className="form-label">
                                            構造
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleStructure}>
                                            <option value=''>Select an option</option>
                                            {StructureList.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Usage" className="form-label">
                                        用途
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleUsage}>
                                        <option value=''>Select an option</option>
                                        {UsageList.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowStructureUsage && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="NumberofFloors " className="form-label">
                                        建物全体の階数
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="NumberofFloors"
                                        onKeyPress={handleKeyPress}
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("NumberofFloors", { required: "この項目は必須です" })}
                                        aria-invalid={errors.NumberofFloors ? "true" : "false"}
                                    />
                                    {errors.NumberofFloors && <p className="text-red-500 mt-2" role="alert">{errors.NumberofFloors?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}


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
                                    onKeyPress={handleKeyPress}
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("postcode", { required: "この項目は必須です" })}
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
                                    {...register("ResidenceDisplay", { required: "この項目は必須です" })}
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
                                    onKeyPress={handleKeyPress}
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("Area", { required: "この項目は必須です" })}
                                    aria-invalid={errors.postcode ? "true" : "false"}
                                />
                                {errors.Area && <p className="text-red-500 mt-2" role="alert">{errors.Area?.message}</p>}
                            </div>
                        </div>
                    </div>


                    <div className="w-full flex items-center justify-between mb-7">
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
                                    onChange={PropertyTaxAssessmentKeyPress}
                                    onKeyPress={handleKeyPress}
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                            </div>
                        </div>

                        {ShowRentRadio && (
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="RentRadio" className="form-label">
                                        賃貸割合
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="RentRadio"
                                        onKeyPress={handleKeyPress}
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("RentRadio", { required: "この項目は必須です" })}
                                        aria-invalid={errors.RentRadio ? "true" : "false"}
                                    />
                                    {errors.RentRadio && <p className="text-red-500 mt-2" role="alert">{errors.RentRadio?.message}</p>}
                                </div>
                            </div>
                        )}
                    </div>



                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="OwnershipRatio" className="form-label">
                                    持分比率(ある場合)
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <div className="flex justify-between items-center">
                                    <div><input
                                        type="text"
                                        id="OwnershipRatio"
                                        onKeyPress={handleKeyPress}
                                        onChange={Ownershipfunction}
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                    <div>
                                        <span className="text-3xl text-gray-500">/</span>
                                    </div>
                                    <div><input
                                        type="text"
                                        id="Ratio"
                                        onChange={Ratiofunction}
                                        onKeyPress={handleKeyPress}
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    value={Valuation}
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
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
                                    <input type="file" className="text-right flex form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3" id="InsertCertificate" aria-describedby="inputGroupFileAddon06" accept="image/x-png,image/gif,image/jpeg,image/svg"
                                        {...register("InsertCertificate", { required: "この項目は必須です" })}
                                        aria-invalid={errors.InsertCertificate ? "true" : "false"}
                                    />
                                    <label className="custom-file-label" for="InsertCertificate">Upload</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
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
                                    <div className="w-50 inline-block float-left">
                                        <span>山田　太郎</span>
                                    </div>
                                    <div className="w-50 inline-block float-left">
                                        <div className="flex justify-between items-center">
                                            <div><input
                                                type="text"
                                                id="Undecided_heir_1"
                                                onChange={Undecided_heir_1}
                                                onKeyPress={handleKeyPress}
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div>
                                                <span className="text-3xl text-gray-500">/</span>
                                            </div>
                                            <div><input
                                                type="text"
                                                id="Undecided_heir_2"
                                                onChange={Undecided_heir_2}
                                                onKeyPress={handleKeyPress}
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div className="text-right text-sm pl-2">{UserAmount}</div>
                                        </div>
                                    </div>
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
        </>
    )
}