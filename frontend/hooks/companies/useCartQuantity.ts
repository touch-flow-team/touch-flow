import { Dispatch, SetStateAction } from 'react';
import { ProductsArray } from '@/types/product/type';

const useCartQuantity = (
  carts: ProductsArray,
  setCarts: Dispatch<SetStateAction<ProductsArray>>,
) => {
  const decreaseQuantity = (productId: string) => {
    setCarts((currentCarts) => {
      const currentQuantity = currentCarts.find((item) => item.id === productId)?.quantity ?? 0;
      if (currentQuantity <= 1) {
        return currentCarts.filter((item) => item.id !== productId);
      }
      return currentCarts.map((item) =>
        item.id === productId ? { ...item, quantity: currentQuantity - 1 } : item,
      );
    });
  };

  // 수량 증가 함수
  const increaseQuantity = (productId: string) => {
    setCarts((currentCarts) =>
      currentCarts.map((item) =>
        item.id === productId ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item,
      ),
    );
  };

  // 두 함수 반환
  return { decreaseQuantity, increaseQuantity };
};

export default useCartQuantity;
