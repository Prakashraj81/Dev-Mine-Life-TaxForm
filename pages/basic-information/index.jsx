import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FullLayout from '../../components/layouts/full/FullLayout';

export default function BasicInformation() {
    let [HeirList, setHeirList] = useState([]);
    let [heir_list, setheir_list] = useState([]);
    let [showEndButton, setshowEndButton] = useState(false);
    heir_list = [
        { id: 1, Name: "Gowtham", RelationshipWithDecedent: "Child", heir: "No" },
        // { id: 2, Name: "Prakashraj", RelationshipWithDecedent: "Child", heir: "No" },
        // { id: 3, Name: "Shree", RelationshipWithDecedent: "Younger brother", heir: "Yes" },
    ];
    useEffect(() => {
        let sessionValue = sessionStorage.getItem('Heir');
        var tempArray = [];
        tempArray[0] = JSON.parse(sessionValue);
        if (tempArray[0] !== null) {
            setHeirList(tempArray);
        }
        else {
            setHeirList([]);
        }
        //Heir list length (API)        
        if(heir_list.length !== 0){
            setshowEndButton(true);
        }
        else{
            setshowEndButton(false);
        }
    }, []);

    const handleDelete = (index) => {
        let updatedList = [...heir_list];
        updatedList.splice(index, 1);
        setheir_list(updatedList);
    };

    const router = useRouter();
    const handleEdit = (Edit_Id) => {
        Edit_Id = btoa(Edit_Id);
        router.push(`/basic-information/heir?Id=${Edit_Id}`);
    };

    const handleHeirPage = () => {
        router.push({
            pathname: '/basic-information/heir',
            query: { heirNo: '2' },
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
                                        <label>名前</label>
                                    </div>
                                </div>
                                <div className="w-full block lg:w-32">
                                    <div className="w-full inline-block heading">
                                        <label>お亡くなりになった日</label>
                                    </div>
                                    <div className="w-full inline-block heading pt-4">
                                        <label>01-01-01</label>
                                    </div>
                                </div>
                                <div className="w-full block float-right text-right lg:w-32">
                                    <Link href="/basic-information/decendent">
                                        <button value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                            <ModeEditIcon className="text-white" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="heir-list py-10">
                            <div className="heir-heading py-3"><span>相続人</span></div>
                            <table className="w-full">
                                {heir_list.map((list, index) => {
                                    return (
                                        <>
                                            <React.Fragment key={index}>
                                                <tr className="w-full border-t">
                                                    <td className="text-left pt-3">氏名</td>
                                                    <td className="text-left pt-3">続柄</td>
                                                    <td className="text-left pt-3">
                                                        {list.heir === "Yes" ? "法定相続人" : ""}
                                                    </td>
                                                    <td className="text-left pt-3">
                                                        {list.heir === "Yes" ? "1/2_ _" : ""}
                                                    </td>
                                                    <td className="text-right pt-3">
                                                        <button onClick={() => handleEdit(list.id)} id={list.id} value="Edit" className="text-base bg-primary-color rounded-sm px-1 py-1 tracking-2 text-custom-black">
                                                            <ModeEditIcon className="text-white" />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left pt-3">{list.Name}</td>
                                                    <td className="text-left pt-3">{list.RelationshipWithDecedent}</td>
                                                    <td className="text-left pt-3"></td>
                                                    <td className="text-left pt-3"></td>
                                                    <td className="text-right pt-3">
                                                        <button onClick={() => handleDelete(index)} id={list.id} value="Delete" className="text-base bg-red-500 rounded-sm px-1 py-1 tracking-2 text-custom-black">
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