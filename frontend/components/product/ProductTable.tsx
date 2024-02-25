'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IProduct } from '@/types/product/type';
import { ICategory } from '@/types/category/type';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '../categories/Button';
import ProductManageForm from './ProductManageForm';
import DeleteModal from '../categories/DeleteModal';
import Image from 'next/image';
import { imageSrc } from '@/libs/utils';

interface IProp {
  products: IProduct[];
  categories: Pick<ICategory, 'name' | 'id'>[];
  seletedCategory: string;
}

const ProductTable = ({ products, categories, seletedCategory }: IProp) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const filteredProducts =
    seletedCategory !== 'all'
      ? products.filter((e) => {
          return e.expand.category.id === seletedCategory;
        })
      : products;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이미지</TableHead>
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
                <TableCell className="font-medium">
                  <div className="w-[100px] h-[100px] relative">
                    <Image
                      fill
                      src={imageSrc({
                        collection_id: 'products',
                        record_id: product.id,
                        file_name: product.image,
                      })}
                      alt={`${product.name}-image`}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.expand.category.name}</TableCell>
                <TableCell>{product.price.toLocaleString()}원</TableCell>
                <TableCell>
                  <div className="flex gap-3 justify-end">
                    <Modal
                      open={isUpdateModalOpen && selectedProductId === product.id}
                      setOpen={(isOpen) => {
                        setIsUpdateModalOpen(isOpen);
                        if (!isOpen) {
                          setSelectedProductId('');
                        }
                      }}
                      title="상품 수정"
                      trigger={
                        <Button
                          text="수정"
                          size="md"
                          onClick={() => setSelectedProductId(product.id)}
                        />
                      }
                      InnerComponent={
                        <ProductManageForm
                          categories={categories}
                          product={product}
                          mode="update"
                          setModalOpen={setIsUpdateModalOpen}
                        />
                      }
                    />
                    <Modal
                      open={isDeleteModalOpen && selectedProductId === product.id}
                      setOpen={(isOpen) => {
                        setIsDeleteModalOpen(isOpen);
                        if (!isOpen) {
                          setSelectedProductId('');
                        }
                      }}
                      title="상품 삭제"
                      trigger={
                        <Button
                          text="삭제"
                          size="md"
                          onClick={() => setSelectedProductId(product.id)}
                        />
                      }
                      InnerComponent={
                        <DeleteModal
                          id={product.id}
                          name={product.name}
                          mode="product"
                          setModalOpen={setIsDeleteModalOpen}
                        />
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
