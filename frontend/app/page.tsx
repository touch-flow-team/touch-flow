"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAnimation } from 'framer-motion';
import { FaLongArrowAltRight } from "react-icons/fa";
import Slide from "@/components/main/Slide";
import client from "@/libs/pocketbase";
import { Companies } from "@/types/companies/type";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Nav from "@/components/main/Nav";
import { CheckSignUserMessage } from "@/libs/errorHandler";


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIogin, setIsIogin] = useState<boolean | null>(null)
  const [companies, setCompanies] = useState<Companies>([])
  const [currentCompany, setCurrentCompany] = useState<string>("")
  const controls = useAnimation();

  CheckSignUserMessage()
  useEffect(() => {
    setIsIogin(client.authStore.isValid)
    const defaultCompany = String(localStorage.getItem('currentCompany'))
    const userId = client.authStore.model?.id
    setCurrentCompany(defaultCompany)
    const getIoginUserCompanies = async () => {
      try {
        const company = await client.collection('users').getOne(userId, { expand: "companies", fields: "expand.companies.id,expand.companies.name,expand.companies.logo" });
        setCompanies(company?.expand?.companies)
      }
      catch (error) {
        return
      }
    }
    getIoginUserCompanies()
  }, [])

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
      <Nav companies={companies} isIogin={isIogin} isScrolled={isScrolled} currentCompany={currentCompany} setCurrentCompany={setCurrentCompany} />
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
        <Slide delay={0.3} className="flex justify-between items-center">
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
        <Slide delay={0.3} className="flex justify-between items-center">
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
        <Slide delay={0.3} className="flex justify-between items-center">
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
      <section className="mt-64 text-center">
        <div className="flex justify-between w-[500px] mx-auto">
          <Image src={"/main/chris.jpeg"} alt="chris" width={140} height={140} className="shadow-slate-500 shadow-2xl rounded-lg" />
          <Image src={"/main/xeraph.png"} alt="xeraph" width={140} height={140} className="shadow-slate-500 shadow-2xl rounded-lg" />
          <Image src={"/main/sumin.jpeg"} alt="sumin" width={140} height={140} className="shadow-slate-500 shadow-2xl rounded-lg" />
        </div>
        <p className=" text-center mt-12 text-5xl font-extrabold bg-clip-text">"It's a <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.pink.600),theme(colors.orange.300),theme(colors.orange.500),theme(colors.orange.400),theme(colors.orange.700),theme(colors.main),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient">Touch Flow</span> project for everyone"</p>
        <span className="mt-6 block text-xl text-gray-500">Marketing <Link href={"https://github.com/touch-flow-team/touch-flow"}>@github.com/touch-flow-team</Link></span>
      </section>
      <section className="mt-64 relative h-[67rem] rounded-3xl px-24 py-20 text-white text-center bg-slate-900">
        <h3 className=" text-6xl font-semibold">Actual user reviews.</h3>
        <span className=" block mt-7 text-3xl text-gray-400">This is a proven review of the companies that actually used it.</span>
        <button className="mt-7 hover:bg-gray-600 duration-300 bg-gray-700 px-12 py-4 rounded-lg text-xl font-semibold">Join us</button>
        <ul className="mt-10 flex justify-between">
          <li>
            <h6 className="text-9xl text-outline text-slate-900 font-bold">6k</h6>
            <span className=" block text-sm mt-3">Companies Use Touch Flow</span>
          </li>
          <li>
            <h6 className="text-9xl text-outline text-slate-900 font-bold">4.8</h6>
            <span className="block text-sm mt-3">Average Review Rating</span>
          </li>
          <li>
            <h6 className="text-9xl text-outline text-slate-900 font-bold">9k</h6>
            <span className="block text-sm mt-3">Number Mentioned</span>
          </li>
          <li>
            <h6 className="text-9xl text-outline text-slate-900 font-bold">2m</h6>
            <span className="block text-sm mt-3">Subscription Rate</span>
          </li>
        </ul>
        <div className="columns-3 mt-20 left-0 px-24 absolute">
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3">From the intuitive design to its flawless performance, this product has set a new benchmark in the industry</p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/17011?v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3">It's not just an app; it's a revolution in how I interact with technology. Highly recommend!</p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/306134?v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3">Incredible ease of use with Touch Flow. It's an essential tool for me now!</p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/68232?s=100&v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3">I'm blown away by the elegance and simplicity of <span className=" text-blue">@touch_flow</span></p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/7474674?v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3">AIncredible ease of use with <span className="text-blue">@touch_flow</span> It's an essential tool for me now!</p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/1948812?v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3">A game-changer in its field. The ease of use and the results</p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/20180?s=100&v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3"><span className=" text-blue">@touch_flow</span> innovative approach to user interface design is truly impressive. It has increased my efficiency</p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/658?s=100&v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3"> I'm consistently amazed by the responsiveness and fluidity of their platform. </p>
          </div>
          <div className="bg-white mb-6 w-full rounded-lg p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/17310766?v=4" alt="@shadcn" />
                </Avatar>
                <div className=" text-left ml-3">
                  <div className="text-sm text-gray-700 font-semibold flex items-center">UserName<Image className=" block ml-1" src={"https://assets-global.website-files.com/61d72a2cda50bc679e28766b/6324000aa5b09cf5543c9909_tweet-verified_min.svg"} width={13} height={13} alt="logo" /> </div>
                  <div className="text-xs text-gray-500">@username</div>
                </div>
              </div>
            </div>
            <p className=" text-left text-md text-gray-600 mt-3"><span className=" text-blue">@touch_flow</span> has set a new benchmark in the industry. </p>
          </div>
        </div>
      </section>
      <footer className=" border-t w-full py-16 border-gray-400 mt-52">
        <div className="flex items-center px-10 space-x-2">
          <Image className=" rounded-3xl" src="/logo.png" alt="logo" width={35} height={35} />
          <h1 className=" text-xl text-gray-900 font-black">TouchFlow</h1>
        </div>
      </footer>
    </main >
  );
}
