'use client';
import deleteCategory from '@/app/actions/category/deleteCategory';
import { Button } from '@/components/ui/button';
import Toast from '../common/Toast';
import deleteProduct from '@/app/actions/product/deleteProduct';
interface IProp {
  name: string;
  id: string;
  mode: 'category' | 'product';
}

const DeleteCategory = ({ id, name, mode }: IProp) => {
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

export default DeleteCategory;
