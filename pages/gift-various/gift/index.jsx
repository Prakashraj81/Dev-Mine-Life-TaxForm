"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function Gift() {
    let LandSpousalList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    let HouseList = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [LandSpousalType, setLandSpousalType] = useState("");
    const [HouseType, setHouseType] = useState("");
    const [ConstructionDate, setConstructionDate] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            LandSpousalType: "",
            HouseType: "",
            ConstructionDate: "",
        }
    });

    const handleDropdownChange = (event) => {
        setLandSpousalType(event.target.value);
    };

    const HouseDropdownChange = (event) => {
        setHouseType(event.target.value);
    };


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.LandSpousalType != "") {
            var Apiurl = "/";
            const urlresponse = await fetch(Apiurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(defaultValues),
                mode: "no-cors",
            });
        }
        else {

        }
        //res.status(200).end()
    };
    return (
        <>
            <div className="cash-savings-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            配偶者居住権の設定
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>
                <div className="w-full inline-block">
                    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="LandSpousal" className="w-full inline-block form-label">
                                        配偶者居住権を設定する土地
                                    </label>
                                    <label htmlFor="Deposit" className="w-full inline-block mt-2 text-10 lg:text-12 xl:text-12 2xl:text-12 form-label">
                                        土地が表示されない場合は、「財産の入力」で借地権割合を登録して下さい。
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={LandSpousalList} onChange={HouseDropdownChange}>
                                        {LandSpousalList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="House" className="w-full inline-block form-label">
                                        配偶者居住権を設定する家屋
                                    </label>
                                    <label htmlFor="Deposit" className="w-full inline-block mt-2 text-10 lg:text-12 xl:text-12 2xl:text-12 form-label">
                                        家屋が表示されない場合は、「財産の入力」で家屋の構造を再登録して下さい。
                                    </label>
                                    <label htmlFor="Deposit" className="w-full inline-block text-10 lg:text-12 xl:text-12 2xl:text-12 form-label">
                                        同一の建物の中で、居宅、店舗、賃貸部分と別れている場合はそれぞれ家屋を登録して下さい。
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={HouseList} onChange={handleDropdownChange}>
                                        {HouseList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label htmlFor="ConstructionDate" className="w-full inline-block mt-1 form-label">
                                        家屋の建築年月日
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="date"
                                        id="ConstructionDate"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-3"
                                        {...register("ConstructionDate")}
                                        aria-invalid={errors.ConstructionDate ? "true" : "false"}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        配偶者居住権の設定原因
                                    </label>
                                </div>
                                <div className="w-full inline-block lg:flex xl:flex 2xl:flex justify-start items-center mt-2">
                                    <label className="mr-0 lg:mr-12">
                                        <div>
                                            <input type="radio" className="mr-1" value="遺産分割協議" {...register("RadioBtn")} />
                                            遺産分割協議
                                        </div>
                                    </label>
                                    <label>
                                        <div>
                                            <input className="mr-1" type="radio" value="遺贈" {...register("RadioBtn")} />
                                            遺贈
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        配偶者居住権の設定期間
                                    </label>
                                </div>
                                <div className="w-full inline-block lg:flex xl:flex 2xl:flex justify-start items-center mt-2">
                                    <label className="mr-0 lg:mr-12">
                                        <div>
                                            <input type="radio" className="mr-1" value="遺産分割協議" {...register("RadioBtn")} />
                                            遺産分割協議
                                        </div>
                                    </label>
                                    <label>
                                        <div>
                                            <input className="mr-1" type="radio" value="遺贈" {...register("RadioBtn")} />
                                            遺贈
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block mb-1">
                            <div className="w-full inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        評価額
                                    </label>
                                    <label className="w-full inline-block form-label text-10 lg:text-12 xl:text-12 2xl:text-12">
                                        戸建ての土地またはマンションの区分所有内で共有者がいる場合は共有者氏名とそれぞれの持分割合を入力してください
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="w-full inline-block text-left mb-7">
                            <Link href="/gift-various/exceptions-residential-land/exceptions-residential-add">
                                <button id="decedent_edit" className="text-12 text-white bg-primary-color rounded-sm hover:bg-primary-color px-2 py-1 tracking-2 text-custom-black">
                                    <AddIcon className="text-white" />
                                    共有者を追加する
                                </button>
                            </Link>
                        </div>


                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details flex justify-between items-center">
                                    <div className="w-full">
                                        <label className="form-label">
                                            前相続の被相続人氏名
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <label className="form-label">
                                            0
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details flex justify-between items-center">
                                    <div className="w-full">
                                        <label className="form-label">
                                            敷地利用権の価額
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <label className="form-label">
                                            0
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details flex justify-between items-center">
                                    <div className="w-full">
                                        <label className="form-label">
                                            建物所有権の価額
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <label className="form-label">
                                            0
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details flex justify-between items-center">
                                    <div className="w-full">
                                        <label className="form-label">
                                            敷地所有権の価額
                                        </label>
                                    </div>
                                    <div className="w-full">
                                        <label className="form-label">
                                            0
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="page-content w-full inline-block text-center py-7 border-b-2">
                            <p className="text-12 md:text-14 lg:text-14 xl:text-14 2xl:text-14 text-black font-medium">
                                建物・土地の所有権の受取人
                            </p>
                        </div>

                        <div className="mb-7">
                            <table className="w-full">
                                <tr className="border-b-2">
                                    <th className="text-14 font-medium text-left py-2">受取人</th>
                                    <th className="text-14 font-medium text-left py-2">建物価額</th>
                                    <th className="text-14 font-medium text-left py-2">分割割合</th>
                                    <th className="text-14 font-medium text-left py-2">土地価額</th>
                                    <th className="text-14 font-medium text-left py-2">分割割合</th>
                                </tr>
                                <tr className="border-b-2">
                                    <td>山田　太郎</td>
                                    <td className="text-right">0</td>
                                    <td style={{ width: "200px" }}>
                                        <div className="flex py-3">
                                            <div className="flex justify-end input-group">
                                                <input type="text" className="border-2 text-right form-control w-50 outline-none" value="" />
                                            </div>
                                            <span className="w-5 h4"> /</span>
                                            <div className="flex input-group">
                                                <input type="text" className="border-2 text-right form-control w-50 outline-none" value="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right">0</td>
                                    <td>
                                        <td style={{ width: "200px" }}>
                                            <div className="flex py-3">
                                                <div className="flex justify-end input-group">
                                                    <input inputmode="decimal" type="text" className="border-2 text-right form-control w-50 outline-none" value="" />
                                                </div>
                                                <span className="w-5 h4"> /</span>
                                                <div className="flex input-group">
                                                    <input inputmode="decimal" type="text" className="border-2 text-right form-control w-50 outline-none" value="" />
                                                </div>
                                            </div>
                                        </td>
                                    </td>
                                </tr>
                                <tr className="border-b-2">
                                    <td>相続人未決定</td>
                                    <td className="text-right">0</td>
                                    <td></td>
                                    <td className="text-right">0</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>合計</td>
                                    <td className="text-right">0</td>
                                    <td></td>
                                    <td className="text-right">0</td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>






                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center pt-10">
                            <div className="save-btn text-center">
                                <Link href="/">
                                    <button
                                        className="bg-return-bg rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                            戻る
                                        </span>
                                    </button>
                                </Link>
                            </div>
                            <div className="save-btn text-center">
                                <button
                                    type="submit"
                                    className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        保存
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="heading text-center pt-8">
                            <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

Gift.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};