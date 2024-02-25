import Header from '@/components/categories/Header';
import CategoryTable from '@/components/categories/CategoryTable';
import { ICategory } from '@/types/category/type';
import { getCategories } from '@/server-actions/categories/category';

export default async function Category() {
  const categories: Pick<ICategory, 'name' | 'id'>[] = await getCategories();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <div className="h-[40px]"></div>
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
}
