import React from "react";
import { TextField, Box } from "@mui/material";
import PostcodeIcon from "./textbox-postcode-icon";

export default function CustomPostalcodeInput({ type, id, onChange, onKeyPress, value }) {
    return (
        <>
            <TextField
                type={type}
                id={id}
                className="form-control w-full bg-custom-gray rounded h-12 pl-12"
                onChange={onChange}
                onKeyPress={onKeyPress}
                value={value}
                autoComplete="off"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        border: 'none',
                        paddingLeft: 4,
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                    },
                }}
            />
            <PostcodeIcon/>
        </>
    );
};
