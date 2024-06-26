"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, ListItemIcon, Boxider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../../components/loader/backdrop-loader';
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TableOne from '../../../components/land-tables/table-one';
import TableTwo from '../../../components/land-tables/table-two';
import TableThree from '../../../components/land-tables/table-three';
import TableFour from '../../../components/land-tables/table-four';
import TableFive from '../../../components/land-tables/table-five';

export default function LandAdd() {
    let [ShowImageOne, setShowImageOne] = useState(true);
    let [ShowImageTwo, setShowImageTwo] = useState(false);
    let [ShowImageThree, setShowImageThree] = useState(false);
    let [ShowImageFour, setShowImageFour] = useState(false);
    let [ShowImageFive, setShowImageFive] = useState(false);

    let [ShowTableOne, setShowTableOne] = useState(true);
    let [ShowTableTwo, setShowTableTwo] = useState(false);
    let [ShowTableThree, setShowTableThree] = useState(false);
    let [ShowTableFour, setShowTableFour] = useState(false);
    let [ShowTableFive, setShowTableFive] = useState(false);
    let [DisabledRadioValue, setDisabledRadioValue] = useState('1');

    let [QuestionOne, setQuestionOne] = useState("");
    let [ShowQuestionYes, setShowQuestionYes] = useState(false);
    let [ShowQuestionNo, setShowQuestionNo] = useState(false);

    let [QuestionTwo, setQuestionTwo] = useState("");
    let [QuestionTwoImageYes, setQuestionTwoImageYes] = useState(false);
    let [QuestionTwoImageNo, setQuestionTwoImageNo] = useState(false);
    let [QuestionTwoImageBoth, setQuestionTwoImageBoth] = useState(true);

    let [QuestionThree, setQuestionThree] = useState("");
    let [ShowYesOption3, setShowYesOption3] = useState(false);
    let [ShowNoOption3, setShowNoOption3] = useState(false);

    let [QuestionFour, setQuestionFour] = useState("");
    let [ShowYesOption4, setShowYesOption4] = useState(false);
    let [ShowNoOption4, setShowNoOption4] = useState(false);

    //Input items
    let [LocationLotNumberYes, setLocationLotNumberYes] = useState("");
    let [GroundGrainYes, setGroundGrainYes] = useState("");
    let [LandAreaYes, setLandAreaYes] = useState("");
    let [TypesofSiteRightsYes, setTypesofSiteRightsYes] = useState("");
    let [PercentageofSiteRightsYes, setPercentageofSiteRightsYes] = useState("");

    let [LocationNo, setLocationNo] = useState("");
    let [LotNumberNo, setLotNumberNo] = useState("");
    let [GroundGrainNo, setGroundGrainNo] = useState("");
    let [LandAreaNo, setLandAreaNo] = useState("");

    let [SharePercentage, setSharePercentage] = useState("");

    let [LandYesImage, setLandYesImage] = useState(false);
    let [LandNoImage, setLandNoImage] = useState(false);

    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [totalPrice, settotalPrice] = useState(0);
    let [boxValues, setBoxValues] = useState([]); let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [ShowLoader, setShowLoader] = useState(false);

    //Input keypress
    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const handleQuestionOne = (event) => {
        let radioValue = event.target.value;
        setQuestionOne(radioValue);
        if (radioValue === "Yes") {
            setLandYesImage(true);
            setLandNoImage(false);
            setShowQuestionYes(true);
            setShowQuestionNo(false);
        }
        else {
            setLandYesImage(false);
            setLandNoImage(true);
            setShowQuestionYes(false);
            setShowQuestionNo(true);
        }
    }

    const handleQuestionTwo = (event) => {
        let radioValue = event.target.value;
        setQuestionTwo(radioValue);
        if (radioValue === "Yes") {
            setQuestionTwoImageYes(true);
            setQuestionTwoImageNo(false);
            setQuestionTwoImageBoth(false);
        }
        else {
            setQuestionTwoImageNo(true);
            setQuestionTwoImageYes(false);
            setQuestionTwoImageBoth(false);
        }
    }

    const handleQuestionThree = () => {
        let radioValue = event.target.value;
        setQuestionThree(radioValue);
        if (radioValue === "Yes") {
            setShowYesOption3(true);
            setShowNoOption3(false);
        }
        else {
            setShowNoOption3(true);
            setShowYesOption3(false);
        }
    }

    const handleQuestionFour = () => {
        let radioValue = event.target.value;
        setQuestionFour(radioValue);
        if (radioValue === "Yes") {
            setShowYesOption4(true);
            setShowNoOption4(false);
        }
        else {
            setShowNoOption4(true);
            setShowYesOption4(false);
        }
    }

    //Disabled deduction radio button
    const handleDisabledRadio = (event) => {
        let SelectValue = Number(event.target.value);
        setDisabledRadioValue(SelectValue);
        if (SelectValue === 1) {
            setShowImageOne(true);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowImageFive(false);
            setShowTableOne(true);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(false);
            setShowTableFive(false);
        }
        else if (SelectValue === 2) {
            setShowImageOne(false);
            setShowImageTwo(true);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowImageFive(false);
            setShowTableOne(false);
            setShowTableTwo(true);
            setShowTableThree(false);
            setShowTableFour(false);
            setShowTableFive(false);
        }
        else if (SelectValue === 3) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(true);
            setShowImageFour(false);
            setShowImageFive(false);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(true);
            setShowTableFour(false);
            setShowTableFive(false);
        }
        else if (SelectValue === 4) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(true);
            setShowImageFive(false);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(true);
            setShowTableFive(false);
        }
        else if (SelectValue === 5) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowImageFive(true);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(false);
            setShowTableFive(true);
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
            console.log("API allowed");
            sessionStorage.setItem('Land', JSON.stringify(defaultValues));
            router.push(`/declaration-printing/land`);
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
            <Box className="land-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            土地1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>
                <form action="#" method="POST">
                    <FormControl>
                        <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">1. 被相続人が所有されていた不動産は分譲マンションの１室でしょうか。</Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={QuestionOne}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} onChange={handleQuestionOne} label="はい" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                            <FormControlLabel value="No" control={<Radio />} onChange={handleQuestionOne} label="いいえ" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                        </RadioGroup>
                    </FormControl>

                    <Box className="w-full inline-block mb-7">
                        {LandYesImage && (
                            <img src="/screenshots/land-yes.png" className="w-full" alt="image" height={500} width={200} />
                        )}
                        {LandNoImage && (
                            <img src="/screenshots/land-no.png" className="w-full" alt="image" height={500} width={200} />
                        )}
                    </Box>

                    {ShowQuestionYes && (
                        <>
                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">1</Box>所在及び地番</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">2</Box>地目</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">3</Box>地積㎡</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon />
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">4</Box>敷地権の種類</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">5</Box>敷地権の割合</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                    {ShowQuestionNo && (
                        <>
                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">1</Box>所在</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">2</Box>地番</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">3</Box>地目</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">4</Box>地積 ㎡</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}


                    <Box className="mt-5">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">2. 被相続人が所有されていた不動産は路線価地域の土地でしょうか。</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={QuestionTwo}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} onChange={handleQuestionTwo} label="はい" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                                <FormControlLabel value="No" control={<Radio />} onChange={handleQuestionTwo} label="いいえ" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box className="w-full inline-block mb-7">
                        <Box className="py-2">
                            <Typography component={"label"}>※該当の土地が路線価地域の土地かどうかの確認方法</Typography>
                            <Box className="mt-2 steps-details">
                                <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step１</Typography> 下記リンク先の国税庁HPから該当年分の路線価図を見つけます。</Typography>
                                <Typography fontSize={14} target="blank" lineHeight={2} letterSpacing={0} component={Link} href={"https://www.rosenka.nta.go.jp/"} className="text-blue-600 mt-1">https://www.rosenka.nta.go.jp/</Typography>
                            </Box>
                            <Box className="mt-2 steps-details">
                                <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step２</Typography> 該当地の地名の路線価図が見つからない場合</Typography>
                                <Typography fontSize={14} lineHeight={2} letterSpacing={1.8} className="mt-1">⇒該当地は路線価地域の土地ではありません。「いいえ」を選択し倍率表を確認してください。</Typography>
                            </Box>
                        </Box>
                        {QuestionTwoImageBoth && (
                            <>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5 steps-details">
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step３</Typography> 該当地が路線価が付された道路に接しておらず、倍率地域と記載された地域に位置する場合</Typography>
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8} className="mt-1">⇒該当地は路線価地域の土地ではありません。「いいえ」を選択して倍率表を確認してください。</Typography>
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>

                            </>
                        )}
                        {QuestionTwoImageYes && (
                            <>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5 steps-details">
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step３</Typography> 該当地が路線価が付された道路に接しておらず、倍率地域と記載された地域に位置する場合</Typography>
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8} className="mt-1">⇒該当地は路線価地域の土地ではありません。「いいえ」を選択して倍率表を確認してください。</Typography>
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-yes-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                            </>
                        )}
                        {QuestionTwoImageNo && (
                            <>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no-2.png" className="w-full bg-white" alt="image" height={500} width={200} />
                                </Box>

                                <Box className="w-full flex items-center justify-between pt-7 mb-7">
                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center">倍率</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="倍率"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="mt-5">
                                    <img src="/screenshots/land-question-2.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>

                                <Box className="w-full flex items-center justify-between pt-7 mb-7">
                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center">上図の赤枠部分を入力してください。</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="上図の赤枠部分を入力してください。"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>


                    {QuestionTwoImageYes && (
                        <>
                            <Box className="bg-custom-light mt-10 py-3 px-5 w-full inline-block">
                                <Typography component={"label"} className="form-label" id="demo-row-radio-buttons-group-label">土地の詳細の入力</Typography>
                            </Box>
                            <Box className="mt-5">
                                <Typography component={"label"}>※当システムでは最も高い路線価が付されている土地を正面路線として自動的に評価額を計算しております。</Typography>
                                <Typography component={"label"}>※角地準角地の違いについては、下記のリンクをご参照ください。</Typography>
                                <Box className="mt-1 steps-details">
                                    <Typography fontSize={14} target="blank" lineHeight={2} letterSpacing={0} component={Link} href={"https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka_new/02/07.htm"} className="text-blue-600 mt-1">　https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka_new/02/07.htm</Typography>
                                </Box>
                                <Box className="mt-1 steps-details">
                                <Typography component={"label"}>※奥行き価格補正、不整形地補正、地籍規模の大きな宅地の評価減等の補正の適用をご希望の場合は、</Typography>
                                <Typography component={"label"}>　上部の「ご相談・お問い合わせ」からお問い合わせください。税理士による有料サポートにて対応いたします。</Typography>
                                </Box>
                            </Box>
                            <Box className="w-full flex items-center justify-between mt-3 mb-7">
                                <Box className="w-full lg:w-65 xl:w-65 2xl:w-65 block float-left">
                                    <Box className="w-full inline-block mt-2 relative">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={DisabledRadioValue}>
                                                <FormControlLabel value="1" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン1(1つの道路 (正面)のみに接している場 合)" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="2" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン2(2つの道路 (正面と裏面) に接している場 合)" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="3" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン３（２つの道路（正面と側方）に接している場合）" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="4" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン４（３つの道路に接している場合）" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="5" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン5（4つの道路に接している場合）" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-35 xl:w-35 2xl:w-35 inline-block float-left">
                                    <Box className="w-full inline-block mt-2">
                                        {ShowImageOne && (
                                            <Image className="mx-auto w-full" src="/land_item01.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageTwo && (
                                            <Image className="mx-auto w-full" src="/land_item02.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageThree && (
                                            <Image className="mx-auto w-full" src="/land_item03.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageFour && (
                                            <Image className="mx-auto w-full" src="/land_item04.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageFive && (
                                            <Image className="mx-auto w-full" src="/land_item05.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full inline-block py-5">
                                <Box classsName="table-columns">
                                    {ShowTableOne && (
                                        <TableOne />
                                    )}
                                    {ShowTableTwo && (
                                        <TableTwo />
                                    )}
                                    {ShowTableThree && (
                                        <TableThree />
                                    )}
                                    {ShowTableFour && (
                                        <TableFour />
                                    )}
                                    {ShowTableFive && (
                                        <TableFive />
                                    )}
                                </Box>
                            </Box>
                        </>
                    )}


                    <Box className="mb-7">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">3. 所有されていた物件に共有者はいましたか。</Typography>
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
                                <Box className="w-full block items-center justify-between mb-7">
                                    <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label">共有割合の入力</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <Box className="flex justify-between items-center">
                                                <Box><input
                                                    type="text"
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></Box>
                                                <Box>
                                                    <span className="text-3xl text-gray-500">/</span>
                                                </Box>
                                                <Box><input
                                                    type="text"
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                        {ShowNoOption3 && (
                            <></>
                        )}
                    </Box>

                    <Box className="mb-7">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">4. 総階数3階以上のマンションでしょうか</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={QuestionFour}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} onChange={handleQuestionFour} label="はい" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                                <FormControlLabel value="No" control={<Radio />} onChange={handleQuestionFour} label="いいえ" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                            </RadioGroup>
                        </FormControl>
                        {ShowYesOption4 && (
                            <>
                                <Box className="w-full inline-block">
                                    <Box className="w-full mb-2"><Typography component={"label"}>区分所有補正率の入力</Typography></Box>
                                    <Box className="w-full">
                                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                            <input
                                                type="text"
                                                id="sectionalOwnershipRates"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                        {ShowNoOption4 && (
                            <></>
                        )}
                    </Box>

                    <Box className="w-full inline-block">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-16">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label text-lg" htmlFor="Valuation">
                                    5. 評価額
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="Valuation"
                                    // value={Valuation}
                                    // onChange={ValuationKeyPress}
                                    // onKeyPress={handleKeyPress}
                                    className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                {/* {ValuationError && (
                                        <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                    )} */}
                            </Box>
                        </Box>
                    </Box>
                    <Box className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <Box className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton />
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

LandAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};