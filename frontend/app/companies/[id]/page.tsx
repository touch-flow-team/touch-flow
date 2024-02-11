import CategoryList from "@/components/companies/CategoryList";
import MenuCard from "@/components/companies/MenuCard";
import Search from "@/components/companies/Search";

export default function Company() {
    return (
        <div className='mx-auto max-w-[1250px] flex h-full bg-gray-50'>
            <div className=' border w-[75%]'>
                <div className='h-[110px] mb-7 border-b bg-white p-7 w-full'>
                    <Search />
                </div>
                <div className='px-14 '>
                    <CategoryList />
                    <h4 className='mt-7 text-2xl font-semibold'>커피 메뉴</h4>
                    <div className='mt-5 grid grid-cols-2 gap-4 '>
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                    </div>
                </div>
            </div>
            <div className='border border-l-0 bg-white  w-[25%]'></div>
        </div>
    );
}
