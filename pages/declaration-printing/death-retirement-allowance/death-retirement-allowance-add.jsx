import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../../components/loader/backdrop-loader';
import JapaneseCalendar from "../../../components/inputbox-icon/japanese-calender";

export default function DeathRetirementAllowanceAdd() {  
    let [HeirList, setHeirList] = useState([]);
    let [HeirId, setHeirId] = useState(0);  
    let [NameoftheCompany, setNameoftheCompany] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [Address, setAddress] = useState("");
    let [NameofRetirementAllowance, setNameofRetirementAllowance] = useState("");
    let [DateofReceipt, setDateofReceipt] = useState("");
    let [AmountReceived, setAmountReceived] = useState("0");
    let [HeirListType, setHeirListType] = useState("");

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [TotalPrice, setTotalPrice] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameoftheCompanyError, setNameoftheCompanyError] = useState(false);
    let [AddressError, setAddressError] = useState(false);
    let [DateofReceiptError, setDateofReceiptError] = useState(false);
    let [HeirListTypeError, setHeirListTypeError] = useState(false);

    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);
    
    useEffect(() => {
        let deathRetirementId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if(searchParams !== null){
            deathRetirementId = Number(atob(searchParams));
            GetDeathRetirementList(deathRetirementId);
        }

        GetHeirList();
    }, []);

    //Load heir details list
    const GetHeirList = async() => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if(auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', {params});
                if(response.status === 200){
                    setHeirList(response.data.heir_list || []);
                }
                else{
                    setHeirList([]);
                }
            }catch (error){
                console.error('Error:', error);
            }
        }  
        else{
            //Logout();
        }      
    };
    
    //Load cash savings details    
    const GetDeathRetirementList = async(deathRetirementId) => {       
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = {auth_key: auth_key, id: deathRetirementId };
        if(auth_key !== null && deathRetirementId !== 0){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_death_retirement_details', {params});
                if(response.status === 200){                    
                    setNameoftheCompany(response.data.death_retirements_details.name_of_work_company); 
                    setPostCode(response.data.death_retirements_details.postal_code);
                    setAddress(response.data.death_retirements_details.address);  
                    //setNameofRetirementAllowance();
                    setDateofReceipt(response.data.death_retirements_details.receipt_date);   
                    setHeirId(response.data.death_retirements_details.person_being_photographed);                
                    setAmountReceived(response.data.death_retirements_details.amount.toLocaleString());                                                      
                }
                else{

                }
            }catch (error){
                console.error('Error:', error);
            }
        }  
        else{
            //Logout();
        }      
    };

    const handleChangeHeir = () => {
        let selectedOption = event.target.options[event.target.selectedIndex];
        let selectedId = Number(selectedOption.value);
        setisSumbitDisabled(false);
        setShowIncorrectError(false);            
        setHeirListTypeError(false);
        setHeirId(selectedId);    
    }

    const AmountReceivedKeyPress = (e) => {
        let amount_of_money = e.target.value;
        amount_of_money = amount_of_money.replace(/,/g, '').replace('.', '');
        amount_of_money = parseFloat(amount_of_money);
        amount_of_money = amount_of_money.toLocaleString();
        if (amount_of_money === "NaN") {
            setAmountReceived(0);
        }
        else {
            setAmountReceived(amount_of_money);
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

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "NameoftheCompany") {
            setNameoftheCompany(inputValue);
            setNameoftheCompanyError(false);
        }
        else if (inputId === "DateofReceipt") {
            setDateofReceipt(inputValue);
            setDateofReceiptError(false);
        }
        else if(inputId === "NameofRetirementAllowance"){
            setNameofRetirementAllowance(inputValue);
        }
        else {
            setAddress(inputValue);
            setAddressError(false);
        }
        setisSumbitDisabled(false);
    }

    //Footer box values and calculation
    let handleBoxValueChange = (e, index) => {
        let newValue = parseFloat(e.target.value);
        if (isNaN(newValue)) {
            newValue = 0;
        }
        const updatedBoxValues = [...boxValues];
        updatedBoxValues[index] = newValue;
        setBoxValues(updatedBoxValues);

        //Amount of money convert
        if (AmountReceived == 0) {
            AmountReceived = 0;
        }
        else {            
            AmountReceived = parseFloat(AmountReceived.replace(/,/g, '').replace('.', ''));            
        }
        let totalBoxValues = updatedBoxValues.reduce((total, value) => total + value, 0);
        if (isNaN(totalBoxValues)) {
            totalBoxValues = 0;
        }
        let heirValue = AmountReceived - totalBoxValues;
        if (heirValue < 0) {
            setUndecidedHeir(heirValue.toLocaleString());
            setShowIncorrectError(true);
        }
        else {
            setShowIncorrectError(false);
            setUndecidedHeir(heirValue.toLocaleString());
        }
    };

    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async() => {
        defaultValues = {
            NameoftheCompany: NameoftheCompany,
            PostCode: PostCode,
            Address: Address,
            NameofRetirementAllowance: NameofRetirementAllowance,
            DateofReceipt: DateofReceipt,
            AmountReceived: AmountReceived,
            HeirListType: HeirListType,
            HeirId: HeirId,
            UndecidedHeir: UndecidedHeir,
            TotalPrice: AmountReceived,
        };

        //input Validation
        if (defaultValues.NameoftheCompany === "") {
            setNameoftheCompanyError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.Address === "") {
            setAddressError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.HeirId === 0) {
            setHeirListTypeError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {     
            let response = "";
            let deathRetirementId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if(searchParams !== null){
                deathRetirementId = Number(atob(searchParams));
            }              
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", deathRetirementId);
            formData.append("name_of_work_company", NameoftheCompany);            
            formData.append("address", Address);    
            //formData.append("NameofRetirementAllowance", NameofRetirementAllowance);        
            formData.append("postal_code", PostCode);
            formData.append("receipt_date", DateofReceipt);
            formData.append("heir_id", HeirId);
            AmountReceived = AmountReceived.replace(/,/g, '').replace('.', '');
            formData.append("amount_received", parseFloat(AmountReceived));
            try{
                if(deathRetirementId === 0){
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_death_retirement', formData);
                }
                else{
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_death_retirement', formData);
                }               
                if(response.status === 200){
                    router.push(`/declaration-printing/death-retirement-allowance`); 
                }                
            }catch(error){
                console.log('Error:', error);
            }
        }
        else {
            setisSumbitDisabled(true);
            setShowLoader(false);
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
            
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            死亡退職金等1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
                <div className="w-full inline-block">
                    <form action="#" method="POST">
                        
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="NameoftheCompany" className="form-label">
                                        勤務先会社等の名称<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="NameoftheCompany"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                        
                                        onChange={inputHandlingFunction}
                                        value={NameoftheCompany}
                                    />
                                    {NameoftheCompanyError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Location" className="form-label">
                                        勤務先会社等の所在地（郵便番号）
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

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        勤務先会社等の所在地（住所）<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Address"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        onKeyPress={handleKeyPress}
                                        onChange={inputHandlingFunction}
                                        value={Address}
                                    />
                                    {AddressError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="NameoftheCompany" className="form-label">
                                        退職手当金などの名称
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="NameofRetirementAllowance"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                        
                                        onChange={inputHandlingFunction}
                                        value={NameofRetirementAllowance}
                                    />                                    
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-7">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        受取年月日<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">                                    
                                    <JapaneseCalendar id={"DateofReceipt"} DateValue={DateofReceipt} inputHandlingFunction={inputHandlingFunction}/>
                                    {DateofReceiptError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>
                        </div>



                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    受け取った相続人<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select id="HeirListType" value={HeirId} onChange={handleChangeHeir} className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                    <option value='' id="0"></option>
                                    {HeirList.map((option) => (
                                        <option key={option.heir_id} value={option.heir_id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                {HeirListTypeError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>




                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        受け取った金額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="AmountReceived"
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        value={AmountReceived}
                                        onChange={AmountReceivedKeyPress}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton/>              
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </div>                                           
                        </div>     
                   </form>
                </div>
            </div>
        </>
    )
}


DeathRetirementAllowanceAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};