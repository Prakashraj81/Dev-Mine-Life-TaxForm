import React from "react";
import Link from "next/link";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function AllocationDisability() {
    return (
        <>
            <div>
                AllocationDisability
            </div>
        </>
    )
}

AllocationDisability.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};