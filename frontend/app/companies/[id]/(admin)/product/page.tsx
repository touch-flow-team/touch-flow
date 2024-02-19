import Categories from '@/components/product/Categories';
import Header from '@/components/product/Header';
import ProductTable from '@/components/product/ProductTable';
import { ICategory } from '@/components/product/Categories';

export interface IResult<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

const getCategories = async () => {
  const categories: IResult<ICategory> = await fetch(
    'http://127.0.0.1:8090/api/collections/categorys/records',
    { next: { tags: ['CATEGORY'], revalidate: 10 } },
  ).then((res) => res.json());

  const selector_categories = categories.items.map((category) => category.name);
  const categories_info = categories.items.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });
  return [selector_categories, categories_info] as const;
};

export default async function Product() {
  const [select, category_info] = await getCategories();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header categories={category_info} />
        <Categories categories={select} />
        <ProductTable />
      </div>
    </div>
  );
}
