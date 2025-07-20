"use client"

import { useDeviceSettingRedirect } from "@/commons/settings/05-02-device-setting-redirect/hook"
import { useEffect } from "react"

export default function ScheduleNotificationsPage() {
    const {fetchApp} = useDeviceSettingRedirect()

    useEffect(() => {
        // 스케줄 알림생성API 요청하기!
        fetchApp({ query: "requestDeviceNotificationsForPermissionSet" })
        fetchApp({ 
            query: "createDeviceNotificationsForHelloSet",
            variables: { 
                name: "영희",
                page: "/section05/05-02-schedule-notifications-click-alarm"
            }
        })
    }, [])

    return (
        <>
            <br />
            <br />
            <div>처음으로 방문해 주셨군요! 회원가입을 환영합니다!</div>
        </>
    )
}