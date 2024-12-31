import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    TablePagination,
    Tooltip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import theme from "../../../../admin-components/theme";
import FullLayout from "../../../../admin-components/layouts/full/FullLayout";
import DashboardCard from "../../../../admin-components/shared/DashboardCard";
import { IconEye, IconX } from "@tabler/icons-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Users() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ViewModalOpen, setViewModalOpen] = React.useState(false);
    let [UsersList, setUsersList] = useState([]);
    let [CustomerName, setCustomerName] = useState("");
    let [CustomerDOB, setCustomerDOB] = useState("");
    let [CustomerEmail, setCustomerEmail] = useState("");
    let [CustomerPhone, setCustomerPhone] = useState("");
    let [CustomerAddress, setCustomerAddress] = useState("");

    //View details function
    const viewUser = (lists) => {
        //let viewId = Number(atob(event.currentTarget.id));
        if (lists !== null) {
            setViewModalOpen(true);
            setCustomerName(lists.customer_name);
            setCustomerDOB(lists.customer_name);
            setCustomerEmail(lists.email_id);
            setCustomerPhone(lists.phone);
            setCustomerAddress(lists.customer_name);
        }
        else {
            setViewModalOpen(false)
        }
    }

    const CloseModalFunction = () => {
        setViewModalOpen(false);
    };


    useEffect(() => {        
        GetUsersList();
    }, []);


    //Load users list
    const GetUsersList = async()=>{
        const auth_key = atob(sessionStorage.getItem("admin_auth_key"));
        if(auth_key !== null){
            try{
                const response = await fetch(`https://minelife-api.azurewebsites.net/admin/list_users?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if(response.ok){
                    setUsersList(data.user_details);
                }
                else{
                    setUsersList([]);
                }
            }catch(error){
                console.log("Errro", error);
            }
        }        
    }


    return (
        <>
            <BootstrapDialog open={ViewModalOpen}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    User details
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={CloseModalFunction}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <IconX />
                </IconButton>
                <DialogContent dividers>
                    <Box>
                        <Grid container>
                            <div className="w-full inline-block mb-7">
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Name : {CustomerName}
                                </Typography>

                            </div>
                            <div className="w-full inline-block mb-7">
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    DOB: {CustomerDOB}
                                </Typography>
                            </div>
                            <div className="w-full inline-block mb-7">
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Email: {CustomerEmail}
                                </Typography>
                            </div>
                            <div className="w-full inline-block mb-7">
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Phone: {CustomerPhone}
                                </Typography>
                            </div>
                            <div className="w-full inline-block mb-7">
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Address: {CustomerAddress}
                                </Typography>
                            </div>
                        </Grid>
                    </Box>
                </DialogContent>
            </BootstrapDialog>


            <DashboardCard title="User List">
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="simple table"
                        sx={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        S.No
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Email
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Phone
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="text-center" variant="subtitle2" fontWeight={600}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography align="center" variant="subtitle2" fontWeight={600}>
                                        Action
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {UsersList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((lists) => (
                                    <TableRow key={lists.customer_name} sx={{ border: "2px solid #f6f9fc" }}>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Typography>
                                                {lists.customer_id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box>
                                                    <Typography>
                                                        {lists.customer_name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Typography>{lists.email_id}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Typography>{lists.phone}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc", textAlign: "center" }}>
                                            {lists.is_active === "Yes" ? (
                                                <>
                                                    <Chip
                                                        className="text-xs"
                                                        style={{
                                                            backgroundColor: theme.palette.success.light,
                                                            color: theme.palette.success.main,
                                                        }}
                                                        size="small"
                                                        label={"Active"}
                                                    ></Chip>
                                                </>
                                            )
                                                :
                                                (
                                                    <>
                                                        <Chip
                                                            className="text-xs"
                                                            size="small"
                                                            style={{
                                                                backgroundColor: theme.palette.error.light,
                                                                color: theme.palette.error.main,
                                                            }}
                                                            label={"De-Active"}
                                                        ></Chip>
                                                    </>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="View" arrow sx={{ textAlign: "center" }}>
                                                <IconEye id={btoa(lists.customer_id)} onClick={() => viewUser(lists)} className="mx-auto text-primary-blue cursor-pointer" />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}

                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={UsersList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => {
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </DashboardCard>
        </>
    )
}

Users.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};