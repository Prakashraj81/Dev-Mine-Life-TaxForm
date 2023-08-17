import React from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BackButton from "../../../components/back-btn";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function CashSavingsList() {
    return (
        <>
           
        </>
    )
}

CashSavingsList.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};