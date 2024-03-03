import React, { Dispatch, SetStateAction } from 'react';
import useCartQuantity from "@/hooks/companies/useCartQuantity";
import { ProductsArray } from "@/types/product/type";


const ShopingCartItems = ({ carts, setCarts }: { carts: ProductsArray, setCarts: Dispatch<SetStateAction<ProductsArray>> }) => {
    const { decreaseQuantity, increaseQuantity } = useCartQuantity(carts, setCarts);
    return (
        <>
            {carts.map((cart) => (
                <li key={cart.id} className="flex items-center mt-7">
                    <div className="bg-gray-100 min-w-28 h-28 rounded-lg"></div>
                    <div className="pl-3">
                        <h6 className=" font-semibold">{cart.name}</h6>
                        <div className="flex justify-between mt-1 items-center">
                            <span className="text-sm">₩{cart.price.toLocaleString()}</span>
                            <div>
                                <button onClick={() => decreaseQuantity(cart.id)} className="w-7 h-7">
                                    -
                                </button>
                                <span className="px-2">{cart.quantity}</span>
                                <button onClick={() => increaseQuantity(cart.id)} className="w-7 h-7">
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
