import React from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function ExceptionsResidentialLand() {
    return (
        <>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        小規模宅地の特例
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    小規模宅地の特例の情報を「<AddIcon />追加する」ボタンをクリックし、ご入力ください。 
                    </p>
                </div>
                <div className="w-full inline-block text-left">
                    <Link href="/gift-various/exceptions-residential-land/exceptions-residential-add">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">                    
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

ExceptionsResidentialLand.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};