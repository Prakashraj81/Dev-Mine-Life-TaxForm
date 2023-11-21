"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import BackButtonIndex from "../../../components/back-btn-index";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function DeductionMinors() {
    let [AmountofMoney, setAmountofMoney] = useState("0");

    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [totalPrice, settotalPrice] = useState("0");    
    let [boxValues, setBoxValues] = useState([]);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);

       //Input keypress
       let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

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
        if (AmountofMoney == 0) {
            AmountofMoney = 0;
        }
        else {
            AmountofMoney = AmountofMoney.replace(/,/g, '').replace('.', '');
            AmountofMoney = parseFloat(AmountofMoney);
        }
        let totalBoxValues = updatedBoxValues.reduce((total, value) => total + value, 0);
        if (isNaN(totalBoxValues)) {
            totalBoxValues = 0;
        }
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


    //Submit API function 
    const router = useRouter();
    const onSubmit = () => {
        let defaultValues = {
            DepositType: DepositType,
            FinancialInstitutionName: FinancialInstitutionName,
            PostCode: PostCode,
            Address: Address,
            AmountofMoney: AmountofMoney,
            UndecidedHeir: UndecidedHeir,
            totalPrice: AmountofMoney,
        };

        //input Validation
        if (defaultValues.DepositType === "") {
            setDepositTypeError(true);
            isSumbitDisabled = true;
        }

        if (defaultValues.FinancialInstitutionName === "") {
            if (ShowFinancialInstitutionName === true) {
                setFinancialInstitutionNameError(true);
                isSumbitDisabled = true;
            }            
        }

        if (defaultValues.Address === "") {
            if (ShowAddress === true) {
                setAddressError(true);
                isSumbitDisabled = true;
            }            
        }

        if (defaultValues.AmountofMoney !== "" || defaultValues.AmountofMoney === 0) {
            valueConvertFun(defaultValues.AmountofMoney);
        }

        if (defaultValues.UndecidedHeir < 0) {
            setShowIncorrectError(true);
            isSumbitDisabled = true;
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('cashSavings', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/cash-savings`);
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    }; 
      

    return (
        <>
            <div className="securities-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            未成年控除額が本人の税額を超える場合の割振り
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full inline-block">
                <form action="#" method="POST">
                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="heading text-center">
                            <h5 className="text-sm text-black tracking-2 font-medium">財産の合計</h5>
                        </div>
                        <div className="total-list pt-10">
                            <HeirListBox FunhandleBoxValueChange={handleBoxValueChange} FunHandleKeyPress={handleKeyPress} VarUndecidedHeir={UndecidedHeir} VarAmountofMoney={AmountofMoney} />
                        </div>
                        <IncorrectError IncorrectError={ShowIncorrectError} />
                    </div>

                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <BackButtonIndex />
                        <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                    </div>
                </form>
            </div>
        </>
    )
}

DeductionMinors.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};