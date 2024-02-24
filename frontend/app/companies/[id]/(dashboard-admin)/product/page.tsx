import Header from '@/components/product/Header';
import { getProduct } from '@/server-actions/products/getProduct';
import { getCategories } from '@/server-actions/categories/getCategory';
import ClientLayer from '@/components/product/ClientLayer';

export interface IResult<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}
export default async function Product() {
  const products = await getProduct();
  const categories = await getCategories();
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <ClientLayer products={products} categories={categories} />
      </div>
    </div>
  );
}
