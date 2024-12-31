/* eslint-disable react/prop-types */
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableFive({ inputHandlingFunction, road_price_1, regional_distinction_1, corner_semi_corner_1, road_price_2, regional_distinction_2, corner_semi_corner_2, road_price_3, regional_distinction_3, corner_semi_corner_3, road_price_4, regional_distinction_4, corner_semi_corner_4 }) {

    const handleInputChange = (event) => {
        inputHandlingFunction(event);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow className="bg-custom-light text-black">
                            <TableCell className="w-width-10"></TableCell>
                            <TableCell>路線価</TableCell>
                            <TableCell>地区区分</TableCell>
                            {/* <TableCell>正面選択</TableCell> */}
                            <TableCell>角地・準角地の選択</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>①</TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <input type="text" id="road_price_1" value={road_price_1} onChange={handleInputChange} className="w-70 h-8 border text-right focus:outline-none" />
                                <label>円</label>
                            </TableCell>
                            <TableCell className="w-3/12 inline-block">
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
                            {/* <TableCell></TableCell> */}
                            <TableCell className="w-3/12 inline-block">
                                <select id="corner_semi_corner_1" value={corner_semi_corner_1} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
                                    <option value="">選択</option>
                                    <option value="角地">角地</option>
                                    <option value="準角地">準角地</option>
                                </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>②</TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <input type="text" id="road_price_2" value={road_price_2} onChange={handleInputChange} className="w-70 h-8 border text-right focus:outline-none" />
                                <label>円</label>
                            </TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <select id="regional_distinction_2" value={regional_distinction_2} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
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
                            {/* <TableCell></TableCell> */}
                            <TableCell className="w-3/12 inline-block">
                                <select id="corner_semi_corner_2" value={corner_semi_corner_2} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
                                    <option value="選択">選択</option>
                                    <option value="角地">角地</option>
                                    <option value="準角地">準角地</option>
                                </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>③</TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <input type="text" id="road_price_3" value={road_price_3} onChange={handleInputChange} className="w-70 h-8 border text-right focus:outline-none" />
                                <label>円</label>
                            </TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <select id="regional_distinction_3" value={regional_distinction_3} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
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
                            {/* <TableCell></TableCell> */}
                            <TableCell className="w-3/12 inline-block">
                                <select id="corner_semi_corner_3" value={corner_semi_corner_3} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
                                    <option value="選択">選択</option>
                                    <option value="角地">角地</option>
                                    <option value="準角地">準角地</option>
                                </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>④</TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <input type="text" id="road_price_4" value={road_price_4} onChange={handleInputChange} className="w-70 h-8 border text-right focus:outline-none" />
                                <label>円</label>
                            </TableCell>
                            <TableCell className="w-3/12 inline-block">
                                <select id="regional_distinction_4" value={regional_distinction_4} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
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
                            {/* <TableCell></TableCell> */}
                            <TableCell className="w-3/12 inline-block">
                                <select id="corner_semi_corner_4" value={corner_semi_corner_4} onChange={handleInputChange} className="w-70 h-8 border focus:outline-none">
                                    <option value="選択">選択</option>
                                    <option value="角地">角地</option>
                                    <option value="準角地">準角地</option>
                                </select>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}