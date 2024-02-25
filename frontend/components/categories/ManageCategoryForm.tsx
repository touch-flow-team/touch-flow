'use client';
import { CategorySchema } from '@/schemata/categorys/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Toast from '../common/Toast';
import { createCategory, updateCategory } from '@/server-actions/categories/category';
import { Dispatch, SetStateAction } from 'react';

interface IProp {
  mode: 'create' | 'update';
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  name?: string;
  id?: string;
}

const ManageCategoryForm = ({ mode, name, id, setModalOpen }: IProp) => {
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: mode === 'create' ? '' : name,
    },
  });

  const onSubmit = async (data: z.infer<typeof CategorySchema>) => {
    if (mode === 'create') {
      await createCategory({ data })
        .then(() => Toast({ mode: 'success', title: '생성 완료', description: data.name }))
        .catch(() => Toast({ mode: 'fail', title: '생성 실패', description: data.name }));
    } else {
      await updateCategory({ id: id!, name: data.name })
        .then(() => Toast({ mode: 'success', title: '생성 완료', description: data.name }))
        .catch(() => Toast({ mode: 'fail', title: '생성 실패', description: data.name }));
    }

    setModalOpen((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리명</FormLabel>
              <FormControl>
                <Input placeholder="카테고리명을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end mt-3">
          <Button type="submit" className="w-[120px]">
            {mode === 'create' ? '추가' : '수정'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManageCategoryForm;
