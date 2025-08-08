import { useState } from "react"

export const useCustomHook = () => {
    const [count, setCount] = useState(0)

    const onClickCountUp = () => {
        alert(`현재카운트: ${count}`)
        setCount(count + 1)
    }

    return {
        onClickCountUp
    }
}