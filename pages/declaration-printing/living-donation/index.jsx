import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Box,
    Button,
    Typography
} from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FullLayout from '../../../components/layouts/full/FullLayout';
import BackButtonIndex from "../../../components/back-btn-index";
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteModal from "../../../components/modal/delete-modal";
import AddPageButton from "../../../components/add-page-btn";

export default function LivingDonation() {
    let [LivingDonationList, setLivingDonationList] = useState([]);
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
        GetLivingDonationList();
    }, []);


    //Load cash savings list
    // eslint-disable-next-line no-unused-vars
    const GetLivingDonationList = async () => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_gift_during_life?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    setLivingDonationList(data?.gift_during_life_details);
                }
            } catch (error) {
                console.log("Errro", error);
                setLivingDonationList([]);
            }
        }
    }

    const DeleteModalFunction = async (event) => {
        let data;
        let value = event.currentTarget.id;
        const { auth_key, LivingDonationId } = deleteTarget;
        if (value === "Yes") {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/delete_living_donation?auth_key=${auth_key}&id=${LivingDonationId}`);
                data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    setVariantSnackbar("success");
                    setSnackbarMsg(data.message);
                    GetLivingDonationList();
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.log("Errro", error);
                setVariantSnackbar("error");
                setSnackbarMsg(data.error.message);
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
        let LivingDonationId = Number(event.currentTarget.name);
        let buttonValue = event.currentTarget.value;
        let params = { auth_key: auth_key, id: LivingDonationId };
        if (customerId !== 0 && LivingDonationId !== 0 && buttonValue === "Delete") {
            setDeleteTarget({ auth_key, customerId, LivingDonationId, buttonValue, params });
            setDeleteModalOpen(true);
        }
        else {
            router.push(`/declaration-printing/living-donation/living-donation-add?edit=${btoa(LivingDonationId)}`);
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
            <Box className="other-property-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            生前贈与
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8 pb-4">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        生前贈与の情報を「<EditNoteOutlinedIcon className="text-primary-gray" />」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </Typography>
                </Box>

                <Box className="cash-list py-3">
                    <Table aria-label="Living donation table">
                        <TableBody>
                            {LivingDonationList?.map((list, index) => (
                                <TableRow key={index} className="border border-light-gray">
                                    <TableCell sx={{ width: 300, padding: '8px', border: '1px solid lightgray' }}>
                                        {list.gift_type}
                                    </TableCell>
                                    <TableCell sx={{ width: 250, padding: '8px', border: '1px solid lightgray' }}>{list.details_of_gift_property}</TableCell>
                                    <TableCell sx={{ width: 150, padding: '8px', border: '1px solid lightgray' }}>{list.heir_name}</TableCell>
                                    <TableCell sx={{ width: 150, padding: '8px', border: '1px solid lightgray' }} align="right">
                                        {list.amount_donated.toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{ width: 120, padding: '8px', border: '1px solid lightgray' }} align="right">
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
                    <AddPageButton pageLink={"/declaration-printing/living-donation/living-donation-add"} />
                </Box>
                <Box className="text-center Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                    <BackButtonIndex />
                </Box>
            </Box>
        </>
    )
}

LivingDonation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};