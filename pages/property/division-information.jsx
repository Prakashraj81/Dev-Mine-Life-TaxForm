/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../components/back-btn";
import SubmitButton from "../../components/submit-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import BackdropLoader from '../../components/loader/backdrop-loader';
import AreaIcon from "../../components/inputbox-icon/textbox-area-icon";

export default function DivisionInformation() {   
    let DepositList = [
        
    ];
    const [ResidentialLandType, setResidentialLandType] = useState("");
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);
    let [activeStep, setActiveStep] = useState(0);
    let [StepOne, setStepOne] = useState(true);
    let [StepTwo, setStepTwo] = useState(false);
    let [StepThree, setStepThree] = useState(false);
    let [PrevButton, setPrevButton] = useState(true);
    let [submitTitle, setsubmitTitle] = useState("Next");
    let [PageValidation, setPageValidation] = useState(false);  

    //Table show hide state
    let [CashDepositTable, setCashDepositTable] = useState(true); 
    let [SecuritiesTable, setSecuritiesTable] = useState(true);
    let [BuildingTable, setBuildingTable] = useState(true);
    let [LandTable, setLandTable] = useState(true);
    let [FamilyPropertyTable, setFamilyPropertyTable] = useState(true);
    let [DeathBenefitTable, setDeathBenefitTable] = useState(true);
    let [DeathGratuityTable, setDeathGratuityTable] = useState(true);
    let [DebtTable, setDebtTable] = useState(true);
    let [FuneralExpensesTable, setFuneralExpensesTable] = useState(true);
    let [GiftDuringLifeTable, setGiftDuringLifeTable] = useState(true);

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


    const inputHandlingFunction = () => {

    }


    // Table values
    let [cashSavingsList, setcashSavingsList] = useState([]);
      useEffect(() => {
        let sessionValue = sessionStorage.getItem('cashSavings');
        var tempArray =[];
        tempArray[0] = JSON.parse(sessionValue);     
        if (tempArray[0] !== null) {                   
            setcashSavingsList(tempArray);
        }
        else{
            setcashSavingsList([]);
        }        
    }, [cashSavingsList]);



    //Submit API function 
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
            //sessionStorage.setItem('ExceptionsResidentialLand', JSON.stringify(defaultValues));
            //router.push(`/gift-various/exceptions-residential-land`);
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
                {/* <StepForm handleBack={handleBack} activeStep={activeStep} handleNext={handleNext} /> */}
            </div>
            <div className="basic-information-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                             分割情報、小規模宅地等の特例の入力
                        </p>
                    </div>
                </div>                          
            </div>
            
            <div className="cash-savings-wrapper">                
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    当システムでは「特定居住用（被相続人の居住のように供していた宅地）」のみ小規模宅地等の特例の適用が可能です。※適用要件を満たしているかの確認等ご不明な点は税理士への有料相談でご確認ください。
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

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left pt-7">
                                    <div className="label w-full inline-block">
                                    <label className="form-label flex items-center">適用面積</label>
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
                            </div>
                        </div>
                        
                        
                        {CashDepositTable && (
                            <>
                            <div className="Table-list pt-10 py-3">                                
                                <table className="w-full flex text-center">                                    
                                    {cashSavingsList.map((list) => {   
                                        // Calculate TotalPrice correctly
                                        let AmountofMoney = parseFloat(list.AmountofMoney.replace(/,/g, '').replace('.', ''));
                                        // eslint-disable-next-line no-undef
                                        totalValuation += AmountofMoney;                                      
                                        <>
                                        <div className="w-50 inline-table border border-light-gray">
                                        <tr><th className="p-5 w-full block text-center">現金預金</th></tr>
                                        <tr>
                                            <td className="py-2 px-2 border-r border border-light-gray w-25">預金の種類</td>
                                            <td className="py-2 px-2 border-r border border-light-gray w-25">金融機関名</td>
                                            <td className="py-2 px-2 border-r border border-light-gray w-25">金額</td>
                                        </tr>
                                        <tr>
                                        <td className="py-2 px-2 border-r border border-light-gray w-25">{list.DepositType}</td>
                                        <td className="py-2 px-2 border-r border border-light-gray w-25">{list.FinancialInstitutionName}</td>
                                        <td className="border-r border border-light-gray w-25"><span>{list.AmountofMoney.toLocaleString()}</span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                        </tr>
                                        </div>
                                        <div className="w-50 inline-table border border-light-gray">                                    
                                            <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                            <tr>
                                            <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                            <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                            <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                            </tr>
                                            <tr>                                    
                                            <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                            <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                            <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                            </tr>
                                            </div> 
                                        </>
                                    })}                                        
                                                                 
                                </table>    
                                <table className="w-full flex text-center">                                    
                                        <div className="w-50 inline-table border border-light-gray">
                                        <tr><th className="p-5 w-full block text-center">現金預金</th></tr>
                                        <tr>
                                            <td className="py-2 px-2 border-r border border-light-gray w-25">預金の種類</td>
                                            <td className="py-2 px-2 border-r border border-light-gray w-25">金融機関名</td>
                                            <td className="py-2 px-2 border-r border border-light-gray w-25">金額</td>
                                        </tr>
                                        <tr>
                                        <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                        <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                        <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                        </tr>
                                        </div>
                                        <div className="w-50 inline-table border border-light-gray">                                    
                                            <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                            <tr>
                                            <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                            <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                            <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                            </tr>
                                            <tr>                                    
                                            <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                            <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                            <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                            </tr>
                                            </div> 
                                </table>                          
                            </div>
                            
                            </>
                        )}
                        

                                {SecuritiesTable && (
                                    <>
                                    <div className="Table-list pt-10 py-3">
                                                            <table className="w-full flex text-center">
                                                                <div className="w-50 inline-table border border-light-gray">
                                                                <tr><th className="p-5 w-full block text-center">有価証券</th></tr>
                                                                <tr>
                                                                    <td className="py-2 px-2 border-r border border-light-gray w-25">有価証券の名称・銘柄</td>
                                                                    <td className="py-2 px-2 border-r border border-light-gray w-25">金融機関名</td>
                                                                    <td className="py-2 px-2 border-r border border-light-gray w-25">金額</td>
                                                                </tr>
                                                                <tr>
                                                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                </tr>
                                                                </div>
                                                                <div className="w-50 inline-table border border-light-gray">                                    
                                                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                                                    <tr>
                                                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                                                    </tr>
                                                                    <tr>                                    
                                                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                    </tr>
                                                                </div>                              
                                                            </table>                            
                                                        </div>

                                    </>
                                )}
                                                        

                                {BuildingTable && (
                                    <>
                                    <div className="Table-list pt-10 py-3">
                                                            <table className="w-full flex text-center">
                                                                <div className="w-50 inline-table border border-light-gray">
                                                                <tr><th className="p-5 w-full block text-center">建物</th></tr>
                                                                <tr>
                                                                    <td className="py-2 px-2 border-r border border-light-gray w-25">所在</td>
                                                                    <td className="py-2 px-2 border-r border border-light-gray w-25">床面積</td>
                                                                    <td className="py-2 px-2 border-r border border-light-gray w-25">評価額</td>
                                                                </tr>
                                                                <tr>
                                                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                </tr>
                                                                </div>
                                                                <div className="w-50 inline-table border border-light-gray">                                    
                                                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                                                    <tr>
                                                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                                                    </tr>
                                                                    <tr>                                    
                                                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                                                    </tr>
                                                                </div>                              
                                                            </table>                            
                                                        </div>
                                    </>
                                )}
                        
                        {LandTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">土地</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">所在</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">地積</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">評価額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}


                    {FamilyPropertyTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">家庭用財産</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">財産の内容</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">評価額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}


                        {DeathBenefitTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">死亡保険金等</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">生命保険会社の名称</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">受取年月日</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">受け取った金額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}


                        {DeathGratuityTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">死亡退職金等</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">勤務先会社の名称</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">受取年月日</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">受け取った金額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}


                        {DebtTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">債務</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">債務の名称</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">相手先</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">金額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}



                        {FuneralExpensesTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">葬儀費用</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">費用支払先氏名</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">金額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}


                        {GiftDuringLifeTable && (
                            <>
                            <div className="Table-list pt-10 py-3">
                            <table className="w-full flex text-center">
                                <div className="w-50 inline-table border border-light-gray">
                                <tr><th className="p-5 w-full block text-center">生前贈与</th></tr>
                                <tr>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">所在場所・財産の種類</td>
                                    <td className="py-2 px-2 border-r border border-light-gray w-25">金額</td>
                                </tr>
                                <tr>
                                <td className="py-2 px-2 border-r border border-light-gray w-25"></td>
                                <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                </tr>
                                </div>
                                <div className="w-50 inline-table border border-light-gray">                                    
                                    <tr><th className="p-5 w-full block text-center">相続人</th></tr>
                                    <tr>
                                    <td className="py-2 px-2 border-r border-l-0 border border-light-gray w-25">Shree</td>
                                    <td className="border-r border border-light-gray w-25">Prakashraj</td>
                                    <td className="border-r border border-light-gray w-25">Gowtham</td>                                    
                                    </tr>
                                    <tr>                                    
                                    <td className="border-r border-l-0 border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    <td className="border-r border border-light-gray w-25"><span></span><span className="inline-block float-right border-l text-right border-light-gray py-2 px-2">円</span></td>
                                    </tr>
                                </div>                              
                            </table>                            
                        </div>
                            </>
                        )}
                        
                        
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


DivisionInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};


