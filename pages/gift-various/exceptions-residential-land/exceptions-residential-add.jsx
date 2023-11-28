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

export default function ExceptionsResidentialAdd() {
    let DepositList = [
        
    ];
    const [ResidentialLandType, setResidentialLandType] = useState("");
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
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

    const handleResidentialLandType = (event) => {
        setResidentialLandType(event.target.value);
    };


    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = () => {
        defaultValues = {
            ResidentialLandType: ResidentialLandType,            
        };

        //input Validation
        if (defaultValues.ResidentialLandType === "") {
            isSumbitDisabled = false;
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
            sessionStorage.setItem('ExceptionsResidentialLand', JSON.stringify(defaultValues));
            router.push(`/gift-various/exceptions-residential-land`);
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
                            小規模宅地の特例1
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
                            <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Deposit" className="form-label">
                                        小規模宅地の特例を適用する土地
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleResidentialLandType}>
                                        <option value='' id='0'></option>
                                        {DepositList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="SamllResidentialLand" className="w-full inline-block form-label">
                                        小規模宅地等の種類
                                    </label>   
                                    <label htmlFor="ReductionRate" className="w-full inline-block form-label mt-2">
                                        減額割合:
                                    </label>                                 
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
                                    <ListItemText primary="小規模宅地の特例を適用する土地" secondary={ResidentialLandType ? ResidentialLandType : "提供されていない"} />
                                    {ResidentialLandType ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"ResidentialLandType"}  onClick={handleBack}/>
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
                                小規模宅地の特例 詳細は正常に保存されました...
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

ExceptionsResidentialAdd.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};