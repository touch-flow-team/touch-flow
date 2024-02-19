import Header from '@/components/category/Header';
import CategoryTable from '@/components/category/CategoryTable';
import { IResult } from '../product/page';

export interface ICategory {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
}

export const getCategories = async () => {
  const categories: IResult<ICategory> = await fetch(
    'http://127.0.0.1:8090/api/collections/categorys/records',
    { next: { tags: ['CATEGORY'] } },
  ).then((res) => res.json());

  const categories_info = categories.items.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });
  return categories_info;
};

export default async function Category() {
  const category_info = await getCategories();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <CategoryTable categories={category_info} />
      </div>
    </div>
  );
}
