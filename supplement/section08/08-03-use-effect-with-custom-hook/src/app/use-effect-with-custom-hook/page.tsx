"use client"

import { useEffect } from "react"
import { useCustomHook } from "./hook"

export default function UseEffectWithCustomHookPage() {

    const { onClickCountUp } = useCustomHook()

    useEffect(() => {

        window.addEventListener("click", onClickCountUp)

        return () => {
            window.removeEventListener("click", onClickCountUp)
        }

    }, [onClickCountUp])

    return <div>아무데나 클릭하면 카운트를 확인할 수 있어요!</div>
}