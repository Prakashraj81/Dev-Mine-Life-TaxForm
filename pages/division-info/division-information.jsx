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
    const [ResidentialLandType, setResidentialLandType] = useState("");
    const [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    const [ShowLoader, setShowLoader] = useState(false);
    const [GiftDuringLifeTable, setGiftDuringLifeTable] = useState(true);
    const [ShowSuccessiveInheritance, setShowSuccessiveInheritance] = useState(false);
    const [ShowSuccessiveInput, setShowSuccessiveInput] = useState(false);    
    const [Flag, setFlag] = useState(0);
    const [loading, setLoading] = useState(true);
    const [heir_details_list, setheir_details_list] = useState([]);
    

    //Load heir details list
    const GetHeirList = async () => {
        let data;
        const auth_key = atob(sessionStorage.getItem("auth_key"));
        if (!auth_key) {
            return;
        }        
        try {
            const response = await fetch(`https://minelife-api.azurewebsites.net/heir_details?auth_key=${auth_key}`);
            data = await response.json();
            if (!response.ok) throw new Error(data);

            if (response.ok) {
                await setheir_details_list(data.heir_list);
                await setFlag(1);
            }            
        } catch (error) {
            await setFlag(0);
            await setheir_details_list([]);
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        GetHeirList();
    }, []);

    // Simulate loading effect using useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleResidentialLandType = (event) => {
        setResidentialLandType(event.target.value);
    };
    
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

    const inputHandlingFunction = (event) => {

    };

    const onSubmit = () => {

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
                                                <BuildingsTable heir_details_list={heir_details_list} />
                                                <LandTable heir_details_list={heir_details_list} />
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


