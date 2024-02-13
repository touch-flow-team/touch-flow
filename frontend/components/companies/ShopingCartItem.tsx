import ConterButton from "./ConterButton"

const ShopingCartItem = () => {
    return (
        <li className="flex items-center mt-7">
            <div className="bg-gray-100 min-w-28 h-28 rounded-lg"></div>
            <div className="pl-3">
                <h6 className=" font-semibold">카푸치노</h6>
                <div className="flex justify-between mt-1 items-center">
                    <span className="text-sm">₩8,000</span>
                    <ConterButton />
                </div>
            </div>
        </li>
    )
}

export default ShopingCartItem