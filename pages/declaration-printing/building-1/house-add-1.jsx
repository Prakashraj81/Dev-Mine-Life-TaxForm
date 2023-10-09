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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function HouseAdd() {
    let [BuildingRadioValue, setBuildingRadioValue] = useState('No');
    let [ShowYes, setShowYes] = useState(false);
    let [ShowNo, setShowNo] = useState(false);
    let [QuestionThree, setQuestionThree] = useState('No');
    let [ShowYesOption3, setShowYesOption3] = useState(false);
    let [ShowNoOption3, setShowNoOption3] = useState(false);
    let [QuestionFour, setQuestionFour] = useState('No');
    let [ShowYesOption4, setShowYesOption4] = useState(false);
    let [ShowNoOption4, setShowNoOption4] = useState(false);

    //Radio button
    const handleRadio = (event) => {
        let radioValue = event.target.value;
        setBuildingRadioValue(radioValue);
        if (radioValue === "Yes") {
            setShowYes(true);
            setShowNo(false);
        }
        else {
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

    //Question four
    const handleQuestionFour = (event) => {
        let radioValue = event.target.value;
        setQuestionFour(radioValue);
        if (radioValue === "Yes") {
            setShowYesOption4(true);
            setShowNoOption4(false);
        }
        else {
            setShowYesOption4(false);
            setShowNoOption4(true);
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
                    <img src="/images/screenshot-2.jpg" className="w-full" alt="image" height={500} width={200} />
                </div>

                <form action="#" method="POST">
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
                    <div className="w-full inline-block py-3">
                        <label>登記簿謄本の情報の入力</label>
                    </div>
                    {ShowYes && (
                        <>
                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">所在</label>
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
                                        <label className="form-label">建物の名称</label>
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
                                        <label className="form-label">構造</label>
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
                                        <label className="form-label">床面積m²</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">所在及び地番</label>
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
                                        <label className="form-label">地目</label>
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
                                        <label className="form-label">地積㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">家屋番号</label>
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
                                        <label className="form-label">種類</label>
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
                                    <label className="form-label">構造</label>
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
                                        <label className="form-label">床面積 ㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon/>
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                    <label className="form-label">敷地権の種類</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full inline-block mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">敷地権の割合</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
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
                                        <label className="form-label">所在</label>
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
                                    <label className="form-label">家屋番号</label>
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
                                        <label className="form-label">種類</label>
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
                                    <label className="form-label">構造</label>
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
                                        <label className="form-label">床面積 ㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon/>
                                    </div>
                                </div>                                
                            </div>
                        </>
                    )}

                <div className="mb-7">
                    <label className="form-label text-lg mb-7">2. 固定資産税課税明細（固定資産税評価証明書）の情報の入力</label>
                    <div className="w-full flex items-center justify-between mt-5 mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label">家屋の所在</label>
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
                                    <label className="form-label">家屋番号</label>
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
                                        <label className="form-label">種類・用途</label>
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
                                    <label className="form-label">価格</label>
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

                <div className="mb-7">
                    <FormControl>
                        <label className="form-label text-lg" id="demo-row-radio-buttons-group-label">4. 所有されていた物件は相続開始時に賃貸されていましたか。</label>
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
                        <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">賃貸割合の入力</label>
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
                    {ShowNoOption4 && (
                        <></>
                    )}
                </div>
                </form>
            </div>
        </>
    )
}

HouseAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};