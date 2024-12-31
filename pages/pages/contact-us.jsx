import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '../../components/header';
import Footer from '../../components/footer';
import BlankLayout from '../../components/layouts/blank/BlankLayout';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Typography, Select, MenuItem } from '@mui/material';
import BackdropLoader from '../../components/loader/backdrop-loader';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const selectMenuItems = [
    { id: 0, name: "選択してください", value: "選択してください" },
    { id: 1, name: "▼ AI相続", value: "▼ MINE LIFE相続" },
    { id: 2, name: "AI相続", value: "MINE LIFE相続" },
    { id: 3, name: "土地評価サービス", value: "土地評価サービス" },
    { id: 4, name: "税務調査立会", value: "税務調査立会" },
    { id: 5, name: "▼ シンプル相続", value: "▼ シンプル相続" },
    { id: 6, name: "税理士によるシンプル相続", value: "税理士によるシンプル相続" },
    { id: 7, name: "▼ 申告後の手続き", value: "▼ 申告後の手続き" },
    { id: 8, name: "代理人売却", value: "代理人売却" },
    { id: 9, name: "不動産の相続登記", value: "不動産の相続登記" },
    { id: 10, name: "法律相談", value: "法律相談" },
    { id: 11, name: "宝飾品オークション売却", value: "宝飾品オークション売却" },
    { id: 12, name: "金融資産", value: "金融資産" },
    { id: 13, name: "遺言･家族信託", value: "遺言･家族信託" },
    { id: 14, name: "生前対策／二次相続対策", value: "生前対策／二次相続対策" }
];


export default function ContactUs() {
    let [ServiceInqiry, setServiceInqiry] = useState(false);
    let [InquiryPartnerships, setInquiryPartnerships] = useState(false);
    let [WithdrawalInquiry, setWithdrawalInquiry] = useState(false);
    let [OthersInquiry, setOthersInquiry] = useState(false);

    let [strServiceInqiry, setStrServiceInqiry] = useState("");
    let [strInquiryPartnerships, setStrInquiryPartnerships] = useState("");
    let [strWithdrawalInquiry, setStrWithdrawalInquiry] = useState("");
    let [strOthersInquiry, setStrOthersInquiry] = useState("");

    let [ServiceName, setServiceName] = useState("選択してください");
    let [Name, setName] = useState("");
    let [Email, setEmail] = useState("");
    let [PhoneNumber, setPhoneNumber] = useState("");
    let [Postalcode, setPostalcode] = useState("");
    let [Address, setAddress] = useState("");
    let [Inquiry, setInquiry] = useState("");

    let [CheckboxError, setCheckboxError] = useState(false);
    let [NameError, setNameError] = useState(false);
    let [EmailError, setEmailError] = useState(false);
    let [PhoneNumberError, setPhoneNumberError] = useState(false);
    let [InquiryError, setInquiryError] = useState(false);

    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowLoader, setShowLoader] = useState(false);
    let [ShowAlert, setShowAlert] = useState(false);
    let [AlertMessage, setAlertMessage] = useState("");
    let [AlertVariant, setAlertVariant] = useState("");

    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }  
      setShowAlert(false);
    };

    //checkbox event
    const handleCheckboxChange = (event) => {
        setCheckboxError(false);
        let checkboxId = event.currentTarget.id;
        let checkboxValue = event.target.value;
        if (checkboxId === "ServiceInqiry") {
            setServiceInqiry(event.target.checked);
            setStrServiceInqiry(checkboxValue);
        }
        if (checkboxId === "InquiryPartnerships") {
            setInquiryPartnerships(event.target.checked);
            setStrInquiryPartnerships(checkboxValue);
        }
        if (checkboxId === "WithdrawalInquiry") {
            setWithdrawalInquiry(event.target.checked);
            setStrWithdrawalInquiry(checkboxValue);
        }
        if (checkboxId === "OthersInquiry") {
            setOthersInquiry(event.target.checked);
            setStrOthersInquiry(checkboxValue);
        }
    };

    //Select menu dropdown event
    const handleMenuItems = (event) => {
        let selectValue = event.target.value;
        setServiceName(selectValue);
    };

    const handleInputValidation = (event) => {
        let inputId = event.currentTarget.id;
        let inputValue = event.target.value;

        if (inputId === "Name") {
            setNameError(false);
            setName(inputValue);
        }
        else if (inputId === "Email") {
            setEmailError(false);
            setEmail(inputValue);
        }
        else if (inputId === "PhoneNumber") {
            setPhoneNumberError(false);
            setPhoneNumber(inputValue);
        }
        else if (inputId === "Postalcode") {
            setPostalcode(inputValue);
        }
        else if (inputId === "Address") {
            setAddress(inputValue);
        }
        else if (inputId === "Inquiry") {
            setInquiryError(false);
            setInquiry(inputValue);
        }
    }

    const onSubmit = async () => {
        setShowLoader(true);
        isSumbitDisabled = false;
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (strServiceInqiry === "" && strInquiryPartnerships === "" && strWithdrawalInquiry === "" && strOthersInquiry === "") {
            setCheckboxError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }
        if (Name === "") {
            setNameError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }
        if (Email === "") {
            setEmailError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }
        if (!emailRegex.test(Email)) {
            setEmailError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }
        if (PhoneNumber === "") {
            setPhoneNumberError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }
        if (PhoneNumber.length < 10) {
            setPhoneNumberError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }
        if (Inquiry === "") {
            setInquiryError(true);
            isSumbitDisabled = true;
            setisSumbitDisabled(true);
        }

        if (isSumbitDisabled == false) {
            const formData = new FormData();
            formData.append("type", strServiceInqiry + "," + strInquiryPartnerships + "," + strWithdrawalInquiry + "," + strOthersInquiry);
            formData.append("service_name", ServiceName);
            formData.append("name", Name);
            formData.append("email", Email);
            formData.append("phone", PhoneNumber);
            formData.append("postal_code", Postalcode);
            formData.append("address", Address);
            formData.append("inquiry_details", Inquiry);
            try {
                const response = await fetch('https://minelife-api.azurewebsites.net/contact_us', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    setShowLoader(false);
                    setServiceInqiry(false);
                    setInquiryPartnerships(false);
                    setWithdrawalInquiry(false);
                    setOthersInquiry(false);
                    setServiceName("選択してください");
                    setName("");
                    setEmail("");
                    setPhoneNumber("");
                    setPostalcode("");
                    setAddress("");
                    setInquiry("");

                    setAlertVariant("success");
                    setAlertMessage(response.data.message);
                    setShowAlert(true);
                }
            } catch (error) {
                setShowLoader(false);
                console.log('Error:', error);
                if (error.response && error.response.data && typeof error.response.data.error.message === 'string' && error.response.data.error.message.startsWith("'phone'")) {
                    setAlertVariant("error");
                    setAlertMessage(error.response.data.error.message);
                    setShowAlert(true);
                }
                else if (error.response && error.response.data && typeof error.response.data.error.message === 'string' && error.response.data.error.message.startsWith("'postal'")) {
                    setAlertVariant("error");
                    setAlertMessage(error.response.data.error.message);
                    setShowAlert(true);
                }
                else {
                    setAlertVariant("error");
                    setAlertMessage(error.response.data.error.message);
                    setShowAlert(true);
                }
            }
        }
        else {
            setShowLoader(false);
        }
    }

    return (
        <>
            {ShowLoader && (
                <BackdropLoader ShowLoader={ShowLoader} />
            )}
            {ShowAlert && (
                <>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={ShowAlert} autoHideDuration={6000} onClose={handleAlertClose}>
                        <Alert onClose={handleAlertClose} severity={AlertVariant} variant="filled" sx={{ width: '100%', color: '#FFF' }}>
                            {AlertMessage}
                        </Alert>
                    </Snackbar>
                </>
            )}
            <Header />
            <Box className="contact-wrapper bg-custom-light-1 py-24">
                <Box className="px-4 lg:px-0 xl:px-0 2xl:px-0 max-w-5xl mx-auto">
                    <Box className="page-heading text-center pb-14">
                        <Typography component={"label"} className="text-3xl text-black font-medium">お問い合わせ・申し込み</Typography>
                    </Box>
                    <Box className="pb-10 text-center">
                        <Typography component={"p"} className="text-base  tracking-2 leading-7">サービスに関するお問い合わせ、お申し込み、各種ご相談は下記のフォーム、またはお電話よりお送りください。</Typography>
                    </Box>
                    <Box className="text-center">
                        <Typography component={"p"} className="text-3xl text-primary-color font-semibold">
                            <PhoneIcon style={{ width: '30px', height: '30px' }} /><span>050-3186-1160</span>
                        </Typography>
                        <Typography component={"p"} className="mt-4 text-sm">【受付時間】平日9:00〜18:00</Typography>
                    </Box>
                    <Box className="bg-white shadow-normal rounded-md py-12 pb-20 px-10 mt-10">
                        <Box className="checkbox-list pb-7">
                            <Typography component={"label"} className="text-base font-medium block">お問い合わせ・ご相談の種類<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></Typography>
                            <Box className="checkbox-form-list block mt-5 rounded border border-border">
                                <FormGroup>
                                    <FormControlLabel className='margin-0 pl-2 list-item-first px-5 py-3 block border-b-border' control={<Checkbox id='ServiceInqiry' onChange={handleCheckboxChange} checked={ServiceInqiry} size='small' />} label="サービスに関するご相談・お申し込み" />
                                    <FormControlLabel className='margin-0 pl-2 list-item-first px-5 py-3 block border-b-border' control={<Checkbox id='InquiryPartnerships' onChange={handleCheckboxChange} checked={InquiryPartnerships} size='small' />} label="取材･提携に関するお問い合わせ" />
                                    <FormControlLabel className='margin-0 pl-2 list-item-first px-5 py-3 block border-b-border' control={<Checkbox id='WithdrawalInquiry' onChange={handleCheckboxChange} checked={WithdrawalInquiry} size='small' />} label="MINE LIFE相続の退会申請" />
                                    <FormControlLabel className='margin-0 pl-2 list-item-first px-5 py-3 block' control={<Checkbox id='OthersInquiry' onChange={handleCheckboxChange} checked={OthersInquiry} size='small' />} label="その他お問い合わせ" />
                                </FormGroup>
                            </Box>
                            {CheckboxError && (
                                <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                            )}
                        </Box>

                        <Box className='dropdown pb-7'>
                            <Typography component={"label"} className="text-base pb-5 font-medium block">サービス名（サービスに関するご相談・お申し込みの方</Typography>
                            <FormControl className='mt-5 px-3 py-3' sx={{ width: " 100% " }}>
                                <Select
                                    onChange={handleMenuItems}
                                    value={ServiceName}
                                    placeholder='選択してください'
                                >
                                    {selectMenuItems.map((menu) => (
                                        <MenuItem
                                            key={menu.id}
                                            id={menu.id}
                                            value={menu.value}
                                        >
                                            {menu.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box className="form-control block pb-7">
                            <Box className="input-field w-full inline-block">
                                <Typography component={"label"} className="text-base font-medium pb-5 block">お名前<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></Typography>
                                <TextField className="pt-5 w-50 inline-block" variant="outlined" id='Name' value={Name} onChange={handleInputValidation} />
                                {NameError && (
                                    <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <Typography component={"label"} className="text-base font-medium pb-5 block">メールアドレス<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></Typography>
                                <TextField className="pt-5 w-50 inline-block" variant="outlined" id='Email' value={Email} onChange={handleInputValidation} />
                                {EmailError && (
                                    <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <Typography component={"label"} className="text-base font-medium pb-5 block">電話番号<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></Typography>
                                <TextField className="pt-5 w-50 inline-block" variant="outlined" id='PhoneNumber' value={PhoneNumber} onChange={handleInputValidation} onKeyPress={handleKeyPress} />
                                {PhoneNumberError && (
                                    <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <Typography component={"label"} className="text-base font-medium pb-5 block">郵便番号</Typography>
                                <TextField className="pt-5 w-50 inline-block" variant="outlined" id='Postalcode' value={Postalcode} onChange={handleInputValidation} onKeyPress={handleKeyPress} />
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <Typography component={"label"} className="text-base font-medium pb-5 block">住所</Typography>
                                <TextField className="pt-5 w-full inline-block" variant="outlined" id='Address' value={Address} onChange={handleInputValidation} />
                            </Box>
                            <Box className="input-field w-full inline-block pt-5">
                                <Typography component={"label"} className="text-base font-medium pb-5 block">お問い合わせ内容<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></Typography>
                                <TextField multiline rows={6} className="pt-5 w-full inline-block" variant="outlined" id='Inquiry' value={Inquiry} onChange={handleInputValidation} />
                                {InquiryError && (
                                    <Typography component="p" fontWeight={500} fontSize={12} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>

                        <Box className="hidden checkbox-list pb-7">
                            <Typography component={"label"} className="text-base font-medium block">ご都合の良い時間帯<span className="required text-primary-color border border-primary-color rounded-sm text-xs px-1 py-0">必須</span></Typography>
                            <Box className="checkbox-form-list block mt-5 rounded border border-border">
                                <span className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <Typography component={"label"}>
                                        <input type="checkbox" checked={true} onChange={handleCheckboxChange} value="午前中（9:00〜12:00）" />
                                        <span className="list-item-label ml-3 text-sm">午前中（9:00〜12:00）</span>
                                    </Typography>
                                </span>
                                <span className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <Typography component={"label"}>
                                        <input type="checkbox" checked={true} onChange={handleCheckboxChange} value="午後（13:00〜17:00）" />
                                        <span className="list-item-label ml-3 text-sm">午後（13:00〜17:00）</span>
                                    </Typography>
                                </span>
                                <span className="list-item-first px-5 py-3 block border-b-border hover:bg-custom-light-1">
                                    <Typography component={"label"}>
                                        <input type="checkbox" checked={true} onChange={handleCheckboxChange} value="夕方（17:00〜）" />
                                        <span className="list-item-label ml-3 text-sm">夕方（17:00〜）</span>
                                    </Typography>
                                </span>
                            </Box>
                        </Box>

                        <Box className="save-btn text-center">
                            <Button
                                type="button"
                                variant='contained'
                                onClick={onSubmit}
                                className={"cursor-pointer bg-primary-color text-white rounded px-10 py-3"}
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                    送信する
                                </span>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

ContactUs.getLayout = function getLayout(page) {
    return <BlankLayout>{page}</BlankLayout>;
};