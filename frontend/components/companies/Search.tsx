import { IoMdMic } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return (
        <div className="flex w-full max-w-md px-10 items-center">
            <div className="flex items-center">
                <IoMdMic className="-mr-12 text-xl text-gray-700 z-10" />
                <input className=" bg-gray-50 border w-96 border-gray-200 pl-16 py-4 rounded-full text-sm outline-none" type="text" placeholder="검색..." />
            </div>
            <div>
                <button className="bg-main text-white -ml-10 py-4 px-7 w-32 rounded-full"><IoSearch className="-mt-1 mr-1 inline-block" />검색</button>
            </div>
        </div>
    )
}

export default Search