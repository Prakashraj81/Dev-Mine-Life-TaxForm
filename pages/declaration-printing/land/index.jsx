import React, {useState, useEffect} from "react";
import Link from "next/link";
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
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FullLayout from '../../../components/layouts/full/FullLayout';
import BackButtonIndex from "../../../components/back-btn-index";
import AddPageButton from "../../../components/add-page-btn";

export default function Land() {
    let [List, setList] = useState([]);
    return (
        <>
            <Box className="house-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            土地
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8 pb-4">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        土地の情報を「<EditNoteOutlinedIcon className="text-primary-gray" />」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </Typography>
                </Box>

                <Box className="cash-list py-3">
                    <Table aria-label="land table">
                        <TableBody>
                            {List.map((list, index) => (
                                <TableRow key={index} className="border border-light-gray">
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }}>
                                        {list.address ? list.address : list.financial_institution_name}
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px', border: '1px solid lightgray' }}>{list.deposit_type}</TableCell>
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
                    <AddPageButton pageLink={"/declaration-printing/land/land-add"} />
                </Box>
                <Box className="text-center Total-property-section py-5 md:py-10 lg:py-20 xl:py-20 2xl:py-20 px-5 md:px-10 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">
                    <BackButtonIndex />
                </Box>
            </Box>
        </>
    )
}

Land.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};