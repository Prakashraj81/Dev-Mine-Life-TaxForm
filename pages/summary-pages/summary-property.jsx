import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { list } from "postcss";

const tableList = [
    {
        id: 1,
        heading: "現金預金(外貨含む)",
        amount: 5000,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/cash-savings",
    },
    {
        id: 2,
        heading: "有価証券",
        amount: 22800,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/securities",
    },
    {
        id: 3,
        heading: "建物",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/building",
    },
    {
        id: 4,
        heading: "土地",
        amount: 750000,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/land",
    },
    {
        id: 5,
        heading: "家庭用財産",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/household-property",
    },
    {
        id: 6,
        heading: "死亡保険金等",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/death-benefit",
    },
    {
        id: 7,
        heading: "死亡退職金等",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/death-retirement-allowance",
    }, 
    {
        id: 8,
        heading: "その他財産",
        amount: 4321,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/other-property",
    },
    {
        id: 9,
        heading: "債務",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/debt",
    },
    {
        id: 10,
        heading: "葬式費用",
        amount: 700,
        icon: <ModeEditIcon className="text-white" />,
        path: "/declaration-printing/funeral-expenses",
    },    
    {
        id: 11,
        heading: "生前贈与",
        amount: 0,
        icon: <ModeEditIcon className="text-white" />,
        path: "/gift-various/gifts-taxation",
    },    

    
]

export default function SummaryProperty() {
    let amt = "";
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
                    入力したい項目の「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタンをクリックして各財産情報を入力してください。 入力が完了しましたら「入力終了（次へ）」をクリックして贈与・控除の入力へ進んで下さい。
                    </p>
                </div>
                <div className="summary-tables-wrapper max-w-screen-md mx-auto">
                    <table className="text-left table">
                        <tbody>
                            {tableList.map((list, index) => (
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
                        <Link href="/summary-pages/summary-gifts-various">
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


SummaryProperty.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};