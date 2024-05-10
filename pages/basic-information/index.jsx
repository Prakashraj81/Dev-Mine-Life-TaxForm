import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteModal from "../../components/modal/delete-modal";

export default function BasicInformation() {
    let [HeirList, setHeirList] = useState([]);
    let [HeirListLenth, setHeirListLenth] = useState(0);
    let [DecendentList, setDecendentList] = useState([]);
    let [showEndButton, setshowEndButton] = useState(false);
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [SnackbarMsg, setSnackbarMsg] = useState("success");
    let [DeleteModalOpen, setDeleteModalOpen] = useState(false); 
    let [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        GetDecendentList();
        GetHeirList();
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setSnackbarOpen(false);
    };

    //Load decendent details list
    const GetDecendentList = async() => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/decedent_detail', {params});
            if(response.status === 200){
                setDecendentList(response.data);                
            }
            else{
                setDecendentList([]);
            }
        }catch (error){
            console.error('Error:', error);
        }
    }; 


    //Load heir details list
    const GetHeirList = async() => {
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key };
        if(auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/heir_details', {params});
                if(response.status === 200){
                    setHeirListLenth(response.data.heir_list.length || 0);
                    setHeirList(response.data.heir_list || []);
                }
                else{
                    setHeirList([]);
                }
            }catch (error){
                console.error('Error:', error);
            }
        }  
        else{
            //Logout();
        }      
    };

    
    //Edit Decendent function
    let router = useRouter();
    const EditDecendent = async(event) => {
        let ValueId =  Number(event.currentTarget.id);
        let ValueName =  Number(event.currentTarget.name);
        if(ValueId === 0){
            router.push(`/basic-information/decendent?Id=${btoa(ValueId)}`);            
        }
        else{
            //router.push("/auth/login");
        }
    }

    const handleHeirPage = () => {
        router.push({
            pathname: '/basic-information/heir',
            query: { heirNo: HeirListLenth + 1 },
        });
    }

    const DeleteModalFunction = async(event) => {
        let value = event.currentTarget.id;
        const { auth_key, heirId, buttonValue, params } = deleteTarget;
        if (value === "Yes") {
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/delete_heir', {params});
                if(response.status === 200){
                    setSnackbarOpen(true);
                    setSnackbarMsg("success");
                    GetHeirList();               
                }
                else{
                    setSnackbarOpen(true);
                    setSnackbarMsg("error");
                    //GetCashSavingsList([]);
                }
            }catch(error){
                setSnackbarOpen(true);
                setSnackbarMsg("error");
                console.log("Error", error);
            }
            setDeleteModalOpen(false);     
        }
        else {
          setDeleteModalOpen(false);
        }
      };
        
        //Edit and Delete         
        const handleEdit_DeleteButtonClick = async(event) => {
            let auth_key = atob(sessionStorage.getItem("auth_key"));        
            let heirId = Number(event.currentTarget.id); 
            let buttonValue = event.currentTarget.value;  
            let params = { auth_key: auth_key, id: heirId };        
            if(heirId !== 0 && buttonValue === "Delete"){
                setDeleteTarget({ auth_key, heirId, buttonValue, params });
                setDeleteModalOpen(true);                
            }
            else{
                router.push(`/basic-information/heir?editId=${btoa(heirId)}`);
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
                
                {DeleteModalOpen && (
                    <DeleteModal DeleteModalOpen={DeleteModalOpen} DeleteModalFunction={DeleteModalFunction} />
                )}
            </>

            <div className="basic-information-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            基礎情報の入力
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        被相続人、相続を受ける方の情報を「<EditNoteOutlinedIcon />」ボタン、「追加する」ボタンをクリックし、ご入力ください。入力が完了しましたら「入力終了（次へ）」をクリックし、財産情報の入力へ進んでくださ い。
                    </p>
                </div>
                <div className="input-details">
                    <div className="decedent">
                        <div className="decedent-list py-3">
                            <div className="decedent-heading py-3"><span>被相続人</span></div>
                            <div className="w-full block lg:flex xl:flex 2xl:flex justify-between items-center">
                                <div className="w-full block lg:w-32">
                                    <div className="w-full inline-block heading">
                                        <label>氏名</label>
                                    </div>
                                    <div className="w-full inline-block heading pt-4">
                                        <label>{DecendentList.name}</label>
                                    </div>
                                </div>
                                <div className="w-full block lg:w-32">
                                    <div className="w-full inline-block heading">
                                        <label>お亡くなりになった日</label>
                                    </div>
                                    <div className="w-full inline-block heading pt-4">
                                        <label>{DecendentList.date_of_death}</label>
                                    </div>
                                </div>
                                <div className="w-full block float-right text-right lg:w-32">
                                    <button onClick={EditDecendent} 
                                    id={DecendentList.decedent_id} 
                                    name={DecendentList.name} 
                                    value="Edit" className="text-base bg-blue-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                        <EditNoteOutlinedIcon className="text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="heir-list py-10">
                            <div className="heir-heading py-3"><span>相続人</span></div>
                            <table className="w-full">
                                {HeirList.map((list, index) => {
                                    return (
                                        <>
                                            <React.Fragment key={index}>
                                                <tr className="w-full border-t">
                                                    <td className="text-left pt-3">氏名</td>
                                                    <td className="text-left pt-3">続柄</td>
                                                    <td className="text-left pt-3">
                                                        
                                                    </td>
                                                    <td className="text-left pt-3">
                                                        {HeirListLenth ? "1/" + HeirListLenth : "1/1_"}
                                                    </td>                                                    
                                                    <td className="text-right pt-3">
                                                        <button id={list.heir_id} onClick={handleEdit_DeleteButtonClick} value="Edit" className="text-base bg-blue-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                                            <EditNoteOutlinedIcon className="text-white" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left pt-3">{list.name}</td>
                                                    <td className="text-left pt-3">{list.relationship_with_decedent}</td>
                                                    <td className="text-left pt-3"></td>
                                                    <td className="text-left pt-3"></td>                                                    
                                                    <td className="text-right pt-3">
                                                        <button id={list.heir_id} onClick={handleEdit_DeleteButtonClick} value="Delete" className="text-base bg-red-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                                            <HighlightOffOutlinedIcon className="text-white" />                                            
                                                        </button>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        </>
                                    );
                                })}
                            </table>
                        </div>
                    </div>

                    <div className="w-full inline-block text-right py-10">
                        <div className="add-btn">
                            <button onClick={handleHeirPage} id="decedent_edit" className="text-sm text-white bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2">
                                <AddIcon className="text-white" />
                                追加する
                            </button>
                        </div>
                    </div>
                    <div className="page-description">                        
                        <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                            無料de相続は相続人6人までの申告書作成ができます。法定相続人がいない場合や相続人が7人以上いる場合は税理士にご相談ください。
                        </p>
                    </div>
                    {showEndButton && (
                    <div className="end-btn text-center py-10">
                        <Link href="/summary-pages/summary-property">
                            <button type="button" className="cursor-pointer bg-primary-color rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300">
                                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                    入力終了（次へ）
                                </span>
                            </button>
                        </Link>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}


BasicInformation.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};