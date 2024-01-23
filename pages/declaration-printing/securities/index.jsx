import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BackButtonIndex from "../../../components/back-btn-index";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function Securities() {
    let [SecuritiesList, setSecuritiesList] = useState([]);
    let totalValuation = 0;
    useEffect(() => {
        let sessionValue = sessionStorage.getItem('securities');
        var tempArray =[];
        tempArray[0] = JSON.parse(sessionValue);     
        if (tempArray[0] !== null) {                   
            setSecuritiesList(tempArray);
        }
        else{
            setSecuritiesList([]);
        }
    }, []);
    return (
        <>
            <div className="securities-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            有価証券
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    有価証券の情報を「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>
                <div className="securities-list py-8">
                    <table className="w-full border border-light-gray">                        
                        {SecuritiesList.map((list, index) => {
                            // Calculate TotalPrice correctly
                            let AmountofMoney = parseFloat(list.AmountofMoney.replace(/,/g, '').replace('.', ''));
                            totalValuation += AmountofMoney;
                            return (
                                <tr key={index}>
                                <td className="py-2 px-2 border-r border border-light-gray">{list.NameofSecurities}</td>
                                <td className="py-2 px-2 border-r border border-light-gray">{list.SecuritiesType}</td>
                                <td className="py-2 px-2 border-r border border-light-gray text-right">{list.AmountofMoney.toLocaleString()}</td>
                                <td className="py-2 px-2 border-r border border-light-gray text-right">
                                    <button id="cash_Edit" value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                        <ModeEditIcon className="text-white" />
                                    </button>
                                </td>
                                <td className="py-2 px-2 border-r border border-light-gray text-right">
                                    <button id="cash_Delete" value="Delete" className="text-base bg-red-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                        <DeleteOutlinedIcon className="text-white" />
                                    </button>
                                </td>
                            </tr>
                            );
                        })}
                    </table>
                </div>
                <div className="w-full inline-block text-left">
                    <Link href="/declaration-printing/securities/securities-add">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>                
                <div className="back-btn pt-5 md:pt-10 lg:pt-20 xl:pt-20 2xl:pt-20 text-center">
                        <BackButtonIndex />
                    </div>
            </div>
        </>
    )
}

Securities.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};