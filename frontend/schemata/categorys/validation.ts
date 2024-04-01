import z from 'zod';

interface ProductSchemaParams {
  mode: 'create' | 'update';
}

export const ProductSchema = z.object({
  category: z.string(),
  name: z.string().min(1, { message: '상품명을 입력해 주세요.' }),
  price: z.coerce.number().min(3, { message: '상품 가격을 입력해 주세요.' }),
  description: z.string().max(30, { message: '30자 이내로 입력해 주세요.' }),
  image: z.any(),
});

const CreateModefileSchema = z.any().refine((val) => val instanceof File, {
  message: '이미지를 업로드해 주세요.',
});

export const CreateProductSchema = ({ mode }: ProductSchemaParams) => {
  return z.object({
    category: z.string(),
    name: z.string().min(1, { message: '상품명을 입력해 주세요.' }),
    price: z.coerce.number().min(3, { message: '상품 가격을 입력해 주세요.' }),
    description: z.string().max(30, { message: '30자 이내로 입력해 주세요.' }),
    image: mode === 'create' ? CreateModefileSchema : z.any(),
  });
};
export const CategorySchema = z.object({
  name: z.string().nonempty({
    message: '카테고리명을 입력해 주세요.',
  }),
});
