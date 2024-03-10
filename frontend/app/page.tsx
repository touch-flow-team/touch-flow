"use client"

import Image from "next/image";
import Cookies from 'js-cookie';
import { toast } from "@/components/ui/use-toast";
import { COOKIE_MESSAGE_ID } from "@/constants/constants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const message = Cookies.get(COOKIE_MESSAGE_ID);
  if (message) {
    toast({ title: message, });
    Cookies.remove(COOKIE_MESSAGE_ID);
  }

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (



    <main className="w-[1100px] mx-auto">
      <nav className={`fixed z-50 w-screen left-0 top-0 transition duration-200 ease-in-out ${isScrolled ? ' border-b border-gray-300 bg-white/70 backdrop-blur-xl' : 'bg-white'}  `}>
        <div className="w-[1100px] mx-auto py-8 px-10 flex justify-between">
          <div className="flex items-center space-x-2">
            <Image className=" rounded-3xl" src="/logo.png" alt="logo" width={35} height={35} />
            <h1 className=" text-xl text-gray-900 font-black">TouchFlow</h1>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Companyies</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 flex">
                  <div>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Calendar</span>
                        <p className=" text-gray-500 text-xs">You can test the calendar.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Category</span>
                        <p className=" text-gray-500 text-xs">You can test the category.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Dashboard</span>
                        <p className=" text-gray-500 text-xs">You can test the dashboard.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Product</span>
                        <p className=" text-gray-500 text-xs">You can test the product.</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                  <ul className="ml-3 grid gap-3 w-[320px] ">
                    <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Companyies
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Stocks</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 flex">
                  <div>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Calendar</span>
                        <p className=" text-gray-500 text-xs">You can test the calendar.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Category</span>
                        <p className=" text-gray-500 text-xs">You can test the category.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Dashboard</span>
                        <p className=" text-gray-500 text-xs">You can test the dashboard.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Product</span>
                        <p className=" text-gray-500 text-xs">You can test the product.</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                  <ul className="ml-3 grid gap-3 w-[320px] ">
                    <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Companyies
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Waitings</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 flex">
                  <div>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Calendar</span>
                        <p className=" text-gray-500 text-xs">You can test the calendar.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Category</span>
                        <p className=" text-gray-500 text-xs">You can test the category.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Dashboard</span>
                        <p className=" text-gray-500 text-xs">You can test the dashboard.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Product</span>
                        <p className=" text-gray-500 text-xs">You can test the product.</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                  <ul className="ml-3 grid gap-3 w-[320px] ">
                    <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Companyies
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 flex">
                  <div>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Calendar</span>
                        <p className=" text-gray-500 text-xs">You can test the calendar.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Category</span>
                        <p className=" text-gray-500 text-xs">You can test the category.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Dashboard</span>
                        <p className=" text-gray-500 text-xs">You can test the dashboard.</p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                      <div className="w-10 h-10 rounded-md bg-slate-300"></div>
                      <div>
                        <span className="text-sm font-medium transition-colors">Product</span>
                        <p className=" text-gray-500 text-xs">You can test the product.</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                  <ul className="ml-3 grid gap-3 w-[320px] ">
                    <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Companyies
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Developers
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className=" space-x-1">
            <Link href="/auth/signin" className={navigationMenuTriggerStyle()}>sign in</Link>
            <Link href="/auth/signup" className={navigationMenuTriggerStyle() + "hover:bg-main focus:bg-main bg-main hover:text-white text-white "}>sign up</Link>
          </div>
        </div>
      </nav>
      <section className=" relative text-center mt-56">
        <div className="space-y-6">
          <h4 className=" text-6xl font-black tracking-[-0.5px]">Why pay more?  It's free.</h4>
          <p className="text-2xl text-gray-600 tracking-[-0.4px] leading-10">government of the people, by the people, for the people, <br />shall not perish from the earth.</p>
        </div>
        <Link href={"/"} className=" bg-main text-white font-semibold py-4 px-6 rounded-lg inline-block mt-10">Get Started</Link>
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
      <section className="mt-56 text-center space-y-6">
        <h2 className="text-6xl font-black">Who created the Touchflow?</h2>
        <p className="text-2xl text-gray-600 tracking-[-0.4px] leading-10">It was created with the goal of becoming a kiosk for everyone</p>
      </section>
    </main >
  );
}
