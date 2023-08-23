import React, { useEffect, useState } from "react";
import BackButton from "../back-btn";

export default function HeirList({TotalPrice}) {
    //let TotalPrice = "10,000";
    let HeirList = [
        { id: 1, name: "User", name1: "山田　太郎", value: "1000" },
        { id: 2, name: "Shree", name1: "Shree", value: "5,000" },
        { id: 3, name: "Prakashraj", name1: "Prakashraj", value: "5,000" },
        { id: 4, name: "Gowtham", name1: "Gowtham", value: "7,500" },
    ];
    
    let totalValuation = 0;
    let total = 0;    
    
    return (
        <>
            <div className="Total-property-section py-5 md:py-10 lg:py-20 xl:py-20 2xl:py-20 px-5 md:px-10 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-sm xl:max-w-screen-sm 2xl:max-w-screen-sm">
                <div className="heading text-center">
                    <h5 className="text-sm text-black tracking-2 font-medium">財産の合計</h5>
                </div>
                <div className="total-list pt-10">
                    <ul>
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>受取人</span>
                            <span>取得財産の価額</span>
                        </li>
                        {HeirList.map((heirList , index) => {
                            // Calculate TotalPrice correctly
                            let heirValue = parseFloat(heirList.value.replace(/,/g, '').replace('.', ''));
                            totalValuation += heirValue;
                            total = parseFloat(TotalPrice.replace(/,/g, '').replace('.', ''));
                            total = total -= heirValue;
                            return (
                                <li id={ heirList.id} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>{heirList.name}</span>
                                    <span>{totalValuation.toLocaleString()}</span>
                                </li>
                            );
                        })}
                        
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>相続人未決定</span>
                            <span>{total.toLocaleString()}</span>
                        </li>
                        <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                            <span>合計</span>
                            <span>{TotalPrice}</span>
                        </li>
                    </ul>
                </div>
                <div className="py-10">
                <BackButton />
                </div>
            </div>
        </>
    )
}