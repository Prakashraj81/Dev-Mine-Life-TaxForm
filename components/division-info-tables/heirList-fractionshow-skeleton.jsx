import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

const HeirListFractionShowSkeleton = ({HeirList, fractionBoxCalculation_1, divisionInputKeyPress, fractionBoxCalculation_2, UndecidedHeir, AmountofMoney}) => {
  // Use state to manage loading state
  const [loading, setLoading] = useState(true);

  // Simulate loading effect using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
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
              <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <div className="w-70">
                  <span>{heirlist.name}</span>
              </div>
              <div className="w-30 text-right">
                  <div className="w-full inline-block">
                      <div className="flex justify-between items-center">
                          <div><input
                              type="text"
                              className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
                              id={heirlist.heir_id}
                              onChange={(e) => fractionBoxCalculation_1(e, index)}
                              onKeyPress={divisionInputKeyPress}
                          /></div>
                          <div>
                              <span className="text-3xl text-gray-400">/</span>
                          </div>
                          <div><input
                              type="text"
                              className="text-right form-control border-2 w-full focus:outline-none h-10 pl-3"
                              id={heirlist.heir_id}
                              onChange={(e) => fractionBoxCalculation_2(e, index)}
                              onKeyPress={divisionInputKeyPress}
                          /></div>
                      </div>
                  </div>
              </div>
              </li>                    
          ))}  
          <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <span>相続人未決定</span>
              <span>{UndecidedHeir}</span>
          </li> 
          <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <span>合計</span>
              <span>{AmountofMoney}</span>
          </li> 
        </>
      )}
    </ul>
  );
};

export default HeirListFractionShowSkeleton;
