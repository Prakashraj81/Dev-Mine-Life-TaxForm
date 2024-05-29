import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ja } from 'date-fns/locale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const JapaneseCalendar = ({ id, DateofBirth, inputHandlingFunction }) => {
  const [selectedDate, setSelectedDate] = useState(DateofBirth ? new Date(DateofBirth) : null);

  // Register Japanese locale with react-datepicker
  useEffect(() => {
    registerLocale('ja', ja);
    setDefaultLocale('ja');
  }, []);

  useEffect(() => {
    setSelectedDate(DateofBirth ? new Date(DateofBirth) : null);
  }, [DateofBirth]);

  const handleDateChange = (date) => {
    const dateValue = new Date(date);
    const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    inputHandlingFunction({ target: { value: formattedDate }, currentTarget: { id } });
  };

  return (
    <div className="relative inline-block">
      <DatePicker
        className="form-control w-full cursor-pointer bg-custom-gray focus:outline-none rounded h-12 px-3 pr-10"
        selected={selectedDate}
        onChange={handleDateChange}
        id={id}
        locale="ja"
        dateFormat="yyyy年MM月dd日"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
      <CalendarMonthIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default JapaneseCalendar;
