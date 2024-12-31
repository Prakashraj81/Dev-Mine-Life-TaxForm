/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteModal from "../../components/modal/delete-modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Button,
    Typography
} from '@mui/material';

export default function BasicInformation() {
    let [HeirList, setHeirList] = useState([]);
    let [HeirListLenth, setHeirListLenth] = useState(0);
    let [DecendentList, setDecendentList] = useState([]);
    let [showEndButton, setshowEndButton] = useState(false);
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [SnackbarMsg, setSnackbarMsg] = useState("success");
    let [DeleteModalOpen, setDeleteModalOpen] = useState(false);
    let [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        GetDecendentList();
        GetHeirList();
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    //Load decendent details list
    const GetDecendentList = async () => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        try {
            const response = await fetch(`https://minelife-api.azurewebsites.net/decedent_detail?auth_key=${auth_key}`);
            const data = await response?.json();
            if (!response.ok) throw new Error(data);

            if (response.ok) {
                setDecendentList(data);
            }
            else {
                setDecendentList([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setDecendentList([]);
        }
    };


    //Load heir details list
    const GetHeirList = async () => {
        const auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/heir_details?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    setHeirListLenth(data.heir_list.length || 0);
                    setHeirList(data.heir_list || []);
                }
                else {
                    setHeirList([]);
                }
            } catch (error) {
                console.error('Error:', error);
                setHeirList([]);
            }
        }
    };


    //Edit Decendent function
    let router = useRouter();
    const EditDecendent = async (event) => {
        const { id, name, value } = event.currentTarget;
        let ValueId = Number(id);
        if (ValueId !== 0) {
            router.push(`/basic-information/decendent?Id=${btoa(ValueId)}`);
        }
    }

    const handleHeirPage = () => {
        router.push({
            pathname: '/basic-information/heir',
            query: { heirNo: HeirListLenth + 1 },
        });
    }

    const DeleteModalFunction = async (event) => {
        let value = event.currentTarget.id;
        const { auth_key, heirId, buttonValue, params } = deleteTarget;
        if (value === "Yes") {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/delete_heir?auth_key=${auth_key}&id=${heirId}`);
                if (response.ok) {
                    setSnackbarOpen(true);
                    setSnackbarMsg("success");
                    GetHeirList();
                }
                else {
                    setSnackbarOpen(true);
                    setSnackbarMsg("error");
                    //GetCashSavingsList([]);
                }
            } catch (error) {
                setSnackbarOpen(true);
                setSnackbarMsg("error");
                console.log("Error", error);
            }
            setDeleteModalOpen(false);
        }
        else {
            setDeleteModalOpen(false);
        }
    };

    //Edit and Delete         
    const handleEdit_DeleteButtonClick = async (event) => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        let heirId = Number(event.currentTarget.id);
        let buttonValue = event.currentTarget.value;
        let params = { auth_key: auth_key, id: heirId };
        if (heirId !== 0 && buttonValue === "Delete") {
            setDeleteTarget({ auth_key, heirId, buttonValue, params });
            setDeleteModalOpen(true);
        }
        else {
            router.push(`/basic-information/heir?editId=${btoa(heirId)}`);
        }
    };


    return (
        <>
            <>
                <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={SnackbarMsg}
                        variant="filled"
                        sx={{ width: '100%', color: "#FFF" }}
                    >
                        This is a {SnackbarMsg} Alert!
                    </Alert>
                </Snackbar>

                {DeleteModalOpen && (
                    <DeleteModal DeleteModalOpen={DeleteModalOpen} DeleteModalFunction={DeleteModalFunction} />
                )}
            </>

            <Box className="basic-information-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            基礎情報の入力
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        被相続人、相続を受ける方の情報を「<EditNoteOutlinedIcon />」ボタン、「追加する」ボタンをクリックし、ご入力ください。入力が完了しましたら「入力終了（次へ）」をクリックし、財産情報の入力へ進んでくださ い。
                    </Typography>
                </Box>
                <Box className="input-details">
                    <Box className="decedent">
                        <Box>
                            <Typography component="div" className="decedent-heading py-3">
                                <span>被相続人</span>
                            </Typography>
                            <Table aria-label="decedent table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ paddingLeft: 0 }}>氏名</TableCell>
                                        <TableCell>お亡くなりになった日</TableCell>
                                        <TableCell align="right">アクション</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className="border-b">
                                        <TableCell sx={{ paddingLeft: 0 }}>
                                            <Typography>{DecendentList.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{DecendentList.date_of_death}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ paddingRight: 0 }}>
                                            <Box className="flex justify-end">
                                                <Button
                                                    onClick={EditDecendent}
                                                    id={"1"}
                                                    name={DecendentList.name}
                                                    value="Edit"
                                                    sx={{
                                                        minWidth: 'auto',
                                                        backgroundColor: 'info.main',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'info.light',
                                                            color: 'info.main',
                                                            '& .MuiSvgIcon-root': {
                                                                color: 'info.main', // Change the icon color on hover
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
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        <Box className="heir-list py-10">
                            <Box className="heir-heading py-3"><Typography component={"span"}>相続人</Typography></Box>
                            <Table className="w-full" aria-label="heir list table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ paddingLeft: 0 }}>氏名</TableCell>
                                        <TableCell>続柄</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>割合</TableCell>
                                        <TableCell sx={{ paddingRight: 0 }} align="right">アクション</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {HeirList.map((list, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow className="border-b">
                                                <TableCell sx={{ paddingLeft: 0 }} align="left">
                                                    <Typography fontSize={16}>{list.name}</Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography fontSize={16}>{list.relationship_with_decedent}</Typography>
                                                </TableCell>
                                                <TableCell align="left"></TableCell>
                                                <TableCell align="left">
                                                    <Typography fontSize={16}>{HeirListLenth ? `1/${HeirListLenth}` : "1/1_"}</Typography>
                                                </TableCell>
                                                <TableCell sx={{ paddingRight: 0 }}>
                                                    <Box className="flex justify-end items-end">
                                                        <Box>
                                                            <Button
                                                                onClick={handleEdit_DeleteButtonClick}
                                                                id={list.heir_id}
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
                                                                id={list.heir_id}
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
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>

                    <Box className="w-full inline-block text-right py-10">
                        <Box className="add-btn">
                            <Button
                                onClick={handleHeirPage}
                                id="heir_add"
                                value="heirAdd"
                                sx={{
                                    minWidth: 'auto',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'primary.main',
                                        '& .MuiSvgIcon-root': {
                                            color: 'primary.main', // Change the icon color on hover
                                        },
                                        '& .MuiTypography-root': {
                                            color: 'primary.main', // Change the typography color on hover
                                        },
                                    },
                                    borderRadius: '3px',
                                    paddingLeft: 0.7,
                                    paddingRight: 0.7,
                                    py: 0.6,
                                    transition: 'all 0.7s ease',
                                }}
                            >
                                <AddIcon />
                                <Typography component={"span"} sx={{ marginLeft: 1 }}>追加する</Typography>
                            </Button>
                        </Box>
                    </Box>
                    <Box className="page-description">
                        <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                            無料de相続は相続人6人までの申告書作成ができます。法定相続人がいない場合や相続人が7人以上いる場合は税理士にご相談ください。
                        </p>
                    </Box>
                    {showEndButton && (
                        <Box className="end-btn text-center py-10">
                            <Link href="/summary-pages/summary-property">
                                <button type="button" className="cursor-pointer bg-primary-color rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300">
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        入力終了（次へ）
                                    </span>
                                </button>
                            </Link>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}


BasicInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};