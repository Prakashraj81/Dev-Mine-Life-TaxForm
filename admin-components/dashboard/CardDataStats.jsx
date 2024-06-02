import React from 'react';
import DashboardCard from '../shared/DashboardCard';
import { Typography } from '@mui/material';

const CardDataStats = ({
  title,
  total,
  children,
  bgColorClass,
}) => {
  return (
    <DashboardCard>
      <div className="flex justify-between items-center">
        <Typography className={`rounded-full py-5 px-5 shadow-normal`}
          sx={{
            backgroundColor: bgColorClass,
            color: "#fff",
          }}>
          {children}
        </Typography>
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </DashboardCard>

  );
};

export default CardDataStats;
