import Link from "next/link";
import Image from "next/image";
import LogoIcon from "./logo/LogoIcon";
import UserProfileDropdown from '../auth/user-profile-dropdown';

export default function Header() {
  return (
    <>
      <header className="login-header bg-white px-20 shadow-normal relative z-10">
        <div className="navbar">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <LogoIcon />
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="header-menus">
                  <ul className="flex items-baseline space-x-24 nav-menu">
                    <li>
                      <Link
                        href={"/"}
                        className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
                      >
                        診断(調整中)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/"}
                        className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
                      >
                        申告書の作成が難しい方へ
                      </Link>
                    </li>
                    <li>
                      <span
                        className="text-black font-medium text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
                      >
                        
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
