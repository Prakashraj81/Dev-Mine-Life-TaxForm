import React from "react";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function LandAdd() {

    const [RadioBtn, setRadioBtn] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [WhereAbouts, setWhereAbouts] = useState("");
    const [BuildingName, setBuildingName] = useState("");
    const [Title, setTitle] = useState("");
    const [FLoorArea, setFLoorArea] = useState("");
    const [Location, setLocation] = useState("");
    const [Landmark, setLandmark] = useState("");
    const [LandTitle, setLandTitle] = useState("");
    const [RankNumber1, setRankNumber1] = useState("");
    const [RankNumber2, setRankNumber2] = useState("");
    const [Structure, setStructure] = useState("");
    const [LandofRightSite, setLandofRightSite] = useState("");
    const [RightofSIteRatio, setRightofSIteRatio] = useState("");
    const [WhereAboutHouse, setWhereAboutHouse] = useState("");
    const [PropertyNumber, setPropertyNumber] = useState("");
    const [ArchitecturalStudy, setArchitecturalStudy] = useState("");
    const [LandPrice, setLandPrice] = useState("");
    //Show no
    const [HouseNumber, setHouseNumber] = useState("");
    const [CommonHousing, setCommonHousing] = useState("");

    //Input hide show
    let [ShowYes, setShowYes] = useState(false);
    let [ShowNo, setShowNo] = useState(false);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            RadioBtn: "",
            WhereAbouts: "",
            BuildingName: "",
            Title: "",
            FLoorArea: "",
            Location: "",
            Landmark: "",
            LandTitle: "",
            RankNumber1: "",
            RankNumber2: "",
            Structure: "",
            LandofRightSite: "",
            RightofSIteRatio: "",
            WhereAboutHouse: "",
            PropertyNumber: "",
            ArchitecturalStudy: "",
            LandPrice: "",
            //Show no
            HouseNumber: "",
            CommonHousing: ""
        }
    });

    const RadioButton = (event) => {
        let radio_btn_value = event.target.value;
        setSelectedOption(radio_btn_value);
        if (radio_btn_value === "Yes") {
            setShowNo(false);
            setShowYes(true);
        }
        else {
            setShowYes(false);
            setShowNo(true);
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
            <div className="land-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            土地1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
                <div className="page-description">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        登記簿謄本の情報の入力
                    </p>
                </div>
                <form action="/action_page.php" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full inline-block float-left mt-3">
                        <div className="label w-full inline-block">
                            <label className="form-label">
                                1. 被相続人が所有されていた不動産は分譲マンションの１室でしょうか
                            </label>
                        </div>
                        <div className="w-full flex items-center mt-2">
                            <label>
                                <div>
                                    <input className="mr-1" id="Yes" type="radio" checked={selectedOption === 'Yes'} onChange={RadioButton} value="Yes" />
                                    <label for="Yes">Yes</label>
                                </div>
                            </label>
                            <label className="pl-3">
                                <div>
                                    <input className="mr-1" id="No" type="radio" checked={selectedOption === 'No'} onChange={RadioButton} value="No" />
                                    <label for="No">No</label>
                                </div>
                            </label>
                        </div>
                    </div>

                    {ShowYes && (
                        <>
                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="WhereAbouts" className="form-label">
                                            所在
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="WhereAbouts"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("WhereAbouts", { required: "この項目は必須です" })}
                                            aria-invalid={errors.WhereAbouts ? "true" : "false"}
                                        />
                                        {errors.WhereAbouts && <p className="text-red-500 mt-2" role="alert">{errors.WhereAbouts?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="BuildingName" className="form-label">
                                            建物の名称
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="BuildingName"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("BuildingName", { required: "この項目は必須です" })}
                                            aria-invalid={errors.BuildingName ? "true" : "false"}
                                        />
                                        {errors.BuildingName && <p className="text-red-500 mt-2" role="alert">{errors.BuildingName?.message}</p>}
                                    </div>
                                </div>
                            </div>


                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="Title" className="form-label">
                                                进称
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="Title"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("Title", { required: "この項目は必須です" })}
                                                aria-invalid={errors.Title ? "true" : "false"}
                                            />
                                            {errors.Title && <p className="text-red-500 mt-2" role="alert">{errors.Title?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="FLoorArea" className="form-label">
                                            床面積m2
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="FLoorArea"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("FLoorArea", { required: "この項目は必須です" })}
                                            aria-invalid={errors.FLoorArea ? "true" : "false"}
                                        />
                                        {errors.FLoorArea && <p className="text-red-500 mt-2" role="alert">{errors.FLoorArea?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Location" className="form-label">
                                            所在及び地
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="Location"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("Location", { required: "この項目は必須です" })}
                                            aria-invalid={errors.Location ? "true" : "false"}
                                        />
                                        {errors.Location && <p className="text-red-500 mt-2" role="alert">{errors.Location?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="Landmark" className="form-label">
                                                地目
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="Landmark"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("Landmark", { required: "この項目は必須です" })}
                                                aria-invalid={errors.Landmark ? "true" : "false"}
                                            />
                                            {errors.Landmark && <p className="text-red-500 mt-2" role="alert">{errors.Landmark?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="LandTitle" className="form-label">
                                            地権m2
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="LandTitle"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("LandTitle", { required: "この項目は必須です" })}
                                            aria-invalid={errors.LandTitle ? "true" : "false"}
                                        />
                                        {errors.LandTitle && <p className="text-red-500 mt-2" role="alert">{errors.LandTitle?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="RankNumber1" className="form-label">
                                                順位番号
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="RankNumber1"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("RankNumber1", { required: "この項目は必須です" })}
                                                aria-invalid={errors.RankNumber1 ? "true" : "false"}
                                            />
                                            {errors.RankNumber1 && <p className="text-red-500 mt-2" role="alert">{errors.RankNumber1?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="RankNumber2" className="form-label">
                                            順位番号
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="RankNumber2"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("RankNumber2", { required: "この項目は必須です" })}
                                            aria-invalid={errors.RankNumber2 ? "true" : "false"}
                                        />
                                        {errors.RankNumber2 && <p className="text-red-500 mt-2" role="alert">{errors.RankNumber2?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="Structure" className="form-label">
                                                構造
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="Structure"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("Structure", { required: "この項目は必須です" })}
                                                aria-invalid={errors.Structure ? "true" : "false"}
                                            />
                                            {errors.Structure && <p className="text-red-500 mt-2" role="alert">{errors.Structure?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="LandofRightSite" className="form-label">
                                            敷地権の地
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="LandofRightSite"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("LandofRightSite", { required: "この項目は必須です" })}
                                            aria-invalid={errors.LandofRightSite ? "true" : "false"}
                                        />
                                        {errors.LandofRightSite && <p className="text-red-500 mt-2" role="alert">{errors.LandofRightSite?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="RightofSIteRatio" className="form-label">
                                                敷地権の割合
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="RightofSIteRatio"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("RightofSIteRatio", { required: "この項目は必須です" })}
                                                aria-invalid={errors.RightofSIteRatio ? "true" : "false"}
                                            />
                                            {errors.RightofSIteRatio && <p className="text-red-500 mt-2" role="alert">{errors.RightofSIteRatio?.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="label w-full inline-block py-3">
                                <label className="form-label">
                                    2．固定資産税課税明細（固定資産税評価証明書）の情報の入力
                                </label>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="WhereAboutHouse" className="form-label">
                                                家屋の所在
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="WhereAboutHouse"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("WhereAboutHouse", { required: "この項目は必須です" })}
                                                aria-invalid={errors.WhereAboutHouse ? "true" : "false"}
                                            />
                                            {errors.WhereAboutHouse && <p className="text-red-500 mt-2" role="alert">{errors.WhereAboutHouse?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="PropertyNumber" className="form-label">
                                            物件号
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="PropertyNumber"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("PropertyNumber", { required: "この項目は必須です" })}
                                            aria-invalid={errors.PropertyNumber ? "true" : "false"}
                                        />
                                        {errors.PropertyNumber && <p className="text-red-500 mt-2" role="alert">{errors.PropertyNumber?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="ArchitecturalStudy" className="form-label">
                                                建築考次
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="ArchitecturalStudy"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("ArchitecturalStudy", { required: "この項目は必須です" })}
                                                aria-invalid={errors.ArchitecturalStudy ? "true" : "false"}
                                            />
                                            {errors.ArchitecturalStudy && <p className="text-red-500 mt-2" role="alert">{errors.ArchitecturalStudy?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="LandPrice" className="form-label">
                                            地価
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="LandPrice"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("LandPrice", { required: "この項目は必須です" })}
                                            aria-invalid={errors.LandPrice ? "true" : "false"}
                                        />
                                        {errors.LandPrice && <p className="text-red-500 mt-2" role="alert">{errors.LandPrice?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="OwnershipRatio" className="form-label">
                                            3．所有されていた物件に共有者はいましたか。
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="Yes" {...register("RadioBtn")} />
                                                Yes
                                            </div>
                                        </label>
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="No" {...register("RadioBtn")} />
                                                No
                                            </div>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <div className="flex justify-between items-center">
                                            <div><input
                                                type="text"
                                                id="OwnershipRatio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div>
                                                <span className="text-3xl text-gray-500">/</span>
                                            </div>
                                            <div><input
                                                type="text"
                                                id="Ratio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="label w-full inline-block">
                                    <label htmlFor="OwnershipRatio" className="form-label">
                                        4．所有されていた物件は相続開始時に賃貸されていましたか。
                                    </label>
                                </div>
                                <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <div className="w-full inline-block mt-2">
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="Yes" {...register("RadioBtn")} />
                                                Yes
                                            </div>
                                        </label>
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="No" {...register("RadioBtn")} />
                                                No
                                            </div>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <div className="flex justify-between items-center">
                                            <div><input
                                                type="text"
                                                id="OwnershipRatio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div>
                                                <span className="text-3xl text-gray-500">/</span>
                                            </div>
                                            <div><input
                                                type="text"
                                                id="Ratio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}


                    {ShowNo && (
                        <>
                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="WhereAbouts" className="form-label">
                                            所在
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="WhereAbouts"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("WhereAbouts", { required: "この項目は必須です" })}
                                            aria-invalid={errors.WhereAbouts ? "true" : "false"}
                                        />
                                        {errors.WhereAbouts && <p className="text-red-500 mt-2" role="alert">{errors.WhereAbouts?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="HouseNumber" className="form-label">
                                            家屋番号
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="HouseNumber"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("HouseNumber", { required: "この項目は必須です" })}
                                            aria-invalid={errors.HouseNumber ? "true" : "false"}
                                        />
                                        {errors.HouseNumber && <p className="text-red-500 mt-2" role="alert">{errors.HouseNumber?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="CommonHousing" className="form-label">
                                            共同住宅 類
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="CommonHousing"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("CommonHousing", { required: "この項目は必須です" })}
                                            aria-invalid={errors.CommonHousing ? "true" : "false"}
                                        />
                                        {errors.CommonHousing && <p className="text-red-500 mt-2" role="alert">{errors.CommonHousing?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="Structure" className="form-label">
                                                構造
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="Structure"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("Structure", { required: "この項目は必須です" })}
                                                aria-invalid={errors.Structure ? "true" : "false"}
                                            />
                                            {errors.Structure && <p className="text-red-500 mt-2" role="alert">{errors.Structure?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="FloorArea" className="form-label">
                                            床面積m2
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="FloorArea"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("FloorArea", { required: "この項目は必須です" })}
                                            aria-invalid={errors.FloorArea ? "true" : "false"}
                                        />
                                        {errors.FloorArea && <p className="text-red-500 mt-2" role="alert">{errors.FloorArea?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="label w-full inline-block py-3">
                                <label className="form-label">
                                    2．固定資産税課税明細（固定資産税評価証明書）の情報の入力
                                </label>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="WhereAboutHouse" className="form-label">
                                                家屋の所在
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="WhereAboutHouse"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("WhereAboutHouse", { required: "この項目は必須です" })}
                                                aria-invalid={errors.WhereAboutHouse ? "true" : "false"}
                                            />
                                            {errors.WhereAboutHouse && <p className="text-red-500 mt-2" role="alert">{errors.WhereAboutHouse?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="PropertyNumber" className="form-label">
                                            物件号
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="PropertyNumber"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("PropertyNumber", { required: "この項目は必須です" })}
                                            aria-invalid={errors.PropertyNumber ? "true" : "false"}
                                        />
                                        {errors.PropertyNumber && <p className="text-red-500 mt-2" role="alert">{errors.PropertyNumber?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="user-details">
                                        <div className="label w-full inline-block">
                                            <label htmlFor="ArchitecturalStudy" className="form-label">
                                                建築考次
                                            </label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="ArchitecturalStudy"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                {...register("ArchitecturalStudy", { required: "この項目は必須です" })}
                                                aria-invalid={errors.ArchitecturalStudy ? "true" : "false"}
                                            />
                                            {errors.ArchitecturalStudy && <p className="text-red-500 mt-2" role="alert">{errors.ArchitecturalStudy?.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="LandPrice" className="form-label">
                                            地価
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="LandPrice"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("LandPrice", { required: "この項目は必須です" })}
                                            aria-invalid={errors.LandPrice ? "true" : "false"}
                                        />
                                        {errors.LandPrice && <p className="text-red-500 mt-2" role="alert">{errors.LandPrice?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="OwnershipRatio" className="form-label">
                                            3．所有されていた物件に共有者はいましたか。
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="Yes" {...register("RadioBtn")} />
                                                Yes
                                            </div>
                                        </label>
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="No" {...register("RadioBtn")} />
                                                No
                                            </div>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <div className="flex justify-between items-center">
                                            <div><input
                                                type="text"
                                                id="OwnershipRatio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div>
                                                <span className="text-3xl text-gray-500">/</span>
                                            </div>
                                            <div><input
                                                type="text"
                                                id="Ratio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full block items-center justify-between mb-7">
                                <div className="label w-full inline-block">
                                    <label htmlFor="OwnershipRatio" className="form-label">
                                        4．所有されていた物件は相続開始時に賃貸されていましたか。
                                    </label>
                                </div>
                                <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <div className="w-full inline-block mt-2">
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="Yes" {...register("RadioBtn")} />
                                                Yes
                                            </div>
                                        </label>
                                        <label>
                                            <div>
                                                <input className="mr-1" type="radio" value="No" {...register("RadioBtn")} />
                                                No
                                            </div>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <div className="flex justify-between items-center">
                                            <div><input
                                                type="text"
                                                id="OwnershipRatio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div>
                                                <span className="text-3xl text-gray-500">/</span>
                                            </div>
                                            <div><input
                                                type="text"
                                                id="Ratio"
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
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
                        <BackButton />
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

LandAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};