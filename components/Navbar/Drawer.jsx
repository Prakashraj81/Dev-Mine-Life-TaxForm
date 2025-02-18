/* eslint-disable react/prop-types */
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';


const Drawer = ({ children, isOpen, setIsOpen }) => {
    return (
        <main
            className={
                " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 -translate-x-full  ")
            }
        >
            <section
                className={
                    "w-85 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                    (isOpen ? "translate-x-0" : "-translate-x-full")
                }
            >
                <article className="relative w-full max-w-lg pb-10 flex flex-col space-y-6 h-full">
                    <header className="px-4 py-4 flex items-center justify-between">

                        <div className="flex flex-shrink-0 items-center border-right">
                            <Image src="/logo/main-logo.svg" alt="logo" width={120} height={50} />                            
                        </div>
                        <CloseIcon className="block h-6 w-6" onClick={() => {
                            setIsOpen(false);
                        }} />
                    </header>
                    <div onClick={() => {
                        setIsOpen(false);
                    }}>{children}</div>
                </article>
            </section>
            <section
                className="w-screen h-full cursor-pointer "
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
}

export default Drawer;
