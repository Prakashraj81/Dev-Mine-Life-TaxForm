import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableThree() {
    const [inputValue_1, setInputValue_1] = useState('');
    const [inputValue_2, setInputValue_2] = useState('');

    const handleInputChange = (event) => {
        let inputId = event.currentTarget.id;        
        if(inputId === "inputId_1"){
            setInputValue_1(event.target.value);
        }        
        else{
            setInputValue_2(event.target.value);
        }
    };
    return (
        <>
           <TableContainer component={Paper}>
           <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className="bg-custom-light text-black">
                            <TableCell className="w-width-10">いいえ</TableCell>
                                <TableCell>路線価</TableCell>
                                <TableCell>地区区分</TableCell>
                                {/* <TableCell>正面選択</TableCell> */}
                                <TableCell>角地・準角地の選択</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>01</TableCell>
                                <TableCell className="w-3/12 inline-block">
                                    <input type="text" id="inputId_1" className="w-70 h-8 border text-right focus:outline-none"
                                        value={inputValue_1} onChange={handleInputChange} />
                                    <label>円</label>
                                </TableCell>
                                <TableCell className="w-3/12 inline-block">
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
                                {/* <TableCell></TableCell> */}
                                <TableCell className="w-3/12 inline-block">
                                <select className="w-70 h-8 border focus:outline-none">
                                        <option value="">選択</option>
                                        <option value="1">角地</option>
                                        <option value="2">準角地</option>                                        
                                    </select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>02</TableCell>
                                <TableCell className="w-3/12 inline-block">
                                    <input type="text" id="inputId_2" className="w-70 h-8 border text-right focus:outline-none"
                                        value={inputValue_2} onChange={handleInputChange} />
                                    <label>円</label>
                                </TableCell>
                                <TableCell className="w-3/12 inline-block">
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
                                {/* <TableCell></TableCell> */}
                                <TableCell className="w-3/12 inline-block">
                                <select className="w-70 h-8 border focus:outline-none">
                                        <option value="">選択</option>
                                        <option value="1">角地</option>
                                        <option value="2">準角地</option>                                        
                                    </select>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>    
            </TableContainer>            
        </>
    )
}