import { useState } from "react"

export const useDeviceLayout = (onResponse) => {
    const [layout, setLayout] = useState({
        notchBackgroundColor: "white", // white, black, ...
        // notchStatusBarStyle: "dark" // dark, light, ...
    })

    const toggleDeviceLayoutForFullscreenSet = () => {
        setLayout(prev => ({
            notchBackgroundColor: prev.notchBackgroundColor === "white" ? "black" : "white"
            // notchStatusBarStyle: prev.notchStatusBarStyle === "dark" ? "light" : "dark" // 만약, 노치 배터리색과 배경색을 반전하고 싶다면 적용하기
        }))

        onResponse({
            toggleDeviceLayoutForFullscreenSet: {
                message: "변경완료"
            }
        })
    }

    return {
        toggleDeviceLayoutForFullscreenSet,
        layout
    }
}