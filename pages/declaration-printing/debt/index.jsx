import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FullLayout from '../../../components/layouts/full/FullLayout';
import HeirList from "../../../components/heir-list-box/heir-list";
import BackButtonIndex from "../../../components/back-btn-index";

export default function Debt() {
    let [DebtList, setDebtList] = useState([]);
    let [TotalPrice, setTotalPrice] = useState("0");
    let totalValuation = 0;
    var tempArray = [];
    // useEffect(() => {
    //     let sessionValue = sessionStorage.getItem('Debt');
    //     tempArray = [];
    //     tempArray[0] = JSON.parse(sessionValue);
    //     if (tempArray[0] !== null) {
    //         setDebtList(tempArray);
    //     }
    //     else {
    //         setDebtList([]);
    //     }
    // }, []);    
    return (
        <>
            <div className="life-insurance-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            債務
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    債務の情報を「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>
                <div className="cash-list py-3">
                    <table className="w-full border border-light-gray">
                        {DebtList.map((list, index) => {
                            // Calculate TotalPrice correctly
                            let AmountofMoney = parseFloat(list.AmountofMoney.replace(/,/g, '').replace('.', ''));
                            totalValuation += AmountofMoney;
                            setTotalPrice(list.AmountofMoney);
                            return (
                                <tr key={index}>                       
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.NameofDebt}</td>             
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.OtherParty}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">{list.AmountofMoney.toLocaleString()}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">
                                        <button id="cash_Edit" value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                            <ModeEditIcon className="text-white" />
                                        </button>
                                    </td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">
                                        <button id="cash_Delete" value="Delete" className="text-base bg-red-600 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                            <DeleteOutlinedIcon className="text-white" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </table>
                </div>                
                <div className="w-full inline-block text-left">
                    <Link href="/declaration-printing/debt/debt-add">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">                    
                    <BackButtonIndex />
                </div>
            </div>
        </>
    )
}

Debt.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};