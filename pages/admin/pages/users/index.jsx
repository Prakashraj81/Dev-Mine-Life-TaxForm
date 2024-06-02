import React from "react";
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
    Button,
    TablePagination,
    Tooltip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import theme from "../../../../admin-components/theme";
import FullLayout from "../../../../admin-components/layouts/full/FullLayout";
import DashboardCard from "../../../../admin-components/shared/DashboardCard";
import { IconEye, IconCirclePlus, IconTrashX, IconX } from "@tabler/icons-react";

const products = [
    {
        id: "1",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "Active",
    },
    {
        id: "2",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "InActive",
    },
    {
        id: "3",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "Active",
    },
    {
        id: "4",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "Active",
    },
    {
        id: "5",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "InActive",
    },
    {
        id: "6",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "InActive",
    },
    {
        id: "7",
        name: "Prakashraj",
        email: "prakash.raj@g-japan.com",
        date: "2023-06-05",
        status: "Active",
    },
];

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

    //View details function
    const viewUser = (event) => {
        let viewId = Number(atob(event.currentTarget.id));
        if (viewId !== 0) {
            setViewModalOpen(true);
        }
        else {
            setViewModalOpen(false)
        }
    }

    const CloseModalFunction = () => {
        setViewModalOpen(false);
    };

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
                                    Name : Prakashraj
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
                                    DOB: 06-05-1998
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
                                    Email: prakash.raj@g-japan.com
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
                                    Address: Global japan network, chennai-600034
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
                                        Date
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
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
                            {products
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product) => (
                                    <TableRow key={product.name} sx={{ border: "2px solid #f6f9fc" }}>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Typography>
                                                {product.id}
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
                                                        {product.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Typography>{product.email}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            <Typography>{product.date}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: "2px solid #f6f9fc" }}>
                                            {product.status === "Active" ? (
                                                <>
                                                    <Chip
                                                        className="text-xs"
                                                        style={{
                                                            backgroundColor: theme.palette.success.light,
                                                            color: theme.palette.success.main,
                                                        }}
                                                        size="small"
                                                        label={product.status}
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
                                                            label={product.status}
                                                        ></Chip>
                                                    </>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="View" arrow sx={{ textAlign: "center" }}>
                                                <IconEye id={btoa(product.id)} onClick={viewUser} className="mx-auto text-primary-blue cursor-pointer" />
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
                    count={products.length}
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