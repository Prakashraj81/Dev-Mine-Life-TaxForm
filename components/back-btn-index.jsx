import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';

const BackButtonIndex = () => {
    const router = useRouter();

    const goToPreviousPage = () => {
        router.back(); // This navigates to the previous page
    };

    return (
        <>
            <Box>
                <Button
                    type="button"
                    onClick={goToPreviousPage}
                    variant="contained"
                    sx={{
                        width: 'auto',
                        backgroundColor: 'gray',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'lightgray',
                            color: 'black',
                        },
                        borderRadius: '3px',
                        paddingLeft: 3.5,
                        paddingRight: 3.5,
                        py: 1,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                        戻る
                    </span>
                </Button>
            </Box>
        </>
    )
};

export default BackButtonIndex;
