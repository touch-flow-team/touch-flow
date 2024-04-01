"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { LiaCalendarCheck, LiaClock, LiaCubeSolid, LiaDollySolid, LiaHistorySolid, LiaLayerGroupSolid, LiaListSolid, LiaPlusSquare, LiaPollSolid, LiaReadme, LiaScrollSolid, LiaShoppingBasketSolid, LiaTagSolid, LiaTasksSolid, LiaToolsSolid } from "react-icons/lia";;

const NavMenu = ({ currentCompany }: { currentCompany: string }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Companies</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-2 flex">
                        <div>
                            <NavigationMenuLink href={`/companies/${currentCompany}/calendar`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaCalendarCheck className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Calendar</span>
                                    <p className=" text-gray-500 text-xs">You can test the calendar.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/category`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaTagSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Category</span>
                                    <p className=" text-gray-500 text-xs">You can test the category.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/dashboard`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaPollSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Dashboard</span>
                                    <p className=" text-gray-500 text-xs">You can test the dashboard.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/product?page=1&category=all`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaShoppingBasketSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
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
                            <NavigationMenuLink href={`/companies/${currentCompany}/stocks`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaCubeSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Stocks</span>
                                    <p className=" text-gray-500 text-xs">You can test the stocks.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/stocks/add`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaPlusSquare className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Create Stock</span>
                                    <p className=" text-gray-500 text-xs">You can test the history.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/stocks/history`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaHistorySolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">View History</span>
                                    <p className=" text-gray-500 text-xs">You can test the history.</p>
                                </div>
                            </NavigationMenuLink>
                        </div>
                        <ul className="ml-3 grid gap-3 w-[320px] ">
                            <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                                <div className="mb-2 mt-4 text-lg font-medium">
                                    Stocks
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
                            <NavigationMenuLink href={`/companies/${currentCompany}/waitings`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaClock className=" w-6 h-6 text-slate-600 m-auto" />

                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Waitings</span>
                                    <p className=" text-gray-500 text-xs">You can test the Waitings.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/waiting-dashboard/list`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaListSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">View list</span>
                                    <p className=" text-gray-500 text-xs">You can test the Waitings list.</p>
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href={`/companies/${currentCompany}/waiting-dashboard/settings`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaToolsSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Setting</span>
                                    <p className=" text-gray-500 text-xs">You can test the category.</p>
                                </div>
                            </NavigationMenuLink>
                        </div>
                        <ul className="ml-3 grid gap-3 w-[320px] ">
                            <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                                <div className="mb-2 mt-4 text-lg font-medium">
                                    Waitings
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
                            <NavigationMenuLink href={`/companies/${currentCompany}/display-order`} className="w-72 rounded-sm items-center space-x-3 flex hover:bg-gray-50 p-3">
                                <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center">
                                    <LiaScrollSolid className=" w-6 h-6 text-slate-600 m-auto" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium transition-colors">Order Display</span>
                                    <p className=" text-gray-500 text-xs">You can test the Order Display.</p>
                                </div>
                            </NavigationMenuLink>
                        </div>
                        <ul className="ml-3 grid gap-3 w-[320px] ">
                            <li className=" row-span-3 flex h-full w-full select-none flex-col justify-end rounded-md  bg-slate-50 p-6 no-underline outline-none focus:shadow-md">
                                <div className="mb-2 mt-4 text-lg font-medium">
                                    Orders
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
