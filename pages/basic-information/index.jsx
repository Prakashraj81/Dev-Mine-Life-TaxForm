import React from "react";
import { ReactElement } from 'react';
import Link from "next/link";
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';

export default function BasicInformation() {
    return (
        <>
            <div className="basic-information-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            基礎情報の入力
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        被相続人、相続を受ける方の情報を「」ボタン、「追加する」ボタンをクリックし、ご入力ください。入力が完了しましたら「入力終了（次へ）」をクリックし、財産情報の入力へ進んでくださ い。わからない項目は「？」をご確認ください。
                    </p>
                </div>
                <div className="input-details">
                    <div className="decedent">
                        <div className="block lg:flex xl:flex 2xl:flex justify-between items-center">
                            <div className="w-6/12 inline-block float-left">
                                <h5 className="text-sm tracking-2 text-custom-black">被相続人</h5>
                            </div>
                            <div className="w-6/12 inline-block text-right">
                                <Link href="/basic-information/decendent">
                                    <button id="decedent_edit" className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                        <ModeEditIcon className="text-white" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="block py-4 lg:flex xl:flex 2xl:flex justify-between items-center">
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-custom-black">氏名</p>
                            </div>
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-black">お亡くなりになった日</p>
                            </div>
                        </div>
                        <div className="block lg:flex xl:flex 2xl:flex justify-between items-center">
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-custom-black">Prakash</p>
                            </div>
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-black">2022-12-31</p>
                            </div>
                        </div>
                    </div>

                    <div className="heir py-10 border-b-2">
                        <div className="block lg:flex xl:flex 2xl:flex justify-between items-center">
                            <div className="w-10/12 inline-block float-left">
                                <h5 id="heir_name" className="text-sm tracking-2 text-custom-black">相続人</h5>
                            </div>
                            <div className="w-2/12 inline-block text-right">
                                <div className="flex justify-end items-center">
                                    <button id="decedent_edit" className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                        <ModeEditIcon className="text-white" />
                                    </button>
                                    <button id="decedent_delete" className="text-sm bg-red-600 ml-5 rounded-sm hover:bg-red-600 px-1 py-1 tracking-2 text-custom-black">
                                        <DeleteOutlinedIcon className="text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="block py-4 lg:flex xl:flex 2xl:flex justify-between items-center">
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-custom-black">氏名</p>
                            </div>
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-black">続柄</p>
                            </div>
                        </div>
                        <div className="block lg:flex xl:flex 2xl:flex justify-between items-center">
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-custom-black">Raj</p>
                            </div>
                            <div className="w-6/12 inline-block float-left">
                                <p className="text-sm tracking-2 text-black">祖父</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full inline-block text-right py-10">
                        <div className="add-btn">
                            <Link href="/basic-information/heir-2">
                                <button id="decedent_edit" className="text-sm text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                    <AddIcon className="text-white" />
                                    追加する
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="page-description">
                        <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                            無料de相続は法定相続人が１人以上いる相続人6人までの申告書作成ができます。法定相続情報人がいない場合や、相続人7人以上の場合は税理士法人マインライフまでお問い合わせください。
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


BasicInformation.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};