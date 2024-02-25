import { IProduct } from '@/components/product/ProductTable';
import client from '@/libs/pocketbase';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';

export const getProduct = async () => {
  const products: IProduct[] = await client.collection('products').getFullList({
    expand: 'category',
    sort: 'created',
    cache: 'no-store',
    next: { tags: [REVALIDATE_TAG.PRODUCT] },
  });

  console.log(products);

  return products;
};
