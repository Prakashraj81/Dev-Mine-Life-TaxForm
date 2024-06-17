import React from 'react';
import { Box } from '@mui/material';
import CardDataStats from './CardDataStats';
import { IconUsers, IconAddressBook } from '@tabler/icons-react'; // Updated to use only imported icons
import theme from '../theme'; // Make sure to use theme if it's required

const TopCards = () => {
    return (
        <Box>
            <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr 1fr' }}
                gap={{ xs: 4, md: 6, xl: 6 }}
            >
                <CardDataStats title="Total Users" total="1,500" bgColorClass="success.light">
                    <Box>
                        <IconUsers className='text-success-main' />
                    </Box>
                </CardDataStats>
                <CardDataStats title="Contact us" total="2,450" bgColorClass="warning.light">
                    <Box>
                        <IconAddressBook className='text-warning-main' />
                    </Box>
                </CardDataStats>
            </Box>
        </Box>
    );
};

export default TopCards;
