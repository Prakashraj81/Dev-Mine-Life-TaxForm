"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../components/back-btn";
import SubmitButton from "../../components/submit-btn";
import HeirListBox from "../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../components/heir-list-box/incorrect-error";
import FullLayout from '../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../components/loader/backdrop-loader';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AreaIcon from "../../components/inputbox-icon/textbox-area-icon";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function DivisionInformation() {   
    let DepositList = [
        
    ];
    const [ResidentialLandType, setResidentialLandType] = useState("");
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);
     

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

    const handleResidentialLandType = (event) => {
        setResidentialLandType(event.target.value);
    };


    const inputHandlingFunction = (event) => {

    }


    // Table values
    let [cashSavingsList, setcashSavingsList] = useState([]);
    let totalValuation = 0;
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
    }, []);



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
            console.log("API allowed");
            //sessionStorage.setItem('ExceptionsResidentialLand', JSON.stringify(defaultValues));
            //router.push(`/gift-various/exceptions-residential-land`);      
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
                                {cashSavingsList.length === 0 ? (
                                    <>
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
                                    </>
                                ) : (
                                    <>
                                    {cashSavingsList.map((list, index) => {   
                                            // Calculate TotalPrice correctly
                                            let AmountofMoney = parseFloat(list.AmountofMoney.replace(/,/g, '').replace('.', ''));
                                            totalValuation += AmountofMoney; 
                                            return (
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
                                            );                                 
                                        })}  
                                    </>                                    
                                )}                                                  
                                                                    
                                                                 
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


DivisionInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};


