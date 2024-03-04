"use client"
import CategoryList from "@/components/companies/CategoryList";
import MenuCards from "@/components/companies/MenuCards";
import MenuCard from "@/components/companies/MenuCards";
import PaymentModal from "@/components/companies/PaymentModal";
import Search from "@/components/companies/Search";
import ShopingCartItems from "@/components/companies/ShopingCartItems";
import StepIndicator from "@/components/companies/StepIndicator";
import { toast } from "@/components/ui/use-toast";
import { COOKIE_MESSAGE_ID } from "@/constants/constants";
import client from "@/libs/pocketbase";
import { Product, ProductsArray } from "@/types/product/type";
import Cookies from 'js-cookie';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Company() {
    const message = Cookies.get(COOKIE_MESSAGE_ID);
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState<ProductsArray>([]);
    const [carts, setCarts] = useState<ProductsArray>([]);
    const isCartEmpty = carts.length === 0;
    async function getProduct() {
        try {
            const { expand } = await client.collection('companies').getOne(String(id), {
                expand: "products",
                fields: "expand.products.id,expand.products.name,expand.products.description,expand.products.image,expand.products.price, expand.products.collectionId"
            });
            setProducts(expand?.products);
        } catch (error) {
            throw (error);
        }
    }
    const calculateTotal = (products: ProductsArray): number => {
        return products.reduce((total, product) => {
            const quantity = product.quantity ?? 0;
            return total + product.price * quantity;
        }, 0);
    };


    console.log()


    useEffect(() => {
        if (message) {
            toast({ title: message });
            Cookies.remove(COOKIE_MESSAGE_ID);
        }
        getProduct()
    }, []);

    useEffect(() => {
        setTotalPrice(calculateTotal(carts));
    }, [carts]);

    return (
        <>
            <div className='mx-auto max-w-[1250px] flex  bg-gray-50'>
                <div className='border pb-14 w-[75%]'>
                    <div className='flex items-center px-10 h-[95px] mb-7 border-b bg-white w-full'>
                        <Search />
                    </div>
                    <div className='px-14 '>
                        <CategoryList />
                        <h4 className='mt-7 text-2xl font-semibold'>커피 메뉴</h4>
                        <div className='mt-5 grid grid-cols-2 gap-4 '>
                            {products?.length === 0 ? "상품 가져오는 중..." : <MenuCards products={products} setCarts={setCarts} />}
                        </div>
                    </div>
                </div>
                <div className=" w-[25%]">
                    <div className='h-[95px] flex justify-around border border-l-0 bg-white'>
                        <StepIndicator />
                    </div>
                    <div className="p-7">
                        <h4 className="flex justify-between items-center text-xl font-bold">장바구니<span className="text-sm font-normal text-gray-400">order #3252</span></h4>
                        <ul>
                            <ShopingCartItems carts={carts} setCarts={setCarts} />
                        </ul>
                        <div className="text-gray-400 mt-7">
                            <p className="flex justify-between text-sm">물품 가격<span className=" text-gray-600">₩{totalPrice.toLocaleString()}</span></p>
                            <p className="flex justify-between text-sm mt-3">할인률<span className=" text-red-600 line-through">₩0</span></p>
                            <p className="flex justify-between text-sm mt-10 text-gray-900">전체<span className=" text-gray-600">₩{totalPrice.toLocaleString()}</span></p>
                        </div>
                        <button
                            onClick={() => { if (!isCartEmpty) setOpen(true); }}
                            disabled={isCartEmpty}
                            className={`text-center mt-10 bg-main w-full py-4 rounded-full text-white ${isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            ₩{totalPrice.toLocaleString()} 결제 진행하기
                        </button>
                    </div>
                </div>
            </div>
            {open &&
                <PaymentModal setOpen={setOpen} products={products} totalPrice={totalPrice} carts={carts} setCarts={setCarts} />
            }
        </>
    );
}
