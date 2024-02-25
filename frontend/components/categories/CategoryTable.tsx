'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Modal from '@/components/common/Modal';
import DeleteCategory from '@/components/categories/DeleteModal';
import Button from '@/components/categories/Button';
import { ICategory } from '@/types/category/type';
import { useState } from 'react';
import ManageCategoryForm from '@/components/categories/ManageCategoryForm';

const CategoryTable = ({ categories }: { categories: Pick<ICategory, 'name' | 'id'>[] }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedtId, setSelectedId] = useState<string>('');
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>카테고리명</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => {
          return (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Modal
                  open={isUpdateModalOpen && selectedtId === category.id}
                  setOpen={(isOpen) => {
                    setIsUpdateModalOpen(isOpen);
                    if (!isOpen) {
                      setSelectedId('');
                    }
                  }}
                  key={category.id}
                  title="카테고리 수정"
                  trigger={
                    <Button text="수정" size="md" onClick={() => setSelectedId(category.id)} />
                  }
                  InnerComponent={
                    <ManageCategoryForm
                      id={category.id}
                      name={category.name}
                      mode="update"
                      setModalOpen={setIsUpdateModalOpen}
                    />
                  }
                />
                <Modal
                  open={isDeleteModalOpen && selectedtId === category.id}
                  setOpen={(isOpen) => {
                    setIsDeleteModalOpen(isOpen);
                    if (!isOpen) {
                      setSelectedId('');
                    }
                  }}
                  key={category.id}
                  title="카테고리 삭제"
                  trigger={
                    <Button text="삭제" size="md" onClick={() => setSelectedId(category.id)} />
                  }
                  InnerComponent={
                    <DeleteCategory
                      id={category.id}
                      name={category.name}
                      mode="category"
                      setModalOpen={setIsDeleteModalOpen}
                    />
                  }
                />
              </TableCell>
            </TableRow>
          );
        })}
        {categories.length === 0 && (
          <div className="text-3xl font-normal w-full h-[100px] flex justify-center items-center">
            No Result
          </div>
        )}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
