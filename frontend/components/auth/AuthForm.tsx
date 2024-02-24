'use client';
import useSignup from '@/hooks/auth/useSignup';
import useSignin from '@/hooks/auth/useSignin';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, signupSchema } from '@/schemata/auth/validation';
import { AuthFormProps, SigninFormData, SignupFormData } from '@/types/auth/type';
import { AuthInput } from './AuthInput';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import client from '@/libs/pocketbase';

export default function AuthForm({ isSignup }: AuthFormProps) {
  const { push } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData | SigninFormData>({
    mode: 'onChange',
    resolver: zodResolver(isSignup ? signupSchema : signinSchema),
  });

  const onSubmit: SubmitHandler<SignupFormData | SigninFormData> = async (data) => {
    if (isSignup) {
      const signupData = data as SignupFormData;
      useSignup(signupData);
      push('/auth/signin');
    } else {
      const signinData = data as SigninFormData;
      const pb_user = await useSignin(signinData.email, signinData.password);
      document.cookie = client.authStore.exportToCookie({ httpOnly: false });
      push('/');
      return pb_user;
    }
  };

  return (
    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        id="email"
        label="Email"
        type="text"
        register={register}
        errors={errors}
        required
      />
      {isSignup && (
        <>
          <AuthInput
            id="username"
            label="Username"
            type="text"
            register={register}
            required={true}
            errors={errors}
          />
          <AuthInput
            id="phone_number"
            label="Phone number"
            type="phone"
            register={register}
            required={true}
            errors={errors}
          />
        </>
      )}
      <AuthInput
        id="password"
        label="Password"
        type="password"
        register={register}
        required={true}
        errors={errors}
      />
      {isSignup && (
        <>
          <AuthInput
            id="passwordConfirm"
            label="Password confirm"
            type="password"
            register={register}
            required={true}
            errors={errors}
          />
        </>
      )}
      <button
        type="submit"
        className="mt-10 block w-full cursor-pointer rounded-xl bg-gray-900 px-4 py-4 text-center font-semibold text-white hover:bg-main focus:outline-none focus:ring focus:ring-main focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70">
        {isSubmitting ? (
          <div role="status" className=" text-center">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        ) : isSignup ? (
          '회원 가입'
        ) : (
          '로그인'
        )}
      </button>
    </form>
  );
}
