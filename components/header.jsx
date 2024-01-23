import Link from "next/link";
import Logo from "./layouts/full/shared/logo/Logo";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <>      
      <header className="basic-header bg-white px-4 lg:px-20 xl:px-20 2xl:px-20">
      <Navbar />
        <div className="hidden navbar">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Logo />
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
