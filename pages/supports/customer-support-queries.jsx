"use client";
import * as React from 'react';
import Link from "next/link";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import FullLayout from "../../components/layouts/full/FullLayout";

export default function CustomerSupportQueries() {
  const CashDeposits = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [FirstName, setFirstName] = useState("");
  const [SurName, setSurName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [CashDeposit, setCashDeposit] = useState(CashDeposits[0].value);
  const [Question, setQuestion] = useState("");

  const handleDropdownChange = (event) => {
    setCashDeposit(event.target.value);
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      Name: "",
      SurName: "",
      PhoneNo: "",
      CashDeposit: "",
      Question: "",
    }
  });

  const onSubmit = async (defaultValues) => {
    var value = JSON.stringify(defaultValues);
    console.log(value);
    if (value.Name != "") {
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
      
      <div className="customer-call-page-wrapper py-24">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex items-center justify-between mb-7">
              <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                <div className="user-details">
                  <div className="label w-full inline-block">
                    <label htmlFor="Name" className="form-label">
                      名前
                    </label>
                  </div>
                  <div className="w-full inline-block mt-2">
                    <input
                      type="text"
                      id="Name"
                      className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                      {...register("Name", { required: "Name is required" })}
                      aria-invalid={errors.Name ? "true" : "false"}
                    />
                    {errors.Name && <p className="text-red-500" role="alert">{errors.Name?.message}</p>}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                <div className="user-details">
                  <div className="label w-full inline-block">
                    <label htmlFor="Surname" className="form-label">
                      苗字
                    </label>
                  </div>
                  <div className="w-full inline-block mt-2">
                    <input
                      type="text"
                      id="Surname"
                      className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                      {...register("Surname", { required: "Surname is required" })}
                      aria-invalid={errors.Surname ? "true" : "false"}
                    />
                    {errors.Surname && <p className="text-red-500" role="alert">{errors.Surname?.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full block items-center justify-between mb-7">
              <div className="user-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="PhoneNo" className="form-label">
                    電話番号
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="PhoneNo"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    {...register("PhoneNo", { required: "PhoneNo is required" })}
                    aria-invalid={errors.PhoneNo ? "true" : "false"}
                  />
                  {errors.PhoneNo && <p className="text-red-500" role="alert">{errors.PhoneNo?.message}</p>}
                </div>
              </div>
            </div>

            <div className="w-full inline-block items-center justify-between mb-7">
              <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                <div className="label w-full inline-block">
                  <label htmlFor="Name" className="form-label">
                    えメール
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' value={CashDeposit} onChange={handleDropdownChange}>
                    {CashDeposits.map((option) => (
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
                  <label htmlFor="Name" className="form-label">
                    その他
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <textarea rows={4} {...register("Question")} className="form-control w-full bg-custom-gray focus:outline-none rounded pl-3">
                  </textarea>
                </div>
              </div>
            </div>



            <div className="login-btn pt-10 text-center">
              <button
                type="submit"
                className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                  入力終了（次へ）
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
}

CustomerSupportQueries.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};