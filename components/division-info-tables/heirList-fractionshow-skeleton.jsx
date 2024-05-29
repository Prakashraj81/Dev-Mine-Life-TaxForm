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
  const [shareAmountNumerator, setShareAmountNumerator] = useState(
    HeirSharingDetails.reduce((acc, detail) => {
      acc[detail.heir_id] = detail.numerator || '';    

      return acc;
    }, {})
  );

  const [shareAmountDenominator, setShareAmountDenominator] = useState(
    HeirSharingDetails.reduce((acc, detail) => {
      acc[detail.heir_id] = detail.denominator || '';    

      return acc;
    }, {})
  );

  // Handler to update state when input changes
  const handleInputChange1 = (e, heir_id) => {
    const { value } = e.target;
    if(value !== ""){
      setShareAmountNumerator({
        ...shareAmountNumerator,
        [heir_id]: value,
      });    
    }
    else{
      const { value1 } = e.target;      
      setShareAmountNumerator({
        ...shareAmountNumerator,
        [heir_id]: value1,
      });    
    }    
  }; 
  
  // Handler to update state when input changes
  const handleInputChange2 = (e, heir_id) => {
    const { value } = e.target;
    if(value !== ""){      
      setShareAmountDenominator({
        ...shareAmountDenominator,
        [heir_id]: value,
      });    
    }
    else{
      const { value2 } = e.target;      
      setShareAmountDenominator({
        ...shareAmountDenominator,
        [heir_id]: value2,
      });    
    }    
  }; 


  useEffect(() => {
    HeirList.forEach((heirlist, index) => {
      HeirSharingDetails.filter(shareDetails => shareDetails.heir_id === heirlist.heir_id)
        .forEach((shareDetails) => {
          let value;

          value = shareAmountNumerator[shareDetails.heir_id];          
          const mockEvent1 = { target: { value }, currentTarget: {id: shareDetails.heir_id} }; // Mock event object
          fractionBoxCalculation_1(mockEvent1, index);

          value = shareAmountDenominator[shareDetails.heir_id];
          const mockEvent2 = { target: { value }, currentTarget: {id: shareDetails.heir_id} }; // Mock event object
          fractionBoxCalculation_2(mockEvent2, index);

          //handleInputChange(mockEvent1, shareDetails.heir_id);
          //handleInputChange(mockEvent2, shareDetails.heir_id);         
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
            <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-0 border-t py-3">
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
                            value={shareAmountNumerator[shareDetails.heir_id]}
                            onChange={(e) => {
                              handleInputChange1(e, shareDetails.heir_id);
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
                            value={shareAmountDenominator[shareDetails.heir_id]}
                            onChange={(e) => {
                              handleInputChange2(e, shareDetails.heir_id);
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

export default HeirListFractionShowSkeleton;
