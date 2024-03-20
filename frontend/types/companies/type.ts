import { ComboboxSchema } from '@/schemata/companies/validation';
import { z } from 'zod';

export type ComboboxFormData = z.infer<typeof ComboboxSchema>;

interface Company {
  id: string;
  logo: string;
  name: string;
}

export type Companies = Company[];
