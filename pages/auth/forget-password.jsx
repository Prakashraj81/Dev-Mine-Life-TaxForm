"use client";
import Link from "next/link";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlankLayout from '../../components/layouts/blank/BlankLayout';

export default function ForgetPassword() {

  const [ForgetPasswordEmail, setForgetPasswordEmail] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ForgetPasswordEmail: "",
    }
  });

  const onSubmit = async (defaultValues) => {
    var value = JSON.stringify(defaultValues);
    console.log(value);
    if (value.ForgetPasswordEmail != "") {
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
    <Header/>
      <div className="forget-password-form-wrapper py-32">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <div className="page-heading">
              <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                メールアドレスの入力
              </p>
            </div>
          </div>
          <div className="page-description py-8">
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              会員登録に使用したメールアドレスを入力し、送信ボタンを押して下さい。
            </p>
          </div>
          <div className="login-forms">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="ForgetPasswordEmail" className="form-label">
                    メールアドレス
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="email"
                    id="ForgetPasswordEmail"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    {...register("ForgetPasswordEmail", { required: "Email is required" })}
                    aria-invalid={errors.ForgetPasswordEmail ? "true" : "false"}
                  />
                  {errors.ForgetPasswordEmail && <p className="text-red-500" role="alert">{errors.ForgetPasswordEmail?.message}</p>}
                </div>
              </div>

              <div className="login-btn pt-10 text-center">
                <button
                  type="submit"
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    送信
                  </span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

ForgetPassword.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
