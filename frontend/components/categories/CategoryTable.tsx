'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Modal from '@/components/common/Modal';
import DeleteCategory from '@/components/categories/DeleteModal';
import Button from '@/components/categories/Button';
import { ICategory } from '@/types/category/type';
import ManageCategoryForm from '@/components/categories/ManageCategoryForm';
import useModalState from '@/hooks/categories/useModalState';

const CategoryTable = ({ categories }: { categories: Pick<ICategory, 'name' | 'id'>[] }) => {
  const { modalInfo, openModal, closeModal } = useModalState();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>카테고리명</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      {document && (
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category?.id}>
              <TableCell className="font-medium">{category?.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button text="수정" size="md" onClick={() => openModal('update', category?.id)} />
                <Button text="삭제" size="md" onClick={() => openModal('delete', category?.id)} />
                {modalInfo?.isOpen && modalInfo?.type === 'update' && modalInfo?.id === category?.id && (
                  <Modal
                    open={true}
                    setOpen={() => closeModal()}
                    title="카테고리 수정"
                    InnerComponent={<ManageCategoryForm id={category?.id} name={category?.name} mode="update" setModalOpen={closeModal} />}
                  />
                )}

                {modalInfo?.isOpen && modalInfo?.type === 'delete' && modalInfo?.id === category?.id && (
                  <Modal
                    open={true}
                    setOpen={() => closeModal()}
                    title="카테고리 삭제"
                    InnerComponent={<DeleteCategory id={category?.id} name={category?.name} mode="category" setModalOpen={closeModal} />}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
          {categories?.length === 0 && (
            <div className="text-3xl font-normal w-full h-[100px] flex justify-center items-center">No Result</div>
          )}
        </TableBody>
      )}

    </Table>
  );
};

export default CategoryTable;
