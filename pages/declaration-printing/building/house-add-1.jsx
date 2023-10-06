"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import FloorIcon from "../../../components/inputbox-icon/textbox-floor-icon";
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";

export default function HouseAdd() {
    let KindsList = [
        { id: 1, value: '家屋', label: '家屋' },
        { id: 2, value: '構築物', label: '構築物' },
    ];

    let HowToUseList = [];

    let HowToUseList_House = [
        { id: "House_1", value: '自用家屋', label: '自用家屋' },
        { id: "RentRatio", value: '貸家', label: '貸家' },
    ];

    let HowToUseList_Structure = [
        { id: "Structure_1", value: '駐車場', label: '駐車場' },
        { id: "Structure_2", value: '養魚池', label: '養魚池' },
        { id: "Structure_3", value: '広告塔', label: '広告塔' },
    ];

    let StructureList = [
        { id: 1, value: '鉄骨鉄筋コンクリート', label: '鉄骨鉄筋コンクリート' },
        { id: 2, value: '鉄筋コンクリート', label: '鉄筋コンクリート' },
        { id: 3, value: '鉄骨コンクリート', label: '鉄骨コンクリート' },
        { id: 4, value: '無筋コンクリート', label: '無筋コンクリート' },
        { id: 5, value: 'プレストレスコンクリート', label: 'プレストレスコンクリート' },
        { id: 6, value: 'プレキャストコンクリート', label: 'プレキャストコンクリート' },
        { id: 7, value: 'コンクリートブロック', label: 'コンクリートブロック' },
        { id: 8, value: '骨格材が3mm以下の鉄骨造', label: '骨格材が3mm以下の鉄骨造' },
        { id: 9, value: '骨格材が3〜4mmの鉄骨造', label: '骨格材が3〜4mmの鉄骨造' },
        { id: 10, value: '骨格材が4mm超の鉄骨造', label: '骨格材が4mm超の鉄骨造' },
        { id: 11, value: '木造', label: '木造' },
        { id: 12, value: '合成樹脂造', label: '合成樹脂造' },
        { id: 13, value: '木骨モルタル造', label: '木骨モルタル造' },
        { id: 14, value: 'れんが造', label: 'れんが造' },
        { id: 15, value: '石造', label: '石造' },
        { id: 16, value: 'ブロック造', label: 'ブロック造' },
        { id: 17, value: '土蔵造', label: '土蔵造' },
    ];

    let UsageList = [
        { id: 1, value: '居宅', label: '居宅' },
        { id: 2, value: '店舗', label: '店舗' },
        { id: 3, value: '倉庫', label: '倉庫' },
    ]

    let [Kinds, setKinds] = useState("");
    let [HowToUse, setHowToUse] = useState("");
    let [PostCode, setPostCode] = useState("");
    let [ResidenceDisplay, setResidenceDisplay] = useState("");
    let [Area, setArea] = useState("");
    let [PropertyTaxAssessmentValue, setPropertyTaxAssessmentValue] = useState("0");
    let [RentRatio, setRentRatio] = useState("0");
    let [Ownership, setOwnership] = useState("0");
    let [Ratio, setRatio] = useState("0");
    let [InsertCertificate, setInsertCertificate] = useState("");
    let [Valuation, setValuation] = useState("0");
    let [Structure, setStructure] = useState("");
    let [Usage, setUsage] = useState("");
    let [NumberofFloors, setNumberofFloors] = useState("");
    let [UndecidedHeir, setUndecidedHeir] = useState("0");
    let [TotalPrice, setTotalPrice] = useState("0");
    let [Undecidedheir1, setUndecidedheir1] = useState("0");
    let [Undecidedheir2, setUndecidedheir2] = useState("0");
    let [UserAmount, setUserAmount] = useState("0");
    let [ConstantValue, setConstantValue] = useState("0");
    let [boxValues, setBoxValues] = useState([]);

    //Hide and show input
    let [ShowStructureUsage, setShowStructureUsage] = useState(false);
    let [ShowRentRatio, setShowRentRatio] = useState(false);
    let [ShowHowtoList0, setShowHowtoList0] = useState(false);
    let [ShowHowtoList1, setShowHowtoList1] = useState(false);
    let [ShowHowtoList2, setShowHowtoList2] = useState(false);

    //Error state and button disabled
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [KindsError, setKindsError] = useState(false);
    let [HowToUseError, setHowToUseError] = useState(false);
    let [StructureError, setStructureError] = useState(false);
    let [UsageError, setUsageError] = useState(false);
    let [NumberofFloorsError, setNumberofFloorsError] = useState(false);
    let [ResidenceDisplayError, setResidenceDisplayError] = useState(false);
    let [AreaError, setAreaError] = useState(false);
    let [PropertyTaxAssessmentValueError, setPropertyTaxAssessmentValueError] = useState(false);
    let [RentRatioError, setRentRatioError] = useState(false);
    let [InsertCertificateError, setInsertCertificateError] = useState(false);
    let [HowtouseList, setHowtouseList] = useState();

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

    const NumberofFloorsKeyPress = (e) => {
        var value = Number(event.target.value);
        setNumberofFloors(value);
    }

    //inputClear function
    function inputClear() {
        setStructure("");
        setUsage("");
        setPostCode("");
        setResidenceDisplay("");
        setArea("");
        setPropertyTaxAssessmentValue("0");
        setRentRatio("0");
        setOwnership("0");
        setRatio("0");
        setInsertCertificate("");
        setValuation("0");
        setNumberofFloors("");
        setUndecidedHeir("0");
        setTotalPrice("0");
    }

    const handleKinds = (event) => {
        inputClear();
        let selectedValue = event.target.value;
        let selectedOptions = KindsList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);        
        setKinds(selectedValue);        
        setisSumbitDisabled(false);
        setShowIncorrectError(false);        
        setKindsError(false);
        if (selectedId === 1) {
            setShowStructureUsage(true);            
            setShowHowtoList0(false);
            setShowHowtoList1(true);
            setShowHowtoList2(false);
            setHowtouseList(HowToUseList_House);           
            console.log(HowtouseList);
        }
        else if (selectedId === 2) {
            setShowStructureUsage(false);
            setShowHowtoList0(false);
            setShowHowtoList1(false);
            setShowHowtoList2(true);
            setHowtouseList(HowToUseList_Structure);            
            console.log(HowtouseList);
        }
        else {
            setShowStructureUsage(false);
            setShowHowtoList0(true);
            setShowHowtoList1(false);
            setShowHowtoList2(false);
        }
    };

    //How to use dropdown box
    const handleHowToUse = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = HowtouseList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);        
        setHowToUse(selectedValue);
        setisSumbitDisabled(false);
        setShowIncorrectError(false);
        setHowToUseError(false);    
        if (selectedId === "RentRatio") {
            setShowRentRatio(true);
        }
        else {
            setShowRentRatio(false);
        }
    };

    //Structure dropdown box
    const handleStructure = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = StructureList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);        
        setStructure(selectedValue);        
        setisSumbitDisabled(false);
        setShowIncorrectError(false);
        setStructureError(false);
    };

    const handleUsage = (event) => {
        let selectedValue = event.target.value;
        let selectedOptions = UsageList.find(option => option.value === selectedValue);
        let selectedId = Number(selectedOptions.id);        
        setUsage(selectedValue);        
        setisSumbitDisabled(false);
        setShowIncorrectError(false);
        setUsageError(false);
    };

    const PropertyTaxAssessmentKeyPress = (event) => {
        var value = event.target.value;
        setPropertyTaxAssessmentValueError(false);
        if (value !== "") {
            value = value.replace(/,/g, '').replace('.', '');
            value = parseFloat(value);
            value = value.toLocaleString();
            setValuation(value);
            setUndecidedHeir(value);
            setTotalPrice(value);
            setPropertyTaxAssessmentValue(value);
            setShowIncorrectError(false);
            setisSumbitDisabled(false);
        }
        else {
            setPropertyTaxAssessmentValue(value);
            setValuation(value);
            setUndecidedHeir(value);
            setTotalPrice(value);
        }
    };

    //ownership-ratio calculation 
    const Ownershipfunction = (e) => {
        setShowIncorrectError(false);
        let ownership_value = Number(e.target.value);
        setOwnership(ownership_value);
        let propertyValue = PropertyTaxAssessmentValue;
        if (propertyValue !== "") {
            propertyValue = propertyValue.replace(/,/g, '').replace('.', '');
            propertyValue = parseFloat(propertyValue);
        }
        if (Ratio > 0 && propertyValue > 0) {
            ownership_value = ownership_value * propertyValue;
            ownership_value = ownership_value / Ratio;
            ownership_value = ownership_value.toLocaleString()
            setValuation(ownership_value);
            setUndecidedHeir(ownership_value);
            setTotalPrice(ownership_value);
        }
        else {

        }
    }

    const Ratiofunction = (e) => {
        setShowIncorrectError(false);
        let ratio_value = Number(e.target.value);
        setRatio(ratio_value);
        let propertyValue = PropertyTaxAssessmentValue;
        if (propertyValue !== "") {
            propertyValue = propertyValue.replace(/,/g, '').replace('.', '');
            propertyValue = parseFloat(propertyValue);
        }
        if (propertyValue > 0 && Ownership > 0) {
            var value = Ownership * propertyValue;
            if (ratio_value > 0) {
                value = value / ratio_value;
                value = value.toLocaleString();
            }
            else {
                value = propertyValue;
            }
            setValuation(value.toLocaleString());
            setUndecidedHeir(value.toLocaleString());
            setTotalPrice(value.toLocaleString());
        }
        else {
            setValuation(propertyValue.toLocaleString());
            setUndecidedHeir(propertyValue.toLocaleString());
            setTotalPrice(propertyValue.toLocaleString());
        }
    }

    //Footer box calculation
    const Undecided_heir_1 = (e) => {
        var undecided_heir_1 = Number(e.target.value);
        setUndecidedheir1(undecided_heir_1.toLocaleString());
        if (Undecidedheir2 > 0 && Number(Valuation) > 0) {
            var value = undecided_heir_1 * Valuation;
            value = value / Undecidedheir2;
            UndecidedHeir = Valuation - value;
        }
        setUserAmount(value.toLocaleString());
        setUndecidedHeir(UndecidedHeir.toLocaleString());
    }

    const Undecided_heir_2 = (e) => {
        var undecided_heir_2 = e.target.value;
        if (undecided_heir_2 !== "") {
            undecided_heir_2 = undecided_heir_2.replace(/,/g, '').replace('.', '');
            undecided_heir_2 = undecided_heir_2(undecided_heir_2);
            setUndecidedheir2(undecided_heir_2.toLocaleString());
        }
        else {
            setUndecidedheir2(undecided_heir_2.toLocaleString());
        }

        if (Undecidedheir1 > 0 && undecided_heir_2 > 0 && Number(Valuation) > 0) {
            var value = Undecidedheir1 * Valuation;
            if (undecided_heir_2 > 0) {
                value = value / undecided_heir_2;
                UndecidedHeir = Valuation - value;
                UndecidedHeir = UndecidedHeir.toFixed(0);
                value = value.toFixed(0);
            }
            else {
                value = PropertyTaxAssessmentValue;
            }
            setUndecidedHeir(UndecidedHeir.toLocaleString());
            setUserAmount(value.toLocaleString());
        }
        else {
            setUserAmount(0);
            setUndecidedHeir(Valuation.toLocaleString());
        }
    }

    //All input validation check and handling function
    const inputHandlingFunction = (event) => {
        setShowIncorrectError(false);
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;
        if (inputId === "NumberofFloors") {
            setNumberofFloors(inputValue);
            setNumberofFloorsError(false);
        }
        else if (inputId === "Address") {
            setAddress(inputValue);
            setAddressError(false);
        }
        else if (inputId === "Area") {
            setArea(inputValue);
            setAreaError(false);
        }
        else if (inputId === "PropertyTaxAssessmentValue") {
            setPropertyTaxAssessmentValue(inputValue);
            setPropertyTaxAssessmentValueError(false);
        }
        else if (inputId === "ResidenceDisplay") {
            setResidenceDisplay(inputValue);
            setResidenceDisplayError(false);
        }
        else if (inputId === "RentRatio") {
            setRentRatio(inputValue);
            setRentRatioError(false);
        }
        else {

        }
        setisSumbitDisabled(false);
    }

    //Submit API function 
    const router = useRouter();
    const onSubmit = () => {
        let defaultValues = {
            Kinds: Kinds,
            HowToUse: HowToUse,
            Structure: Structure,
            Usage: Usage,
            NumberofFloors: NumberofFloors,
            PostCode: PostCode,
            ResidenceDisplay: ResidenceDisplay,
            Area: Area,
            PropertyTaxAssessmentValue: PropertyTaxAssessmentValue,
            RentRatio: RentRatio,
            Ownership: Ownership,
            Ratio: Ratio,
            InsertCertificate: InsertCertificate,
            Valuation: Valuation,
            UndecidedHeir: UndecidedHeir,
            TotalPrice: Valuation,
        };

        //input Validation
        if (defaultValues.Kinds === "") {
            setKindsError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.HowToUse === "") {
            setHowToUseError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.Structure === "") {
            if(ShowStructureUsage === true){
                setStructureError(true);
                isSumbitDisabled = true;
            }            
        }
        if (defaultValues.Usage === "") {
            if (ShowStructureUsage === true) {
                setUsageError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.NumberofFloors === "") {
            if (ShowStructureUsage === true) {
                setNumberofFloorsError(true);
                isSumbitDisabled = true;
            }
        }
        if (defaultValues.ResidenceDisplay === "") {
            setResidenceDisplayError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.Area === "") {
            setAreaError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.PropertyTaxAssessmentValue === "") {
            setPropertyTaxAssessmentValueError(true);
            isSumbitDisabled = true;
        }
        if (defaultValues.RentRatio === "") {
            if (RentRatioError === true) {
                setRentRatioError(true);
                isSumbitDisabled = true;
            }
        }
        // if (defaultValues.InsertCertificate === "") {
        //     setInsertCertificateError(true);
        //     isSumbitDisabled = true;
        // }
        if (defaultValues.UndecidedHeir !== "") {
            if (defaultValues.UndecidedHeir === 0) {
                UndecidedHeir = 0;
            }
            else {
                UndecidedHeir = defaultValues.UndecidedHeir.replace(/,/g, '').replace('.', '');
                UndecidedHeir = parseFloat(UndecidedHeir);
            }
            if (defaultValues.UndecidedHeir < 0) {
                setShowIncorrectError(true);
                isSumbitDisabled = true;
            }
            else {
                setShowIncorrectError(true);
            }
        }

        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            sessionStorage.setItem('Building', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/building`);
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    };
    return (
        <>
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

                <div className="w-full inline-block mb-7">
                        <img src="/images/screenshot-2.jpg" className="w-full" alt="image" height={500} width={200}/>
                    </div>

                <form action="#" method="POST">
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                    <span className="cricle">1</span> 所在<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"
                                        id="NumberofFloors"                                        
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    />                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                    <span className="cricle">2</span> 地日<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"                                                                              
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    />                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                    <span className="cricle">3</span> 地積 ㎡<i className="text-red-500">*</i>
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2 relative">
                                    <input
                                        type="text"                                                                              
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pr-12"
                                    />        
                                    <AreaIcon/>                            
                                </div>
                            </div>
                        </div>              

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label htmlFor="InsertCertificate" className="form-label">
                                <span className="cricle">4</span> 証明書を挿入<i className="text-red-500">*</i>
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2 relative">
                                <div class="custom-file">
                                    <input type="file" className="absolute right-0 top-0 p-2.5 text-right flex form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3" id="InsertCertificate" aria-describedby="inputGroupFileAddon06" accept="image/x-png,image/gif,image/jpeg,image/svg" />
                                    <label className="hidden custom-file-label" for="InsertCertificate">Upload</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {InsertCertificateError && (
                        <p className="text-red-500 mt-10" role="alert">この項目は必須です</p>
                    )}                    


                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="heading text-center">
                            <h5 className="text-sm text-black tracking-2 font-medium">財産の合計</h5>
                        </div>
                        <div className="total-list pt-10">
                            <ul>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>受取人</span>
                                    <span>取得財産の価額</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <div className="w-50 inline-block float-left">
                                        <span>山田　太郎</span>
                                    </div>
                                    <div className="w-50 inline-block float-left">
                                        <div className="flex justify-between items-center">
                                            <div><input
                                                type="text"
                                                id="Undecided_heir_1"
                                                onChange={Undecided_heir_1}
                                                onKeyPress={handleKeyPress}
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div>
                                                <span className="text-3xl text-gray-500">/</span>
                                            </div>
                                            <div><input
                                                type="text"
                                                id="Undecided_heir_2"
                                                onChange={Undecided_heir_2}
                                                onKeyPress={handleKeyPress}
                                                className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            /></div>
                                            <div className="text-right text-sm pl-2">{UserAmount}</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>相続人未決定</span>
                                    <span>{UndecidedHeir}</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>合計</span>
                                    <span>{Valuation}</span>
                                </li>
                            </ul>
                        </div>
                        <IncorrectError IncorrectError={ShowIncorrectError} />
                    </div>

                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <BackButton />
                        <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                    </div>
                    <div className="heading text-center pt-8">
                        <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                    </div>
                </form>


            </div>
        </>
    )
}

HouseAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};