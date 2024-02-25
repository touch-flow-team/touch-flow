import Header from '@/components/product/Header';
import { getProduct } from '@/server-actions/products/product';
import { getCategories } from '@/server-actions/categories/category';
import ClientLayer from '@/components/product/ClientLayer';

export default async function Product({
  searchParams,
}: {
  searchParams: { size: string; page: string; category: string };
}) {
  const products = await getProduct({ current_page: Number(searchParams.page) });

  const categories = await getCategories();

  return (
    <div className="w-full flex justify-center h-[100%]">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <ClientLayer products={products} categories={categories} />
      </div>
    </div>
  );
}
