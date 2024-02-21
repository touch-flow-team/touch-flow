'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
export interface IProduct {
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
  expand: {
    category: {
      name: string;
      id: string;
    };
  };
}
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import CreateProductForm from './CreateProductForm';
import DeleteCategory from '../category/DeleteCategory';
import { IResult } from '@/app/companies/[id]/(admin)/product/page';
import { ICategory } from '@/app/companies/[id]/(admin)/category/page';

interface IProp {
  products: IResult<IProduct>;
  categories: Pick<ICategory, 'name' | 'id'>[];
  seletedCategory: string;
}

const ProductTable = ({ products, categories, seletedCategory }: IProp) => {
  const filteredProducts =
    seletedCategory !== 'all'
      ? products.items.filter((e) => {
          return e.expand.category.id === seletedCategory;
        })
      : products.items;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>설명</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>가격</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.expand.category.name}</TableCell>
                <TableCell>{product.price.toLocaleString()}원</TableCell>
                <TableCell>
                  <div className="flex gap-3 justify-center">
                    <Modal
                      title="상품 수정"
                      trigger={<Button>수정</Button>}
                      InnerComponent={
                        <CreateProductForm
                          categories={categories}
                          product={product}
                          mode="update"
                        />
                      }
                    />
                    <Modal
                      title="상품 삭제"
                      trigger={<Button>삭제</Button>}
                      InnerComponent={
                        <DeleteCategory id={product.id} name={product.name} mode="product" />
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {filteredProducts.length === 0 && (
        <div className="text-3xl font-normal w-full h-[100px] flex justify-center items-center">
          No Result
        </div>
      )}
    </>
  );
};

export default ProductTable;