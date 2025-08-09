"use client"

import { useRoutingSettingViewTransition } from "@/commons/settings/09-01-routing-setting-view-transition/hook";
import Link from "next/link";

export default function ViewTransitionPage() {
    const { onRoutingPush } = useRoutingSettingViewTransition()

    return (
        <>
            <Link href="/section09/09-01-view-transition-moved" onClick={onRoutingPush}>페이지 이동하기</Link>
            <div 
                style={{
                    width: "250px",
                    height: "50px",
                    backgroundColor: "skyblue",
                    margin: "10px"
                }}
            />
            <div 
                style={{
                    width: "250px",
                    height: "50px",
                    backgroundColor: "skyblue",
                    margin: "10px"
                }}
            />
            <div 
                style={{
                    width: "250px",
                    height: "50px",
                    backgroundColor: "skyblue",
                    margin: "10px"
                }}
            />
        </>
    )
}