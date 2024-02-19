'use client';
import deleteCategory from '@/app/actions/category/deleteCategory';
import { Button } from '@/components/ui/button';
import Toast from '../common/Toast';
interface IProp {
  name: string;
  id: string;
}

const DeleteCategory = ({ id, name }: IProp) => {
  const deleteHandler = async () => {
    await deleteCategory({ id })
      .then(() => Toast({ title: '삭제 완료', description: name, mode: 'success' }))
      .catch(() => Toast({ title: '요청 실패', description: name, mode: 'fail' }));
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
