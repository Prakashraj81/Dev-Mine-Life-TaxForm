import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from '@mui/material';

export default function SubmitButton({ onSubmit, isSumbitDisabled }) {
    let [ShowLoader, setShowLoader] = useState(true);
    return (
        <>
            <Box>
                <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSumbitDisabled}
                    variant="contained"
                    sx={{
                        width: 'auto',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'primary.main',
                        },                        
                        borderRadius: '3px',
                        px: 3,
                        py: 1,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Typography component={"span"} className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                        保存
                    </Typography>
                </Button>
            </Box>
        </>
    )
}