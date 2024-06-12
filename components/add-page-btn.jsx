import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from '@mui/material';
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';

export default function AddPageButton({ pageLink }) {
    return (
        <>
            <Box>
                <Button
                    type="button"
                    component={Link}
                    href={pageLink}
                    variant="contained"
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
        </>
    )
}