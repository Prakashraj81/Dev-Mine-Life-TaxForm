"use client";
import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import FullLayout from '../../../components/layouts/full/FullLayout';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ContactUs() {
    let [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
        <>
        {/* {ShowLoader && (
            <BackdropLoader ShowLoader={ShowLoader} />
        )} */}
        </>            
        <div className="contact-wrapper">
                <div className="px-4 lg:px-0 xl:px-0 2xl:px-0 max-w-5xl mx-auto">                    
                    <div className="rounded-md py-12 pb-20 px-10">
                        <div className="checkbox-list pb-7">
                            <label className="text-base font-medium block">お問い合わせ・ご相談の種類<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></label>
                            <div className="checkbox-form-list block mt-5 rounded border border-border">
                                <Box className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <FormGroup>
                                        <FormControlLabel required control={<Checkbox />} label="サービスに関するご相談・お申し込み" />
                                    </FormGroup>
                                </Box>
                                <Box className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <FormGroup>
                                        <FormControlLabel required control={<Checkbox />} label="取材･提携に関するお問い合わせ" />
                                    </FormGroup>
                                </Box>
                                <Box className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <FormGroup>
                                        <FormControlLabel required control={<Checkbox />} label="MINE LIFE相続の退会申請" />
                                    </FormGroup>
                                </Box>
                                <Box className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <FormGroup>
                                        <FormControlLabel required control={<Checkbox />} label="その他お問い合わせ" />
                                    </FormGroup>
                                </Box>
                            </div>
                        </div>

                        <div className='dropdown pb-7'>
                            <label className="text-base font-medium block">サービス名（サービスに関するご相談・お申し込みの方</label>
                            <select className="form-control w-full block mt-5 rounded border px-3 py-3 border-border">
                                <option value="選択してください">選択してください</option>
                                <option value="▼ AI相続">▼ MINE LIFE相続</option>
                                <option value="AI相続">MINE LIFE相続</option>
                                <option value="土地評価サービス">土地評価サービス</option>
                                <option value="税務調査立会">税務調査立会</option>
                                <option value="▼ シンプル相続">▼ シンプル相続</option>
                                <option value="税理士によるシンプル相続">税理士によるシンプル相続</option>
                                <option value="▼ 申告後の手続き">▼ 申告後の手続き</option>
                                <option value="代理人売却">代理人売却</option>
                                <option value="不動産の相続登記">不動産の相続登記</option>
                                <option value="法律相談">法律相談</option>
                                <option value="宝飾品オークション売却">宝飾品オークション売却</option>
                                <option value="金融資産">金融資産</option>
                                <option value="遺言･家族信託">遺言･家族信託</option>
                                <option value="生前対策／二次相続対策">生前対策／二次相続対策</option>
                            </select>
                        </div>

                        <Box className="form-control block pb-7">                            
                            <Box className="input-field w-full inline-block pt-5">
                                <label className="text-base font-medium pb-5 block">郵便番号</label>
                                <TextField className="pt-5 w-50 inline-block" variant="outlined"  />
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <label className="text-base font-medium pb-5 block">住所</label>
                                <TextField className="pt-5 w-full inline-block" variant="outlined"  />
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <label className="text-base font-medium pb-5 block">お問い合わせ内容<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></label>
                                <TextField multiline rows={4} className="pt-5 w-full inline-block" variant="outlined"  />
                            </Box>
                        </Box>

                        <div className="hidden checkbox-list pb-7">
                            <label className="text-base font-medium block">ご都合の良い時間帯<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></label>
                            <div className="checkbox-form-list block mt-5 rounded border border-border">
                                <span class="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <label>
                                        <input type="checkbox" checked={checked} onChange={handleChange} value="午前中（9:00〜12:00）" />
                                        <span class="list-item-label ml-3 text-sm">午前中（9:00〜12:00）</span>
                                    </label>
                                </span>
                                <span class="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <label>
                                        <input type="checkbox" checked={checked} onChange={handleChange} value="午後（13:00〜17:00）" />
                                        <span class="list-item-label ml-3 text-sm">午後（13:00〜17:00）</span>
                                    </label>
                                </span>
                                <span class="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <label>
                                        <input type="checkbox" checked={checked} onChange={handleChange} value="夕方（17:00〜）" />
                                        <span class="list-item-label ml-3 text-sm">夕方（17:00〜）</span>
                                    </label>
                                </span>                                
                            </div>
                        </div>

                        <div className="save-btn text-center">
                            <button
                                type="button"                                
                                className={"cursor-pointer bg-primary-color text-white rounded px-10 py-3"}
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                送信する
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ContactUs.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};