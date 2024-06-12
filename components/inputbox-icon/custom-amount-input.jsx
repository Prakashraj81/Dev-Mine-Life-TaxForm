import React from "react";
import { TextField, Box } from "@mui/material";
import UnitPriceIcon from "./textbox-unitprice-icon";

export default function CustomAmountInput({ type, id, onChange, onKeyPress, value, textAlign }) {
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
                        border: 'none',
                        paddingRight: 4,
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
                        },
                    },
                }}
            />
            <UnitPriceIcon/>
        </>
    );
};
