/* eslint-disable react/jsx-key */
import Link from "next/link";
import React, { Fragment } from "react";
import BackButton from "../../components/back-btn";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const tableList = [
    // {
    //     id: 1,
    //     heading: "小規模宅地等の特例",
    //     amount: 5000,
    //     icon: <ModeEditIcon className="text-white" />,
    //     path: "/gift-various/exceptions-residential-land",
    // },
    {
        id: 2,
        heading: "生前贈与",
        amount: 22800,         
        icon: <ModeEditIcon className="text-white" />,
        path: "/gift-various/gifts-taxation",
    },
    {
        id: 3,
        heading: "未成年控除",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/gift-various/deduction-minors",
    },
    {
        id: 4,
        heading: "障害者控除",
        amount: 750000,
        icon: <ModeEditIcon className="text-white" />,
        path: "/gift-various/allocation-amount",
    },
    {
        id: 5,
        heading: "相次相続控除",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/gift-various/successive-inheritance",
    },    
]

export default function SummaryGiftVarious() {    
    return (
        <>
        
            <div className="summary-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        まとめ
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    入力したい項目の「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタンをクリックして各贈与・控除情報を入力してください。 入力が完了しましたら「入力終了（次へ）」をクリックして申告書印刷へ進んで下さい。 
                    </p>
                </div>
                <div className="summary-tables-wrapper max-w-screen-md mx-auto">
                    <table className="text-left table">
                        <tbody>
                            {tableList.map((list) => (
                                <tr className="border-t" id={list.id}>
                                    <th className="w-full py-5 font-medium">{list.heading}</th>
                                    <td className="text-right">{list.amount.toLocaleString()}</td>
                                    <td className="pl-10">
                                        <Link href={list.path}>
                                            <button id="decedent_edit" className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                                {list.icon}
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                <div className="w-full flex justify-evenly items-center">
                    <BackButton />
                    <div className="end-btn text-center">
                        <Link href="/property/declaration-printing">
                        <button
                                type="button"
                                
                                className="cursor-pointer bg-primary-color rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                入力終了（次へ）
                                </span>
                            </button>
                        </Link>
                    </div>           
                </div>
                </div>                
            </div>
        </>
    )
}


SummaryGiftVarious.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};