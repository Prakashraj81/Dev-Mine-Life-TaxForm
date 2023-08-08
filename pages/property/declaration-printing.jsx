import React from "react";
import Link from "next/link";
import FullLayout from '../../components/layouts/full/FullLayout';

export default function DeclarationPrinting() {
    return (
        <>
            <div>
                DeclarationPrinting
            </div>
        </>
    )
}

DeclarationPrinting.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};