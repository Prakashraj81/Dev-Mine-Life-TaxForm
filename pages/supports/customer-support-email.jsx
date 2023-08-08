"use client";
import Link from "next/link";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import FullLayout from "../../components/layouts/full/FullLayout";

export default function CustomerSupportEmail() {

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Question, setQuestion] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      Name: "",
      Email: "",
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
      
      <div className="customer-email-page-wrapper py-24">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="user-details mb-7">
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

            <div className="user-details mb-7">
              <div className="label w-full inline-block">
                <label htmlFor="Name" className="form-label">
                  えメール
                </label>
              </div>
              <div className="w-full inline-block mt-2">
                <input
                  type="email"
                  id="Email"
                  className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                  {...register("Email", { required: "Email is required" })}
                  aria-invalid={errors.Email ? "true" : "false"}
                />
                {errors.Email && <p className="text-red-500" role="alert">{errors.Email?.message}</p>}
              </div>
            </div>

            <div className="user-details mb-7">
              <div className="label w-full inline-block">
                <label htmlFor="Name" className="form-label">
                  ご質問・ご要望
                </label>
              </div>
              <div className="w-full inline-block mt-2">
                <textarea rows={4} {...register("Question")} className="form-control w-full bg-custom-gray focus:outline-none rounded pl-3">
                </textarea>
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


CustomerSupportEmail.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};