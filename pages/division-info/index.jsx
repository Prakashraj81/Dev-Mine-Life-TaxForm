import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BackButtonIndex from "../../components/back-btn-index";
import FullLayout from '../../components/layouts/full/FullLayout';

export default function CashSavings() {
    let [cashSavingsList, setcashSavingsList] = useState([]);
    let totalValuation = 0;
    useEffect(() => {
        let sessionValue = sessionStorage.getItem('cashSavings');
        var tempArray =[];
        tempArray[0] = JSON.parse(sessionValue);     
        if (tempArray[0] !== null) {                   
            setcashSavingsList(tempArray);
        }
        else{
            setcashSavingsList([]);
        }        
    }, []);

    return (
        <>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        分割情報、小規模宅地等の特例の入力
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        当システムでは「特定居住用（被相続人の居住のように供していた宅地）」のみ小規模宅地等の特例の適用が可能です。※適用要件を満たしているかの確認等ご不明な点は税理士への有料相談でご確認ください。
                    </p>
                </div>
                <div className="cash-list py-3">
                    
                </div>
                <div className="w-full inline-block text-left">
                    <Link href="/division-info/division-information">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>
                <div className="Total-property-section py-5 md:py-10 lg:py-20 xl:py-20 2xl:py-20 px-5 md:px-10 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                    
                    <BackButtonIndex />
                </div>
            </div>
        </>
    )
}

CashSavings.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};