import React from "react";
import Link from "next/link";

const navigation = [
    { name: 'サービス', href: '/pages/service', current: false },
    { name: 'お客様の声', href: '/pages/customer-voice', current: false },
    { name: '私たちについて', href: '/pages/about-us', current: false },
    { name: '相続税申告ガイド', href: '/pages/inheritance-tax-declaration-guide', current: false },
];

const Data = () => {
    return (
        <div className="rounded-md max-w-sm w-full mx-auto">
            <div className="flex-1 space-y-4 py-1">
                <div className="sm:block">
                    <div className="space-y-1 px-5 pt-2 pb-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                ${item.current ? 'bg-gray-900 text-purple' : 'text-black hover:bg-gray-700 hover:text-purple'}
                                block py-2 rounded-md text-base font-medium
                            `}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-4"></div>
                        <button className='flex justify-center text-base w-full font-medium rounded-full bg-bgpink text-pink py-3 px-4 lg:px-8 navbutton hover:text-white'>Sign in</button>
                        <button className='flex justify-center text-base w-full font-medium rounded-full bg-transparent border border-bgpink text-pink py-3 px-4 lg:px-8 navbutton hover:text-white hover:bg-pink'>Contact us</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;
