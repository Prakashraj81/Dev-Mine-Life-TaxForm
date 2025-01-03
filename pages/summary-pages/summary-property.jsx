/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';

export default function SummaryProperty() {
    let [Flag, setFlag] = useState(0);
    let [CashTotalAmount, setCashTotalAmount] = useState(0);
    let [SecuritiesTotalAmount, setSecuritiesTotalAmount] = useState(0);
    let [HouseHoldPropertyTotalAmount, setHouseHoldPropertyTotalAmount] = useState(0);
    let [DeathBenifitTotalAmount, setDeathBenifitTotalAmount] = useState(0);
    let [DeathRetirementTotalAmount, setDeathRetirementTotalAmount] = useState(0);
    let [OthersPropertyTotalAmount, setOthersPropertyTotalAmount] = useState(0);
    let [DebtTotalAmount, setDebtTotalAmount] = useState(0);
    let [FuneralExpensesTotalAmount, setFuneralExpensesTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Simulate loading effect using useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    //Load cash savings list
    const GetCashSavingsList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_cash_deposit?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    {data.cash_deposit_details.map((list) => {
                            if (list.amount !== 0) {
                                CashTotalAmount = CashTotalAmount + list.amount;
                                setCashTotalAmount(CashTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setCashTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Error", error);
                setFlag(0);
            }
        }
    }

    //Load cash savings list
    const GetSecuritiesList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_securities?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    {data.securities_details.map((list) => {
                            if (list.amount !== 0) {
                                SecuritiesTotalAmount = SecuritiesTotalAmount + list.amount;
                                setSecuritiesTotalAmount(SecuritiesTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setSecuritiesTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }

    //Load cash savings list
    const GetHouseholdList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_household?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);
                
                if (response.ok) {
                    {data.household_details.map((list) => {
                            if (list.valuation !== 0) {
                                HouseHoldPropertyTotalAmount = HouseHoldPropertyTotalAmount + list.valuation;
                                setHouseHoldPropertyTotalAmount(HouseHoldPropertyTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setHouseHoldPropertyTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }

    //Load cash savings list
    const GetDeathBenefitList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_death_benefit?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    {data.death_benefits_details.map((list) => {
                            if (list.amount !== 0) {
                                DeathBenifitTotalAmount = DeathBenifitTotalAmount + list.amount;
                                setDeathBenifitTotalAmount(DeathBenifitTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setDeathBenifitTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }

    //Load cash savings list
    const GetDeathRetirementList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_death_retirement?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);
                
                if (response.ok) {
                    {data.death_retirements_details.map((list) => {
                            if (list.amount !== 0) {
                                DeathRetirementTotalAmount = DeathRetirementTotalAmount + list.amount;
                                setDeathRetirementTotalAmount(DeathRetirementTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setDeathRetirementTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }

    //Load cash savings list
    const GetOthersPropertyList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_other_assets?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.ok) {
                    {data.other_assets_details.map((list) => {
                            if (list.valuation !== 0) {
                                OthersPropertyTotalAmount = OthersPropertyTotalAmount + list.valuation;
                                setOthersPropertyTotalAmount(OthersPropertyTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setOthersPropertyTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }

    //Load debt list
    const GetDebtList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_debts?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);

                if (response.status === 200) {
                    {data.debts_details.map((list) => {
                            if (list.amount !== 0) {
                                DebtTotalAmount = DebtTotalAmount + list.amount;
                                setDebtTotalAmount(DebtTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setDebtTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }

    //Load funeral expenses list
    const GetFuneralExpensesList = async (auth_key) => {
        if (auth_key !== null) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/list_funeral_expenses?auth_key=${auth_key}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data);
                
                if (response.ok) {
                    {data.funeral_expenses_details.map((list) => {
                            if (list.amount !== 0) {
                                FuneralExpensesTotalAmount = FuneralExpensesTotalAmount + list.amount;
                                setFuneralExpensesTotalAmount(FuneralExpensesTotalAmount);
                                setFlag(1);
                            }
                        })
                    };
                }
                else {
                    setFuneralExpensesTotalAmount(0);
                    setFlag(0);
                }
            } catch (error) {
                console.log("Errro", error);
                setFlag(0);
            }
        }
    }


    useEffect(() => {
        let auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        let params = { auth_key: auth_key };
        GetCashSavingsList(auth_key, params);
        GetSecuritiesList(auth_key, params);
        GetHouseholdList(auth_key, params);
        GetDeathBenefitList(auth_key, params);
        GetDeathRetirementList(auth_key, params);
        GetOthersPropertyList(auth_key, params);
        GetDebtList(auth_key, params);
        GetFuneralExpensesList(auth_key, params);
    }, []);

    const tableList = [
        {
            id: 1,
            heading: "現金預金(外貨含む)",
            amount: CashTotalAmount,
            path: "/declaration-printing/cash-savings",
        },
        {
            id: 2,
            heading: "有価証券",
            amount: SecuritiesTotalAmount,
            path: "/declaration-printing/securities",
        },
        {
            id: 3,
            heading: "建物",
            amount: 0,
            path: "/declaration-printing/building",
        },
        {
            id: 4,
            heading: "土地",
            amount: 0,
            path: "/declaration-printing/land",
        },
        {
            id: 5,
            heading: "家庭用財産",
            amount: HouseHoldPropertyTotalAmount,
            path: "/declaration-printing/household-property",
        },
        {
            id: 6,
            heading: "死亡保険金等",
            amount: DeathBenifitTotalAmount,
            path: "/declaration-printing/death-benefit",
        },
        {
            id: 7,
            heading: "死亡退職金等",
            amount: DeathRetirementTotalAmount,
            path: "/declaration-printing/death-retirement-allowance",
        },
        {
            id: 8,
            heading: "その他財産",
            amount: OthersPropertyTotalAmount,
            path: "/declaration-printing/other-property",
        },
        {
            id: 9,
            heading: "債務",
            old_heading: "財産債務の一覧",
            amount: DebtTotalAmount,
            path: "/declaration-printing/debt",
        },
        {
            id: 10,
            heading: "葬式費用",
            amount: FuneralExpensesTotalAmount,
            path: "/declaration-printing/funeral-expenses",
        },
        // {
        //     id: 11,
        //     heading: "生前贈与",
        //     amount: 0,
        //     icon: <EditNoteOutlinedIcon className="text-white" />,
        //     path: "/gift-various/gifts-taxation",
        // },        
    ];



    return (
        <>
            <Box className="summary-property-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            {/* まとめ */} まとめ（財産債務の一覧）
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    < Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        入力したい項目の「<EditNoteOutlinedIcon className="text-primary-gray" />」ボタンをクリックして各財産情報を入力してください。 入力が完了しましたら「入力終了（次へ）」をクリックして贈与・控除の入力へ進んで下さい。
                    </Typography>
                </Box>
                <Box className="summary-tables-wrapper">
                    {loading ? (
                        // Render skeleton loader for each list item
                        Array.from({ length: 20 }, (_, index) => (
                            <Table key={index}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="p-0"><Skeleton variant="text" width={400} height={45} /></TableCell>
                                        <TableCell className="p-0"><Skeleton variant="text" width={150} height={45} /></TableCell>
                                        <TableCell className="p-0"><Skeleton variant="text" width={50} height={45} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ))
                    ) : (
                        // Render actual content when loading is false
                        <>
                            <Table className="text-left summary-table">
                                <TableBody>
                                    {tableList.map((list) => (
                                        <TableRow className="border border-l-0 border-r-0" id={list.id}>
                                            <TableCell className="w-full font-medium"><span className="font-medium">{list.heading}</span></TableCell>
                                            <TableCell align="right" className="font-medium"><span className="font-medium">{list.amount.toLocaleString()}</span></TableCell>
                                            <TableCell align="right" className="font-medium">
                                                <Link href={list.path}>
                                                    <Button
                                                        sx={{
                                                            minWidth: 'auto',
                                                            backgroundColor: 'info.main',
                                                            color: 'white',
                                                            '&:hover': {
                                                                backgroundColor: 'info.light',
                                                                color: 'info.main',
                                                                '& .MuiSvgIcon-root': {
                                                                    color: 'info.main', // Change the icon color on hover
                                                                },
                                                            },
                                                            borderRadius: '3px',
                                                            paddingLeft: 0.7,
                                                            paddingRight: 0.7,
                                                            py: 0.5,
                                                            transition: 'all 0.7s ease',
                                                        }}
                                                        id="decedent_edit"
                                                    >
                                                        <EditNoteOutlinedIcon />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </Box>
                <Box className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                    <Box className="w-full flex justify-evenly items-center">
                        <BackButton />
                        <Box>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{
                                    width: 'auto',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'primary.main',
                                    },
                                    borderRadius: '3px',
                                    paddingLeft: 3,
                                    paddingRight: 3,
                                    py: 1,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Link href="/Boxision-info/Boxision-information" className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                    入力終了（次へ）
                                </Link>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


SummaryProperty.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};