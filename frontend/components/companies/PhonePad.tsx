interface PhonePadProps {
    phoneNumber: string
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
}

const PhonePad = ({ phoneNumber = "010-", setPhoneNumber }: PhonePadProps) => {

    const handleNumberClick = (number: string) => {
        if (phoneNumber.length === 3 || phoneNumber.length === 8) {
            setPhoneNumber((prev) => prev + "-");
        }
        if (phoneNumber.length === 13) {
            return
        }
        setPhoneNumber((prev) => prev + number);
    };

    const handleBackspaceClick = () => {
        if (phoneNumber.length === 4) {
            return
        }
        if (phoneNumber.endsWith("-")) {
            setPhoneNumber((prev) => prev.slice(0, -1));
        }
        setPhoneNumber((prev) => prev.slice(0, -1));
    };

    return (
        <div className="grid grid-cols-3 gap-12 py-8 px-2 border-[1px] border-border">
            <button onClick={() => handleNumberClick("1")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">1</button>
            <button onClick={() => handleNumberClick("2")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">2</button>
            <button onClick={() => handleNumberClick("3")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">3</button>
            <button onClick={() => handleNumberClick("4")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">4</button>
            <button onClick={() => handleNumberClick("5")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">5</button>
            <button onClick={() => handleNumberClick("6")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">6</button>
            <button onClick={() => handleNumberClick("7")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">7</button>
            <button onClick={() => handleNumberClick("8")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">8</button>
            <button onClick={() => handleNumberClick("9")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">9</button>
            <button onClick={() => setPhoneNumber("010-")} className="flex justify-center items-center hover:bg-border hover:rounded-[8px] py-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="36px" width="36px" version="1.1" id="Capa_1" viewBox="0 0 489.533 489.533">
                        <g>
                            <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z" />
                        </g>
                    </svg>
                </div>
            </button>
            <button onClick={() => handleNumberClick("0")} className="text-[36px] font-bold hover:bg-border hover:rounded-[8px] py-2">0</button>
            <button onClick={() => handleBackspaceClick()} className="flex justify-center items-center hover:bg-border hover:rounded-[8px] py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="44px" height="44px" viewBox="0 0 24 24">

                    <g data-name="Layer 2">

                        <g data-name="arrow-back">

                            <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />

                            <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z" />

                        </g>

                    </g>

                </svg>
            </button>
        </div>

    )
}

export default PhonePad