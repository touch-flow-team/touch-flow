import { IResult } from '@/app/companies/[id]/(dashboard-admin)/product/page';
import { IProduct } from '@/components/product/ProductTable';
import client from '@/libs/pocketbase';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';


// export const getProduct = async () => {
//   const products: IResult<IProduct> = await client.collection('products').getList(1, 50, {
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
