"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../components/back-btn";
import SubmitButton from "../../components/submit-btn";
import HeirListBox from "../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../components/heir-list-box/incorrect-error";
import FullLayout from '../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../components/loader/backdrop-loader';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import JapaneseCalendar from "../../components/inputbox-icon/japanese-calender";

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
    let [InheritanceDivisionCompletionDate, setInheritanceDivisionCompletionDate] = useState("");
    let [DateofDeath, setDateofDeath] = useState("");
    let [Profession, setProfession] = useState("");
    let [RelationshipWithDecedent, setRelationshipWithDecedent] = useState("");
    let [Address, setAddress] = useState("");
    let [TelephoneNumber, setTelephoneNumber] = useState("");
    let [HeirCount, setHeirCount] = useState(0);

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
    const handleTaxAdditionAmount = (event) =>{
        setTaxAdditionAmount(event.target.value);
    }    

    const handleRelationshipWithDecedent = (event) => {
        let selectedValue = event.target.value;
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = selectedOption.id;
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
        if(text !== ""){
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
    const GetHeirList = async() => {        
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        let editId = searchParams.get("editId");
        HeirId = Number(atob(editId));
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if(auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', {params});
                if(response.status === 200){
                    setHeirCount(response.data.heir_list.length);
                    for(let i = 0; i < response.data.heir_list.length; i ++){
                        if(response.data.heir_list[i].heir_id === HeirId){
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
                else{
                    setHeirCount(0);
                }
            }catch (error){
                console.error('Error:', error);
            }
        }  
        else{
            //Logout();
        }      
    };



    //Submit API function     
    let defaultValues = {};
    const onSubmit = async() => {
        //Id = Number(atob(router.query.Id));
        defaultValues = {
            HeirId : HeirId,
            Name: Name,
            Furigana: Furigana,
            DateofBirth: DateofBirth,
            PostCode: PostCode,
            Address: Address,
            TelephoneNumber: TelephoneNumber,
            Profession: Profession,
            RelationshipWithDecedent: RelationshipWithDecedent,
            InheritanceDivisionCompletionDate: InheritanceDivisionCompletionDate,
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
        if(defaultValues.Furigana !== ""){
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
            let auth_key = atob(sessionStorage.getItem("auth_key"));
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
                    setShowLoader(true);
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
                    console.error('Error:', error);
                }
            } else {
                console.log("API not allowed");
                setisSumbitDisabled(true);
            }
        }
        else {
            console.log("API not allowed");
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
            <div className="basic-information-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            相続人 {propName}
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
                                        {KatakanaError && (
                                            <p className="text-red-500" role="alert">カタカナのみを気にしてください。</p>
                                        )}
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
                                    <JapaneseCalendar id={"DateofBirth"} DateValue={DateofBirth} inputHandlingFunction={inputHandlingFunction}/>
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
                                            職業
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="Profession"
                                            onChange={inputHandlingFunction}
                                            value={Profession}
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        被相続人との続柄<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select id="RelationshipWithDecedent" value={RelationshipWithDecedent} onChange={handleRelationshipWithDecedent} className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                        <option value='' id=""></option>
                                        <option id="Disabled_deduction" value="夫"> 夫 </option>
                                        <option id="Disabled_deduction" value="妻"> 妻 </option>
                                        <optgroup label="息子">
                                            <option id="Legal_heir" value="長男">長男</option>
                                            <option id="Legal_heir" value="二男">二男</option>
                                            <option id="Legal_heir" value="三男">三男</option>
                                            <option id="Legal_heir" value="四男">四男</option>
                                            <option id="Legal_heir" value="五男">五男</option>
                                        </optgroup>
                                        <optgroup label="娘">
                                            <option id="Disabled_deduction" value="長女">長女</option>
                                            <option id="Disabled_deduction" value="二女">二女</option>
                                            <option id="Disabled_deduction" value="三女">三女</option>
                                            <option id="Disabled_deduction" value="四女">四女</option>
                                            <option id="Disabled_deduction" value="五女">五女</option>
                                        </optgroup>
                                        <optgroup label="養子">
                                            <option id="Legal_heir_adopt" value="養子">養子</option>
                                            <option id="Legal_heir_adopt" value="孫養子">孫養子</option>
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
                                            <option id="Legal_heir" value="甥">甥</option>
                                            <option id="Legal_heir" value="姪">姪</option>
                                            <option id="Legal_heir" value="孫">孫</option>
                                            <option id="Legal_heir" value="配偶者">配偶者</option>
                                            <option id="Legal_heir" value="孫">孫</option>
                                            <option id="Legal_heir" value="兄弟姉妹">兄弟姉妹</option>
                                            <option id="Legal_heir" value="父母">父母</option>
                                            <option id="Legal_heir" value="おい・めい">おい・めい</option>
                                            <option id="Legal_heir" value="その他">その他</option>
                                        </optgroup>
                                    </select>
                                    {RelationshipWithDecedentError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        
                        <div className="w-full block lg:flex xl:flex 2xl:flex items-center justify-between mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
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
                            </div>                                                              

                            <div className="legal-inheritance w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-3 lg:mb-0 xl:mb-0 2xl:mb-0">
                                
                                <div className="w-full flex items-center justify-start">
                                    <label className="form-label pr-3">法定相続分</label>
                                    <input
                                        type="text"
                                        value={"1"}
                                        disabled
                                        className="form-control text-right w-25 bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    />
                                    <span className="text-gray text-2xl">/</span>
                                    <input
                                        type="text"                                            
                                        value={"1" ? HeirCount+1 : "_ _"}
                                        disabled
                                        className="form-control text-right w-25 bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    />
                                </div>
                            </div>                            
                        </div>
                            
                         <div className="w-full block mb-0 lg:mb-7 xl:mb-7 2xl:mb-7">
                            <FormControl>
                                <label className="form-label" id="demo-row-radio-buttons-group-label">相続税額の2割加算の対象ですか？</label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={TaxAdditionAmount}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} onChange={handleTaxAdditionAmount} label="Yes" sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 16,
                                        },
                                    }} />                                            
                                    <FormControlLabel value="No" control={<Radio />} onChange={handleTaxAdditionAmount} label="No" sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 16,
                                        },
                                    }} />
                                </RadioGroup>
                            </FormControl>
                         </div>

                        <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                            <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                                <BackButton />
                                <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
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