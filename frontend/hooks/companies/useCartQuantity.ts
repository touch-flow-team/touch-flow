import { Dispatch, SetStateAction } from 'react';
import { KioskProductsArray } from '@/types/product/type';

const useCartQuantity = (
  carts: KioskProductsArray,
  setCarts: Dispatch<SetStateAction<KioskProductsArray>>,
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
  const increaseQuantity = (productId: string) => {
    setCarts((currentCarts) =>
      currentCarts.map((item) =>
        item.id === productId ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCarts((currentCarts) => currentCarts.filter((item) => item.id !== productId));
  };

  return { decreaseQuantity, increaseQuantity, removeFromCart };
};

export default useCartQuantity;
