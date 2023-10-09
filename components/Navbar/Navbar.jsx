import React, {useState} from "react";
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Image from 'next/image';

const navigation = [
    //{ name: 'サービス', href: '/pages/service', current: false },
    //{ name: 'お客様の声', href: '/pages/customer-voice', current: false },
    { name: '私たちについて', href: '/pages/about-us', current: false },
    { name: '相続税申告ガイド', href: '/pages/inheritance-tax-declaration-guide', current: false },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav as="nav" className="navbar">
            <>
                <div className="mx-auto max-w-full p-3 md:p-6 lg:px-8">
                    <div className="relative flex lg:block items-center justify-between">
                        <div className="flex justify-between"> 
                            <div className="flex sm:hidden flex-shrink-0 items-center border-right">
                                <Image src="/logo/main-logo.svg" alt="logo" width={150} height={60} />                               
                            </div>
                            <div className="hidden sm:flex flex-shrink-0 items-center border-right">
                                <Image src="/logo/main-logo.svg" alt="logo" width={180} height={50} />                                
                            </div>   
                            <div>
                                     
                            <div className="hidden lg:flex items-center border-right">
                                <div className="flex justify-end space-x-12">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`
                                                ${item.current ? 'bg-black' : 'navlinks hover:opacity-100'}
                                                'px-3 py-4 rounded-md text-base font-normal hover:text-black space-links'
                                            `}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className='gap-6 hidden text-center lg:inline-block'>      
                                    <Link href="/auth/login" className="block text-blue-500">【Mine life相続】ログイン・無料登録</Link>                                              
                                    <Link href="/pages/contact-us">
                                        <button className='inline-block text-center mt-3 text-sm font-medium bg-primary-color border border-primary-color text-white py-2 px-3 navbutton rounded-full hover:bg-white hover:text-primary-color'>ご相談・お問い合わせ</button>                                    
                                    </Link>
                                </div>
                            </div>  
                        </div>                                         
                        </div>                        
                        <div className='block lg:hidden'>
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>

                       {/* Mobile mobile menu */}

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>

                    </div>
                </div>
            </>
        </nav>
    )
}

export default Navbar;
