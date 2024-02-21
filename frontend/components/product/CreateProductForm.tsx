'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICategory } from '@/app/companies/[id]/(admin)/category/page';
import Toast from '../common/Toast';
import createProduct from '@/app/actions/product/createProduct';
import { IProduct } from './ProductTable';
import updateProduct from '@/app/actions/product/updateProduct';
interface IProps {
  categories: Pick<ICategory, 'name' | 'id'>[];
  product?: IProduct;
  mode?: 'create' | 'update';
}

const FormSchema = z.object({
  category: z.string(),
  name: z.string().min(1, { message: '상품명을 입력해 주세요.' }),
  price: z.coerce.number().min(3, { message: '상품 가격을 입력해 주세요.' }),
  description: z.string().max(30, { message: '30자 이내로 입력해 주세요.' }),
});

const CreateProductForm: React.FC<IProps> = ({ categories, product, mode }: IProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: mode && product?.name,
      price: mode && product?.price,
      description: mode && product?.description,
      category: mode && product?.category,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (mode === 'create') {
      await createProduct(data)
        .then(() => Toast({ title: '등록완료', description: '완료', mode: 'success' }))
        .catch(() => Toast({ title: '요청실패', description: '실패', mode: 'fail' }));
    } else {
      await updateProduct({ data, id: product!.id })
        .then(() => Toast({ title: '수정완료', description: '완료', mode: 'success' }))
        .catch(() => Toast({ title: '요청실패', description: '실패', mode: 'fail' }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품명</FormLabel>
              <FormControl>
                <Input placeholder="상품명을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>가격</FormLabel>
              <FormControl>
                <Input placeholder="가격을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Input placeholder="설명을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button type="submit" className="w-[120px]">
            등록
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;
