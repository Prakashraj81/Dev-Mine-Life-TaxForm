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
    Select,
    MenuItem,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../components/back-btn";
import SubmitButton from "../../components/submit-btn";
import HeirListBox from "../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../components/heir-list-box/incorrect-error";
import FullLayout from '../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../components/loader/backdrop-loader';
import JapaneseCalendar from "../../components/inputbox-icon/japanese-calender";
import CustomInput from "../../components/inputbox-icon/custom-input";
import CustomPostalcodeInput from "../../components/inputbox-icon/custom-postalcode-input";
import CustomPhoneInput from "../../components/inputbox-icon/custom-phone-input";
import { keyframes } from "@mui/system";

// Define the shake keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export default function Heir() {
    let router = useRouter();
    let propName = router.query.heirNo;

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

    let [HeirId, setHeirId] = useState(0);
    let [Name, setName] = useState("");
    let [Furigana, setFurigana] = useState("");
    let [DateofBirth, setDateofBirth] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [InheritanceBoxisionCompletionDate, setInheritanceBoxisionCompletionDate] = useState("");
    let [DateofDeath, setDateofDeath] = useState("");
    let [Profession, setProfession] = useState("");
    let [RelationshipWithDecedent, setRelationshipWithDecedent] = useState("");
    let [Address, setAddress] = useState("");
    let [TelephoneNumber, setTelephoneNumber] = useState("");
    let [HeirCount, setHeirCount] = useState(0);
    let [WhereTaxReturn, setWhereTaxReturn] = useState("");

    //Input hide and show states
    let [ShowName, setShowName] = useState(false);
    let [ShowPostCode, setShowPostCode] = useState(false);
    let [ShowAddress, setShowAddress] = useState(false);
    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [totalPrice, settotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameError, setNameError] = useState(false);
    let [KatakanaError, setKatakanaError] = useState(false);
    let [FuriganaError, setFuriganaError] = useState(false);
    let [DateofBirthError, setDateofBirthError] = useState(false);
    let [TelephoneNumberError, setTelephoneNumberError] = useState(false);
    let [RelationshipWithDecedentError, setRelationshipWithDecedentError] = useState(false);
    let [WhereTaxReturnError, setWhereTaxReturnError] = useState(false);
    let [DisabledRadioValue, setDisabledRadioValue] = useState('None');
    let [TaxAdditionAmount, setTaxAdditionAmount] = useState('No');
    let [LegalHeirRadioValue, setLegalHeirRadioValue] = useState('No');
    let [is_legal_heir, setis_legal_heir] = useState(0);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);

    //Disabled deduction radio button
    const handleDisabledRadio = (event) => {
        setDisabledRadioValue(event.target.value);
    };

    //20% inheritance tax amount addition
    const handleTaxAdditionAmount = (event) => {
        setTaxAdditionAmount(event.target.value);
    }

    const handleRelationshipWithDecedent = (event) => {
        let selectedValue = event.target.value;        
        setRelationshipWithDecedent(selectedValue);
        setisSumbitDisabled(false);
        setRelationshipWithDecedentError(false);
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
        else if (inputId === "TelephoneNumber") {
            setTelephoneNumber(inputValue);
            setTelephoneNumberError(false);
        }
        else if (inputId === "Profession") {
            setProfession(inputValue);
        }
        else {
            setAddress(inputValue);
        }
        setisSumbitDisabled(false);
    };


    useEffect(() => {
        GetHeirList();
    }, []);


    //Load heir details list
    const GetHeirList = async () => {
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        let editId = searchParams.get("editId");
        HeirId = Number(atob(editId));
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', { params });
                if (response.status === 200) {
                    setHeirCount(response.data.heir_list.length);
                    for (let i = 0; i < response.data.heir_list.length; i++) {
                        if (response.data.heir_list[i].heir_id === HeirId) {
                            setHeirId(response.data.heir_list[i].heir_id);
                            setName(response.data.heir_list[i].name);
                            setFurigana(response.data.heir_list[i].furigana);
                            setDateofBirth(response.data.heir_list[i].date_of_birth);
                            setPostCode(response.data.heir_list[i].postal_code);
                            setTelephoneNumber(response.data.heir_list[i].phone);
                            setAddress(response.data.heir_list[i].address);
                            setProfession(response.data.heir_list[i].profession);
                            setRelationshipWithDecedent(response.data.heir_list[i].relationship_with_decedent);
                            setDisabledRadioValue(response.data.heir_list[i].disabled_deduction);
                        }
                    }
                }
                else {
                    setHeirCount(0);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            //Logout();
        }
    };



    //Submit API function     
    let defaultValues = {};
    const onSubmit = async () => {
        //Id = Number(atob(router.query.Id));
        defaultValues = {
            HeirId: HeirId,
            Name: Name,
            Furigana: Furigana,
            DateofBirth: DateofBirth,
            PostCode: PostCode,
            Address: Address,
            TelephoneNumber: TelephoneNumber,
            Profession: Profession,
            RelationshipWithDecedent: RelationshipWithDecedent,
            InheritanceBoxisionCompletionDate: InheritanceBoxisionCompletionDate,
            DisabledRadioValue: DisabledRadioValue,
            TaxAdditionAmount: TaxAdditionAmount,
            LegalHeirRadioValue: LegalHeirRadioValue,
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
        if (defaultValues.TelephoneNumber === "") {
            setTelephoneNumberError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.RelationshipWithDecedent === "") {
            setRelationshipWithDecedentError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", HeirId);
            formData.append("name", Name);
            formData.append("furigana", Furigana);
            formData.append("date_of_birth", DateofBirth);
            formData.append("postal_code", PostCode);
            formData.append("address", Address);
            formData.append("phone", TelephoneNumber);
            formData.append("profession", Profession);
            formData.append("relationship_with_decedent", RelationshipWithDecedent);
            formData.append("disabled_deduction", DisabledRadioValue);
            //formData.append("TaxAdditionAmount", TaxAdditionAmount);
            formData.append("is_legal_heir", is_legal_heir);
            if (formData !== null && auth_key !== null) {
                try {
                    //setShowLoader(true);
                    let response = "";
                    if (HeirId === 0) {
                        response = await axios.post('https://minelife-api.azurewebsites.net/add_heir', formData);
                    } else {
                        response = await axios.post('https://minelife-api.azurewebsites.net/edit_heir', formData);
                    }
                    if (response.status === 200) {
                        router.push(`/basic-information`);
                    }
                    setShowLoader(false);
                } catch (error) {
                    setShowLoader(false);
                    if(error.response.data.error.message === "Heir Already Exist"){
                        alert(error.response.data.error.message);
                    }
                }
            } else {
                setisSumbitDisabled(true);
            }
        }
        else {
            setisSumbitDisabled(true);
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
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            相続人 {HeirCount + 1}
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>
                <Box className="login-forms">
                    <form action="#" method="POST">
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
                                            <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
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
                                            <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">カタカナのみを気にしてください。</Typography>
                                        )}
                                        {FuriganaError && (
                                            <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
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
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
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
                                    <Typography component={"p"} className="text-sm text-black tracking-2 font-medium">ハイフン抜きで入力してください</Typography>
                                </Box>
                                {!isValid && <Typography component={"p"}>数字7桁で入力して下さい。海外の場合は入力不要です。</Typography>}
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

                        <Box className="w-full block items-center justify-between mb-3 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        電話番号<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <CustomPhoneInput type={"text"} id={"TelephoneNumber"} onChange={inputHandlingFunction} onKeyPress={handleKeyPress} value={TelephoneNumber} error={TelephoneNumberError} />
                                    <Box className="mt-3">
                                        <Typography component={"p"} fontSize={12} className="text-xs text-black tracking-2 font-medium">ハイフン抜きで入力してください</Typography>
                                    </Box>
                                    {TelephoneNumberError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500 pt-3" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>


                        <Box className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <Box className="user-details">
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

                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        被相続人との続柄<i className="text-red-500">*</i>
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2">
                                    <FormControl
                                        variant="outlined"
                                        className='form-control w-full bg-custom-gray focus:outline-none rounded px-3 py-3 h-12'
                                        sx={{ width: "100%" }}
                                    >                                        
                                        <Select
                                            id={"RelationshipWithDecedent"}
                                            value={RelationshipWithDecedent}
                                            onChange={handleRelationshipWithDecedent}
                                            input={
                                                <OutlinedInput
                                                    sx={{
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                          border: 'none',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                          border: 'none',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                          border: 'none',
                                                        },
                                                        '& .MuiSelect-root': {
                                                          padding: '16px',
                                                          height: '1em',
                                                        },
                                                        border: RelationshipWithDecedentError ? '1px solid red' : 'none',
                                                        animation: RelationshipWithDecedentError ? `${shake} 0.5s` : 'none',
                                                    }}                                                    
                                                />
                                            }
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem value="夫" id="Disabled_deduction">夫</MenuItem>
                                            <MenuItem value="妻" id="Disabled_deduction">妻</MenuItem>
                                            <MenuItem disabled><em>息子</em></MenuItem>
                                            <MenuItem value="長男" id="Legal_heir">長男</MenuItem>
                                            <MenuItem value="二男" id="Legal_heir">二男</MenuItem>
                                            <MenuItem value="三男" id="Legal_heir">三男</MenuItem>
                                            <MenuItem value="四男" id="Legal_heir">四男</MenuItem>
                                            <MenuItem value="五男" id="Legal_heir">五男</MenuItem>
                                            <MenuItem disabled><em>娘</em></MenuItem>
                                            <MenuItem value="長女" id="Disabled_deduction">長女</MenuItem>
                                            <MenuItem value="二女" id="Disabled_deduction">二女</MenuItem>
                                            <MenuItem value="三女" id="Disabled_deduction">三女</MenuItem>
                                            <MenuItem value="四女" id="Disabled_deduction">四女</MenuItem>
                                            <MenuItem value="五女" id="Disabled_deduction">五女</MenuItem>
                                            <MenuItem disabled><em>養子</em></MenuItem>
                                            <MenuItem value="養子" id="Legal_heir_adopt">養子</MenuItem>
                                            <MenuItem value="孫養子" id="Legal_heir_adopt">孫養子</MenuItem>
                                            <MenuItem disabled><em>父母</em></MenuItem>
                                            <MenuItem value="父">父</MenuItem>
                                            <MenuItem value="母">母</MenuItem>
                                            <MenuItem value="養親">養親</MenuItem>
                                            <MenuItem disabled><em>祖父母</em></MenuItem>
                                            <MenuItem value="祖父">祖父</MenuItem>
                                            <MenuItem value="祖母">祖母</MenuItem>
                                            <MenuItem disabled><em>兄弟姉妹</em></MenuItem>
                                            <MenuItem value="兄">兄</MenuItem>
                                            <MenuItem value="弟">弟</MenuItem>
                                            <MenuItem value="姉">姉</MenuItem>
                                            <MenuItem value="妹">妹</MenuItem>
                                            <MenuItem disabled><em>その他</em></MenuItem>
                                            <MenuItem value="甥" id="Legal_heir">甥</MenuItem>
                                            <MenuItem value="姪" id="Legal_heir">姪</MenuItem>
                                            <MenuItem value="孫" id="Legal_heir">孫</MenuItem>
                                            <MenuItem value="配偶者" id="Legal_heir">配偶者</MenuItem>
                                            <MenuItem value="孫" id="Legal_heir">孫</MenuItem>
                                            <MenuItem value="兄弟姉妹" id="Legal_heir">兄弟姉妹</MenuItem>
                                            <MenuItem value="父母" id="Legal_heir">父母</MenuItem>
                                            <MenuItem value="おい・めい" id="Legal_heir">おい・めい</MenuItem>
                                            <MenuItem value="その他" id="Legal_heir">その他</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {RelationshipWithDecedentError && (
                                        <Typography component={"p"} fontSize={14} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="legal-inheritance w-full inline-block float-left mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <Box className="w-full flex items-center justify-start">
                                <Typography component={"label"} className="form-label pr-3">法定相続分</Typography>
                                <input
                                    type="text"
                                    value={"1"}
                                    disabled
                                    className="form-control text-left w-10 bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                <span className="text-gray text-2xl">/</span>
                                <input
                                    type="text"
                                    value={"1" ? HeirCount + 1 : "_ _"}
                                    disabled
                                    className="form-control text-left w-10 bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                            </Box>
                            <Box className="mt-2">
                                <Typography target="_blank" component={Link} href={"https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4132.htm"} fontSize={12}>こちらをクリック: <span className="text-blue-600 underline underline-offset-2">法定相続分</span></Typography>
                            </Box>
                        </Box>

                        <Box className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <FormControl>
                                    <Typography component={"label"} className="form-label" id="demo-row-radio-buttons-group-label">障害者控除</Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={DisabledRadioValue}
                                    >
                                        <FormControlLabel value="None" control={<Radio />} onChange={handleDisabledRadio} label="なし" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 14,
                                            },
                                        }} />
                                        <FormControlLabel value="General disabled" control={<Radio />} onChange={handleDisabledRadio} label="一般障害者" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 14,
                                            },
                                        }} />
                                        <FormControlLabel value="Special handicapped" control={<Radio />} onChange={handleDisabledRadio} label="特別障害者" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 14,
                                            },
                                        }} />
                                    </RadioGroup>
                                    <Box className="mt-2">
                                        <Typography target="_blank" component={Link} href={"https://www.nta.go.jp/publication/pamph/koho/kurashi/html/03_2.htm"} fontSize={12}>こちらをクリック: <span className="text-blue-600 underline underline-offset-2">障害者控除</span></Typography>
                                    </Box>
                                </FormControl>
                            </Box>
                        </Box>


                        <Box className="w-full block mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <FormControl>
                                <Typography component={"label"} className="form-label" id="demo-row-radio-buttons-group-label">相続税額の2割加算の対象ですか？</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={TaxAdditionAmount}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} onChange={handleTaxAdditionAmount} label="Yes" sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 14,
                                        },
                                    }} />
                                    <FormControlLabel value="No" control={<Radio />} onChange={handleTaxAdditionAmount} label="No" sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 14,
                                        },
                                    }} />
                                </RadioGroup>
                                <Box className="mt-2">
                                    <Typography target="_blank" component={Link} href={"https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4157.htm"} fontSize={12}>こちらをクリック: <span className="text-blue-600 underline underline-offset-2">相続税額の2割加算の対象ですか</span></Typography>
                                </Box>
                            </FormControl>
                        </Box>

                        <Box className="w-full hidden items-center justify-between mb-7">
                            <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <Box className="label w-full inline-block">
                                    <Typography component={"label"} className="form-label">
                                        申告書を提出した税務署
                                    </Typography>
                                </Box>
                                <Box className="w-full inline-block mt-2 relative">
                                    <CustomInput type={"text"} id={"WhereTaxReturn"} onChange={inputHandlingFunction} value={WhereTaxReturn} />
                                    {WhereTaxReturnError && (
                                        <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

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

Heir.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};