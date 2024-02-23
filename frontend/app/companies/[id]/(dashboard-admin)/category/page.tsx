import Header from '@/components/categorys/Header';
import CategoryTable from '@/components/categorys/CategoryTable';
import { getCategories } from '@/server-actions/categorys/getCategory';

export interface ICategory {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
}

export default async function Category() {
  const category_info = await getCategories();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <div className="h-[40px]"></div>
        <CategoryTable categories={category_info} />
      </div>
    </div>
  );
}
