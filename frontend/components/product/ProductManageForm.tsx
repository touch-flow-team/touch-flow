'use client';

import { CreateProductSchema, ProductSchema } from '@/schemata/categorys/validation';
import { getImageData } from '@/libs/getImageData';
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

import { ICategory } from '@/types/category/type';
import Toast from '../common/Toast';
import { createProduct, updateProduct } from '@/server-actions/products/product';
import { IProduct } from '@/types/product/type';
import ReusableFormField from '../common/ReusableFormField';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { imageSrc } from '@/libs/utils';

interface IProps {
  categories: Pick<ICategory, 'name' | 'id'>[];
  product?: IProduct;
  mode?: 'create' | 'update';
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductManageForm: React.FC<IProps> = ({
  categories,
  product,
  mode,
  setModalOpen,
}: IProps) => {
  const [preview, setPreview] = useState(
    mode === 'update'
      ? imageSrc({ collection_id: 'products', record_id: product?.id!, file_name: product!.image })
      : '',
  );
  const ProductSchemaResolver = CreateProductSchema({ mode: mode ?? 'create' });
  const form = useForm<z.infer<typeof ProductSchema>>({
    mode: 'onChange',
    resolver: zodResolver(ProductSchemaResolver),
    defaultValues: {
      name: mode && product?.name,
      price: mode && product?.price,
      description: mode && product?.description,
      category: mode && product?.category,
      image: mode && product?.image,
    },
  });

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('categories', data.category);
    formData.append('description', data.description);
    formData.append('image', data.image);
    if (mode === 'create') {
      await createProduct({ formData })
        .then(() => Toast({ title: '등록완료', description: '완료', mode: 'success' }))
        .catch((error) => Toast({ title: '요청실패', description: `실패사유: ${error}`, mode: 'fail' }));
    } else {
      await updateProduct({ formData, id: product!.id })
        .then(() => Toast({ title: '수정완료', description: '완료', mode: 'success' }))
        .catch(() => Toast({ title: '요청실패', description: '실패', mode: 'fail' }));
    }

    setModalOpen((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <ReusableFormField form={form} name="name" label="상품명">
          <Input placeholder="상품명을 입력해 주세요." />
        </ReusableFormField>
        <ReusableFormField form={form} name="price" label="가격">
          <Input placeholder="가격을 입력해 주세요." />
        </ReusableFormField>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ReusableFormField form={form} name="description" label="설명">
          <Input placeholder="설명을 입력해 주세요." />
        </ReusableFormField>
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>이미지</FormLabel>
              <FormControl>
                <div className="flex justify-between ">
                  <Input
                    type="file"
                    {...rest}
                    onChange={(event) => {
                      const displayUrl = getImageData(event.target.files![0]);
                      setPreview(displayUrl);
                      onChange(event.target.files![0]);
                    }}
                    className="w-[50%]"
                  />
                  <picture className="w-[150px] h-[150px] relative ">
                    {preview && <Image src={preview} alt="product image" fill />}
                  </picture>
                </div>
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

export default ProductManageForm;
