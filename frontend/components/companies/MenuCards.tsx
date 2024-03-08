import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";

import { KioskProductsArray, KioskProduct } from "@/types/product/type";
import Image from "next/image";
import { toast } from "../ui/use-toast";

const MenuCards = ({ products, setCarts }: { products: KioskProductsArray, setCarts: Function }) => {
    const addToCart = (productToAdd: KioskProduct) => {
        toast({ title: `"${productToAdd.name}"가 1개가 카트에 담겼습니다.`, })
        setCarts((prevCarts: KioskProductsArray) => {
            const isProductInCart = prevCarts.some(item => item.id === productToAdd.id);
            if (isProductInCart) {
                return prevCarts.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
                );
            } else {
                return [...prevCarts, { ...productToAdd, quantity: 1 }];
            }
        });
    };
    return (
        <>
            {products.map((product) => (
                <Card key={product?.id} className="rounded-2xl px-8 py-8">
                    <CardContent className="flex">
                        <div className="bg-gray-50 min-w-32 rounded-lg overflow-hidden">
                            <Image width={130} height={130} src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.image}`} alt={product.name} />
                        </div>
                        <div className="ml-6">
                            <CardTitle className="flex justify-between font-bold text-lg items-center">
                                {product?.name}
                                <span className="text-main text-sm font-normal">₩{product?.price.toLocaleString()}</span>
                            </CardTitle>
                            <CardDescription className="text-gray-400 text-sm mt-3 line-clamp-4">{product?.description}</CardDescription>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-5">
                        <div className="flex w-full">
                            <button onClick={() => addToCart(product)} className="ml-5 h-12 flex items-center justify-center transition duration-300 font-medium border text-main border-main hover:text-white hover:bg-main rounded-full w-full">
                                카드에 담기
                            </button>
                        </div>
                    </CardFooter>
                </Card >
            ))}
        </>
    );
};

export default MenuCards;
