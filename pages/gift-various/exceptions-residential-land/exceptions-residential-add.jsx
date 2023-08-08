"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import FullLayout from '../../../components/layouts/full/FullLayout';

export default function ExceptionsResidentialAdd() {
    let DepositList = [
        
    ];

    const [DepositType, setDepositType] = useState("");

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            DepositType: "",
        }
    });

    const handleDropdownChange = (event) => {
        setDepositType(event.target.value);
    };


    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.DepositType != "") {
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
                            小規模宅地の特例1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>
                <div className="w-full inline-block">
                    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full inline-block items-center justify-between mb-7">
                            <div className="w-full inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="Deposit" className="form-label">
                                        小規模宅地の特例を適用する土地
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={DepositList} onChange={handleDropdownChange}>
                                        <option value=''></option>
                                        {DepositList.map((option) => (
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
                                    <label htmlFor="SamllResidentialLand" className="w-full inline-block form-label">
                                        小規模宅地等の種類
                                    </label>   
                                    <label htmlFor="ReductionRate" className="w-full inline-block form-label mt-2">
                                        減額割合:
                                    </label>                                 
                                </div>                                
                            </div>
                        </div>


                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
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
                                        保存して戻る
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

ExceptionsResidentialAdd.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};