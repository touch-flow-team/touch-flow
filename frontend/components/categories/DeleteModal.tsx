'use client';
import { deleteCategory } from '@/server-actions/categories/category';
import { Button } from '@/components/ui/button';
import { deleteProduct } from '@/server-actions/products/product';
import Toast from '@/components/common/Toast';
import { Dispatch, SetStateAction } from 'react';

interface IProp {
  name: string;
  id: string;
  mode: 'category' | 'product';
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal = ({ id, name, mode, setModalOpen }: IProp) => {
  const deleteHandler = async () => {
    if (mode === 'category') {
      await deleteCategory({ id })
        .then(() => Toast({ title: '삭제 완료', description: name, mode: 'success' }))
        .catch(() => Toast({ title: '요청 실패', description: name, mode: 'fail' }));
    } else {
      await deleteProduct({ id })
        .then(() => Toast({ title: '삭제 완료', description: name, mode: 'success' }))
        .catch(() => Toast({ title: '요청 실패', description: name, mode: 'fail' }));
    }

    setModalOpen((prev) => !prev);
  };
  return (
    <>
      <strong>{name} 카테고리 삭제하시겠습니까 ?</strong>
      <div className="flex justify-end">
        <Button className="w-[120px]" onClick={deleteHandler}>
          삭제
        </Button>
      </div>
    </>
  );
};

export default DeleteModal;
