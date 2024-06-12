"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

// Material-UI Components
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

// Material-UI Icons
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// Custom Components
import BackButton from "../../components/back-btn";
import SubmitButton from "../../components/submit-btn";
import HeirListBox from "../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../components/heir-list-box/incorrect-error";
import FullLayout from '../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../components/loader/backdrop-loader';
import AreaIcon from "../../components/inputbox-icon/textbox-area-icon";

// Axios for API calls
import axios from "axios";

//Tables import
import CashSavingsTable from "../../components/division-info-tables/cash-savings-table";
import SecuritiesTable from "../../components/division-info-tables/securities-table";
import BuildingsTable from "../../components/division-info-tables/building-table";
import LandTable from "../../components/division-info-tables/land-table";
import HouseholdPropertyTable from "../../components/division-info-tables/household-property-table";
import DeathBenefitTable from "../../components/division-info-tables/death-benefit-table";
import DeathRetirementAllowanceTable from "../../components/division-info-tables/death-retirement-allowance-table";
import DebtTable from "../../components/division-info-tables/debt-table";
import OthersPropertyTable from "../../components/division-info-tables/other-property-table";
import TotalPropertyAcquiredTable from "../../components/division-info-tables/total-property-acquired-table";
import FuneralExpensesTable from "../../components/division-info-tables/funeral-expenses-table";
import GiftduringLifeTable from "../../components/division-info-tables/giftduring-life-table";
import CollapsibleTable from "../../components/division-info-tables/test";
import LivingDonationTable from "../../components/division-info-tables/living-gift-donation";
import CalculatedTaxAmountEachPersons from "../../components/division-info-tables/calculated-tax-amount-each-persons";
import AdditionInheritanceTaxAmount from "../../components/division-info-tables/addition-inheritance-tax-amount";
import SpouseTaxReduction from "../../components/division-info-tables/spouse-tax-reduction";
import ConfirmationDeductionMinors from "../../components/division-info-tables/confirmation-deduction-minors";
import ConfirmationDeductionPersons from "../../components/division-info-tables/confirmation-deduction-persons";
import ConfirmationSuccessiveInheritance from "../../components/division-info-tables/confirmation-successive-inheritance";
import DeclaredTaxAmount from "../../components/division-info-tables/declared-tax-amount";

export default function divisionInformation() {
    let DepositList = [];
    let [ResidentialLandType, setResidentialLandType] = useState("");
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowLoader, setShowLoader] = useState(false);

    //Table show hide state    
    let [GiftDuringLifeTable, setGiftDuringLifeTable] = useState(true);
    let [ShowSuccessiveInheritance, setShowSuccessiveInheritance] = useState(false);
    let [ShowSuccessiveInput, setShowSuccessiveInput] = useState(false);
    let [heir_details_list, setheir_details_list] = useState([]);
    let [Flag, setFlag] = useState(0);
    const [loading, setLoading] = useState(true);

    // Simulate loading effect using useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    //Load heir details list
    const GetHeirList = async () => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if (auth_key !== null) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', { params });
                if (response.status === 200) {
                    heir_details_list = response.data.heir_list;
                    setheir_details_list(response.data.heir_list);
                    console.log("heir_details_list_API: ", heir_details_list);
                    if (heir_details_list.length !== 0) {
                        Flag = 1;
                        setFlag(1);
                    }
                    else {
                        Flag = 0;
                        setFlag(0);
                    }
                }
                else {
                    setheir_details_list([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            //Logout();
        }
    };

    useEffect(() => {
        GetHeirList();
    }, []);

    const handleResidentialLandType = (event) => {
        setResidentialLandType(event.target.value);
    };

    const inputHandlingFunction = (event) => {

    }

    // Table values
    let [cashSavingsList, setcashSavingsList] = useState([]);
    let totalValuation = 0;
    useEffect(() => {
        let sessionValue = sessionStorage.getItem('cashSavings');
        var tempArray = [];
        tempArray[0] = JSON.parse(sessionValue);
        if (tempArray[0] !== null) {
            setcashSavingsList(tempArray);
        }
        else {
            setcashSavingsList([]);
        }
    }, []);



    const handleRadioScale = (event) => {
        let radioValue = event.target.value;
        if (radioValue === "Yes") {
            setShowSuccessiveInheritance(true);
        }
        else {
            setShowSuccessiveInheritance(false);
        }
    };

    //AddSuccessiveInput
    const AddSuccessiveInput = () => {
        setShowSuccessiveInput(!ShowSuccessiveInput);
    }



    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = () => {
        defaultValues = {
            ResidentialLandType: ResidentialLandType,
        };

        //input Validation
        if (defaultValues.ResidentialLandType === "") {
            isSumbitDisabled = false;
        }
        //Api setup
        if (isSumbitDisabled !== true) {
            console.log("API allowed");
            //sessionStorage.setItem('ExceptionsResidentialLand', JSON.stringify(defaultValues));
            //router.push(`/gift-various/exceptions-residential-land`);      
        }
        else {
            console.log("API not allowed");
            setisSumbitDisabled(true);
        }
    };


    return (
        <>
            <>
                {ShowLoader && (
                    <BackdropLoader ShowLoader={ShowLoader} />
                )}
            </>
            <Box className="basic-information-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            分割情報、特例等の入力
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className="cash-savings-wrapper mt-7">
                <Box className="page-description py-8 hidden">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        当システムでは「特定居住用（被相続人の居住のように供していた宅地）」のみ小規模宅地等の特例の適用が可能です。※適用要件を満たしているかの確認等ご不明な点は税理士への有料相談でご確認ください。
                    </Typography>
                </Box>
                <Box className="mb-7 hidden">
                    <FormControl>
                        <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">小規模宅地等の特例の適用を受ける</Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio />} onChange={handleRadioScale} label="はい" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                            <FormControlLabel value="No" control={<Radio />} onChange={handleRadioScale} label="いいえ" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                        </RadioGroup>
                    </FormControl>
                </Box>

                {ShowSuccessiveInheritance && (
                    <>
                        <Box>
                            <Box className="w-full inline-block items-center justify-between mb-7">
                                <Box className="w-full inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} htmlFor="Deposit" className="form-label">
                                            小規模宅地の特例を適用する土地
                                        </Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handleResidentialLandType}>
                                            <option value='' id='0'></option>
                                            {DepositList.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>

                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left pt-7">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center">適用面積</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2 relative">
                                            <input
                                                type="text"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                id="FloorAreaOneYes"
                                                onChange={inputHandlingFunction}
                                            />
                                            <AreaIcon />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full inline-block text-left mb-7">
                                <Typography component={"p"} className="float-left pr-7 text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">相似相続控除</Typography>
                                <button onClick={AddSuccessiveInput} className="float-left text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2">
                                    {ShowSuccessiveInput ? <RemoveIcon className="text-white" /> : <AddIcon className="text-white" />}
                                    {ShowSuccessiveInput ? "隠れる" : "追加する"}
                                </button>
                            </Box>
                        </Box>
                    </>
                )}

                {ShowSuccessiveInput && (
                    <>
                        <Box className="py-3">
                            <form action="#" method="POST">
                                <Box className="w-full flex items-center justify-between mb-7">
                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="user-details">
                                            <Box className="label w-full inline-block">
                                                <Typography component={"label"} htmlFor="NameofDecedent" className="form-label">
                                                    前相続の被相続人氏名<i className="text-red-500">*</i>
                                                </Typography>
                                            </Box>
                                            <Box className="w-full inline-block mt-2">
                                                <input
                                                    type="text"
                                                    id="NameofDecedent"
                                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} htmlFor="RelationshipDecedent" className="form-label">
                                                今回の被相続人と前回の被相続人の続柄
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="RelationshipDecedent"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>


                                <Box className="w-full flex items-center justify-between mb-7">
                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="user-details">
                                            <Box className="label w-full inline-block">
                                                <Typography component={"label"} htmlFor="OccurrenceDate" className="form-label">
                                                    前相続の発生日<i className="text-red-500">*</i>
                                                </Typography>
                                            </Box>
                                            <Box className="w-full inline-block mt-2">
                                                <input
                                                    type="date"
                                                    id="OccurrenceDate"
                                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} htmlFor="AmountGiftType" className="form-label">
                                                相続税申告書の提出先
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                                <option value=''></option>
                                            </select>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="w-full block items-center justify-between mb-7">
                                    <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} htmlFor="AssetValue" className="w-full inline-block mt-1 form-label">
                                                今回の被相続人が前相続において取得した財
                                            </Typography>
                                            <Typography component={"label"} htmlFor="AssetValue" className="w-full inline-block mt-1 form-label">
                                                産額（相続時精算課税適用財産含む）
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="AssetValue"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>


                                <Box className="w-full block items-center justify-between mb-7">
                                    <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} htmlFor="InheritanceTax" className="w-full inline-block mt-1 form-label">
                                                前相続で今回の被相続人が支払った相続税額
                                            </Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="InheritanceTax"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                    </>
                )}

                <Box className="w-full inline-block">
                    <form className="hidden1" action="#" method="POST">
                        <Box className="material-tables">
                            <Box>
                                {Flag === 1 && heir_details_list.length !== 0 && (
                                    <>

                                        {loading ? (
                                            // Render skeleton loader for each list item
                                            Array.from({ length: 20 }, (_, index) => (
                                                <Table key={index}>
                                                    <TableHead className="skeleton-table-head">
                                                        <TableRow>
                                                            <TableCell className="p-0" align="left"><Skeleton variant="text" width={400} height={45} /></TableCell>
                                                            <TableCell className="table-20 p-0" align="left"><Skeleton variant="text" width={150} height={45} /></TableCell>
                                                            <TableCell className="p-0" align="right"><Skeleton variant="text" width={50} height={45} /></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                </Table>
                                            ))
                                        ) : (
                                            // Render actual content when loading is false
                                            <>
                                                <CashSavingsTable heir_details_list={heir_details_list} />
                                                <SecuritiesTable heir_details_list={heir_details_list} />
                                                <BuildingsTable />
                                                <LandTable />
                                                <HouseholdPropertyTable heir_details_list={heir_details_list} />
                                                <DeathBenefitTable heir_details_list={heir_details_list} />
                                                <DeathRetirementAllowanceTable heir_details_list={heir_details_list} />
                                                <OthersPropertyTable heir_details_list={heir_details_list} />
                                                <DebtTable heir_details_list={heir_details_list} />
                                                <FuneralExpensesTable heir_details_list={heir_details_list} />

                                                <TotalPropertyAcquiredTable />
                                                <LivingDonationTable />
                                                <CalculatedTaxAmountEachPersons />
                                                <AdditionInheritanceTaxAmount />
                                                <GiftduringLifeTable />
                                                <SpouseTaxReduction />
                                                <ConfirmationDeductionMinors />
                                                <ConfirmationDeductionPersons />
                                                <ConfirmationSuccessiveInheritance />
                                                <DeclaredTaxAmount />
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box className="Total-property-section hidden py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                            <Box className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                                <BackButton />
                                <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}


divisionInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};


