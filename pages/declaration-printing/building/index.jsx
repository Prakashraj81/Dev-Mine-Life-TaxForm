import React from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function House() {
    return (
        <>
            <div className="house-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家屋
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    家屋の情報を「<EditOutlinedIcon className="rotate-1"/>」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>
                
                <div className="w-full inline-block text-left">
                    <Link href="/declaration-printing/building/house-add">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
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
                    <BackButton />
                </div>
            </div>
        </>
    )
}

House.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
