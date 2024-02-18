import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";
import Link from "next/link";

export default function SigninPage() {
    return (

        <div className=" bg-slate-50 h-screen items-center flex justify-center">
            <main className="bg-white flex items-center rounded-[2rem] py-10 px-24 shadow-2xl">
                <section className="w-[28rem]">
                    <Image src="/logo.png" className=" rounded-xl" alt="Logo" width={50} height={50} />
                    <div className="mt-3">
                        <h2 className=" text-2xl font-semibold -ml-[0.1rem]">로그인</h2>
                        <p className="pt-1 text-xs text-gray-500">아직 계정이 없나요?<Link className="underline text-gray-900 p-1" href={"signup"}>회원가입</Link></p>
                    </div>
                    <div className="mt-10">
                        <AuthForm isSignup={false} />
                    </div>
                </section>
                <Image src="/auth/auth_bg.png" alt="Description" className="max-h-[500px] ml-20" width={500} height={300} />
            </main>
        </div>

    )
}