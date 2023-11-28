"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import StepForm from "./stepper";
import BackdropLoader from '../../../components/loader/backdrop-loader';

export default function SuccessiveInheritanceAdd() {
    let AmountGiftList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [NameofDecedent, setNameofDecedent] = useState("");
    const [RelationshipDecedent, setRelationshipDecedent] = useState("");
    const [OccurrenceDate, setOccurrenceDate] = useState("");
    const [AmountGiftType, setAmountGiftType] = useState("");
    const [AssetValue, setAssetValue] = useState("");
    const [InheritanceTax, setInheritanceTax] = useState("");

    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [NameofDecedentError, setNameofDecedentError] = useState(false);
    let [RelationshipDecedentError, setRelationshipDecedentError] = useState(false);
    let [OccurrenceDateError, setOccurrenceDateError] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);
    let [InputFocus, setInputFocus] = useState(false);
    let [activeStep, setActiveStep] = useState(0);
    let [StepOne, setStepOne] = useState(true);
    let [StepTwo, setStepTwo] = useState(false);
    let [StepThree, setStepThree] = useState(false);
    let [PrevButton, setPrevButton] = useState(true);
    let [submitTitle, setsubmitTitle] = useState("Next");
    let [PageValidation, setPageValidation] = useState(false);  


    //Stepper "Next" function
    let handleNext = () => {
       setActiveStep((prev) => prev + 1);
       if(activeStep === 0){
           activeStep = 1;
           setStepOne(false);
           setStepTwo(true);
           setStepThree(false);
           setPrevButton(false);
           setShowLoader(false);
       }
       else if(activeStep === 1){
           activeStep = 2;
           setStepOne(false);
           setStepTwo(false);
           setStepThree(true);
           setPrevButton(false);
           setsubmitTitle("保存");
           setShowLoader(false);
       }
       else {
           setShowLoader(false);   
           setPageValidation(true);  
           PageValidation = true;
           SubmitFinalFunction(PageValidation); 
       }
    }
    //Stepper "Back" function
    let handleBack = () => {                
       setActiveStep((prev) => prev - 1);
       if(activeStep === 0 || activeStep < 0){
           activeStep = 0;
           setStepOne(true);
           setStepTwo(false);
           setStepThree(false);
           setPrevButton(false);
           setShowLoader(false);
       }
       else if(activeStep === 1){
           activeStep = 0;
           setStepOne(true);
           setStepTwo(false);
           setStepThree(false);
           setPrevButton(true);
           setsubmitTitle("Next");
           setShowLoader(false);
       }
       else if(activeStep === 2){
           activeStep = 1;
           setStepOne(false);
           setStepTwo(true);
           setStepThree(false);
           setPrevButton(false);
           setsubmitTitle("Next");
           setShowLoader(false);
       }
       else {
           setShowLoader(false);            
       }
    }     

    const handleDropdownChange = (event) => {
        setAmountGiftType(event.target.value);
    };


    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "NameofDecedent") {
            setNameofDecedent(inputValue);
            setNameofDecedentError(false);
        }
        else if (inputId === "RelationshipDecedent") {
            setRelationshipDecedent(inputValue);
        }
        else if (inputId === "OccurrenceDate") {
            setOccurrenceDate(inputValue);
            setOccurrenceDateError(false);
        }
        else if (inputId === "AssetValue") {
            setAssetValue(inputValue);
        }
        else {
            setInheritanceTax(inputValue);
        }
        setisSumbitDisabled(false);
    }


    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = () => {
        defaultValues = {
            NameofDecedent: NameofDecedent,
            RelationshipDecedent: RelationshipDecedent,
            OccurrenceDate: OccurrenceDate,
            AmountGiftType: AmountGiftType,
            AssetValue: AssetValue,
            InheritanceTax: InheritanceTax,           
        };

        //input Validation
        if (defaultValues.NameofDecedent === "") {
            setNameofDecedentError(true);
            isSumbitDisabled = true;
        }       
        //Api setup
        if (isSumbitDisabled !== true) {
            handleNext();              
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    };

    const SubmitFinalFunction = (PageValidation) => {
        if(PageValidation === true){
            console.log("API allowed");
            sessionStorage.setItem('SuccessiveInheritance', JSON.stringify(defaultValues));
            router.push(`/gift-various/successive-inheritance`);
        }    
        else{
            setPageValidation(false);
        }      
    }
    return (
        <>
        <>
        {ShowLoader && (
            <BackdropLoader ShowLoader={ShowLoader} />
        )}
        </>
            <div className="top-stepper-sec max-w-screen-md mx-auto pt-0 py-10">
                <StepForm handleBack={handleBack} activeStep={activeStep} handleNext={handleNext} />
            </div>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            相次相続控除1
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
                        {StepOne && (
                            <>
                            <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="NameofDecedent" className="form-label">
                                            前相続の被相続人氏名<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="NameofDecedent"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                            
                                            onChange={inputHandlingFunction}
                                        />                                        
                                    </div>
                                    {NameofDecedentError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="RelationshipDecedent" className="form-label">
                                        今回の被相続人と前回の被相続人の間柄
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="RelationshipDecedent"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                        
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="OccurrenceDate" className="form-label">
                                            前相続の発生日<i className="text-red-500">*</i>
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="date"
                                            id="OccurrenceDate"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                            
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="AmountGiftType" className="form-label">
                                    相続税申告書の提出先
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleDropdownChange}>
                                        <option value=''></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="AssetValue" className="w-full inline-block mt-1 form-label">
                                        今回の被相続人が前相続において取得した財
                                    </label>
                                    <label htmlFor="AssetValue" className="w-full inline-block mt-1 form-label">
                                        産額（相続時精算課税適用財産含む）
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="AssetValue"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                  
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="InheritanceTax" className="w-full inline-block mt-1 form-label">
                                        前相続で今回の被相続人が支払った相続税額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="InheritanceTax"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"                                        
                                    />
                                </div>
                            </div>
                        </div>
                            </>
                        )}



                        {StepTwo && (
                            <>
                            <Fragment>
                                <List disablePadding>
                                    <ListItem>
                                    <ListItemText primary="前相続の被相続人氏名" secondary={NameofDecedent ? NameofDecedent : "提供されていない"} />
                                    {NameofDecedent ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"NameofDecedent"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />   

                                    <ListItem>
                                    <ListItemText primary="今回の被相続人と前回の被相続人の間柄" secondary={OccurrenceDate ? OccurrenceDate : "提供されていない"} />
                                    {OccurrenceDate ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"OccurrenceDate"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />   

                                    <ListItem>
                                    <ListItemText primary="前相続の発生日" secondary={RelationshipDecedent ? RelationshipDecedent : "提供されていない"} />
                                    {RelationshipDecedent ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"RelationshipDecedent"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />   

                                    <ListItem>
                                    <ListItemText primary="相続税申告書の提出先" secondary={AmountGiftType ? AmountGiftType : "提供されていない"} />
                                    {AmountGiftType ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"AmountGiftType"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />   

                                    <ListItem>
                                    <ListItemText primary="今回の被相続人が前相続において取得した財産額（相続時精算課税適用財産含む）" secondary={AssetValue ? AssetValue : "提供されていない"} />
                                    {AssetValue ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"AssetValue"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />   

                                    <ListItem>
                                    <ListItemText primary="前相続で今回の被相続人が支払った相続税額" secondary={InheritanceTax ? InheritanceTax : "提供されていない"} />
                                    {InheritanceTax ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"InheritanceTax"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />                                                                        
                                </List>      
                            </Fragment>
                            </>
                        )}

                        {StepThree && (
                            <>
                            <Box className="py-7">
                            <Typography variant="h4" className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium" align="center">
                                ありがとう！
                            </Typography>
                            <Typography component="p" align="center" className="pt-7 text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                                相次相続控除 詳細は正常に保存されました...
                            </Typography>
                            </Box>                           
                            </>
                        )}

                        <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            {StepThree ? <></> : 
                            <>
                            {PrevButton ? <BackButton /> : 
                            <>
                            <button
                                type='button'
                                onClick={handleBack}
                                className="bg-return-bg rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                戻る
                                </span>
                            </button>
                            </>
                            }
                            </>
                            }                            
                            <SubmitButton title={submitTitle} onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </div>

                        {StepThree || StepTwo ? <></> : 
                        <div className="heading text-center pt-8">
                            <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                        </div>
                        }                        
                        </div>   
                   </form>
                </div>
            </div>
        </>
    )
}

SuccessiveInheritanceAdd.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};