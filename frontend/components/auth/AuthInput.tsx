"use client"
import { ChangeEvent, useState } from 'react';
import { AuthInputProps } from '@/types/auth/type';

export function AuthInput({
    id,
    label,
    type,
    register,
    required = false,
    errors,
    placeholder = ""
}: AuthInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
        if (value.length > 3 && value.length <= 7) {
            value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
        } else if (value.length > 7) {
            value = value.replace(/^(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
        }
        setInputValue(value);
    };

    return (
        <div className="relative mt-8">
            {
                type == "phone" ? (
                    <input
                        {...register(id, { required })}
                        id={id}
                        name={id}
                        type={type}
                        maxLength={13}
                        value={inputValue}
                        onChange={handlePhoneInput}
                        className="peer text-sm font-semibold h-7 pb-2 w-full border-b pl-4 border-gray-300 text-gray-600 placeholder-transparent focus:border-main focus:outline-none"
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                ) : (
                    <input
                        {...register(id, { required })}
                        id={id}
                        name={id}
                        type={type}
                        className="peer text-sm font-semibold h-7 pb-2 w-full border-b pl-4 border-gray-300 text-gray-600 placeholder-transparent focus:border-main focus:outline-none"
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                )
            }

            {errors[id] && (
                <p className="text-main text-sm pl-4 mt-1">
                    {errors[id].message}
                </p>
            )}

            <label
                htmlFor={id}
                className="absolute -top-5 left-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-400"
            >
                {label}
            </label>
        </div>
    );
}
