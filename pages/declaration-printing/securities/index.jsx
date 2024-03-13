import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BackButtonIndex from "../../../components/back-btn-index";
import FullLayout from '../../../components/layouts/full/FullLayout';
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Securities() {
    let [SecuritiesList, setSecuritiesList] = useState([]);
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [SnackbarMsg, setSnackbarMsg] = useState("success");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setSnackbarOpen(false);
    };

    useEffect(() => {        
        GetSecuritiesList();
    }, []);


    //Load cash savings list
    const GetSecuritiesList = async()=>{
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if(auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/list_securities', {params});
                if(response.status === 200){
                    setSecuritiesList(response.data.securities_details);
                }
                else{
                    setSecuritiesList([]);
                }
            }catch(error){
                console.log("Errro", error);
            }
        }        
    }


    
    //Edit and Delete cash savings list    
    let router = useRouter();
    const handleEdit_DeleteButtonClick = async(event) => {
        let response = "";
        let auth_key = atob(sessionStorage.getItem("auth_key"));        
        const customerId = Number(event.currentTarget.id);
        const securityId = Number(event.currentTarget.name); 
        const buttonValue = event.currentTarget.value;  
        const params = { auth_key: auth_key, id: securityId };
        if(customerId !== 0 && securityId !== 0 && buttonValue === "Delete"){
            try{
                response = await axios.get('https://minelife-api.azurewebsites.net/delete_securities', {params});
                if(response.status === 200){
                    setSnackbarOpen(true);
                    setSnackbarMsg("success");
                    GetSecuritiesList();               
                }
                else{
                    setSnackbarOpen(true);
                    setSnackbarMsg("error");
                    GetSecuritiesList([]);
                }                      
            }catch(error){
                setSnackbarOpen(true);
                setSnackbarMsg("error");
                console.log("Error", error);
            }
        }
        else{
            router.push(`/declaration-printing/securities/securities-add?edit=${btoa(securityId)}`);
        }  
    };

    return (         
        <>
            <>
                <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                    onClose={handleSnackbarClose}
                    severity={SnackbarMsg}
                    variant="filled"
                    sx={{ width: '100%', color: "#FFF" }}
                    >
                    This is a {SnackbarMsg} Alert!
                    </Alert>
                </Snackbar>
            </>   
            <div className="securities-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            有価証券
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                    有価証券の情報を「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>
                <div className="securities-list py-8">
                    <table className="w-full border border-light-gray">                        
                        {SecuritiesList.map((list, index) => {                            
                            return (
                                <tr key={index}>
                                <td className="py-2 px-2 border-r border border-light-gray">{list.name_and_issues}</td>
                                <td className="py-2 px-2 border-r border border-light-gray">{list.securities_type}</td>
                                <td className="py-2 px-2 border-r border border-light-gray text-right">{list.amount.toLocaleString()}</td>
                                <td className="py-2 px-2 border-r border border-light-gray text-right">
                                    <button id={list.customer_id} name={list.id} onClick={handleEdit_DeleteButtonClick} value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                        <ModeEditIcon className="text-white" />
                                    </button>
                                </td>
                                <td className="py-2 px-2 border-r border border-light-gray text-right">
                                    <button id={list.customer_id} name={list.id} onClick={handleEdit_DeleteButtonClick} value="Delete" className="text-base bg-red-600 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                        <DeleteOutlinedIcon className="text-white" />
                                    </button>
                                </td>
                            </tr>
                            );
                        })}
                    </table>
                </div>
                <div className="w-full inline-block text-left">
                    <Link href="/declaration-printing/securities/securities-add">
                        <button id="decedent_edit" className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>                
                <div className="back-btn pt-5 md:pt-10 lg:pt-20 xl:pt-20 2xl:pt-20 text-center">
                        <BackButtonIndex />
                    </div>
            </div>
        </>
    )
}

Securities.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};