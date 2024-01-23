import React from "react";
import Link from "next/link";
import FullLayout from '../../components/layouts/full/FullLayout';

export default function DonationsBequests() {
    return (
        <>
            <div>
                DonationsBequests
            </div>
        </>
    )
}

DonationsBequests.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};