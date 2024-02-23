import z from 'zod';
import { signinSchema, signupSchema } from '../../schemata/auth/validation';
import { UseFormRegister } from 'react-hook-form';

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;

export interface AuthFormProps {
  isSignup: boolean;
}

export type AuthInputProps = {
  id: keyof SignupFormData | keyof SigninFormData;
  label: string;
  type: string;
  register: UseFormRegister<SignupFormData | SigninFormData>;
  required?: boolean;
  errors: {
    [key: string]: {
      message?: string;
    };
  };
  placeholder?: string;
};
