"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAnimation } from 'framer-motion';
import { FaLongArrowAltRight } from "react-icons/fa";
import Slide from "@/components/main/Slide";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { onClickCheckSignUser } from "@/libs/errorHandler";
import NavMenu from "@/components/main/NavMenu";
import { Skeleton } from "@/components/ui/skeleton"
import client from "@/libs/pocketbase";
import { Combobox } from "@/components/main/Combobox";
import { Companies } from "@/types/companies/type";


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIogin, setIsIogin] = useState<boolean | null>(null)
  const [companies, setCompanies] = useState<Companies>([])
  const [currentCompany, setCurrentCompany] = useState<string>("")
  const controls = useAnimation();


  useEffect(() => {
    setIsIogin(client.authStore.isValid)
    const userId = client.authStore.model?.id
    const getIoginUserCompanies = async () => {
      try {
        const company = await client.collection('users').getOne(userId, { expand: "companies", fields: "expand.companies.id,expand.companies.name,expand.companies.logo" });
        setCompanies(company?.expand?.companies)
      }
      catch (error) {
        console.error('Error fetching user wait:', error);
        throw error;
      }

    }
    getIoginUserCompanies()
  }, [])

  console.log(companies)

  useEffect(() => {
    /** 상단 메인 이미지 뒤에 있는 BG의 색상이 스크롤에 위치에 따라 생상 뚜렷하게 만드는 함수 **/
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <main className="w-[1100px] mx-auto">
      <nav className={`fixed z-50 w-screen left-0 top-0 transition duration-200 ease-in-out ${isScrolled ? ' border-b border-gray-300 bg-white/70 backdrop-blur-xl' : 'bg-white'}  `}>
        <div className="w-[1100px] mx-auto py-8 px-10 flex justify-between">
          <div className="flex items-center space-x-2">
            <Image className=" rounded-3xl" src="/logo.png" alt="logo" width={35} height={35} />
            <h1 className=" text-xl text-gray-900 font-black">TouchFlow</h1>
          </div>
          <NavMenu currentCompany={currentCompany} />
          {isIogin == null && (
            <div className=" flex items-center space-x-3">
              <Skeleton className="w-[150px] bg-slate-200 h-[35px] rounded-full" />
              <Skeleton className="w-[90px] bg-slate-200 h-[35px] rounded-full" />
            </div>
          )
          }
          {isIogin && (<Combobox companies={companies} setCurrentCompany={setCurrentCompany} />)}
          {isIogin == false && (
            <div className="space-x-1">
              <Link href="/auth/signin" onClick={onClickCheckSignUser} className={navigationMenuTriggerStyle()}>sign in</Link>
              <Link href="/auth/signup" onClick={onClickCheckSignUser} className={navigationMenuTriggerStyle() + "hover:bg-main focus:bg-main bg-main hover:text-white text-white "}>sign up</Link>
            </div>
          )}


        </div>
      </nav>
      <section className=" relative text-center mt-56">
        <div className="space-y-6">
          <h4 className=" text-6xl font-black tracking-[-0.5px]">Why pay more?  It's free.</h4>
          <p className="text-2xl text-gray-600 tracking-[-0.4px] leading-10">government of the people, by the people, for the people, <br />shall not perish from the earth.</p>
        </div>
        <Link href="" className=" bg-main text-white font-semibold py-4 px-6 rounded-lg inline-block mt-10">Get Started</Link>
        <div className="absolute z-[-10] right-10 top-24">
          <div
            className={`transition duration-700 ease-in-out ${isScrolled ? 'opacity-90' : 'opacity-40'} w-[570px] h-[820px] rounded-full mx-auto blur-3xl bg-gradient-to-t  from-white via-purple-500 to-white`}>
          </div>
        </div>
        <div className="absolute z-[-10] left-0 top-28">
          <div
            className={`transition duration-700 ease-in-out ${isScrolled ? 'opacity-70' : 'opacity-30'} w-[680px] h-[620px] rounded-full mx-auto blur-3xl bg-gradient-to-t from-white via-pink-600 to-white`}>
          </div>
        </div>
        <div className="absolute z-[-10] right-12 top-46">
          <div
            className={`transition duration-700 ease-in-out ${isScrolled ? 'opacity-70' : 'opacity-30'} w-[750px] h-[820px] rounded-full mx-auto blur-3xl bg-gradient-to-t from-white via-main to-white`}>
          </div>
        </div>
        <div className="absolute z-[-10] right-12 top-96">
          <div
            className={`transition duration-700 ease-in-out ${isScrolled ? 'opacity-90' : 'opacity-30'} w-[750px] h-[820px] rounded-full mx-auto blur-3xl bg-gradient-to-t from-white via-main to-white`}>
          </div>
        </div>
        <div className="absolute z-[-10] left-0 top-80">
          <div
            className={`transition duration-700 ease-in-out ${isScrolled ? 'opacity-40' : 'opacity-10'} w-[680px] h-[920px] rounded-full mx-auto blur-3xl bg-gradient-to-t from-white  via-purple-600 to-white`}>
          </div>
        </div>
      </section>
      <div className="relative mt-24 rounded-lg p-4 w-[1000px] mx-auto">
        <Image className={` transition duration-700 ease-in-out rounded-2xl ${isScrolled ? 'blur-none' : 'blur-md'} w-full`} src="/main/main-top-1.jpeg" alt="main_image_top" width={1000} height={1000}></Image>
      </div>
      <section className=" text-center text-gray-600 mt-24 text-lg">
        <p>We use more than 8+ development stacks and three developers participated.</p>
        <ul className=" grid grid-cols-4 gap-8 w-[920px] text-center mx-auto mt-16 items-center justify-items-center">
          <li className=" w-[160px]">
            <Image className="grayscale inline-block" src={"/main/nextjs.png"} width={100} height={50} alt="nextjs-logo" />
          </li>
          <li className=" w-[160px]">
            <Image className="grayscale inline-block" src={"/main/twilio.png"} width={120} height={50} alt="tosspay-logo" />
          </li>
          <li className=" w-[160px]">
            <Image className="grayscale inline-block" src={"/main/pocketbase.png"} width={120} height={50} alt="tosspay-logo" />
          </li>
          <li className="flex w-[160px] items-center space-x-2">
            <Image className="grayscale inline-block" src={"/main/shadcn.png"} width={20} height={20} alt="tosspay-logo" />
            <span className=" text-xl font-black">Shadcn Ui</span>
          </li>
          <li className="flex w-[160px] items-center space-x-2">
            <Image className="grayscale inline-block" src={"/main/react-hook-form.png"} width={40} height={40} alt="tosspay-logo" />
            <span className=" text-xl font-black">Hook Form</span>
          </li>
          <li className=" w-[160px]">
            <Image className="grayscale inline-block" src={"/main/typescript.png"} width={120} height={50} alt="tosspay-logo" />
          </li>
          <li className=" w-[160px]">
            <Image className="grayscale inline-block" src={"/main/tailwind-css.png"} width={140} height={70} alt="tosspay-logo" />
          </li>
          <li className=" w-[120px]">
            <Image className="grayscale inline-block" src={"/main/tosspay.png"} width={140} height={50} alt="tosspay-logo" />
          </li>
        </ul>
      </section>
      <section className="mt-64 text-center space-y-6">
        <h2 className="text-6xl font-black">Who created the Touchflow?</h2>
        <p className="text-2xl text-gray-600 tracking-[-0.4px] leading-10">It was created with the goal of becoming a kiosk for everyone.</p>
      </section>
      <section className="mt-36 space-y-36">
        <Slide delay={0.4} className="flex justify-between items-center">
          <div>
            <div className="space-y-5">
              <span className=" text-main text-xl font-semibold">1 • CHRIS</span>
              <h3 className=" font-semibold text-4xl">Creating a kiosk.</h3>
              <p className=" text-2xl text-gray-600">He managed the kiosk page and payment module <br /> generation middleware used by the user <br /> and headed the overall project</p>
            </div>
            <Link href="/" className="  decoration-slice mt-9 text-main text-lg flex items-center">Representative Page<FaLongArrowAltRight /></Link>
            <p className=" mt-10 text-gray-400">"I would rather that everyone were betrayed by me<br /> instead of me being betrayed by everyone."</p>
          </div>
          <div className=" bg-slate-200 w-[500px] h-[500px] rounded-2xl"></div>
        </Slide>
        <Slide delay={0.4} className="flex justify-between items-center">
          <div className=" bg-slate-200 w-[500px] h-[500px] rounded-2xl"></div>
          <div>
            <div className="space-y-5">
              <span className=" text-main text-xl font-semibold">2 • XERAPH</span>
              <h3 className=" font-semibold text-4xl">Creating a kiosk.</h3>
              <p className=" text-2xl text-gray-600">He managed the kiosk page and payment module <br /> generation middleware used by the user <br /> and headed the overall project</p>
            </div>
            <Link href="/" className="  decoration-slice mt-9 text-main text-lg flex items-center">Representative Page<FaLongArrowAltRight /></Link>
            <p className=" mt-10 text-gray-400">"I would rather that everyone were betrayed by me<br /> instead of me being betrayed by everyone."</p>
          </div>

        </Slide>
        <Slide delay={0.4} className="flex justify-between items-center">
          <div>
            <div className="space-y-5">
              <span className=" text-main text-xl font-semibold">3 • Sumin</span>
              <h3 className=" font-semibold text-4xl">Creating a kiosk.</h3>
              <p className=" text-2xl text-gray-600">He managed the kiosk page and payment module <br /> generation middleware used by the user <br /> and headed the overall project</p>
            </div>
            <Link href="/" className="  decoration-slice mt-9 text-main text-lg flex items-center">Representative Page<FaLongArrowAltRight /></Link>
            <p className=" mt-10 text-gray-400">"I would rather that everyone were betrayed by me<br /> instead of me being betrayed by everyone."</p>
          </div>
          <div className=" bg-slate-200 w-[500px] h-[500px] rounded-2xl"></div>

        </Slide>
      </section>
    </main >
  );
}
