import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BackButtonIndex from "../../../components/back-btn-index";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function HouseholdProperty() {
    let [houseHoldPropertyList, sethouseHoldPropertyList] = useState([]);
    let [TotalPrice, setTotalPrice] = useState("0");
    let totalValuation = 0;
    useEffect(() => {
        let sessionValue = sessionStorage.getItem('HouseholdProperty');
        var tempArray = [];
        tempArray[0] = JSON.parse(sessionValue);
        if (tempArray[0] !== null) {
            sethouseHoldPropertyList(tempArray);
        }
        else {
            sethouseHoldPropertyList([]);
        }
    }, []);

    
    return (
        <>
            <div className="household-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家庭用財産
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    家庭用財産の情報を「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>
                <div className="cash-list py-3">
                    <table className="w-full border border-light-gray">
                        {houseHoldPropertyList.map((list, index) => {
                            // Calculate TotalPrice correctly
                            let Valuation = parseFloat(list.Valuation.replace(/,/g, '').replace('.', ''));
                            totalValuation += Valuation; 
                            return (
                                <tr key={index}>
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.PropertyContent}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.Address}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">{list.Valuation.toLocaleString()}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">
                                        <button value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
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
                    <Link href="/declaration-printing/household-property/household-property-add">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-sm xl:max-w-screen-sm 2xl:max-w-screen-sm">                    
                    <BackButtonIndex />
                </div>
            </div>
        </>
    )
}

HouseholdProperty.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};