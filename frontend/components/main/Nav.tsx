import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Combobox } from "./Combobox";
import NavMenu from "./NavMenu";
import Image from "next/image";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Companies } from '../../types/companies/type';
import { boolean } from "zod";


const Nav = ({ companies, isIogin, isScrolled, currentCompany, setCurrentCompany }: { currentCompany: string, isIogin: boolean | null, isScrolled: boolean, companies: Companies, setCurrentCompany: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <nav className={`fixed z-50 w-screen left-0 top-0 transition duration-200 ease-in-out ${isScrolled ? ' border-b border-gray-300 bg-white/70 backdrop-blur-xl' : 'bg-white'}  `}>
            <div className="w-[1100px] mx-auto py-8 px-10 flex justify-between">
                <div className="flex items-center space-x-2">
                    <Image className=" rounded-3xl" src="/logo.png" alt="logo" width={35} height={35} />
                    <h1 className=" text-xl text-gray-900 font-black">TouchFlow</h1>
                </div>

                {isIogin == null && (
                    <div className=" flex items-center space-x-14">
                        <Skeleton className="w-[540px] bg-slate-200 h-[35px] rounded-full" />
                        <Skeleton className="w-[170px] bg-slate-200 h-[35px] rounded-full" />
                    </div>
                )
                }
                {isIogin && (
                    <>
                        <NavMenu currentCompany={currentCompany} />
                        <Combobox companies={companies} currentCompany={currentCompany} setCurrentCompany={setCurrentCompany} />
                    </>
                )
                }
                {isIogin == false && (
                    <div className="space-x-1">
                        <Link href="/auth/signin" className={navigationMenuTriggerStyle()}>sign in</Link>
                        <Link href="/auth/signup" className={navigationMenuTriggerStyle() + "hover:bg-main focus:bg-main bg-main hover:text-white text-white "}>sign up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
