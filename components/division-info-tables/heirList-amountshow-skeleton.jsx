import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { TextField } from '@mui/material';

const HeirListAmountShowSkeleton = ({ HeirList, HeirSharingDetails, divisionBoxCalculation, BoxValues, divisionInputKeyPress, UndecidedHeir, AmountofMoney }) => {
  // Use state to manage loading state
  const [loading, setLoading] = useState(true);

  // Simulate loading effect using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  const [shareAmounts, setShareAmounts] = useState(
    HeirSharingDetails.reduce((acc, detail) => {
      acc[detail.heir_id] = detail.share_amount || '';

      return acc;
    }, {})
  );

  // Handler to update state when input changes
  const handleInputChange = (e, heir_id) => {
    const { value } = e.target;
    setShareAmounts({
      ...shareAmounts,
      [heir_id]: value,
    });
  };


  useEffect(() => {
    HeirList.forEach((heirlist, index) => {
      HeirSharingDetails.filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
        .forEach((shareDetails) => {
          const value = shareAmounts[shareDetails.heir_id].toLocaleString();
          const mockEvent = { target: { value }, currentTarget: { id: shareDetails.heir_id } }; // Mock event object
          handleInputChange(mockEvent, shareDetails.heir_id);
          divisionBoxCalculation(mockEvent, index);
        });
    });
  }, []);

  return (
    <ul>
      {/* Render skeleton or content based on loading state */}
      {loading ? (
        // Render skeleton loader for each list item
        Array.from({ length: HeirList.length + 2 }, (_, index) => (
          <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
            <Skeleton variant="text" width={300} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </li>
        ))
      ) : (
        // Render actual content when loading is false
        <>
          {/* Replace with your actual content */}
          {HeirList.map((heirlist, index) => (
            <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
              <span>{heirlist.name}</span>
              {HeirSharingDetails.filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
                .map((shareDetails, i) => (
                  <div key={i} className="text-right">
                    <TextField
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
                          fontSize: '14px',
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
                  </div>
                ))}
            </li>
          ))}

          {/* Render other list items */}
          <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
            <span>相続人未決定</span>
            <span>{UndecidedHeir.toLocaleString()}</span>
          </li>
          <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
            <span>合計</span>
            <span>{AmountofMoney.toLocaleString()}</span>
          </li>
        </>
      )}
    </ul>
  );
};

export default HeirListAmountShowSkeleton;
