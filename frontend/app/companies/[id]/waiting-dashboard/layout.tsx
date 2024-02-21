"use client"
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // id 는 파라미터로부터 가져와야 함
  const router = useRouter()
  return (
    <>
      <div className="flex h-lvh w-full">
        <div className="w-[200px] h-full bg-main flex justify-center pt-10">
          <ul className="flex flex-col space-y-4">
            <li>
              <button className="font-bold text-[20px] text-white" onClick={() => {
                router.push('/companies/1/waiting-dashboard/settings')
              }}>
                웨이팅 설정
              </button>
            </li>
            <div className="w-full h-[1px] bg-white"></div>
            <li>
              <button className="font-bold text-[20px] text-white" onClick={() => {
                router.push('/companies/1/waiting-dashboard/list')
              }}>
                웨이팅 목록
              </button>
            </li>
            <div className="w-full h-[1px] bg-white"></div>
          </ul>
        </div>
        <div className="flex justify-center w-full relative">{children}</div>
        <Toaster />
      </div>
    </>
  );
}
