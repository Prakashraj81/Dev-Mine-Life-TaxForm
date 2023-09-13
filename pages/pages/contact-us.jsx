import React from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '../../components/header';
import Footer from '../../components/footer';
import BlankLayout from '../../components/layouts/blank/BlankLayout';


export default function ContactUs() {
    return(
        <>
            <Header />
            <div className="contact-wrapper bg-custom-light-1 py-24">
                <div className="px-4 lg:px-0 xl:px-0 2xl:px-0 max-w-5xl mx-auto">
                    <div className="page-heading text-center pb-14">
                        <label className="text-3xl text-black font-medium">お問い合わせ・申し込み</label>
                    </div>
                    <div className="pb-10 text-center">
                        <p className="text-base  tracking-2 leading-7">サービスに関するお問い合わせ、お申し込み、各種ご相談は下記のフォーム、またはお電話よりお送りください。</p>
                    </div>
                    <div className="text-center">
                    <p className="">                        
                    <PhoneIcon/><span>050-3186-1160</span>
                    </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

ContactUs.getLayout = function getLayout(page) {
    return <BlankLayout>{page}</BlankLayout>;
};