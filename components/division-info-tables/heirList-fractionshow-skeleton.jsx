/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';

const HeirListFractionShowSkeleton = ({ HeirList, HeirSharingDetails, fractionBoxCalculation_1, divisionInputKeyPress, fractionBoxCalculation_2, UndecidedHeir, AmountofMoney, CalculatedAmounts }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [shareAmountNumerator, setShareAmountNumerator] = useState(
    (HeirSharingDetails || []).reduce((acc, detail) => {
      acc[detail.heir_id] = detail.numerator || '';
      return acc;
    }, {})
  );

  const [shareAmountDenominator, setShareAmountDenominator] = useState(
    (HeirSharingDetails || []).reduce((acc, detail) => {
      acc[detail.heir_id] = detail.denominator || '';
      return acc;
    }, {})
  );

  const handleInputChange1 = (e, heir_id) => {
    const { value } = e.target;
    setShareAmountNumerator({
      ...shareAmountNumerator,
      [heir_id]: value,
    });
  };

  const handleInputChange2 = (e, heir_id) => {
    const { value } = e.target;
    setShareAmountDenominator({
      ...shareAmountDenominator,
      [heir_id]: value,
    });
  };

  useEffect(() => {
    HeirList.forEach((heirlist, index) => {
      (HeirSharingDetails || []).filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
        .forEach((shareDetails) => {
          let value;
          value = shareAmountNumerator[shareDetails.heir_id];
          const mockEvent1 = { target: { value }, currentTarget: { id: shareDetails.heir_id } };
          fractionBoxCalculation_1(mockEvent1, index);

          value = shareAmountDenominator[shareDetails.heir_id];
          const mockEvent2 = { target: { value }, currentTarget: { id: shareDetails.heir_id } };
          fractionBoxCalculation_2(mockEvent2, index);
        });
    });
  }, [HeirList, HeirSharingDetails, shareAmountNumerator, shareAmountDenominator, fractionBoxCalculation_1, fractionBoxCalculation_2]);

  return (
    <ul>
      {loading ? (
        Array.from({ length: HeirList.length + 2 }, (_, index) => (
          <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
            <Skeleton variant="text" width={300} height={30} />
            <div>
              <Box className="w-full flex justify-end items-center">
                <Skeleton variant="text" width={70} height={30} />
                <Skeleton className='ml-2' variant="text" width={70} height={30} />
              </Box>
            </div>
          </li>
        ))
      ) : (
        <li>
          <Box>
            <Table>
              <TableBody>
                {HeirList.map((heirlist, index) => (
                  <TableRow key={heirlist.heir_id} className='border border-b-1 border-t-1 border-l-0 border-r-0'>
                    <TableCell className='division-table-padding w-40'><Typography component={"span"} fontSize={14}>{heirlist.name}</Typography></TableCell>
                    <TableCell className='w-25 division-table-padding' align='right'>
                      <Typography paddingRight={1} component={"span"} fontSize={14}>{CalculatedAmounts[index] ? CalculatedAmounts[index].toLocaleString() : 0}</Typography>
                    </TableCell>
                    <TableCell className='w-20 division-table-padding' align='right'>
                      {(HeirSharingDetails || []).filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
                        .map((shareDetails) => (
                          <Box key={shareDetails.heir_id} className="text-right">
                            <div className="w-full inline-block">
                              <div className="flex justify-between items-center">
                                <div>
                                  <TextField
                                    type="text"
                                    autoComplete="off"
                                    className="text-right"
                                    sx={{
                                      '& .MuiInputBase-root': {
                                        height: '40px',
                                      },
                                      '& .MuiOutlinedInput-input': {
                                        padding: '14px',
                                      },
                                      '& .MuiInputLabel-root': {
                                        fontSize: '14px', 
                                      }
                                    }}
                                    id={shareDetails.heir_id.toString()}
                                    value={shareAmountNumerator[shareDetails.heir_id]}
                                    onChange={(e) => {
                                      handleInputChange1(e, shareDetails.heir_id);
                                      fractionBoxCalculation_1(e, index);
                                    }}
                                    onKeyPress={divisionInputKeyPress}
                                  />
                                </div>
                                <Box>
                                  <Typography component={"span"} className="text-4xl text-gray-400 px-1">/</Typography>
                                </Box>
                                <div>
                                  <TextField
                                    type="text"
                                    autoComplete="off"
                                    className="text-right"
                                    sx={{
                                      '& .MuiInputBase-root': {
                                        height: '40px',
                                      },
                                      '& .MuiOutlinedInput-input': {
                                        padding: '14px',
                                      },
                                      '& .MuiInputLabel-root': {
                                        fontSize: '14px',
                                      }
                                    }}
                                    id={shareDetails.heir_id.toString()}
                                    value={shareAmountDenominator[shareDetails.heir_id]}
                                    onChange={(e) => {
                                      handleInputChange2(e, shareDetails.heir_id);
                                      fractionBoxCalculation_2(e, index);
                                    }}
                                    onKeyPress={divisionInputKeyPress}
                                  />
                                </div>
                              </div>
                            </div>
                          </Box>
                        ))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className='border border-b-1 border-t-0 border-l-0 border-r-0'>
                  <TableCell className='division-table-padding w-40'><Typography component={"span"} fontSize={14}>相続人未決定</Typography></TableCell>
                  <TableCell className='division-table-padding w-25' align='right'><Typography paddingRight={1} component={"span"} fontSize={14}>{UndecidedHeir.toLocaleString()}</Typography></TableCell>
                  <TableCell className='invisible division-table-padding w-20' align='right'><Typography component={"span"} fontSize={14}></Typography></TableCell>
                </TableRow>
                <TableRow className='border border-b-1 border-t-0 border-l-0 border-r-0'>
                  <TableCell className='division-table-padding w-40'><Typography component={"span"} fontSize={14}>合計</Typography></TableCell>
                  <TableCell className='division-table-padding w-25' align='right'><Typography paddingRight={1} component={"span"} fontSize={14}>{AmountofMoney.toLocaleString()}</Typography></TableCell>
                  <TableCell className='invisible division-table-padding w-20' align='right'><Typography component={"span"} fontSize={14}></Typography></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </li>
      )}
    </ul>
  );
};

export default HeirListFractionShowSkeleton;

