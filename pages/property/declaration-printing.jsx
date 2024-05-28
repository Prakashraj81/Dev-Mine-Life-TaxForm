"use client";
import React, { useState, useEffect, useRef, Fragment, Controller } from "react";
import Link from "next/link";
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { list } from "postcss";
import axios from 'axios';

const tableList = [
    {
        id: 1,
        class:"",
        heading: "第1表",
        secondheading: "相続税の申告書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/exceptions-residential-land",
    },
    {
        id: 2,
        class:"",
        heading: "第2表",
        secondheading: "相続税の総額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/gifts-taxation",
    },
    {
        id: 3,
        class:"",
        heading: "第4表",
        secondheading: "相続税額の加算金額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/deduction-minors",
    },
    {
        id: 4,
        class:"",
        heading: "第6表",
        secondheading: "未成年者・障害者控除額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/allocation-amount",
    },
    {
        id: 5,
        class:"",
        heading: "第7表",
        secondheading: "相次相続控除額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/successive-inheritance",
    },    
    {
        id: 5,
        class:"",
        heading: "第14表",
        secondheading: "純資産価額に加算される暦年課税分の贈与財産価額及び特定",
        secondheading1: "贈与財産価額明細書",
        secondheading2: "遺贈・寄附した財産の明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/successive-inheritance",
    },    
];


export default function DeclarationPrinting() {   
    let [ApiRoute, setApiRoute] = useState("");
    let [ApiResponse, setApiResponse] = useState("");
    let [ApiClassName, setApiClassName] = useState("");
    let [auth_key, setauth_key] = useState("");

const TargetBlankClick = (event) => {
    auth_key = atob(sessionStorage.getItem("auth_key"));
    setauth_key(auth_key);
    let tableHeading = event.currentTarget.id;
    if(tableHeading == "第1表"){
        ApiRoute = "generate_table_1_pdf";        
    }
    else if(tableHeading == "第2表"){
        ApiRoute = "generate_table_2_pdf";
    }
    else if(tableHeading == "第4表"){
        ApiRoute = "generate_table_4_pdf";
    }
    else if(tableHeading == "第6表"){
        ApiRoute = "generate_table_6_pdf";
    }
    else if(tableHeading == "第7表"){
        ApiRoute = "generate_table_7_pdf";
    }
    else if(tableHeading == "第14表"){
        ApiRoute = "generate_table_14_pdf";
    }
    else{

    }
    if(ApiRoute !== ""){
        const url = `https://minelife-api.azurewebsites.net/${ApiRoute}?auth_key=${auth_key}`;
        window.open(url, '_blank');
    }    
    else{

    }
};

    return (
        <>
            <div className="summary-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        3年以内贈与・各種特例・税額控除の入力
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    入力おつかれさまでした。ご入力いただいた情報を基に作成された相続税申告書のダウンロードができます。<br/>
                    マイナンバーおよび提出日を手書きしてください。
                    </p>
                </div>

                <div className="summary-tables-wrapper max-w-screen-md mx-auto">
                    <div className="py-5 text-center w-full inline-block">
                        <h5 className="text-xl font-medium tracking-2">個別ダウンロード</h5>
                    </div>
                    <table className="text-left table">
                        <tbody>
                        {tableList.map((list, index) => {
                            return (
                                <tr className="border-t w-full" id={list.id}>
                                    <td className={list.class ? "line-through w-50 py-5" : "w-50 py-5"}>{list.heading}</td>
                                    <td className={list.class ? "line-through w-50 py-5" : "w-50 py-5"}>{list.secondheading}</td>
                                    <td className="pl-10">
                                        <button onClick={TargetBlankClick} id={list.heading} className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                            {list.icon}                                        
                                        </button>                                      
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>                
                
                <div className="w-full hidden flex justify-evenly items-center py-10">
                    <BackButton />
                    <div className="save-btn text-center">
                        <button
                            type="submit"
                            className="bg-primary-color rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                        >
                            <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                保存
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


DeclarationPrinting.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};