"use client"

import { useRoutingSettingViewTransitionBack } from "@/commons/settings/09-02-routing-setting-view-transition-back/hook";
import Link from "next/link";

export default function ViewTransitionBackPage() {
    const { onRoutingPush } = useRoutingSettingViewTransitionBack()

    return (
        <>
            <Link href="/section09/09-02-view-transition-back-moved" onClick={onRoutingPush}>페이지 이동하기</Link>
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