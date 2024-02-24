'use client';

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
import updateCategory from '@/server-actions/categories/updateCategory';
import Toast from '../common/Toast';
import createAction from '@/server-actions/categories/createCategory';
import { REVALIDATE_TAG } from '@/constants/revalidateTag';

const FormSchema = z.object({
  name: z.string().nonempty({
    message: '카테고리명을 입력해 주세요.',
  }),
});

interface IProp {
  mode: 'create' | 'update';
  name?: string;
  id?: string;
}

const ManageCategoryForm = ({ mode, name, id }: IProp) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: mode === 'create' ? '' : name,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (mode === 'create') {
      await createAction({
        data: data.name,
        collection: 'categorys',
        revalidate_tag: 'CATEGORY',
      })
        .then(() => Toast({ mode: 'success', title: '생성 완료', description: data.name }))
        .catch(() => Toast({ mode: 'fail', title: '생성 실패', description: data.name }));
    } else {
      await updateCategory({ id: id!, name: data.name })
        .then(() => Toast({ mode: 'success', title: '생성 완료', description: data.name }))
        .catch(() => Toast({ mode: 'fail', title: '생성 실패', description: data.name }));
    }
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
