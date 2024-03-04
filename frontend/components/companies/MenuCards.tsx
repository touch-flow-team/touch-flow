import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";

import { ProductsArray, Product } from "@/types/product/type";
import Image from "next/image";

const MenuCards = ({ products, setCarts }: { products: ProductsArray, setCarts: Function }) => {
    const addToCart = (productToAdd: Product) => {
        setCarts((prevCarts: ProductsArray) => {
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
                        <div className="bg-gray-50 rounded-lg">
                            <Image width={130} height={130} src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.image}`} alt={product.name} />
                        </div>
                        <div className="ml-6">
                            <CardTitle className="flex justify-between font-normal text-lg items-center">
                                {product?.name}
                                <span className="text-main text-sm">₩{product?.price.toLocaleString()}</span>
                            </CardTitle>
                            <CardDescription className="text-gray-400 text-sm mt-2">{product?.description}</CardDescription>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-2">
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
