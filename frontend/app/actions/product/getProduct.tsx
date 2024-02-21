import { IResult } from '@/app/companies/[id]/(admin)/product/page';
import PocketBase from 'pocketbase';
import { IProduct } from '@/components/product/ProductTable';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';

const pb = new PocketBase('http://127.0.0.1:8090');

// export const getProduct = async () => {
//   const products: IResult<IProduct> = await pb.collection('products').getList(1, 50, {
//     sort: '-created',
//     expand: 'category',
//   });
//   console.log(products);

//   return products;
// };

export const getProduct = async () => {
  const products: IResult<IProduct> = await fetch(
    'http://127.0.0.1:8090/api/collections/products/records?expand=category',
    {
      next: { tags: [REVALIDATE_TAG.PRODUCT], revalidate: 10 },
    },
  ).then((res) => res.json());

  return products;
};
