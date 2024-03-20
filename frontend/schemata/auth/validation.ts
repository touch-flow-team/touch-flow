import z from 'zod';

export const SignupSchema = z
  .object({
    email: z.string().email({ message: '알맞지 않은 형식에 이메일 입니다.' }),
    username: z.string().min(4, { message: '유저이름은 최소 4글자 이상이여합니다' }),
    phone_number: z
      .string()
      .max(13)
      .refine((value) => /^\d{3}-\d{4}-\d{4}$/g.test(value), {
        message: '올바르지 않은 형식입니다 (ex: 010-1234-5678).',
      }),
    password: z.string().min(8, { message: '최소 8글자 이상이여야 합니다.' }),
    passwordConfirm: z.string().min(8, { message: '최소 8글자 이상이여야 합니다.' }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '패스워드가 같지 않습니다.',
        path: ['passwordConfirm'],
      });
    }
  });

export const SigninSchema = z.object({
  email: z.string().email({ message: '알맞지 않은 형식에 이메일 입니다.' }),
  password: z.string().min(8, { message: '최소 8글자 이상이여야 합니다.' }),
});
