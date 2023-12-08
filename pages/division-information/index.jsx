import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';

export default function DivisionInformation() {    
    return (
        <>
            <div className="basic-information-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                             分割情報、小規模宅地等の特例の入力
                        </p>
                    </div>
                </div>                          
            </div>
        </>
    )
}


DivisionInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};