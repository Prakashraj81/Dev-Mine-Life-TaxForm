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
        class:"line-through",
        heading: "第1表",
        secondheading: "相続税の申告書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/exceptions-residential-land",
    },
    {
        id: 2,
        class:"line-through",
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
        class:"line-through",
        heading: "第４表の付表",
        secondheading: "相続税額の加算金額の計算書付表",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/allocation-amount",
    },
    {
        id: 5,
        class:"",
        heading: "第5表",
        secondheading: "配偶者の税額軽減額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/successive-inheritance",
    },    
]

export default function DeclarationPrinting() {     
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
                            {tableList.map((list, index) => (
                                <tr className="border-t w-full" id={list.id}>
                                    <td className={list.class ? "line-through w-50 py-5" : "w-50 py-5"}>{list.heading}</td>
                                    <td className={list.class ? "line-through w-50 py-5" : "w-50 py-5"}>{list.secondheading}</td>
                                    <td className="pl-10">
                                        <a>
                                            <button id="decedent_edit" className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                                {list.icon}
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>                
                
                <div className="w-full flex justify-evenly items-center py-10">
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