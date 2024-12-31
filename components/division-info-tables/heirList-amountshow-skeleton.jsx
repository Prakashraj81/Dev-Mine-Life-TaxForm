/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';

const HeirListAmountShowSkeleton = ({ HeirList, HeirSharingDetails, divisionBoxCalculation, divisionInputKeyPress, UndecidedHeir, AmountofMoney }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [shareAmounts, setShareAmounts] = useState(
    (HeirSharingDetails || []).reduce((acc, detail) => {
      acc[detail.heir_id] = detail.share_amount || '';
      return acc;
    }, {})
  );

  const handleInputChange = (e, heir_id) => {
    const { value } = e.target;
    setShareAmounts({
      ...shareAmounts,
      [heir_id]: value,
    });
  };

  useEffect(() => {
    HeirList.forEach((heirlist, index) => {
      (HeirSharingDetails || []).filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
        .forEach((shareDetails) => {
          const value = shareAmounts[shareDetails.heir_id];
          const mockEvent = { target: { value }, currentTarget: { id: shareDetails.heir_id } };
          handleInputChange(mockEvent, shareDetails.heir_id);
          divisionBoxCalculation(mockEvent, index);
        });
    });
  }, [HeirList, HeirSharingDetails, shareAmounts, divisionBoxCalculation]);

  return (
    <Box>
      {loading ? (
        <ul>
          {Array.from({ length: HeirList.length + 2 }, (_, index) => (
            <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
              <Skeleton variant="text" width={300} height={30} />
              <Skeleton variant="text" width={100} height={30} />
            </li>
          ))}
        </ul>
      ) : (
        <Table>
          <TableBody>
            {HeirList.map((heirlist, index) => (
              <TableRow key={heirlist.heir_id} className='border border-b-1 border-t-1 border-l-0 border-r-0'>
                <TableCell className='division-table-padding w-40'>
                  <Typography component={"span"} fontSize={14}>{heirlist.name}</Typography>
                </TableCell>
                <TableCell className='w-25 division-table-padding' align='right'>
                  {(HeirSharingDetails || []).filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
                    .map((shareDetails, i) => (
                      <TextField
                        key={i}
                        id={shareDetails.heir_id}
                        type="text"
                        autoComplete="off"
                        className="w-50"
                        sx={{
                          '& .MuiInputBase-root': {
                            height: '40px',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '14px',
                            textAlign: 'right',
                          },
                          '& .MuiInputLabel-root': {
                            fontSize: '10px',
                            letterSpacing: '0px',
                          },
                        }}
                        value={shareAmounts[shareDetails.heir_id].toLocaleString()}
                        onChange={(e) => {
                          handleInputChange(e, shareDetails.heir_id);
                          divisionBoxCalculation(e, index);
                        }}
                        onKeyPress={divisionInputKeyPress}
                      />
                    ))}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className='border border-b-1 border-t-0 border-l-0 border-r-0'>
              <TableCell className='division-table-padding w-40'>
                <Typography component={"span"} fontSize={14}>相続人未決定</Typography>
              </TableCell>
              <TableCell className='w-25 division-table-padding' align='right'>
                <Typography paddingRight={1} component={"span"} fontSize={14}>{UndecidedHeir.toLocaleString()}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className='border border-b-1 border-t-0 border-l-0 border-r-0'>
              <TableCell className='division-table-padding w-40'>
                <Typography component={"span"} fontSize={14}>合計</Typography>
              </TableCell>
              <TableCell className='w-25 division-table-padding' align='right'>
                <Typography paddingRight={1} component={"span"} fontSize={14}>{AmountofMoney.toLocaleString()}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default HeirListAmountShowSkeleton;
