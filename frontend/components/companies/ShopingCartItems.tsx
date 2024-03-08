import React, { Dispatch, SetStateAction } from 'react';
import useCartQuantity from "@/hooks/companies/useCartQuantity";
import { KioskProductsArray } from "@/types/product/type";


const ShopingCartItems = ({ carts, setCarts }: { carts: KioskProductsArray, setCarts: Dispatch<SetStateAction<KioskProductsArray>> }) => {
    const { decreaseQuantity, increaseQuantity } = useCartQuantity(carts, setCarts);
    return (
        <>
            {carts.map((cart) => (
                <li key={cart.id} className="flex items-center mt-7">
                    <div className="bg-gray-100 min-w-28 h-28 rounded-lg"></div>
                    <div className="pl-5">
                        <h6 className=" font-bold">{cart.name}</h6>
                        <div className="mt-1 items-center">
                            <span className="text-sm text-gray-500">₩{cart.price.toLocaleString()}</span>
                            <div className='mt-2'>
                                <button onClick={() => decreaseQuantity(cart.id)} className="h-7">
                                    -
                                </button>
                                <span className="px-2">{cart.quantity}</span>
                                <button onClick={() => increaseQuantity(cart.id)} className="h-7">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </>

    )
};

export default ShopingCartItems;
