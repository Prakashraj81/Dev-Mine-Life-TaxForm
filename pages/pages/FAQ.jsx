import React from "react";
import FullLayout from "../../components/layouts/full/FullLayout";

export default function FAQ(){
    return(
        <>
        <div className="Support-tickets-wrapper">
            <p>FAQ</p>
        </div>
        </>
    )
}

FAQ.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};