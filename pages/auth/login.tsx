"use client";
import Link from "next/link";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/layouts/header";
import Footer from "../../components/layouts/footer";
import Register from './register';

export default function Login(props) {
  const { showregister } = props;
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      UserName: "",
      Password: "",
    }
  });


  const onSubmit = async (defaultValues) => {
    var value = JSON.stringify(defaultValues);
    console.log(value);
    var Apiurl = "/";
    const urlresponse = await fetch(Apiurl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultValues),
      mode: "no-cors",
    });
    //res.status(200).end()
  };

  return (
    <>
      <Header />
      <div className="login-form-wrapper py-14">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
            <div className="page-heading">
              <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                ログイン
              </p>
            </div>
          </div>
          <div className="page-description py-8">
            <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
              登録済みのメールアドレスでログインして下さい
            </p>
          </div>
          <div className="login-forms">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="usernameInput" className="form-label">
                    メールアドレス
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="UserName"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    {...register("UserName", { required: "User Name is required" })}
                    aria-invalid={errors.UserName ? "true" : "false"}
                  />
                  {errors.UserName && <p className="text-red-500" role="alert">{errors.UserName?.message}</p>}
                </div>
              </div>

              <div className="password-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="passwordInput" className="form-label">
                    パスワード
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="password"
                    id="Password"
                    className="form-control w-full bg-custom-gray rounded focus:outline-none h-12 pl-3"
                    {...register("Password", { required: "Password is required" })}
                    aria-invalid={errors.Password ? "true" : "false"}
                  />
                  {errors.Password && <p className="text-red-500" role="alert">{errors.Password?.message}</p>}
                </div>
              </div>


              <div className="login-btn pt-10 text-center">
                <button
                  type="submit"
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    ログイン
                  </span>
                </button>
              </div>
              <div className="text-center">
                <div className="mt-3">
                  <Link href="../forget-password">
                    <span className="text-xs text-black font-medium">
                      パスワードを忘れた方
                    </span>
                  </Link>
                </div>
                <div className="mt-7">
                  <p className="text-sm text-black font-semibold">
                    はじめてご利用の方
                  </p>
                </div>
              </div>
              <div className="register-btn pt-10 text-center">
                <Link href="/auth/register">
                  <button className="bg-white border-2 border-primary-gray rounded px-7 py-2">
                    <span className="text-primary-gray text-sm font-medium">
                      会員登録
                    </span>
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}




