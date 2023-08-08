"use client";
import Link from "next/link";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import FullLayout from "../../components/layouts/full/FullLayout";

export default function CustomerSupportTicket() {

  const [Email, setEmail] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      Email: "",
    }
  });

  const onSubmit = async (defaultValues) => {
    var value = JSON.stringify(defaultValues);
    console.log(value);
    if (value.Email != "") {
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
      
      <div className="customer-ticket-page-wrapper">
        <div className="border-b-2 border-solid">
          <div className="max-w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-xl mx-auto">
            <div className="w-full block lg:flex xl:flex 2xl:flex justify-between py-6 md:py-10 lg:py-20 xl:py-20 2xl:py-20">
              <div className="w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 inline-block float-left">
                <div className="conetnt pt-6 md:pt-10 lg:pt-12 xl:pt-12 2xl:pt-7">
                  <h3 className="text-black font-bold text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl">品質</h3>
                  <h3 className="text-black font-bold text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl py-5">サービス あなた</h3>
                  <h3 className="text-black font-bold text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl">本当に 欲しいです 。</h3>
                </div>
                <div className="para py-5">
                  <p className="text-black font-medium text-base leading-7 tracking-2 lg:text-lg xl:text-lg 2xl:text-lg">すべてを集約する最初のプラットフォーム カスタマー サポート<br></br>
                    プラットフォーム</p>
                </div>
                <div class="formContainer pt-8">
                  <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div class="email-wrap">
                      <input type="text" placeholder="メールを入力してください"
                        {...register("Email", { required: "Email is required" })}
                        aria-invalid={errors.Email ? "true" : "false"}
                      />
                      <button type="submit"><span>始めましょう</span> </button>
                    </div>
                    {errors.Email && <p className="text-red-500" role="alert">{errors.Email?.message}</p>}
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 inline-block float-left">
                <div className="ticket-img">
                  <Image
                    className="ticket-main mx-auto"
                    src="../supports/ticket-promo-top.svg"
                    alt="mine-life"
                    width={500}
                    height={100}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-xl mx-auto py-20">
          <div className="supoort-heading text-center">
            <h2 className="text-black font-medium text-2xl lg:text-28 xl:text-28 2xl:text-28 tracking-2 leading-7">それで、今日あなたをここに連れてき</h2>
            <h2 className="text-black font-medium text-2xl lg:text-28 xl:text-28 2xl:text-28 tracking-2 leading-7 pt-3">たのは何ですか</h2>
          </div>
          <div className="w-full inline-block text-center py-20">
            <div className="w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 inline-block float-left border-r-2">
              <div className="support-bottom">
                <Image
                  className="email-support mx-auto"
                  src="../supports/email-support.svg"
                  alt="mine-life"
                  width={180}
                  height={70}
                  priority
                />
              </div>
              <div className="content">
                <p className="text-black font-medium leading-7 tracking-2 text-sm lg:text-base xl:text-base 2xl:text-base">サポートにメールを使用しています</p>
                <p className="text-black font-medium leading-7 tracking-2 pt-1 text-sm lg:text-base xl:text-base 2xl:text-base">そして混沌としている</p>
              </div>
              <div className="support-btn py-5">
                <button className="bg-white border-2 border-solid border-primary-color text-primary-color text-sm tracking-2 leading-7 px-5 py-1 rounded">
                  <Link href="./customer-support-email">
                    発券開始
                  </Link>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 inline-block float-left">
              <div className="support-bottom">
                <Image
                  className="email-support mx-auto"
                  src="../supports/helpdesk-support.svg"
                  alt="mine-life"
                  width={180}
                  height={70}
                  priority
                />
              </div>
              <div className="content">
                <p className="text-black font-medium leading-7 tracking-2 text-sm lg:text-base xl:text-base 2xl:text-base">別のヘルプデスクを使用しています</p>
                <p className="text-black font-medium leading-7 tracking-2 pt-1 text-sm lg:text-base xl:text-base 2xl:text-base">そして混沌としている</p>
              </div>
              <div className="support-btn py-5">
                <button className="bg-white border-2 border-solid border-primary-color text-primary-color text-sm tracking-2 leading-7 px-5 py-1 rounded">
                  <Link href="./customer-support-call">
                    発券開始
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}


CustomerSupportTicket.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};