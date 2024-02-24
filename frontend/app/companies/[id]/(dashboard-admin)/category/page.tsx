import Header from '@/components/categories/Header';
import CategoryTable from '@/components/categories/CategoryTable';

export interface ICategory {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
}

export default async function Category() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <div className="h-[40px]"></div>
        <CategoryTable />
      </div>
    </div>
  );
}
