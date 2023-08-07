"use client";
import Link from "next/link";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/layouts/header";
import Footer from "../../components/layouts/footer";

export default function Register(props) {
  const [Name, setName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      Name: "",
      PhoneNo: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
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
      <Header />
      <div className="register-form-wrapper py-14">
        <div className="max-w-full lg:max-w-screen-xs xl:max-w-screen-xs 2xl:max-w-screen-xs mx-auto">
          <div className="register-forms">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="Name" className="form-label">
                    お名前
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

              <div className="phone-details mb-7">
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
                <div className="mt-1">
                  <p className="text-xs font-medium text-black">
                    ハイフン抜きで入力して下さい
                  </p>
                </div>
              </div>

              <div className="username-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="Email" className="form-label">
                    メールアドレス
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="text"
                    id="Email"
                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                    {...register("Email", { required: "Email Address is required" })}
                    aria-invalid={errors.Email ? "true" : "false"}
                  />
                  {errors.Email && <p className="text-red-500" role="alert">{errors.Email?.message}</p>}
                </div>
              </div>

              <div className="password-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="Password" className="form-label">
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

              <div className="password-details mb-7">
                <div className="label w-full inline-block">
                  <label htmlFor="ConfirmPassword" className="form-label">
                    Confirm パスワード
                  </label>
                </div>
                <div className="w-full inline-block mt-2">
                  <input
                    type="password"
                    id="ConfirmPassword"
                    className="form-control w-full bg-custom-gray rounded focus:outline-none h-12 pl-3"
                    {...register("ConfirmPassword", { required: "ConfirmPassword is required" })}
                    aria-invalid={errors.ConfirmPassword ? "true" : "false"}
                  />
                  {errors.ConfirmPassword && <p className="text-red-500" role="alert">{errors.ConfirmPassword?.message}</p>}
                </div>
              </div>

              <div className="login-btn pt-10 text-center">
                <button
                  type="submit"
                  className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    Mine life 相続を始める
                  </span>
                </button>
              </div>
              <div className="text-center">
                <div className="mt-3">
                  <p>
                    <span className="text-xs text-black font-medium">
                      Mine life 相続に登録することで、
                      <Link href="../auth/rules" className="text-blue-600">
                        利用規約
                      </Link>
                      に同意したものとみなします。
                    </span>
                  </p>
                </div>
                <div className="mt-7">
                  <p className="text-sm text-black font-medium">
                    会員登録済みの方
                  </p>
                </div>
              </div>
              <div className="register-btn pt-10 text-center">
                <Link href={"/"}>
                  <button className="bg-white border-2 border-primary-gray rounded px-7 py-2">
                    <span className="text-primary-gray text-sm font-medium">
                      ログイン
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
