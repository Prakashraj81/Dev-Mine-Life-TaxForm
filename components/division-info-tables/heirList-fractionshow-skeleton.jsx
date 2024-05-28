import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

const HeirListFractionShowSkeleton = ({HeirList, HeirSharingDetails, fractionBoxCalculation_1, divisionInputKeyPress, fractionBoxCalculation_2, UndecidedHeir, AmountofMoney}) => {
  // Use state to manage loading state
  const [loading, setLoading] = useState(true);

  // Simulate loading effect using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  const [undecidedHeir1, setUndecidedHeir1] = useState(0);
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
          const mockEvent = { target: { value }, currentTarget: {id: shareDetails.heir_id} }; // Mock event object
          handleInputChange(mockEvent, shareDetails.heir_id);
          //fractionBoxCalculation_2(mockEvent, index);
        });
    });
  }, []);

  return (
    <ul>
      {/* Render skeleton or content based on loading state */}
      {loading ? (
        // Render skeleton loader for each list item
        Array.from({ length: HeirList.length + 2 }, (_, index) => (
          <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
            <Skeleton variant="text" width={600} height={30} />
            <div className="w-full flex justify-end items-center">
              <Skeleton variant="text" width={50} height={30} />
              <Skeleton variant="text" width={50} height={30} />
            </div>
          </li>
        ))
      ) : (
        // Render actual content when loading is false
        <>
          {/* Replace with your actual content */}          
          {HeirList.map((heirlist, index) => (
            <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <div className="w-70">
                  <span>{heirlist.name}</span>
              </div>
              {HeirSharingDetails.filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
                .map((shareDetails, i) => (                  
                <div key={i} className="w-30 text-right">
                <div className="w-full inline-block">
                    <div className="flex justify-between items-center">
                        <div><input
                            type="text"
                            className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
                            id={shareDetails.heir_id}
                            //value={shareDetails.numerator}
                            onChange={(e) => {
                              handleInputChange(e, shareDetails.heir_id);
                              fractionBoxCalculation_1(e, index);
                            }}
                            onKeyPress={divisionInputKeyPress}
                        /></div>
                        <div>
                            <span className="text-3xl text-gray-400">/</span>
                        </div>
                        <div><input
                            type="text"
                            className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
                            id={shareDetails.heir_id}
                            //value={shareDetails.denominator}
                            onChange={(e) => {
                              handleInputChange(e, shareDetails.heir_id);
                              fractionBoxCalculation_2(e, index);
                            }}
                            onKeyPress={divisionInputKeyPress}
                        /></div>
                    </div>
                </div>
                </div>
                ))}
            </li>
          ))}
          <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <span>相続人未決定</span>
              <span>{UndecidedHeir.toLocaleString()}</span>
          </li> 
          <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <span>合計</span>
              <span>{AmountofMoney.toLocaleString()}</span>
          </li> 
        </>
      )}
    </ul>
  );
};

export default HeirListFractionShowSkeleton;
