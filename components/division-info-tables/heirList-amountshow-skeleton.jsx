import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

const HeirListAmountShowSkeleton = ({HeirList, divisionBoxCalculation, BoxValues, divisionInputKeyPress, UndecidedHeir, AmountofMoney}) => {
  // Use state to manage loading state
  const [loading, setLoading] = useState(true);

  // Simulate loading effect using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <ul>
      {/* Render skeleton or content based on loading state */}
      {loading ? (
        // Render skeleton loader for each list item
        Array.from({ length: HeirList.length + 2 }, (_, index) => (
          <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
            <Skeleton variant="text" width={300} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </li>
        ))
      ) : (
        // Render actual content when loading is false
        <>
          {/* Replace with your actual content */}
          {HeirList.map((heirlist, index) => (
            <li key={index} className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
              <span>{heirlist.name}</span>
              <div className="text-right">
                <input
                  id={heirlist.heir_id}
                  type="text"
                  autoComplete="off"
                  className="border-2 h-10 text-right form-control w-50 outline-none"
                  onChange={(e) => divisionBoxCalculation(e, index)}
                  value={BoxValues[index] ? BoxValues[index].toLocaleString() : ''}
                  onKeyPress={divisionInputKeyPress}
                />
              </div>
            </li>
          ))}
          {/* Render other list items */}
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

export default HeirListAmountShowSkeleton;
