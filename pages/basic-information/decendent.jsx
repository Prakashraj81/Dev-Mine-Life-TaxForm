"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepButton,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../components/back-btn";
import SubmitButton from "../../components/submit-btn";
import HeirListBox from "../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../components/heir-list-box/incorrect-error";
import FullLayout from '../../components/layouts/full/FullLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';
import JapaneseCalendar from "../../components/inputbox-icon/japanese-calender";
import CustomInput from "../../components/inputbox-icon/custom-input";
import CustomPostalcodeInput from "../../components/inputbox-icon/custom-postalcode-input";
import CustomPhoneInput from "../../components/inputbox-icon/custom-phone-input";

export default function Decendent() {

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

    let [Id, setId] = useState(0);
    let [Name, setName] = useState("");
    let [Furigana, setFurigana] = useState("");
    let [DateofBirth, setDateofBirth] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [InheritanceBoxisionCompletionDate, setInheritanceBoxisionCompletionDate] = useState("");
    let [DateofDeath, setDateofDeath] = useState("");
    let [Profession, setProfession] = useState("");
    let [WheretoSubmitReturn, setWheretoSubmitReturn] = useState("");
    let [isErrorVisible, setErrorVisible] = useState(false);
    let [DecendentList, setDecendentList] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameError, setNameError] = useState(false);
    let [KatakanaError, setKatakanaError] = useState(false);
    let [FuriganaError, setFuriganaError] = useState(false);
    let [DateofBirthError, setDateofBirthError] = useState(false);
    let [DateofDeathError, setDateofDeathError] = useState(false);
    let [InheritanceBoxisionCompletionDateError, setInheritanceBoxisionCompletionDateError] = useState(false);
    let [isClearable, setIsClearable] = useState(true);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);


    //Disabled deduction radio button
    const handleDisabledRadio = (event) => {
        setDisabledRadioValue(event.target.value);
    };

    //Legal heir radio button
    const handleLegalHeirRadio = (event) => {
        let radioValue = event.target.value;
        setLegalHeirRadioValue(radioValue);
        if (radioValue === "Yes") {
            setShowDisabledDeduction(true);
        }
        else {
            setShowDisabledDeduction(false);
        }
    };

    const handleProfessionType = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = ProfessionList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);
        setProfession(selectedValue);
        setisSumbitDisabled(false);
    };

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

    function validateForm(name) {
        var name = document.forms["myForm"]["name"].value;
        var pattern = /([\u4e00-\u9faf]+|[あ-ん]+|[ア-ン]+)+((\s|　)([\u4e00-\u9faf]+|[‌​あ-ん]+|[ア-ン]+)+)+/i;
        if (pattern.test(name) == false) {
            return false;
        }
        else {
            return true;
        }
    };

    // Regular expression to match Katakana characters validate
    const validateKatakana = (text) => {
        if (text !== "") {
            const katakanaRegex = /^[\u30A0-\u30FF]+$/;
            if (!katakanaRegex.test(text)) {
                return "Please enter only Katakana characters.";
            }
            return null;
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
            const errorMessage = validateKatakana(inputValue);
            if (errorMessage === null) {
                setKatakanaError(false);
            } else {
                setFuriganaError(false);
                setKatakanaError(true);
            }
            setFurigana(inputValue);
        }
        else if (inputId === "DateofBirth") {
            setDateofBirth(inputValue);
            setDateofBirthError(false);
        }
        else if (inputId === "DateofDeath") {
            setDateofDeath(inputValue);
            setDateofDeathError(false);
        }
        else if (inputId === "InheritanceBoxisionCompletionDate") {
            setInheritanceBoxisionCompletionDate(inputValue);
            setInheritanceBoxisionCompletionDateError(false);
        }
        else if (inputId === "Profession") {
            setProfession(inputValue);
        }
        else if (inputId === "WheretoSubmitReturn") {
            setWheretoSubmitReturn(inputValue);
        }
        else {
            setAddress(inputValue);
        }
        setisSumbitDisabled(false);
    }


    const goToPreviousPage = () => {
        router.back(); // This navigates to the previous page
    };


    //Submit API function 
    let router = useRouter();
    let defaultValues = {};
    const onSubmit = async () => {
        //Id = Number(router.query.Id);
        Id = Number(atob(router.query.Id));
        defaultValues = {
            Id: Id,
            Name: Name,
            Furigana: Furigana,
            DateofBirth: DateofBirth,
            PostCode: PostCode,
            Address: Address,
            Profession: Profession,
            DateofDeath: DateofDeath,
            WheretoSubmitReturn: WheretoSubmitReturn,
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
        if (defaultValues.Furigana !== "") {
            const errorMessage = validateKatakana(defaultValues.Furigana);
            if (errorMessage === null) {
                setKatakanaError(false);
            } else {
                setKatakanaError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.DateofBirth === "") {
            setDateofBirthError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DateofDeath === "") {
            setDateofDeathError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            setShowLoader(true);
            let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("decedent_id", Id);
            formData.append("name", Name);
            formData.append("furigana", Furigana);
            formData.append("date_of_birth", DateofBirth);
            formData.append("postal_code", PostCode);
            formData.append("address", Address);
            formData.append("profession", Profession);
            formData.append("date_of_death", DateofDeath);
            //formData.append("completion_date", "completion_date");
            formData.append("declaration_location", WheretoSubmitReturn);
            if (formData !== null && auth_key !== null) {
                try {
                    var response = "";
                    if (Id !== 0) {
                        response = await axios.post('https://minelife-api.azurewebsites.net/edit_decedent', formData);
                    } else {
                        response = await axios.post('https://minelife-api.azurewebsites.net/add_decedent', formData);
                    }
                    if (response.status === 200) {
                        setShowLoader(false);
                        router.push(`/basic-information`);
                    }
                } catch (error) {
                    setShowLoader(false);
                    console.error('Error:', error);
                }
            }
            else {
                setisSumbitDisabled(true);
            }
        }
        else {
            setisSumbitDisabled(true);
        }
    };



    useEffect(() => {
        GetDecendentList();
    }, []);


    //Load decendent details list
    const GetDecendentList = async () => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/decedent_detail', { params });
                if (response.status === 200) {
                    setDecendentList(response.data);
                    //setId(response.data.decedent_id);
                    setName(response.data.name);
                    setFurigana(response.data.furigana);
                    setDateofBirth(response.data.date_of_birth);
                    setPostCode(response.data.postal_code);
                    setAddress(response.data.address);
                    setProfession(response.data.profession);
                    setDateofDeath(response.data.date_of_death);
                    setWheretoSubmitReturn(response.data.declaration_location);
                }
                else {
                    setDecendentList([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            //Logout();
        }
    };




    return (
        <>
            <>
                {ShowLoader && (
                    <BackdropLoader ShowLoader={ShowLoader} />
                )}
            </>
            <Box className="basic-information-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            被相続人
                        </p>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </Box>
                <Box className="user-forms">
                    <form action="#" method="POST">
                        <>
                            <Box className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                    <Box className="user-details">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} htmlFor="Name" className="form-label">
                                                お名前<i className="text-red-500">*</i>
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <CustomInput type={"text"} id={"Name"} onChange={inputHandlingFunction} value={Name} error={NameError} />
                                            {NameError && (
                                                <p className="text-red-500" role="alert">この項目は必須です</p>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                    <Box className="user-details">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} htmlFor="Furigana" className="form-label">
                                                フリガナ<i className="text-red-500">*</i>
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <CustomInput type={"text"} id={"Furigana"} onChange={inputHandlingFunction} value={Furigana} error={FuriganaError} />
                                            {KatakanaError && (
                                                <p className="text-red-500" role="alert">カタカナのみを気にしてください。</p>
                                            )}
                                            {FuriganaError && (
                                                <p className="text-red-500" role="alert">この項目は必須です</p>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full inline-block float-left mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} htmlFor="DateofBirth" className="form-label">
                                            生年月日<i className="text-red-500">*</i>
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <JapaneseCalendar id={"DateofBirth"} DateValue={DateofBirth} inputHandlingFunction={inputHandlingFunction} error={DateofBirthError} />
                                        {DateofBirthError && (
                                            <p className="text-red-500" role="alert">この項目は必須です</p>
                                        )}
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label">
                                            郵便番号
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2 relative">
                                        <CustomPostalcodeInput type={"text"} id={"PostCode"} onChange={postalcodeDigit} onKeyPress={handleKeyPress} value={PostCode} />
                                    </Box>
                                    <Box className="mt-3">
                                        <p className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</p>
                                    </Box>
                                    {!isValid && <p>数字7桁で入力して下さい。海外の場合は入力不要です。</p>}
                                </Box>
                            </Box>

                            <Box className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="user-details">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label">
                                            住所
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <CustomInput type={"text"} id={"Address"} onChange={inputHandlingFunction} value={Address} />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full inline-block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label">
                                            職業
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <CustomInput type={"text"} id={"Profession"} onChange={inputHandlingFunction} value={Profession} />
                                    </Box>
                                </Box>
                            </Box>



                            <Box className="w-full inline-block mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                    <Box className="user-details">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label">
                                                お亡くなりになった日
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <JapaneseCalendar id={"DateofDeath"} DateValue={DateofDeath} inputHandlingFunction={inputHandlingFunction} />
                                            {DateofDeathError && (
                                                <p className="text-red-500" role="alert">この項目は必須です</p>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full inline-block mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                    <Box className="user-details">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label">
                                                申告書の提出先
                                            </Typography>
                                            <span className="text-xs tracking-2 leading-7 text-custom-black py-1 w-full inline-block">被相続人の住所を管轄する税務署</span>
                                        </Box>
                                        <Box className="w-full relative inline-block mt-2">
                                            <CustomInput type={"text"} id={"WheretoSubmitReturn"} onChange={inputHandlingFunction} value={WheretoSubmitReturn} />
                                            <Typography component={"span"} fontSize={14} className="absolute right-0 top-0 bg-input-color text-black rounded-r p-3.5 text-sm">
                                                税務署
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </>

                        <Box className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                            <Box className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                                <BackButton />
                                <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}

Decendent.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};