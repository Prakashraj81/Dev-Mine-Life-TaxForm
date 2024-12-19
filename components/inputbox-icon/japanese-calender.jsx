import React, { useState, useEffect, useRef } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ja } from 'date-fns/locale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { keyframes } from "@mui/system";
import { css } from '@emotion/react';

// Define the shake keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const JapaneseCalendar = ({ id, DateValue, inputHandlingFunction, textAlign, error, setyear_build }) => {
  const [selectedDate, setSelectedDate] = useState(DateValue ? new Date(DateValue) : null);
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef(null);

  // Register Japanese locale with react-datepicker
  useEffect(() => {
    registerLocale('ja', ja);
    setDefaultLocale('ja');
  }, []);

  useEffect(() => {
    setSelectedDate(DateValue ? new Date(DateValue) : null);
  }, [DateValue]);

  const handleDateChange = (date) => {
    const dateValue = new Date(date);
    const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    setyear_build(formattedDate);
  };

  const handleIconClick = () => {
    setOpen(!open);
    if (datePickerRef.current) {
      open ? datePickerRef.current.setOpen(false) : datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="relative inline-block">
      <DatePicker
        ref={datePickerRef}
        className={`form-control w-full cursor-pointer bg-custom-gray focus:outline-none rounded h-12 px-3 pr-10 ${error ? 'shake' : ''}`}
        selected={selectedDate}
        onChange={handleDateChange}
        id={id}
        locale="ja"
        dateFormat="yyyy年MM月dd日"
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        showMonthDropdown
        dropdownMode="select"        
        style={{
          textAlign: textAlign ? textAlign : 'left',
        }}
      />
      <CalendarMonthIcon 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
        onClick={handleIconClick}
      />
      <style jsx global>{`
        .shake {
          animation: ${shake} 0.5s;
          border: 1px solid red;
        }
      `}</style>
    </div>
  );
};

export default JapaneseCalendar;
