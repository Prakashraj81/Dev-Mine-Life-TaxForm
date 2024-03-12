import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';

export default function BasicInformation() {
    let [HeirList, setHeirList] = useState([]);
    let [HeirListLenth, setHeirListLenth] = useState(0);
    let [DecendentList, setDecendentList] = useState([]);
    let [showEndButton, setshowEndButton] = useState(false);

    useEffect(() => {
        GetDecendentList();
        GetHeirList();
    }, []);

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
    const EditDecendent = async(event) => {
        let ValueId =  event.currentTarget.id;
        if(ValueId !== ""){
            router.push(`/basic-information/decendent?Id=${btoa(ValueId)}`);            
        }
        else{
            router.push("/auth/login");
        }
    }


    const handleDelete = async(DeleteId) => {
        DeleteId = Number(DeleteId);
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key, id: DeleteId };
        if(DeleteId !== 0 && auth_key !== null){
            try{
                const response = await axios.get('https://minelife-api.azurewebsites.net/delete_heir', {params});
                if(response.status === 200){
                    GetHeirList();
                }
                else{
                    
                }
            }catch (error){
                console.error('Error:', error);
            }
        }  
        else{
            //Logout();
        }      
    };

    const router = useRouter();
    const handleEdit = (Edit_Id) => {
        router.push(`/basic-information/heir?editId=${Edit_Id}`);
    };

    const handleHeirPage = () => {
        router.push({
            pathname: '/basic-information/heir',
            query: { heirNo: HeirListLenth + 1 },
        });
    }


    return (
        <>
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
                        被相続人、相続を受ける方の情報を「<EditOutlinedIcon className="rotate-1" />」ボタン、「追加する」ボタンをクリックし、ご入力ください。入力が完了しましたら「入力終了（次へ）」をクリックし、財産情報の入力へ進んでくださ い。
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
                                    id={DecendentList.decedent_id || "0"} 
                                    value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                        <ModeEditIcon className="text-white" />
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
                                                        {list.is_legal === "Yes" ? "法定相続人" : ""}
                                                    </td>
                                                    <td className="text-left pt-3">
                                                        {list.is_legal === "Yes" ? "1/2_ _" : ""}
                                                    </td>
                                                    <td className="text-right pt-3">
                                                        <button onClick={() => handleEdit(list.heir_id)} id={list.heir_id} value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                                            <ModeEditIcon className="text-white" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left pt-3">{list.name}</td>
                                                    <td className="text-left pt-3">{list.relationship_with_decedent}</td>
                                                    <td className="text-left pt-3"></td>
                                                    <td className="text-left pt-3"></td>
                                                    <td className="text-right pt-3">
                                                        <button onClick={() => handleDelete(list.heir_id)} id={list.heir_id} value="Delete" className="text-base bg-red-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                                            <DeleteOutlinedIcon className="text-white" />
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