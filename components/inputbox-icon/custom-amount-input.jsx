import React from "react";
import { TextField, Box } from "@mui/material";
import UnitPriceIcon from "./textbox-unitprice-icon";
import { keyframes } from "@mui/system";

// Define the shake keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;
export default function CustomAmountInput({ type, id, onChange, onKeyPress, value, textAlign, error }) {
    return (
        <>
            <TextField
                type={type}
                id={id}
                className="form-control w-full bg-custom-gray rounded h-12 pr-12"
                onChange={onChange}
                onKeyPress={onKeyPress}
                value={value}
                autoComplete="off"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        paddingRight: 4,
                        border: error ? '1px solid red' : 'none',     
                        animation: error ? `${shake} 0.5s` : 'none',  
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                        '& input': {
                            textAlign: textAlign ? textAlign : 'left',
                            padding: '16px',
                            height: '1em',
                        },
                    },
                }}
            />
            <UnitPriceIcon/>
        </>
    );
};
