// DescriptionField.tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import React from 'react';

interface IProp {
  form: any;
  label: string;
  name: string;
  children: React.ReactElement;
}

const ReusableFormField = ({ form, label, name, children }: IProp) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>{React.cloneElement(children, { ...field })}</FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default ReusableFormField;
