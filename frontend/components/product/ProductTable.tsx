import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IResult } from '@/app/companies/[id]/(admin)/product/page';
import PocketBase from 'pocketbase';
interface IProduct {
  category: string;
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  updated: string;
}

const ProductTable = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const products = await pb.collection('products').getList(1, 50, {
    expand: 'category',
  });

  // const products: IResult<IProduct> = await fetch(
  //   'http://127.0.0.1:8090/api/collections/products/records?expand=category',
  //   { next: { tags: ['PRODUCT'], revalidate: 10 } },
  // ).then((res) => res.json());
  // console.log(products.items[0].expand.category.name);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>설명</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead className="text-right">가격</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.items.map((product) => {
          return (
            <TableRow>
              <div className="w-[100px] h-[100px] rounded-md bg-gray-100 mt-3 mb-3"></div>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product?.expand?.category.name}</TableCell>
              <TableCell className="text-right">{product.price.toLocaleString()}원</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
