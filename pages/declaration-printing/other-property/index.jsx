import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FullLayout from '../../../components/layouts/full/FullLayout';
import BackButtonIndex from "../../../components/back-btn-index";
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function OtherProperty() {
    let [OtherPropertyList, setOtherPropertyList] = useState([]);
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [SnackbarMsg, setSnackbarMsg] = useState("success");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setSnackbarOpen(false);
    };

    useEffect(() => {        
        GetOtherPropertyList();
    }, []);


    //Load cash savings list
    const GetOtherPropertyList = async()=>{
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if(auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/list_other_assets', {params});
                if(response.status === 200){
                    setOtherPropertyList(response.data.other_assets_details);
                }
                else{
                    setOtherPropertyList([]);
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
        const OtherPropertyId = Number(event.currentTarget.name); 
        const buttonValue = event.currentTarget.value;  
        const params = { auth_key: auth_key, id: OtherPropertyId };
        if(customerId !== 0 && OtherPropertyId !== 0 && buttonValue === "Delete"){
            try{
                response = await axios.get('https://minelife-api.azurewebsites.net/delete_other_assets', {params});
                if(response.status === 200){
                    setSnackbarOpen(true);
                    setSnackbarMsg("success");
                    GetOtherPropertyList();               
                }
                else{
                    setSnackbarOpen(true);
                    setSnackbarMsg("error");
                    GetOtherPropertyList([]);
                }                      
            }catch(error){
                setSnackbarOpen(true);
                setSnackbarMsg("error");
                console.log("Error", error);
            }
        }
        else{
            router.push(`/declaration-printing/other-property/other-property-add?edit=${btoa(OtherPropertyId)}`);
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
            <div className="other-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                        その他の財産
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        その他の財産の情報を「<EditOutlinedIcon className="rotate-1 text-primary-gray"/>」ボタン、「追加する」ボタンをクリックし、ご入力ください。 入力が完了しましたら「戻る」をクリックしてください。
                    </p>
                </div>

                <div className="cash-list py-3">
                    <table className="w-full border border-light-gray">
                        {OtherPropertyList.map((list, index) => {                            
                            return (
                                <tr key={index}>                                    
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.property_name}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray">{list.other_party}</td>
                                    <td className="py-2 px-2 border-r border border-light-gray text-right">{list.valuation.toLocaleString()}</td>
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
                    <Link href="/declaration-printing/other-property/other-property-add">
                        <button className="text-base text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                            <AddIcon className="text-white" />
                            追加する
                        </button>
                    </Link>
                </div>
                <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs">                    
                    <BackButtonIndex/>
                </div>
            </div>
        </>
    )
}

OtherProperty.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};