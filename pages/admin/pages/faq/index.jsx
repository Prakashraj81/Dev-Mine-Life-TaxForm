import React, { useState } from "react";
import Link from "next/link";
import theme from "../../../components/theme";
import FullLayout from "../../../components/layouts/full/FullLayout";
import CustomTextField from './../../../components/forms/theme-elements/CustomTextField';
import CustomTextAreaField from './../../../components/forms/theme-elements/CustomTextAreaField';
import DeleteModal from "../../../components/modal/delete-modal";
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
import { IconX } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import DashboardCard from "../../../components/shared/DashboardCard";
import { IconEdit, IconCirclePlus, IconTrashX } from "@tabler/icons-react";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SuccessAlert from "../../../components/alert/success-alert";

const products = [
  {
    id: "1",
    question: "What is Lorem Ipsum? What is Lorem Ipsum?",
    date: "2023-06-05",
    status: "Active",
  },
  {
    id: "2",
    question: "What is Lorem Ipsum?",
    date: "2023-06-05",
    status: "InActive",
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


export default function FAQ() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let [EditModalOpen, setEditModalOpen] = React.useState(false);
  let [ModalId, setModalId] = useState(0);
  let [DeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  let [SuccessMsg, setSuccessMsg] = React.useState(false);

  const EditModalFunction = () => {
    setEditModalOpen(true);
  };
  const CloseModalFunction = () => {
    setEditModalOpen(false);
  };

  //Edit function
  const editFAQ = (event) => {
    let EditId = Number(atob(event.currentTarget.id));
    if (EditId !== 0) {
      setEditModalOpen(true);
      setModalId(EditId);
    }
    else {
      setEditModalOpen(false);
      setModalId(0);
    }
  }

  const DeleteModalFunction = (event) => {
    let value = event.currentTarget.id;
    let rowId = ModalId;
    if (value === "Yes") {
      console.log(rowId);
      setDeleteModalOpen(false);
      setSuccessMsg(true);
    }
    else {
      setDeleteModalOpen(false);
      setModalId(0);
    }
  };

  //Delete function
  const deleteFAQ = (event) => {
    let DeleteId = Number(atob(event.currentTarget.id));
    if (DeleteId !== 0) {
      setDeleteModalOpen(true);
      setModalId(DeleteId);
    }
    else {
      setDeleteModalOpen(false);
      setModalId(0);
    }
  }

  return (
    <>
      {SuccessMsg && (<SuccessAlert />)}
      {DeleteModalOpen && (
        <DeleteModal DeleteModalOpen={DeleteModalOpen} DeleteModalFunction={DeleteModalFunction} />
      )}
      <BootstrapDialog open={EditModalOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add FAQ
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
                  Question
                </Typography>
                <CustomTextField variant="outlined" fullWidth />
              </div>
              <div className="w-full inline-block mb-7">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
                >
                  Answer
                </Typography>
                <CustomTextAreaField maxRows={10} className="w-full Mui-TextField" variant="outlined" row={4} />
              </div>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <button className="px-2 py-1 bg-error-main text-white hover:bg-white border hover:border-error-main hover:text-error-main rounded-sm transition duration-300 delay-150" onClick={CloseModalFunction}>
            Cancel
          </button>
          <button className="px-2 py-1 bg-primary-main text-white hover:bg-white border hover:border-primary-main hover:text-primary-main rounded-sm transition duration-300 delay-150">
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>



      <DashboardCard title="">
        <div className="block md:flex lg:flex xl:flex 2xl:flex justify-between items-center">
          <Typography variant="h5">FAQ list</Typography>
          <Button
            onClick={EditModalFunction} style={{ background: theme.palette.primary.dark, color: "#FFF" }} className="flex justify-between items-center px-2 py-1 rounded-sm text-white"><IconCirclePlus className="pr-1" />Add New</Button>
        </div>

        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2
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
                    Question
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
                      <Typography>{product.question}</Typography>
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
                      <div className="flex justify-between items-center">
                        <Tooltip title="View" arrow>
                          <IconEdit onClick={editFAQ} id={btoa(product.id)} className="mx-auto text-primary-blue cursor-pointer" />
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconTrashX onClick={deleteFAQ} id={btoa(product.id)} className="mx-auto text-error-main cursor-pointer" />
                        </Tooltip>
                      </div>
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

FAQ.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};