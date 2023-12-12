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
import FloorIcon from "../../../components/inputbox-icon/textbox-floor-icon";
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function HouseAdd() {
    let [BuildingRadioValue, setBuildingRadioValue] = useState('');
    let [ShowYes, setShowYes] = useState(false);
    let [ShowNo, setShowNo] = useState(false);

    //Input states "Yes"
    let [LocationYes, setLocationYes] = useState('');
    let [BuildingNameYes, setBuildingNameYes] = useState('');
    let [StructureYes, setStructureYes] = useState('');
    let [FloorAreaYes, setFloorAreaYes] = useState('');
    let [LocationLotNumberYes, setLocationLotNumberYes] = useState('');
    let [GroundGrainYes, setGroundGrainYes] = useState('');
    let [LandAreaYes, setLandAreaYes] = useState('');
    let [HouseNumberYes, setHouseNumberYes] = useState('');
    let [KindsYes, setKindsYes] = useState('');
    let [StructureOneYes, setStructureOneYes] = useState('');
    let [FloorAreaOneYes, setFloorAreaOneYes] = useState('');
    let [TypesofSiteRightsYes, setTypesofSiteRightsYes] = useState('');
    let [PercentageofSiteRightsYes, setPercentageofSiteRightsYes] = useState('');

    //Input states "No"
    let [LocationNo, setLocationNo] = useState('');
    let [HouseNumberNo, setHouseNumberNo] = useState('');
    let [KindsNo, setKindsNo] = useState('');
    let [StructureNo, setStructureNo] = useState('');
    let [FloorAreaNo, setFloorAreaNo] = useState(0); 

    //Question Two
    let [LocationoftheHouse, setLocationoftheHouse] = useState('');
    let [HouseNumberTwo, setHouseNumberTwo] = useState(''); 
    let [TypeApplication, setTypeApplication] = useState(''); 
    let [Price, setPrice] = useState(0); 

    //Question Three
    let [SharePercentage, setSharePercentage] = useState(''); 

    let [BuildingYesImage, setBuildingYesImage] = useState(false);
    let [BuildingNoImage, setBuildingNoImage] = useState(false);

    let [QuestionThree, setQuestionThree] = useState('');
    let [ShowYesOption3, setShowYesOption3] = useState(false);
    let [ShowNoOption3, setShowNoOption3] = useState(false);

    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [totalPrice, settotalPrice] = useState(0);
    let [boxValues, setBoxValues] = useState([]);    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
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

        //Input keypress
        let handleKeyPress = (e) => {
            const keyCode = e.keyCode || e.which;
            const keyValue = String.fromCharCode(keyCode);
            const numericRegex = /^[0-9\b]+$/;
            if (!numericRegex.test(keyValue)) {
                e.preventDefault();
            }
        };  

    //Radio button
    const handleRadio = (event) => {
        let radioValue = event.target.value;
        setBuildingRadioValue(radioValue);
        if (radioValue === "Yes") {
            setBuildingYesImage(true);
            setBuildingNoImage(false);
            setShowYes(true);
            setShowNo(false);
        }
        else {
            setBuildingYesImage(false);
            setBuildingNoImage(true);
            setShowYes(false);
            setShowNo(true);
        }
    };

    //Question three
    const handleQuestionThree = (event) => {
        let radioValue = event.target.value;
        setQuestionThree(radioValue);
        if (radioValue === "Yes") {
            setShowYesOption3(true);
            setShowNoOption3(false);
        }
        else {
            setShowYesOption3(false);
            setShowNoOption3(true);
        }
    };


    const handleBoxValueChange = (e, index) => {
        setBoxValues([0]);
        let newValue = parseFloat(e.target.value);
        let updatedBoxValues = [...boxValues];
        updatedBoxValues[index] = isNaN(newValue) ? 0 : newValue;
        updatedBoxValues = updatedBoxValues.map((value) => (value === undefined ? 0 : value));
        setBoxValues(updatedBoxValues);

        //Amount of money convert
        if (AmountofMoney == 0) {
            AmountofMoney = 0;
        }
        else {
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            AmountofMoney = parseFloat(AmountofMoney);
        }
        let totalBoxValues = updatedBoxValues.reduce((total, value) => total + value, 0);
        totalBoxValues = isNaN(totalBoxValues) ? 0 : totalBoxValues;
        let heirValue = AmountofMoney - totalBoxValues;
        if (heirValue < 0) {
            setUndecidedHeir(heirValue.toLocaleString());
            setShowIncorrectError(true);
        }
        else {
            setShowIncorrectError(false);
            setUndecidedHeir(heirValue.toLocaleString());
        }
    };



    const inputHandlingFunction = () => {

    }


    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = () => {
        // defaultValues = {
        //     NameofLifeInsurance: NameofLifeInsurance,
        //     PostCode: PostCode,
        //     Address: Address,
        //     Valuation: Valuation,
        //     UndecidedHeir: UndecidedHeir,
        //     TotalPrice: Valuation,
        // };

        // //input Validation
        // if (defaultValues.NameofLifeInsurance === "") {
        //     setNameofLifeInsuranceError(true);
        //     isSumbitDisabled = true;
        // }
        // if (defaultValues.Address === "") {
        //     setAddressError(true);
        //     isSumbitDisabled = true;
        // }
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
            sessionStorage.setItem('DeathBenefit', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/building`);
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
    
            <div className="house-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家屋1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
               

                <form action="#" method="POST">
                    {StepOne && (
                        <>
                        <FormControl>
                        <label className="form-label text-lg" id="demo-row-radio-buttons-group-label">1. 被相続人が所有されていた不動産は分譲マンションの１室でしょうか。</label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={BuildingRadioValue}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} onChange={handleRadio} label="はい" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                            <FormControlLabel value="No" control={<Radio />} onChange={handleRadio} label="いいえ" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                        </RadioGroup>
                    </FormControl>
                    <div className="w-full inline-block mb-7">
                    {BuildingYesImage && (
                        <img src="/screenshots/building-yes.png" className="w-full" alt="image" height={500} width={200} />
                    )}  
                    {BuildingNoImage && (
                        <img src="/screenshots/building-no.png" className="w-full" alt="image" height={500} width={200} />
                    )}                     
                </div>

                    <div className="w-full inline-block py-3">
                        <label>登記簿謄本の情報の入力</label>
                    </div>
                    {ShowYes && (
                        <>
                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">1</div>所在</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="LocationYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">2</div>建物の名称</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="BuildingNameYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">3</div>構造</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="StructureYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">4</div>床面積m²</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="FloorAreaYes"
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">5</div>所在及び地番</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="LocationLotNumberYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">6</div>地目</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="GroundGrainYes"
                                            onChange={inputHandlingFunction}
                                        />                                        
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">7</div>地積㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="LandAreaYes"
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">8</div>家屋番号</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="HouseNumberYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">9</div>種類</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="KindsYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">10</div>構造</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="StructureOneYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">11</div>床面積 ㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="FloorAreaOneYes"
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon/>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">12</div>敷地権の種類</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="TypesofSiteRightsYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full inline-block mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">13</div>敷地権の割合</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                            <div className="flex justify-between items-center">
                                                <div><input
                                                    type="text"
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></div>
                                                <div>
                                                    <span className="text-3xl text-gray-500">/</span>
                                                </div>
                                                <div><input
                                                    type="text"
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></div>
                                            </div>
                                        </div>
                                    <div className="w-full hidden mt-2">
                                        <input
                                            type="text"                                            
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="PercentageofSiteRightsYes"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>                                
                            </div>
                        </>
                    )}
                    {ShowNo && (
                        <>
                        <div className="w-full flex items-center justify-between pt-5 mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">1</div>所在</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="LocationNo"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">2</div>家屋番号</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="HouseNumberNo"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">3</div>種類</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="KindsNo"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">4</div>構造</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="StructureNo"
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">5</div>床面積 ㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="FloorAreaNo"
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon/>
                                    </div>
                                </div>                                
                            </div>
                        </>
                    )}

                <div className="mb-7">
                    <label className="form-label text-lg mb-7">2. 固定資産税課税明細（固定資産税評価証明書）の情報の入力</label>
                    <div className="w-full inline-block mt-5 mb-7">
                        <img src="/screenshots/building-second.png" className="w-full" alt="image" height={500} width={50} />                    
                    </div>
                    <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">1</div>家屋の所在</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">2</div>家屋番号</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">3</div>種類・用途</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">4</div>価格</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>
                            </div>
                </div>

                <div className="mb-7">
                    <FormControl>
                        <label className="form-label text-lg" id="demo-row-radio-buttons-group-label">3. 所有されていた物件に共有者はいましたか。</label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={QuestionThree}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} onChange={handleQuestionThree} label="はい" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                            <FormControlLabel value="No" control={<Radio />} onChange={handleQuestionThree} label="いいえ" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                        </RadioGroup>
                    </FormControl>
                    {ShowYesOption3 && (
                        <>
                        <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">共有割合の入力</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <div className="flex justify-between items-center">
                                    <div><input
                                        type="text"
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                    <div>
                                        <span className="text-3xl text-gray-500">/</span>
                                    </div>
                                    <div><input
                                        type="text"                                        
                                        className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </>
                    )}
                    {ShowNoOption3 && (
                        <></>
                    )}
                </div>
                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-16">
                                <div className="label w-full inline-block">
                                    <label className="form-label text-lg" htmlFor="Valuation">
                                       4. 評価額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Valuation"
                                        // value={Valuation}
                                        // onChange={ValuationKeyPress}
                                        // onKeyPress={handleKeyPress}
                                        className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    />
                                    {/* {ValuationError && (
                                        <p className="text-red-500" role="alert">この項目は必須です</p>
                                    )} */}
                                </div>
                            </div>
                        </>
                    )}
                

                {StepTwo && (
                            <>
                            <Fragment>
                                <List disablePadding>
                                    <ListItemText>
                                    <label className="form-label text-lg">1. 被相続人が所有されていた不動産は分譲マンションの１室でしょうか。</label>
                                    </ListItemText>

                                    {ShowYes ? 
                                    <>
                                    <ListItem>
                                    <ListItemText primary="所在" secondary={LocationYes ? LocationYes : "提供されていない"} />
                                    {LocationYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"LocationYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="建物の名称" secondary={BuildingNameYes ? BuildingNameYes : "提供されていない"} />
                                    {BuildingNameYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"BuildingNameYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="構造" secondary={StructureYes ? StructureYes : "提供されていない"} />
                                    {StructureYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"StructureYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="床面積m²" secondary={FloorAreaYes ? FloorAreaYes : "提供されていない"} />
                                    {FloorAreaYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"FloorAreaYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="所在及び地番" secondary={LocationLotNumberYes ? LocationLotNumberYes : "提供されていない"} />
                                    {LocationLotNumberYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"LocationLotNumberYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="地目" secondary={GroundGrainYes ? GroundGrainYes : "提供されていない"} />
                                    {GroundGrainYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"GroundGrainYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="地積㎡" secondary={LandAreaYes ? LandAreaYes : "提供されていない"} />
                                    {LandAreaYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"LandAreaYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="家屋番号" secondary={HouseNumberYes ? HouseNumberYes : "提供されていない"} />
                                    {HouseNumberYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"HouseNumberYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="種類" secondary={KindsYes ? KindsYes : "提供されていない"} />
                                    {KindsYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"KindsYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="構造" secondary={StructureOneYes ? StructureOneYes : "提供されていない"} />
                                    {StructureOneYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"StructureOneYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="床面積 ㎡" secondary={FloorAreaOneYes ? FloorAreaOneYes : "提供されていない"} />
                                    {FloorAreaOneYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"FloorAreaOneYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="敷地権の種類" secondary={TypesofSiteRightsYes ? TypesofSiteRightsYes : "提供されていない"} />
                                    {TypesofSiteRightsYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"TypesofSiteRightsYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="敷地権の割合" secondary={PercentageofSiteRightsYes ? PercentageofSiteRightsYes : "提供されていない"} />
                                    {PercentageofSiteRightsYes ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"PercentageofSiteRightsYes"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 
                                        </>
                                    
                                    :                                     
                                    
                                    <>
                                    <ListItem>
                                    <ListItemText primary="所在" secondary={LocationNo ? LocationNo : "提供されていない"} />
                                    {LocationNo ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"LocationNo"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}                                    
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="建物の名称" secondary={StructureNo ? StructureNo : "提供されていない"} />
                                    {StructureNo ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"StructureNo"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="種類" secondary={KindsNo ? KindsNo : "提供されていない"} />
                                    {KindsNo ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"KindsNo"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider />

                                    <ListItem>
                                    <ListItemText primary="構造" secondary={StructureNo ? StructureNo : "提供されていない"} />
                                    {StructureNo ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"StructureNo"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="床面積 ㎡" secondary={FloorAreaNo ? FloorAreaNo : "提供されていない"} />
                                    {FloorAreaNo ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"FloorAreaNo"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 
                                    </>                                    
                                    }
                                    

                                    <ListItemText>
                                    <label className="form-label text-lg">2. 固定資産税課税明細（固定資産税評価証明書）の情報の入力</label>
                                    </ListItemText>
                                    
                                    <ListItem>
                                    <ListItemText primary="家屋の所在" secondary={LocationoftheHouse ? LocationoftheHouse : "提供されていない"} />
                                    {LocationoftheHouse ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"LocationoftheHouse"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="家屋番号" secondary={HouseNumberTwo ? HouseNumberTwo : "提供されていない"} />
                                    {HouseNumberTwo ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"HouseNumberTwo"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="種類・用途" secondary={TypeApplication ? TypeApplication : "提供されていない"} />
                                    {TypeApplication ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"TypeApplication"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItem>
                                    <ListItemText primary="価格" secondary={Price ? Price : "提供されていない"} />
                                    {Price ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"Price"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>

                                    <Divider /> 

                                    <ListItemText>
                                    <label className="form-label text-lg">3. 所有されていた物件に共有者はいましたか。</label>
                                    </ListItemText>

                                    {ShowYesOption3 ? <>
                                    <ListItem>
                                    <ListItemText primary="共有割合の入力" secondary={SharePercentage ? SharePercentage : "提供されていない"} />
                                    {SharePercentage ?
                                    <ListItemIcon className="text-custom-black">
                                    <EditIcon id={"SharePercentage"}  onClick={handleBack}/>
                                    </ListItemIcon>
                                    :<></>}
                                    </ListItem>
                                    </>
                                     : 
                                    <></>
                                    }
                                                                       
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
                                家屋 詳細は正常に保存されました...
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
        </>
    )
}

HouseAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};