import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableOne() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>
           <TableContainer component={Paper}>
                    <Table className="w-50 block" aria-label="customized table">
                        <TableHead>
                            <TableRow className="bg-custom-light text-black">
                                <TableCell></TableCell>
                                <TableCell>路線価</TableCell>
                                <TableCell>地区区分</TableCell>
                                {/* <TableCell>間口距離</TableCell>
                                <TableCell>奥行距離</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-3/12 inline-block">01</TableCell>
                                <TableCell className="w-3/12 inline-block">
                                    <input type="text" id="inputId" className="w-70 h-8 border text-right focus:outline-none"
                                        value={inputValue} onChange={handleInputChange} />
                                    <label>円</label>
                                </TableCell>
                                <TableCell className="w-50 inline-block">
                                    <select className="w-70 h-8 border focus:outline-none">
                                        <option value="">選択</option>
                                        <option value="1">ビル街地区</option>
                                        <option value="2">高度商業地区</option>
                                        <option value="3">繁華街地区</option>
                                        <option value="4">普通商業・併用住宅地区</option>
                                        <option value="5">普通住宅地区</option>
                                        <option value="6">中小工場地区</option>
                                        <option value="7">大工場地区</option>
                                    </select>
                                </TableCell>
                                {/* <TableCell>
                                    <div>
                                        <input type="text" id="inputId" className="w-70 h-8 border text-right focus:outline-none"
                                            value={inputValue} onChange={handleInputChange} />
                                        <label>円</label>
                                    </div>
                                </TableCell>
                                <TableCell className="w-3/12 inline-block">
                                    <div>
                                        <input type="text" id="inputId" className="w-70 h-8 border text-right focus:outline-none"
                                            value={inputValue} onChange={handleInputChange} />
                                        <label>円</label>
                                    </div>
                                </TableCell> */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>            
        </>
    )
}