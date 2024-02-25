"use client";
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AuthFormProps, SigninFormData, SignupFormData } from '@/types/auth/type';
import { signinSchema, signupSchema } from '@/schemata/auth/validation';
import { AuthInput } from './AuthInput';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useSignup from '@/hooks/auth/useSignup';
import useSignin from '@/hooks/auth/useSignin';
import { Button } from '../ui/button';


export default function AuthForm({ isSignup }: AuthFormProps) {
    const router = useRouter();
    const { push } = router;
    const signup = useSignup();
    const signin = useSignin();

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SignupFormData | SigninFormData>({
        mode: 'onChange',
        resolver: zodResolver(isSignup ? signupSchema : signinSchema),
    });

    const onSubmit = async (data: SignupFormData | SigninFormData) => {
        if (isSignup) {
            const signupData = data as SignupFormData;
            await signup(signupData);
            push('/auth/signin');
        } else {
            const signinData = data as SigninFormData;
            try {
                await signin(signinData.email, signinData.password);
                push('/');
            }
            catch {
                null
            }

        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
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
                        required
                        errors={errors}
                    />
                    <AuthInput
                        id="phone_number"
                        label="Phone number"
                        type="phone"
                        register={register}
                        required
                        errors={errors}
                    />
                </>
            )}
            <AuthInput
                id="password"
                label="Password"
                type="password"
                register={register}
                required
                errors={errors}
            />
            {isSignup &&
                (<AuthInput id="passwordConfirm" label="Password confirm" type="password" register={register} required errors={errors} />)
            }
            <Button type="submit" className="submit-button w-full mt-10">
                {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                    isSignup ? '회원 가입' : '로그인'
                )}
            </Button>
        </form>
    );
}
