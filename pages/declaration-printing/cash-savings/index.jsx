import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import BackButtonIndex from "../../../components/back-btn-index";
import FullLayout from '../../../components/layouts/full/FullLayout';
import CashSavingsAdd from "./cash-savings-add";
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteModal from "../../../components/modal/delete-modal";

export default function CashSavings() {
    let [cashSavingsList, setcashSavingsList] = useState([]);
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [VariantSnackbar, setVariantSnackbar] = useState("success");
    let [SnackbarMsg, setSnackbarMsg] = useState("");
    let [DeleteModalOpen, setDeleteModalOpen] = useState(false);
    let [deleteTarget, setDeleteTarget] = useState(null);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    useEffect(() => {
        GetCashSavingsList();
    }, []);


    //Load cash savings list
    const GetCashSavingsList = async () => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/list_cash_deposit', { params });
                if (response.status === 200) {
                    setcashSavingsList(response.data.cash_deposit_details);
                }
                else {
                    setcashSavingsList([]);
                }
            } catch (error) {
                console.log("Error", error);
            }
        }
    }

    //Delete admin user function
    const handleDeleteUser = (event) => {
        setDeleteModalOpen(!DeleteModalOpen);
    }

    const DeleteModalFunction = async (event) => {
        let value = event.currentTarget.id;
        const { auth_key, customerId, depositId, buttonValue, params } = deleteTarget;
        if (value === "Yes") {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/delete_cash_deposit', { params });
                if (response.status === 200) {
                    setVariantSnackbar("success");
                    setSnackbarMsg(response.data.message);
                    GetCashSavingsList();
                    setSnackbarOpen(true);
                }
                else {
                    setVariantSnackbar("error");
                    setSnackbarMsg(response.data.message);
                    GetCashSavingsList([]);
                    setSnackbarOpen(true);
                }
            } catch (error) {
                setVariantSnackbar("error");
                setSnackbarMsg("Cash details not deleted");
            }
            setDeleteModalOpen(false);
        }
        else {
            setDeleteModalOpen(false);
        }
    };

    //Edit and Delete 
    let router = useRouter();
    const handleEdit_DeleteButtonClick = async (event) => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        let customerId = Number(event.currentTarget.id);
        let depositId = Number(event.currentTarget.name);
        let buttonValue = event.currentTarget.value;
        let params = { auth_key: auth_key, id: 0 };
        if (customerId !== 0 && depositId !== 0 && buttonValue === "Delete") {
            setDeleteTarget({ auth_key, customerId, depositId, buttonValue, params });
            setDeleteModalOpen(true);
        }
        else {
            router.push(`/declaration-printing/cash-savings/cash-savings-add?edit=${btoa(depositId)}`);
        }
    };

    return (
        <>
            <>
                <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={VariantSnackbar}
                        variant="filled"
                        sx={{ width: '100%', color: "#FFF" }}
                    >
                        {SnackbarMsg}
                    </Alert>
                </Snackbar>

                {DeleteModalOpen && (
                    <DeleteModal DeleteModalOpen={DeleteModalOpen} DeleteModalFunction={DeleteModalFunction} />
                )}
            </>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            現金・預貯金
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        現金・預貯金の情報を「<EditNoteOutlinedIcon className="text-primary-gray" />」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>
                <div className="cash-list py-3">
                    <table className="w-full border border-light-gray">
                        {cashSavingsList.map((list, index) => {
                            return (
                                <tr key={index}>
                                    {list.address ?
                                        <td className="py-2 px-2 border-r border border-light-gray">{list.address}</td>
                                        :
                                        <td className="py-2 px-2 border-r border border-light-gray">{list.financial_institution_name}</td>
                                    }
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.deposit_type}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">{list.amount.toLocaleString()}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">
                                        <button id={list.customer_id} name={list.id} onClick={handleEdit_DeleteButtonClick} value="Edit" className="text-base bg-blue-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                            <EditNoteOutlinedIcon className="text-white" />
                                        </button>
                                    </td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">
                                        <button id={list.customer_id} name={list.id} onClick={handleEdit_DeleteButtonClick} value="Delete" className="text-base bg-red-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                            <HighlightOffOutlinedIcon className="text-white" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
                <div className="w-full inline-block text-left">
                    <Link href="/declaration-printing/cash-savings/cash-savings-add">
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