"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import SubmitButton from "../../components/submit-btn";
import PostcodeIcon from "../../components/inputbox-icon/textbox-postcode-icon";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function HeirEdit() {
    let ProfessionList = [
        { id: 1, value: '公務員', label: '公務員' },
        { id: 2, value: '会社役員', label: '会社役員' },
        { id: 3, value: '会社員（正社員）', label: '会社員（正社員）' },
        { id: 4, value: '会社員（契約社員/派遣社員）', label: '会社員（契約社員/派遣社員）' },
        { id: 5, value: '自営業/自由業', label: '自営業/自由業' },
        { id: 6, value: '学生', label: '学生' },
        { id: 7, value: 'パート/アルバイト', label: 'パート/アルバイト' },
        { id: 8, value: '主婦', label: '主婦' },
        { id: 9, value: 'その他', label: 'その他' },
        { id: 10, value: 'なし', label: 'なし' },
    ];

    let RelationshipWithDecedentList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    let [Name, setName] = useState("");
    let [Furigana, setFurigana] = useState("");
    let [DateofBirth, setDateofBirth] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [InheritanceDivisionCompletionDate, setInheritanceDivisionCompletionDate] = useState("");
    let [DateofDeath, setDateofDeath] = useState("");
    let [Profession, setProfession] = useState("");
    let [RelationshipWithDecedent, setRelationshipWithDecedent] = useState("");
    let [Address, setAddress] = useState("");
    let [TelephoneNumber, setTelephoneNumber] = useState("");

    //Input hide and show states
    let [ShowName, setShowName] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    let [ShowDisabledDeduction, setShowDisabledDeduction] = useState(false);
    let [ShowLegalHeir, setShowLegalHeir] = useState(false);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [totalPrice, settotalPrice] = useState(0);
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameError, setNameError] = useState(false);
    let [FuriganaError, setFuriganaError] = useState(false);
    let [DateofBirthError, setDateofBirthError] = useState(false);
    let [TelephoneNumberError, setTelephoneNumberError] = useState(false);
    let [ProfessionError, setProfessionError] = useState(false);
    let [RelationshipWithDecedentError, setRelationshipWithDecedentError] = useState(false);

    let [DisabledRadioValue, setDisabledRadioValue] = useState('none');
    let [LegalHeirRadioValue, setLegalHeirRadioValue] = useState('no');

    let router = useRouter();
    useEffect(() => {        
        const Edit_Id = router.query.Id;
        console.log('Edit_Id:', Edit_Id);
    }, []);

    //Disabled deduction radio button
    const handleDisabledRadio = (event) => {
        setDisabledRadioValue(event.target.value);        
    };

    //Legal heir radio button
    const handleLegalHeirRadio = (event) => {
        let radioValue = event.target.value;
        setLegalHeirRadioValue(radioValue);        
        if(radioValue === "Yes"){
            setShowDisabledDeduction(true);
        }
        else{
            setShowDisabledDeduction(false);
        }
    };


    const handleProfessionType = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        setProfession(selectedOption.text);
        setisSumbitDisabled(false);
    };

    const handleRelationshipWithDecedent = (event) => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = selectedOption.id;
        setRelationshipWithDecedent(selectedOption.text);
        setisSumbitDisabled(false);
        if (selectedId === "Disabled_deduction") {
            setShowDisabledDeduction(true);
            setShowLegalHeir(false);
        }
        else if (selectedId === "Legal_heir") {
            setShowDisabledDeduction(false);
            setShowLegalHeir(true);
        }
        else {
            setShowDisabledDeduction(false);
            setShowLegalHeir(false);
        }
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


    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "Name") {
            setName(inputValue);
            setNameError(false);
        }
        else if (inputId === "Furigana") {
            setFurigana(inputValue);
            setFuriganaError(false);
        }
        else if (inputId === "DateofBirth") {
            setDateofBirth(inputValue);
            setDateofBirthError(false);
        }
        else if (inputId === "TelephoneNumber") {
            setTelephoneNumber(inputValue);
            setTelephoneNumberError(false);
        }
        else {
            setAddress(inputValue);
        }
        setisSumbitDisabled(false);
    }

    //Submit API function 
    //const router = useRouter();
    const onSubmit = () => {
        let defaultValues = {
            Name: Name,
            Furigana: Furigana,
            DateofBirth: DateofBirth,
            PostCode: PostCode,
            Address: Address,
            TelephoneNumber: TelephoneNumber,
            Profession: Profession,
            RelationshipWithDecedent: RelationshipWithDecedent,
            InheritanceDivisionCompletionDate: InheritanceDivisionCompletionDate,
            DateofDeath: DateofDeath,
            DisabledRadioValue: DisabledRadioValue,
            LegalHeirRadioValue:LegalHeirRadioValue,
        }

        //input Validation
        if (defaultValues.Name === "") {
            setNameError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.Furigana === "") {
            setFuriganaError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DateofBirth === "") {
            setDateofBirthError(true);
            isSumbitDisabled = true;
        }        
        if (defaultValues.TelephoneNumber === "") {
            setTelephoneNumberError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.Profession === "") {
            setProfessionError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.RelationshipWithDecedent === "") {
            setRelationshipWithDecedentError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('Heir', JSON.stringify(defaultValues));
            router.push(`/basic-information/`);
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
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
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
                <div className="login-forms">
                    <form action="#" method="POST">
                        <div className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Name" className="form-label">
                                            お名前<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="Name"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            onChange={inputHandlingFunction}
                                            value={Name}
                                        />
                                        {NameError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="Furigana" className="form-label">
                                            フリガナ<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="Furigana"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            onChange={inputHandlingFunction}
                                            value={Furigana}
                                        />
                                        {FuriganaError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block float-left mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="DateofBirth" className="form-label">
                                        生年月日<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="DateofBirth"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-3"
                                        onChange={inputHandlingFunction}
                                        value={DateofBirth}
                                    />
                                    {DateofBirthError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
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
                                    <label className="form-label">
                                        住所
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Address"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={inputHandlingFunction}
                                        value={Address}
                                    />                                   
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        電話番号<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="TelephoneNumber"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onChange={inputHandlingFunction}
                                        onKeyPress={handleKeyPress}
                                        value={TelephoneNumber}
                                    />
                                    <div className="mt-3">
                                        <p className="text-xs text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                    </div>
                                    {TelephoneNumberError && (
                                        <p className="text-red-500 pt-3" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">
                                            職業<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleProfessionType}>
                                            <option value=''></option>
                                            {ProfessionList.map((option) => (
                                                <option key={option.value} value={option.id}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {ProfessionError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        被相続人との間柄<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select id="RelationshipWithDecedent" onChange={handleRelationshipWithDecedent} className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                        <option value=''></option>
                                        <option id="Disabled_deduction" value="夫"> 夫 </option>
                                        <option id="Disabled_deduction" value="妻"> 妻 </option>
                                        <optgroup label="息子">
                                            <option id="Disabled_deduction" value="長男">長男</option>
                                            <option id="Disabled_deduction" value="二男">二男</option>
                                            <option id="Disabled_deduction" value="三男">三男</option>
                                            <option id="Disabled_deduction" value="四男">四男</option>
                                            <option id="Disabled_deduction" value="五男">五男</option>
                                        </optgroup>
                                        <optgroup label="娘">
                                            <option id="Disabled_deduction" value="長女">長女</option>
                                            <option id="Disabled_deduction" value="二女">二女</option>
                                            <option id="Disabled_deduction" value="三女">三女</option>
                                            <option id="Disabled_deduction" value="四女">四女</option>
                                            <option id="Disabled_deduction" value="五女">五女</option>
                                        </optgroup>
                                        <optgroup label="養子">
                                            <option id="Legal_heir" value="養子">養子</option>
                                            <option id="Legal_heir" value="孫養子">孫養子</option>
                                        </optgroup>
                                        <optgroup label="父母">
                                            <option id="" value="父">父</option>
                                            <option id="" value="母">母</option>
                                            <option id="" value="養親">養親</option>
                                        </optgroup>
                                        <optgroup label="祖父母">
                                            <option id="" value="祖父">祖父</option>
                                            <option id="" value="祖母">祖母</option>
                                        </optgroup>
                                        <optgroup label="兄弟姉妹">
                                            <option id="" value="兄">兄</option>
                                            <option id="" value="弟">弟</option>
                                            <option id="" value="姉">姉</option>
                                            <option id="" value="妹">妹</option>
                                        </optgroup>
                                        <optgroup label="その他">
                                            <option id="" value="甥">甥</option>
                                            <option id="" value="姪">姪</option>
                                            <option id="Legal_heir" value="孫">孫</option>
                                            <option id="" value="その他">その他</option>
                                        </optgroup>
                                    </select>
                                    {RelationshipWithDecedentError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            {ShowDisabledDeduction && (
                                <>
                                    <FormControl>
                                        <label className="form-label" id="demo-row-radio-buttons-group-label">障害者控除</label>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={DisabledRadioValue}
                                        >
                                            <FormControlLabel value="None" control={<Radio />} onChange={handleDisabledRadio} label="なし" sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 16,
                                                },
                                            }} />
                                            <FormControlLabel value="General disabled" control={<Radio />} onChange={handleDisabledRadio} label="一般障害者" sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 16,
                                                },
                                            }} />
                                            <FormControlLabel value="Special handicapped" control={<Radio />} onChange={handleDisabledRadio} label="特別障害者" sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 16,
                                                },
                                            }} />
                                        </RadioGroup>
                                    </FormControl>

                                    <div className="legal-inheritance">
                                        <label className="form-label">法定相続分</label>
                                        <div className="w-full inline-block">
                                            <span className="text-2xl font-medium pt-5 text-black tracking-2">{1}/{2}_ _</span>
                                        </div>
                                    </div>
                                </>
                            )}
                            </div>
                            {ShowLegalHeir && (
                                <FormControl>
                                    <label className="form-label" id="demo-row-radio-buttons-group-label">法定相続人ですか？</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={LegalHeirRadioValue}
                                    >
                                        <FormControlLabel value="Yes" control={<Radio />} onChange={handleLegalHeirRadio} label="はい" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 16,
                                            },
                                        }} />
                                        <FormControlLabel value="No" control={<Radio />} onChange={handleLegalHeirRadio} label="いいえ" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 16,
                                            },
                                        }} />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        

                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center mt-10">
                            <BackButton />
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

HeirEdit.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};