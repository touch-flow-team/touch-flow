"use client";
import PocketBase from 'pocketbase'
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SigninFormData, SignupFormData, signinSchema, signupSchema } from "@/lib/zodSchema";
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthInput } from "./AuthInput";
import client from '@/lib/pockebase';
import useSignin from '@/hooks/useSignin';
import useSignup from '@/hooks/useSignup';


interface AuthFormProps {
    isSignup: boolean;
}

export default function AuthForm({ isSignup }: AuthFormProps) {
    const { handleSubmit, register, formState: { errors, isSubmitting }, } = useForm<SignupFormData | SigninFormData>({
        mode: "onChange",
        resolver: zodResolver(isSignup ? signupSchema : signinSchema),
    });

    const onSubmit: SubmitHandler<SignupFormData | SigninFormData> = async (data) => {
        if (isSignup) {
            const signupData = data as SignupFormData;
            useSignup(signupData)

        } else {
            const signinData = data as SigninFormData;
            useSignin(signinData.email, signinData.password)
        }
    };

    return (
        <form
            action=""
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
        >
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



            <button type="submit" className="mt-10 block w-full cursor-pointer rounded-xl bg-gray-900 px-4 py-4 text-center font-semibold text-white hover:bg-main focus:outline-none focus:ring focus:ring-main focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70" >
                {isSubmitting ? (
                    <div role="status" className=" text-center">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </div>
                ) : (
                    isSignup ? ("회원 가입") : ("로그인")

                )}
            </button>



        </form>
    );
}
