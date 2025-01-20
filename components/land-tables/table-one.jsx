/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableOne({inputHandlingFunction, road_price_1, regional_distinction_1}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        inputHandlingFunction(event);
    };
    return (
        <>
           <TableContainer component={Paper}>
                    <Table className="w-50 block" aria-label="customized table">
                        <TableHead>
                            <TableRow className="bg-custom-light text-black">
                                <TableCell>1 図に合わせて①から④に路線価を入力ください。</TableCell>
                                <TableCell>2 路線価</TableCell>
                                <TableCell>3 地区区分</TableCell>
                                {/* <TableCell>4 角地・準角地の選択</TableCell> */}
                                {/* <TableCell>奥行距離</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-3/12 inline-block">01</TableCell>
                                <TableCell className="w-3/12 inline-block">
                                    <input type="text" id="road_price_1" className="w-70 h-8 border text-right focus:outline-none"
                                        value={road_price_1} onChange={handleInputChange} />
                                    <label>円</label>
                                </TableCell>
                                <TableCell className="w-50 inline-block">
                                    <select id="regional_distinction_1" value={regional_distinction_1} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
                                        <option value="選択">選択</option>
                                        <option value="ビル街地区">ビル街地区</option>
                                        <option value="高度商業地区">高度商業地区</option>
                                        <option value="繁華街地区">繁華街地区</option>
                                        <option value="普通商業・併用住宅地区">普通商業・併用住宅地区</option>
                                        <option value="普通住宅地区">普通住宅地区</option>
                                        <option value="中小工場地区">中小工場地区</option>
                                        <option value="大工場地区">大工場地区</option>
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