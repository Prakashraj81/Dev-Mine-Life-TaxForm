import React from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function LifeInsurance() {
    return (
        <>
            <div className="life-insurance-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        生命保険金・死亡退職手当金
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    家庭用財産の情報を「追加する」ボタンをクリックし、ご入力ください。
                    </p>
                </div>
                <div className="w-full inline-block text-left">
                    <Link href="/declaration-printing/life-insurance/life-insurance-add">
                        <button className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                    <div className="heading text-center">
                        <h5 className="text-sm text-black tracking-2 font-medium">財産の合計</h5>
                    </div>
                    <div className="total-list pt-10">
                        <ul>
                            <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                                <span>山田　太郎</span>
                                <span>0</span>
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
                    <div className="back-btn pt-20 text-center">
                        <Link href="/">
                            <button
                                className="bg-return-bg rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                    戻る
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

LifeInsurance.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};