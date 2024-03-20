import z from 'zod';

export const ComboboxSchema = z.object({
  company: z.string({ required_error: '알맞은 회사를 선택해주세요' }),
});
