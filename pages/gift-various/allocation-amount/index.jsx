"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function AllocationAmount() {
    return (
        <>
            <div className="securities-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            障害者控除額が本人の税額を超える場合の割振り
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full inline-block">
                <form action="#" method="POST">
                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
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
                                    <span>山田　太郎</span>
                                    <div className="text-right"><input type="text" value="0" className="border-2 h-10 text-right form-control w-50 outline-none"

                                    /></div>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>相続人未決定</span>
                                    <span>0</span>
                                </li>
                                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                    <span>合計</span>
                                    <span>0</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <div className="save-btn text-center">
                            <BackButton />
                        </div>
                        <div className="save-btn text-center">
                            <button
                                className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                    保存して戻る
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


AllocationAmount.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};