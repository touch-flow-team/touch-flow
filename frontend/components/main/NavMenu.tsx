"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Companies } from "@/types/companies/type";
import { useEffect } from "react";

const NavMenu = ({ currentCompany }: { currentCompany: string }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Companies</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-2 flex">
                        <div>
                            <NavigationMenuLink href={`/companies/${currentCompany}`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
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
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavMenu;
