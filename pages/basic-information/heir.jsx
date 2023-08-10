"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../components/inputbox-icon/textbox-postcode-icon";

export default function Heir() {
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
    const [TelephoneNumber, setTelephoneNumber] = useState("");

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
            TelephoneNumber: "",
        }
    });

    const ProfessionDropdownChange = (event) => {
        setProfession(event.target.value);
    };

    const RelationshipDropdownChange = (event) => {
        setRelationshipWithDecedent(event.target.value);
    }

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
                            被相続人
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
                                            {...register("Name", { required: "この項目は必須です" })}
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
                                            {...register("Furigana", { required: "この項目は必須です" })}
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
                                        {...register("DateofBirth", { required: "この項目は必須です" })}
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
                                        {...register("Address", { required: "この項目は必須です" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.Address && <p className="text-red-500" role="alert">{errors.Address?.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="TelephoneNumber" className="form-label">
                                        電話番号
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="TelephoneNumber"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("TelephoneNumber", { required: "この項目は必須です" })}
                                        aria-invalid={errors.TelephoneNumber ? "true" : "false"}
                                    />
                                    <div className="mt-3">
                                        <p className="text-xs text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                    </div>
                                    {errors.TelephoneNumber && <p className="text-red-500 mt-2" role="alert">{errors.TelephoneNumber?.message}</p>}
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
                                            <option value=''></option>
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
                                    <select name="relationship" id="relationship" className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                        <option value=''></option>
                                        <option value="夫"> 夫 </option>
                                        <option value="妻"> 妻 </option>
                                        <optgroup label="息子">
                                            <option value="長男">長男</option>
                                            <option value="二男">二男</option>
                                            <option value="三男">三男</option>
                                            <option value="四男">四男</option>
                                            <option value="五男">五男</option>
                                        </optgroup>
                                        <optgroup label="娘">
                                            <option value="長女">長女</option>
                                            <option value="二女">二女</option>
                                            <option value="三女">三女</option>
                                            <option value="四女">四女</option>
                                            <option value="五女">五女</option>
                                        </optgroup>
                                        <optgroup label="養子">
                                            <option value="養子">養子</option>
                                            <option value="孫養子">孫養子</option>
                                        </optgroup>
                                        <optgroup label="父母">
                                            <option value="父">父</option>
                                            <option value="母">母</option>
                                            <option value="養親">養親</option>
                                        </optgroup>
                                        <optgroup label="祖父母">
                                            <option value="祖父">祖父</option>
                                            <option value="祖母">祖母</option>
                                        </optgroup>
                                        <optgroup label="兄弟姉妹">
                                            <option value="兄">兄</option>
                                            <option value="弟">弟</option>
                                            <option value="姉">姉</option>
                                            <option value="妹">妹</option>
                                        </optgroup>
                                        <optgroup label="その他">
                                            <option value="甥">甥</option>
                                            <option value="姪">姪</option>
                                            <option value="孫">孫</option>
                                            <option value="その他">その他</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="w-full flex justify-evenly items-center py-5">
                            <BackButton />
                            <div className="save-btn text-center">
                                <button
                                    type="submit"
                                    className="bg-primary-color rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
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

Heir.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};