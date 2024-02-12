import { FaRegTrashCan } from "react-icons/fa6"
import ConterButton from "./ConterButton"

const PaymentItem = () => {
    return (
        <li className="flex hover:border hover:bg-gray-50 p-5 rounded-lg items-center first:mt-0 mt-4">
            <div className=" bg-gray-200 rounded-lg w-28 h-28"></div>
            <div className="ml-5">
                <h6>아이스 아메리카노</h6>
                <p className="text-gray-400 mt-1">아이스 아메리카노 엄청 쉬원합니다. 맛있어요!</p>
            </div>
            <div className="ml-5">
                <ConterButton />
            </div>
            <div className="flex items-center ml-5">
                <span className="text-lg font-semibold">₩4,800</span>
                <FaRegTrashCan className="ml-2" />
            </div>
        </li>
    )
}

export default PaymentItem