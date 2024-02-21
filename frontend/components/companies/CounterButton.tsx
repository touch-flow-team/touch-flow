interface CounterButtonProps {
    counter: number
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const CounterButton = ({ counter, setCounter }: CounterButtonProps) => {

    return (
        <>
            <button className="w-7 h-7" onClick={() => {
                setCounter((prev) => prev - 1)
            }}>
                -
            </button>
            <span className="px-2">{counter}</span>
            <button className="w-7 h-7 hover:" onClick={() => {
                setCounter((prev) => prev + 1)
            }}>
                +
            </button>
        </>
    )

}

export default CounterButton