import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-lvh w-full">
        <div className="w-[200px] h-full bg-gray-200">sidebar</div>
        <div className="flex justify-center w-full relative">{children}</div>
        <Toaster />
      </div>
    </>
  );
}
