'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICategory } from '@/app/companies/[id]/(admin)/category/page';
import { Button } from '../ui/button';
import Modal from '../common/Modal';
import DeleteCategory from './DeleteCategory';
import CreateCategoryForm from './CreateCategoryForm';

type Props = Pick<ICategory, 'name' | 'id'>[];

const CategoryTable = ({ categories }: { categories: Props }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>카테고리명</TableHead>
          <TableHead className="text-right">수정/삭제</TableHead>
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
                  trigger={<Button>수정</Button>}
                  InnerComponent={
                    <CreateCategoryForm id={category.id} name={category.name} mode="update" />
                  }
                />
                <Modal
                  key={category.id}
                  title="카테고리 삭제"
                  trigger={<Button>삭제</Button>}
                  InnerComponent={<DeleteCategory id={category.id} name={category.name} />}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
