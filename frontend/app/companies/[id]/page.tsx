"use client";
import { ProductSkeletonCard } from "@/components/product/ProductSkeletonCard";
import CategoryList from "@/components/companies/CategoryList";
import MenuCards from "@/components/companies/MenuCards";
import PaymentModal from "@/components/companies/PaymentModal";
import Search from "@/components/companies/Search";
import ShopingCartItems from "@/components/companies/ShopingCartItems";
import StepIndicator from "@/components/companies/StepIndicator";

import { toast } from "@/components/ui/use-toast";
import { COOKIE_MESSAGE_ID } from "@/constants/constants";
import client from "@/libs/pocketbase";
import { KioskCategoriseArray, KioskProductsArray } from "@/types/product/type";
import Cookies from 'js-cookie';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CategorySkeletonCard } from "@/components/categories/CategorySkeletonCard";

export default function Company() {
    const message = Cookies.get(COOKIE_MESSAGE_ID);
    const { id: rawId } = useParams();
    const [open, setOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState<KioskProductsArray>([]);
    const [categorise, setCategorise] = useState<KioskCategoriseArray>([]);
    const [carts, setCarts] = useState<KioskProductsArray>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const id = Array.isArray(rawId) ? rawId[0] : rawId || '';
    const isCartEmpty = carts.length === 0;

    async function getProduct() {
        try {
            const { expand } = await client.collection('companies').getOne(String(id), {
                expand: "products,categories",
                fields: "expand.products.id,expand.products.name,expand.products.description,expand.products.image,expand.products.price,expand.products.collectionId,expand.products.category,expand.categories.id,expand.categories.name"
            });
            setProducts(expand?.products);
            setCategorise(expand?.categories);
            if (expand?.categories?.length > 0) {
                setSelectedCategoryId(expand?.categories[0].id); // 첫번째 카테고리 선택
            }
        } catch (error) {
            throw error;
        }
    }

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
    };

    const calculateTotal = (products: KioskProductsArray): number => {
        return products.reduce((total, product) => {
            const quantity = product.quantity ?? 0;
            return total + product.price * quantity;
        }, 0);
    };

    useEffect(() => {
        if (message) {
            toast({ title: message });
            Cookies.remove(COOKIE_MESSAGE_ID);
        }
        getProduct();
    }, []);

    useEffect(() => {
        setTotalPrice(calculateTotal(carts));
    }, [carts]);

    const filteredProducts = products.filter(product => product?.category === selectedCategoryId);

    return (
        <>
            <div className='mx-auto max-w-[1250px] h-screen flex bg-gray-50'>
                <div className='border pb-14 w-[75%] overflow-scroll'>
                    <div className='flex items-center px-10 h-[95px] mb-7 border-b bg-white w-full'>
                        <Search />
                    </div>
                    <div className='h-full px-14'>
                        {categorise.length === 0 ? <CategorySkeletonCard /> : <CategoryList categorise={categorise} selectedCategoryId={selectedCategoryId} onCategorySelect={handleCategorySelect} />}

                        <div className='mt-5 grid grid-cols-2 gap-4'>
                            {filteredProducts.length === 0 ? <ProductSkeletonCard /> : <MenuCards products={filteredProducts} setCarts={setCarts} />}
                        </div>
                    </div>
                </div>
                <div className="w-[25%]">
                    <div className='h-[95px] flex justify-around border border-l-0 bg-white'>
                        <StepIndicator />
                    </div>
                    <div className="p-7">
                        <h4 className="flex justify-between items-center text-xl font-bold">장바구니<span className="text-sm font-normal text-gray-400">order #3252</span></h4>
                        <ul className="overflow-scroll h-80">
                            <ShopingCartItems carts={carts} setCarts={setCarts} />
                        </ul>
                        <div className="text-gray-400 mt-7">
                            <p className="flex justify-between text-sm">물품 가격<span className="text-gray-600">₩{totalPrice.toLocaleString()}</span></p>
                            <p className="flex justify-between text-sm mt-3">할인률<span className="text-red-600 line-through">₩0</span></p>
                            <p className="flex justify-between text-sm mt-10 text-gray-900">전체<span className="text-gray-600">₩{totalPrice.toLocaleString()}</span></p>
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
                <PaymentModal id={id} setOpen={setOpen} products={products} totalPrice={totalPrice} carts={carts} setCarts={setCarts} />
            }
        </>
    );
}
