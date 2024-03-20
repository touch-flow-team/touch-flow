import Header from '@/components/product/Header';
import { getAllProduct, getProduct } from '@/server-actions/products/product';
import { getCategories } from '@/server-actions/categories/category';
import CategoryList from '@/components/product/CategoryList';
import ProductTable from '@/components/product/ProductTable';

export default async function Product({ searchParams }: { searchParams: { page: string; category: string }; }) {
  // const products =
  //   searchParams.category === 'all'
  //     ? await getAllProduct({ current_page: Number(searchParams.page) })
  //     : await getProduct({
  //       current_page: Number(searchParams.page),
  //       filtering: searchParams.category,
  //     });

  console.log(searchParams);
  // const categories = await getCategories();
  return (
    <div className="w-full flex justify-center h-[100%]">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <div className="flex flex-col gap-10">
          {/* <CategoryList categories={categories} />
          <ProductTable
          products={products}
          categories={categories}
          filter={searchParams.category}
          /> */}
        </div>
      </div>
    </div>
  );
}
