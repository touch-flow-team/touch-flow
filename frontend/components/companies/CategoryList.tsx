import { KioskCategoriseArray } from "@/types/product/type"

const CategoryList = ({ categorise, selectedCategoryId, onCategorySelect }: { categorise: KioskCategoriseArray, selectedCategoryId: string, onCategorySelect: (categoryId: string) => void }) => {
    const selectedCategoryName = categorise.find(category => category.id === selectedCategoryId)?.name;

    return (
        <>
            <ul className="flex text-sm">
                {categorise?.map((category) => (
                    <li
                        key={category?.id}
                        onClick={() => onCategorySelect(category.id)}
                        className={`border border-gray-200 px-10 py-3 rounded-full mr-5 cursor-pointer
                            ${category.id === selectedCategoryId ? 'bg-main text-white' : 'text-gray-500'}`}
                    >
                        {category?.name}
                    </li>
                ))}
            </ul>
            {selectedCategoryName && <h4 className='mt-7 text-2xl font-semibold'>{selectedCategoryName} 메뉴</h4>}
        </>
    );
}

export default CategoryList;
