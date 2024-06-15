import React from "react";
import { Select, MenuItem, FormControl } from '@mui/material';
import { keyframes } from "@mui/system";

// Define the shake keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export default function CustomDropdownInput({ id, lists, onChange, value, error }) {
  return (
    <>
      <FormControl className='mt-5 px-3 py-3' sx={{ width: " 100% " }}>
        <Select
          onChange={onChange}
          value={value}
          placeholder='選択してください'
          className="form-control w-full bg-custom-gray rounded h-12"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-root': {
              padding: '16px',
              height: '1em',
            },
            border: error ? '1px solid red' : 'none',
            animation: error ? `${shake} 0.5s` : 'none',
          }}
        >
          {lists.map((menu) => (
            <MenuItem
                key={menu.heir_id || menu.id}
                id={menu.heir_id || menu.id}
                value={menu.heir_id || menu.value}
            >
              {menu.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
