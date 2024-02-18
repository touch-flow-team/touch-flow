'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import CreateProduct from './action/CreateProduct';
import { useToast } from '../ui/use-toast';

const schema = z.object({
  name: z
    .string({ invalid_type_error: '한글로 입력해 주세요.' })
    .min(1, { message: '이름은 필수값입니다.' }),
  price: z.number().min(3, { message: '숫자로 입력해 주세요' }),
  description: z.string().max(30, { message: '30자 내로 입력해 주세요.' }),
  category: z.string().max(30, { message: '30자 내로 입력해 주세요.' }),
});

type FormValue = z.infer<typeof schema>;

const CreateProductForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(schema), mode: 'onChange' });

  const onSubmit = async (data: FormValue) => {
    console.log(data);

    await CreateProduct(data)
      .then(() =>
        toast({
          title: '생성 완료',
          description: '생성 완료',
        }),
      )
      .catch((err) => {
        console.log(err);
        toast({
          title: '생성 실패',
          description: '생성 실패',
        });
      })
      .finally(() => setOpen((prev) => !prev));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7">
          <div>
            <label htmlFor="name">이름</label>
            <Input type="text" id="name" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="description">설명</label>
            <Input type="text" id="description" {...register('description')} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="price">가격</label>
            <Input type="text" id="price" {...register('price', { valueAsNumber: true })} />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="category">카테고리</label>
            <Input type="text" id="category" {...register('category')} />
            {errors.category && <p>{errors.category.message}</p>}
          </div>
          <div className="w-full flex justify-end">
            <Button className="w-[120px]">등록</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
