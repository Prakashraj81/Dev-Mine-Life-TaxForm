"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../components/back-btn";

export default function Heir1() {

    const ProfessionList = [
        { value: '公務員', label: '公務員' },
        { value: '会社役員', label: '会社役員' },
        { value: '会社員（正社員）', label: '会社員（正社員）' },
        { value: '会社員（契約社員/派遣社員）', label: '会社員（契約社員/派遣社員）' },
        { value: '自営業/自由業', label: '自営業/自由業' },
        { value: '学生', label: '学生' },
        { value: 'パート/アルバイト', label: 'パート/アルバイト' },
        { value: '主婦', label: '主婦' },
        { value: 'その他', label: 'その他' },
        { value: 'なし', label: 'なし' },
    ];

    const RelationshipWithDecedentList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];


    const [Name, setName] = useState("");
    const [Furigana, setFurigana] = useState("");
    const [DateofBirth, setDateofBirth] = useState("");
    const [PostCode, setPostCode] = useState("");
    const [InheritanceDivisionCompletionDate, setInheritanceDivisionCompletionDate] = useState("");
    const [DateofDeath, setDateofDeath] = useState("");
    const [Profession, setProfession] = useState("");
    const [RelationshipWithDecedent, setRelationshipWithDecedent] = useState("");
    const [Address, setAddress] = useState("");
    const [RadioBtn, setRadioBtn] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            Name: "",
            Furigana: "",
            DateofBirth: "",
            PostCode: "",
            Address: "",
            Profession: "",
            RelationshipWithDecedent: "",
            InheritanceDivisionCompletionDate: "",
            DateofDeath: "",
            RadioBtn: "",
        }
    });

    const ProfessionDropdownChange = (event) => {
        setProfession(event.target.value);
    };

    const RelationshipDropdownChange = (event) => {
        setRelationshipWithDecedent(event.target.value);
    }


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.Name != "") {
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
            <div className="basic-information-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            相続人
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>
                <div className="login-forms">
                    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Name" className="form-label">
                                            お名前
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="Name"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("Name", { required: "Name is required" })}
                                            aria-invalid={errors.Name ? "true" : "false"}
                                        />
                                        {errors.Name && <p className="text-red-500" role="alert">{errors.Name?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Furigana" className="form-label">
                                            フリガナ
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="Furigana"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("Furigana", { required: "Furigana is required" })}
                                            aria-invalid={errors.Furigana ? "true" : "false"}
                                        />
                                        {errors.Furigana && <p className="text-red-500" role="alert">{errors.Furigana?.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block float-left mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="DateofBirth" className="form-label">
                                        生年月日
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="DateofBirth"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-3"
                                        {...register("DateofBirth", { required: "DateofBirth is required" })}
                                        aria-invalid={errors.DateofBirth ? "true" : "false"}
                                    />
                                    {errors.DateofBirth && <p className="text-red-500" role="alert">{errors.DateofBirth?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
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
                                    {errors.PostCode && <p className="text-red-500" role="alert">{errors.PostCode?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
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
                                        {...register("Address", { required: "Address is required" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.Address && <p className="text-red-500" role="alert">{errors.Address?.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Profession" className="form-label">
                                            職業
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={ProfessionDropdownChange}>
                                            <option value=''>Select an option</option>
                                            {ProfessionList.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="label w-full inline-block">
                                    <label htmlFor="RelationshipWithDecedent" className="form-label">
                                        被相続人との間柄
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={RelationshipDropdownChange}>
                                        <option value=''>Select an option</option>
                                        {RelationshipWithDecedentList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="InheritanceDivisionCompletionDate" className="form-label">
                                        遺産分割完了日
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="InheritanceDivisionCompletionDate"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-3"
                                        {...register("InheritanceDivisionCompletionDate", { required: "Inheritance division completion date is required" })}
                                        aria-invalid={errors.InheritanceDivisionCompletionDate ? "true" : "false"}
                                    />
                                    {errors.InheritanceDivisionCompletionDate && <p className="text-red-500" role="alert">{errors.InheritanceDivisionCompletionDate?.message}</p>}
                                </div>

                                <div className="mt-3">
                                    <p className="text-xs tracking-2 font-medium text-black">未確定の場合は仮で入力してください。後から修正可能です。</p>
                                </div>
                            </div>
                        </div>


                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    障害者控除
                                </label>
                            </div>
                            <div className="w-full flex justify-between items-center mt-2">
                                <label>
                                    <div>
                                        <input className="mr-1" type="radio" value="なし" {...register("RadioBtn")} />
                                        なし
                                    </div>
                                </label>
                                <label>
                                    <div>
                                        <input className="mr-1" type="radio" value="一般障害者" {...register("RadioBtn")} />
                                        一般障害者
                                    </div>
                                </label>
                                <label>
                                    <div>
                                        <input className="mr-1" type="radio" value="特別障害者" {...register("RadioBtn")} />
                                        特別障害者
                                    </div>
                                </label>
                            </div>
                        </div>


                        <div className="w-full flex justify-evenly items-center py-10">
                            <BackButton />
                            <div className="save-btn text-center">
                                <Link href="/">
                                    <button
                                        className="bg-primary-color rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                            保存して戻る
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}