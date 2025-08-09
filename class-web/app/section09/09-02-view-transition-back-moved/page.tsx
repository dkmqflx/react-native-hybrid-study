"use client"

import { useRoutingSettingViewTransitionBack } from "@/commons/settings/09-02-routing-setting-view-transition-back/hook"

export default function ViewTransitionMovedPage() {
    const { onRoutingBack } = useRoutingSettingViewTransitionBack()

    return (
        <>
            <button onClick={onRoutingBack}>뒤로가기</button>
            <div 
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "blue",
                    margin: "10px"
                }}
            />
            <div 
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "blue",
                    margin: "10px"
                }}
            />
            <div 
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "blue",
                    margin: "10px"
                }}
            />
        </>
    )
}