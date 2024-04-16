"use client";
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
import UnitPriceIcon from "../../../components/inputbox-icon/textbox-unitprice-icon";

export default function LivingDonationAdd() {

    let [HeirList, setHeirList] = useState([]);
    let [HeirId, setHeirId] = useState(0); 
    let [NameofthePerson, setNameofthePerson] = useState("");
    let [DateOfDonation, setDateOfDonation] = useState("");
    let [DonatedPropertyType, setDonatedPropertyType] = useState("");
    let [DonatedPropertyDetail, setDonatedPropertyDetail] = useState("");
    let [DonatedPropertyAmount, setDonatedPropertyAmount] = useState("0");
    let [DonatedPropertyAmountTax, setDonatedPropertyAmountTax] = useState("0");
    let [WhereTaxReturn, setWhereTaxReturn] = useState(""); 

    //Error state and button disabled
    let [HeirListTypeError, setHeirListTypeError] = useState(false);
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [NameofthePersonError, setNameofthePersonError] = useState(false);
    let [DateOfDonationError, setDateOfDonationError] = useState(false);
    let [DonatedPropertyTypeError, setDonatedPropertyTypeError] = useState(false);
    let [DonatedPropertyDetailError, setDonatedPropertyDetailError] = useState(false);
    let [DonatedPropertyAmountError, setDonatedPropertyAmountError] = useState(false);
    let [DonatedPropertyAmountTaxError, setDonatedPropertyAmountTaxError] = useState(false);
    let [WhereTaxReturnError, setWhereTaxReturnError] = useState(false);   
    
    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let LivingDonationId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if(searchParams !== null){
            LivingDonationId = Number(atob(searchParams));
            //GetLivingDonationDetails(LivingDonationId);
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

    
    //Load living donation details 
    const GetLivingDonationDetails = async(LivingDonationId) => {       
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = {auth_key: auth_key, id: LivingDonationId };
        if(auth_key !== null && LivingDonationId !== 0){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_other_assets_details', {params});
                if(response.status === 200){                    
                    setPropertyName(response.data.other_assets_details.property_name); 
                    setOtherParty(response.data.other_assets_details.other_party);
                    setValuation(response.data.other_assets_details.valuation.toLocaleString());                                                      
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
    
    const handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };       

    const DonatedPropertyAmountKeyPress = (e) => {        
        let valuation = e.target.value;
        valuation = valuation.replace(/,/g, '').replace('.', '');
        valuation = parseFloat(valuation);
        valuation = valuation.toLocaleString();
        if (valuation === "NaN") {
            setDonatedPropertyAmount(0);
        }
        else {
            setDonatedPropertyAmountError(false);
            setDonatedPropertyAmount(valuation);
        }
        setisSumbitDisabled(false);
    } 

    const DonatedPropertyAmountTaxKeyPress = (e) => {        
        let valuation = e.target.value;
        valuation = valuation.replace(/,/g, '').replace('.', '');
        valuation = parseFloat(valuation);
        valuation = valuation.toLocaleString();
        if (valuation === "NaN") {
            setDonatedPropertyAmountTax(0);
        }
        else {
            setDonatedPropertyAmountTaxError(false);
            setDonatedPropertyAmountTax(valuation);
        }
        setisSumbitDisabled(false);
    } 

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "PropertyName") {
            setPropertyName(inputValue);
            setPropertyNameError(false);
        }
        else if(inputId === "OtherParty"){
            setOtherParty(inputValue);
        }
        else if (inputId === "DateofAcquisition") {
            setDateofAcquisition(inputValue);
            setDateofAcquisitionError(false);
        }       
        else {
            setAddress(inputValue);
            setAddressError(false);
        }
        setisSumbitDisabled(false);
    }


    
    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async() => {
        defaultValues = {
            NameofthePerson: NameofthePerson,
            DateOfDonation: DateOfDonation,
            DonatedPropertyType: DonatedPropertyType,
            DonatedPropertyDetail: DonatedPropertyDetail,
            DonatedPropertyAmount: DonatedPropertyAmount,
            DonatedPropertyAmountTax: DonatedPropertyAmountTax,
            WhereTaxReturn: WhereTaxReturn
        }

        //input Validation        
        if (defaultValues.NameofthePerson === "") {
            setNameofthePersonError(true);
            setHeirListTypeError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DateOfDonation === "") {
            setDateOfDonationError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyType === "") {
            setDonatedPropertyTypeError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyDetail === "") {
            setDonatedPropertyDetailError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyAmount === "0") {
            setDonatedPropertyAmountError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.DonatedPropertyAmountTax === "0") {
            setDonatedPropertyAmountTaxError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.WhereTaxReturn === "") {
            setWhereTaxReturnError(true);
            isSumbitDisabled = true;
        }
        //Api setup
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        if (isSumbitDisabled !== true && auth_key !== null) {     
            let response = "";
            let LivingDonationId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if(searchParams !== null){
                LivingDonationId = Number(atob(searchParams));
            }              
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", LivingDonationId);
            //formData.append("NameofthePerson", NameofthePerson);            
            //formData.append("DateOfDonation", DateOfDonation);
            //formData.append("DonatedPropertyType", DonatedPropertyType);
            //formData.append("DonatedPropertyDetail", DonatedPropertyDetail);
            //formData.append("DonatedPropertyAmount", DonatedPropertyAmount);
            //Valuation = Valuation.replace(/,/g, '').replace('.', '');
            //formData.append("valuation", parseFloat(Valuation));
            //formData.append("DonatedPropertyAmountTax", DonatedPropertyAmountTax);
            //formData.append("WhereTaxReturn", WhereTaxReturn);            
            try{
                if(LivingDonationId === 0){
                    //response = await axios.post('https://minelife-api.azurewebsites.net/add_other_assets', formData);
                }
                else{
                    //response = await axios.post('https://minelife-api.azurewebsites.net/edit_other_assets', formData);
                }               
                if(response.status === 200){
                    router.push(`/declaration-printing/living-donation`); 
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
           
            <div className="other-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            Living donation 1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>

                <form action="#" method="POST">       
                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与を受けた方の氏名<i className="text-red-500">*</i>
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

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与年月日<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="date"
                                    id="DateOfDonation"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={DateOfDonation}                                  
                                />   
                                {DateOfDonationError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}                       
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与財産の種類<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    id="DonatedPropertyDetail"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={DonatedPropertyDetail}                                    
                                />   
                                {DonatedPropertyTypeError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}                                
                            </div>
                        </div>
                    </div>                    
                    
                   
                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与財産の詳細<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="DonatedPropertyDetail"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={DonatedPropertyDetail}
                                />      
                                {DonatedPropertyDetailError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}                              
                            </div>
                        </div>
                    </div>    

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与財産の金額<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    id="DonatedPropertyAmount"
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    onChange={DonatedPropertyAmountKeyPress}
                                    onKeyPress={handleKeyPress}
                                    value={DonatedPropertyAmount}
                                    autocomplete="off"                                        
                                />
                                <UnitPriceIcon />       
                                {DonatedPropertyAmountError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}                           
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    納付した贈与税額<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    id="DonatedPropertyAmountTax"
                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    onChange={DonatedPropertyAmountTaxKeyPress}
                                    onKeyPress={handleKeyPress}
                                    value={DonatedPropertyAmountTax}
                                    autocomplete="off"                                        
                                />
                                <UnitPriceIcon />
                                {DonatedPropertyAmountTaxError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}
                            </div>
                        </div>
                    </div>   

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    申告書を提出した税務署<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <input
                                    type="text"
                                    id="WhereTaxReturn"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    onChange={inputHandlingFunction}
                                    value={WhereTaxReturn}                                   
                                />    
                                {WhereTaxReturnError && (
                                    <p className="text-red-500" role="alert">この項目は必須です</p>
                                )}                            
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
        </>
    )
}

LivingDonationAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};