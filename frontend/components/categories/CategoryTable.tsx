import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICategory } from '@/app/companies/[id]/(dashboard-admin)/category/page';
import Modal from '@/components/common/Modal';
import DeleteCategory from '@/components/categories/DeleteCategory';
import CreateCategoryForm from '@/components/categories/ManageCategoryForm';
import Button from '@/components/categories/Button';
import { getCategories } from '@/server-actions/categories/category';

const CategoryTable = async () => {
  const categories: Pick<ICategory, 'name' | 'id'>[] = await getCategories();
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
                  key={category.id}
                  title="카테고리 수정"
                  trigger={<Button text="수정" size="md" />}
                  InnerComponent={
                    <CreateCategoryForm id={category.id} name={category.name} mode="update" />
                  }
                />
                <Modal
                  key={category.id}
                  title="카테고리 삭제"
                  trigger={<Button text="삭제" size="md" />}
                  InnerComponent={
                    <DeleteCategory id={category.id} name={category.name} mode="category" />
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
