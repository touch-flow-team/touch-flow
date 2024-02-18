import Categories from '@/components/product/Categories';
import Header from '@/components/product/Header';
import ProductTable from '@/components/product/ProductTable';

export interface IResult<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

export default async function Product() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex p-10 flex-col gap-10">
        <Header />
        <Categories />
        <ProductTable />
      </div>
    </div>
  );
}
