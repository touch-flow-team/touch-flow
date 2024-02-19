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
import { ICategory } from './Categories';
import { toast } from '@/components/ui/use-toast';
import CreateProduct from './action/CreateProduct';

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Pick<ICategory, 'name' | 'id'>[];
}

const FormSchema = z.object({
  category: z.string(),
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  price: z.coerce.number().min(3, { message: 'Price must be at least 3 characters.' }),
  description: z.string().max(30, { message: '30자 이내로 입력해 주세요.' }),
});

const CreateProductForm: React.FC<IProps> = ({ categories, setOpen }: IProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await CreateProduct(data)
      .then(() => {
        toast({
          title: '상품등록 완료',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
      })
      .catch((error) => {
        toast({
          title: '상품등록 실패',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-red-500">{JSON.stringify(error, null, 2)}</code>
            </pre>
          ),
        });
      })
      .finally(() => {
        setOpen((prev) => !prev);
      });
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
