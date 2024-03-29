import Link from "next/link";
import { useState, useEffect, Fragment, Controller } from "react";
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { list } from "postcss";
import axios from "axios"; 

export default function SummaryProperty() {
    let [Flag, setFlag] = useState(0);
    let [CashTotalAmount, setCashTotalAmount] = useState(0);
    let [SecuritiesTotalAmount, setSecuritiesTotalAmount] = useState(0);
    // let [CashTotalAmount, setCashTotalAmount] = useState(0);
    // let [CashTotalAmount, setCashTotalAmount] = useState(0);
    let [HouseHoldPropertyTotalAmount, setHouseHoldPropertyTotalAmount] = useState(0);
    let [DeathBenifitTotalAmount, setDeathBenifitTotalAmount] = useState(0);
    let [DeathRetirementTotalAmount, setDeathRetirementTotalAmount] = useState(0);
    let [OthersPropertyTotalAmount, setOthersPropertyTotalAmount] = useState(0);
    let [DebtTotalAmount, setDebtTotalAmount] = useState(0);
    let [FuneralExpensesTotalAmount, setFuneralExpensesTotalAmount] = useState(0);

    //Load cash savings list
    const GetCashSavingsList = async(auth_key, params)=>{   
        if(auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/list_cash_deposit', {params});
                if(response.status === 200){
                    {response.data.cash_deposit_details.map((list) => {
                    if(list.amount !== 0){
                        CashTotalAmount = CashTotalAmount + list.amount;
                        setCashTotalAmount(CashTotalAmount);
                        setFlag(1);
                    }
                    })};
                }
                else{
                    setCashTotalAmount(0);
                    setFlag(0);
                }
            }catch(error){
                console.log("Error", error);
                setFlag(0);
            }
        }        
    }
    
  //Load cash savings list
  const GetSecuritiesList = async(auth_key, params)=>{    
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_securities', {params});
            if(response.status === 200){
                {response.data.securities_details.map((list) => {
                  if(list.amount !== 0){
                    SecuritiesTotalAmount = SecuritiesTotalAmount + list.amount;
                    setSecuritiesTotalAmount(SecuritiesTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setSecuritiesTotalAmount(0);
                setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
}

//Load cash savings list
const GetHouseholdList = async(auth_key, params)=>{    
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_household', {params});
            if(response.status === 200){
                {response.data.household_details.map((list) => {
                  if(list.valuation !== 0){
                    HouseHoldPropertyTotalAmount = HouseHoldPropertyTotalAmount + list.valuation;
                    setHouseHoldPropertyTotalAmount(HouseHoldPropertyTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setHouseHoldPropertyTotalAmount(0);
                setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
  }

  //Load cash savings list
const GetDeathBenefitList = async(auth_key, params)=>{   
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_death_benefit', {params});
            if(response.status === 200){
                {response.data.death_benefits_details.map((list) => {
                  if(list.amount !== 0){
                    DeathBenifitTotalAmount = DeathBenifitTotalAmount + list.amount;
                    setDeathBenifitTotalAmount(DeathBenifitTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setDeathBenifitTotalAmount(0);
                setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
  }

  //Load cash savings list
const GetDeathRetirementList = async(auth_key, params)=>{    
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_death_retirement', {params});
            if(response.status === 200){
                {response.data.death_retirements_details.map((list) => {
                  if(list.amount !== 0){
                    DeathRetirementTotalAmount = DeathRetirementTotalAmount + list.amount;
                    setDeathRetirementTotalAmount(DeathRetirementTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setDeathRetirementTotalAmount(0);
              setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
  }
  
  //Load cash savings list
const GetOthersPropertyList = async(auth_key, params)=>{    
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_other_assets', {params});
            if(response.status === 200){
                {response.data.other_assets_details.map((list) => {
                  if(list.valuation !== 0){
                    OthersPropertyTotalAmount = OthersPropertyTotalAmount + list.valuation;
                    setOthersPropertyTotalAmount(OthersPropertyTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setOthersPropertyTotalAmount(0);
                setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
  }

  //Load debt list
const GetDebtList = async(auth_key, params)=>{    
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_debts', {params});
            if(response.status === 200){
                {response.data.debts_details.map((list) => {
                  if(list.amount !== 0){
                    DebtTotalAmount = DebtTotalAmount + list.amount;
                    setDebtTotalAmount(DebtTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setDebtTotalAmount(0);
                setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
  }

  //Load funeral expenses list
const GetFuneralExpensesList = async(auth_key, params)=>{    
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/list_funeral_expenses', {params});
            if(response.status === 200){
                {response.data.funeral_expenses_details.map((list) => {
                  if(list.amount !== 0){
                    FuneralExpensesTotalAmount = FuneralExpensesTotalAmount + list.amount;
                    setFuneralExpensesTotalAmount(FuneralExpensesTotalAmount);
                    setFlag(1);
                  }
                })};
            }
            else{
                setFuneralExpensesTotalAmount(0);
                setFlag(0);
            }
        }catch(error){
            console.log("Errro", error);
            setFlag(0);
        }
    }        
  }


    useEffect(() => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
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
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/cash-savings",
        },
        {
            id: 2,
            heading: "有価証券",
            amount: SecuritiesTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/securities",
        },
        {
            id: 3,
            heading: "建物",
            amount: 0,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/building",
        },
        {
            id: 4,
            heading: "土地",
            amount: 0,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/land",
        },
        {
            id: 5,
            heading: "家庭用財産",
            amount: HouseHoldPropertyTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/household-property",
        },
        {
            id: 6,
            heading: "死亡保険金等",
            amount: DeathBenifitTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/death-benefit",
        },
        {
            id: 7,
            heading: "死亡退職金等",
            amount: DeathRetirementTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/death-retirement-allowance",
        }, 
        {
            id: 8,
            heading: "その他財産",
            amount: OthersPropertyTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/other-property",
        },
        {
            id: 9,
            heading: "債務",
            amount: DebtTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/debt",
        },
        {
            id: 10,
            heading: "葬式費用",
            amount: FuneralExpensesTotalAmount,
            icon: <ModeEditIcon className="text-white" />,
            path: "/declaration-printing/funeral-expenses",
        },    
        {
            id: 11,
            heading: "生前贈与",
            amount: 0,
            icon: <ModeEditIcon className="text-white" />,
            path: "/gift-various/gifts-taxation",
        },        
    ];



    return (
        <>
            <div className="summary-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        まとめ
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    入力したい項目の「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタンをクリックして各財産情報を入力してください。 入力が完了しましたら「入力終了（次へ）」をクリックして贈与・控除の入力へ進んで下さい。
                    </p>
                </div>
                <div className="summary-tables-wrapper max-w-screen-md mx-auto">
                    <table className="text-left table">
                        <tbody>
                        {Flag === 1 && (
                            <>
                                {tableList.map((list, index) => (
                                    <tr className="border-t" id={list.id}>
                                        <th className="w-full py-5 font-medium">{list.heading}</th>
                                        <td className="text-right">{list.amount.toLocaleString()}</td>
                                        <td className="pl-10">
                                            <Link href={list.path}>
                                                <button id="decedent_edit" className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                                    {list.icon}
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </>                            
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                <div className="w-full flex justify-evenly items-center">
                    <BackButton />
                    <div className="end-btn text-center">
                        <Link href="/summary-pages/summary-gifts-various">
                        <button
                                type="button"
                                
                                className="cursor-pointer bg-primary-color rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                入力終了（次へ）
                                </span>
                            </button>
                        </Link>
                    </div>                    
                </div>
                </div>                
            </div>
        </>
    )
}


SummaryProperty.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};