import React, { useEffect, useState } from "react";
import Link from "next/link";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import BackButtonIndex from "../../../components/back-btn-index";
import FullLayout from '../../../components/layouts/full/FullLayout';
import axios from "axios";
import { useRouter } from 'next/router';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    Typography
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddPageButton from "../../../components/add-page-btn";
import DeleteModal from "../../../components/modal/delete-modal";

export default function Securities() {
    let [SecuritiesList, setSecuritiesList] = useState([]);
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
        GetSecuritiesList();
    }, []);


    //Load cash savings list
    const GetSecuritiesList = async () => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/list_securities', { params });
                if (response.status === 200) {
                    setSecuritiesList(response.data.securities_details);
                }
                else {
                    setSecuritiesList([]);
                }
            } catch (error) {
                console.log("Errro", error);
            }
        }
    }


    const DeleteModalFunction = async (event) => {
        let value = event.currentTarget.id;
        const { auth_key, customerId, securityId, buttonValue, params } = deleteTarget;
        if (value === "Yes") {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/delete_securities', { params });
                if (response.status === 200) {
                    setVariantSnackbar("success");
                    setSnackbarMsg(response.data.message);
                    GetSecuritiesList();
                    setSnackbarOpen(true);
                }
                else {
                    setVariantSnackbar("error");
                    setSnackbarMsg(response.data.message);
                    GetSecuritiesList([]);
                    setSnackbarOpen(true);
                }
            } catch (error) {
                setVariantSnackbar("error");
                setSnackbarMsg("Securities details not deleted");
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
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        let customerId = Number(event.currentTarget.id);
        let securityId = Number(event.currentTarget.name);
        let buttonValue = event.currentTarget.value;
        let params = { auth_key: auth_key, id: securityId };
        if (customerId !== 0 && securityId !== 0 && buttonValue === "Delete") {
            setDeleteTarget({ auth_key, customerId, securityId, buttonValue, params });
            setDeleteModalOpen(true);
        }
        else {
            router.push(`/declaration-printing/securities/securities-add?edit=${btoa(securityId)}`);
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
            <Box className="securities-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            有価証券
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8 pb-4">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        有価証券の情報を「<EditNoteOutlinedIcon className="text-primary-gray" />」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </Typography>
                </Box>
                <Box className="securities-list py-3">                   
                    <Table aria-label="Securities table">
                        <TableBody>
                            {SecuritiesList.map((list, index) => (
                                <TableRow key={index} className="border border-light-gray">
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }}>
                                        {list.name_and_issues}
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }}>{list.securities_type}</TableCell>
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }} align="right">
                                        {list.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }} align="right">
                                        <Box className="flex justify-end items-end">
                                            <Box>
                                                <Button
                                                    onClick={handleEdit_DeleteButtonClick}
                                                    id={list.customer_id}
                                                    name={list.id}
                                                    value="Edit"
                                                    sx={{
                                                        minWidth: 'auto',
                                                        backgroundColor: 'info.main',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'info.light',
                                                            color: 'info.main',
                                                            '& .MuiSvgIcon-root': {
                                                                color: 'info.main',
                                                            },
                                                        },
                                                        borderRadius: '3px',
                                                        paddingLeft: 0.7,
                                                        paddingRight: 0.7,
                                                        py: 0.6,
                                                        transition: 'all 0.7s ease',
                                                    }}
                                                >
                                                    <EditNoteOutlinedIcon />
                                                </Button>
                                            </Box>
                                            <Box className="pl-5">
                                                <Button
                                                    onClick={handleEdit_DeleteButtonClick}
                                                    id={list.customer_id}
                                                    name={list.id}
                                                    value="Delete"
                                                    sx={{
                                                        minWidth: 'auto',
                                                        backgroundColor: 'error.main',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'error.light',
                                                            color: 'error.main',
                                                            '& .MuiSvgIcon-root': {
                                                                color: 'error.main',
                                                            },
                                                        },
                                                        borderRadius: '3px',
                                                        paddingLeft: 0.7,
                                                        paddingRight: 0.7,
                                                        py: 0.6,
                                                        transition: 'all 0.7s ease',
                                                    }}
                                                >
                                                    <HighlightOffOutlinedIcon />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box className="w-full inline-block text-left pt-3">
                    <AddPageButton pageLink={"/declaration-printing/securities/securities-add"} />
                </Box>
                <Box className="text-center Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                    <BackButtonIndex />
                </Box>
            </Box>
        </>
    )
}

Securities.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};