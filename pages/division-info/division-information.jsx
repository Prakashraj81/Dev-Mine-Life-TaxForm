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

//Tables import
import CashSavingsTable from "../../components/division-info-tables/cash-savings-table";
import SecuritiesTable from "../../components/division-info-tables/securities-table";
import BuildingsTable from "../../components/division-info-tables/building-table";
import LandTable from "../../components/division-info-tables/land-table";
import HouseholdPropertyTable from "../../components/division-info-tables/household-property-table";
import DeathBenefitTable from "../../components/division-info-tables/death-benefit-table";
import DeathRetirementAllowanceTable from "../../components/division-info-tables/death-retirement-allowance-table";
import DebtTable from "../../components/division-info-tables/debt-table";
import FuneralExpensesTable from "../../components/division-info-tables/funeral-expenses-table";
import GiftduringLifeTable from "../../components/division-info-tables/giftduring-life-table";
import Test from "../../components/division-info-tables/test";


export default function DivisionInformation() {   
    let DepositList = [
        
    ];
    const [ResidentialLandType, setResidentialLandType] = useState("");
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    // Proceed to next step
    let [ShowLoader, setShowLoader] = useState(false);
     

    //Table show hide state
    // let [CashDepositTable, setCashDepositTable] = useState(true); 
    // let [SecuritiesTables, setSecuritiesTables] = useState(true);
    // let [BuildingTable, setBuildingTable] = useState(true);
    // let [LandTable, setLandTable] = useState(true);
    // let [FamilyPropertyTable, setFamilyPropertyTable] = useState(true);
    // let [DeathBenefitTable, setDeathBenefitTable] = useState(true);
    // let [DeathGratuityTable, setDeathGratuityTable] = useState(true);
    // let [DebtTable, setDebtTable] = useState(true);
    //let [FuneralExpensesTable, setFuneralExpensesTable] = useState(true);
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
                    <form className="hidden1" action="#" method="POST">                        
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





                <div className="material-tables">
                    <CashSavingsTable/>
                    <SecuritiesTable/>
                    <BuildingsTable/>
                    <LandTable/>
                    <HouseholdPropertyTable/>
                    <DeathBenefitTable/>
                    <DeathRetirementAllowanceTable/>
                    <DebtTable/>
                    <FuneralExpensesTable/>
                    <GiftduringLifeTable/>
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


DivisionInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};


