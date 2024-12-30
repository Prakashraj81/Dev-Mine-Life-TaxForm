import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";
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
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BackButtonIndex from "../../../components/back-btn-index";
import FullLayout from '../../../components/layouts/full/FullLayout';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddPageButton from "../../../components/add-page-btn";
import DeleteModal from "../../../components/modal/delete-modal";

export default function House() {
    const [buildingList, setbuildingList] = useState([]);
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [VariantSnackbar, setVariantSnackbar] = useState("success");
    const [SnackbarMsg, setSnackbarMsg] = useState("");
    const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    useEffect(() => {
        GetBuildingList();
    }, []);


    //Load cash savings list
    const GetBuildingList = async () => {
        let data;
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const params = { auth_key: auth_key };
        if (!auth_key) {
            console.log("Auth key error");
            return;
        }
        try {
            const response = await fetch(`https://minelife-api.azurewebsites.net/list_buildings?auth_key=${params.auth_key}`);
            data = await response.json();
            if (!response.ok) throw new Error(data);

            if (response.ok) {
                setbuildingList(data.buildings_details);
            }            
        } catch (error) {
            console.log("Error", error);
            setbuildingList([]);
        }
    }

    //Delete admin user function
    const handleDeleteUser = (event) => {
        setDeleteModalOpen(!DeleteModalOpen);
    };

    const DeleteModalFunction = async (event) => {
        let data;
        let value = event.currentTarget.id;
        const { auth_key, customerId, depositId, buttonValue, params } = deleteTarget;
        setDeleteModalOpen(false);
        if (value === "Yes") {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/delete_buildings?auth_key=${auth_key}&id=${depositId}`);
                data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    await GetBuildingList();
                    setVariantSnackbar("success");
                    setSnackbarMsg(data.message);                    
                    setSnackbarOpen(true);
                }
                else {
                    setVariantSnackbar("error");
                    setSnackbarMsg(data.error.message);
                    setSnackbarOpen(true);
                }
            } catch (error) {
                setVariantSnackbar("error");
                setSnackbarMsg(data.error.message);
                setSnackbarOpen(true);
            }            
        }        
    };

    //Edit and Delete 
    let router = useRouter();
    const handleEdit_DeleteButtonClick = async (event) => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        const customerId = Number(event.currentTarget.id);
        const depositId = Number(event.currentTarget.name);
        const buttonValue = event.currentTarget.value;
        const params = { auth_key: auth_key, id: depositId };
        if (customerId !== 0 && depositId !== 0 && buttonValue === "Delete") {
            setDeleteTarget({ auth_key, customerId, depositId, buttonValue, params });
            setDeleteModalOpen(true);
        }
        else {
            router.push(`/declaration-printing/building/building-add?edit=${btoa(depositId)}`);
        }
    };

    return (
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

            <Box className="house-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家屋
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        家屋の情報を「<EditNoteOutlinedIcon className="text-primary-gray" />」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </Typography>
                </Box>

                <Box className="cash-list py-3">
                    <Table aria-label="Building table">
                        <TableBody>
                            {buildingList.map((list, index) => (
                                <TableRow key={index} className="border border-light-gray">
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }}>
                                        {list.location}
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }}>{list.floor_area}</TableCell>
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }} align="right">
                                        {list.appraisal_value.toLocaleString()}
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
                    <AddPageButton pageLink={"/declaration-printing/building/building-add"} />
                </Box>
                <Box className="text-center Total-property-section py-5 md:py-10 lg:py-20 xl:py-20 2xl:py-20 px-5 md:px-10 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                    <BackButtonIndex />
                </Box>
            </Box>
        </>
    )
}

House.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};
