import React, { Dispatch, SetStateAction } from 'react';
import useCartQuantity from "@/hooks/companies/useCartQuantity";
import { PaymentItemsProps, ProductsArray } from "@/types/product/type"
import { FaRegTrashCan } from "react-icons/fa6"




const PaymentItems = ({ carts, setCarts, setOpen }: PaymentItemsProps) => {
    const { decreaseQuantity, increaseQuantity } = useCartQuantity(carts, setCarts);
    if (carts.length === 0) {
        setOpen(false)
    }
    return (
        <>
            {carts.map((cart) => (
                <li key={cart.id} className="flex hover:border hover:bg-gray-50 p-5 rounded-lg items-center first:mt-0 mt-4">
                    <div className=" bg-gray-200 rounded-lg w-28 h-28">

                    </div>
                    <div className="ml-5">
                        <h6>{cart.name}</h6>
                        <p className="text-gray-400 mt-1">{cart.description}</p>
                    </div>
                    <div>
                        <button onClick={() => decreaseQuantity(cart.id)} className="w-7 h-7">
                            -
                        </button>
                        <span className="px-2">{cart.quantity}</span>
                        <button onClick={() => increaseQuantity(cart.id)} className="w-7 h-7">
                            +
                        </button>
                    </div>
                    <div className="flex items-center ml-5">
                        <span className="text-lg font-semibold">₩{cart.price.toLocaleString()}</span>
                        <FaRegTrashCan className="ml-2" />
                    </div>
                </li>
            ))}
        </>

    )
}

export default PaymentItems