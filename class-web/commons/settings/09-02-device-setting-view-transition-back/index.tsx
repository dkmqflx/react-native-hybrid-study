"use client"

import { useEffect } from "react"
import { useRoutingSettingViewTransitionBack } from "../09-02-routing-setting-view-transition-back/hook"

export const 나의요청중인API들 = {
    // fetchDeviceSystemForAppSet: resolve111
    // fetchDeviceSystemForPlatformSet: resolve222
    // fetchDeviceLocationForLatLngSet: resolve333
}

export default function DeviceSettingViewTransitionBack({ children }){

    const { onRoutingPush, onRoutingBack } = useRoutingSettingViewTransitionBack()

    useEffect(() => {

        const messageHandler = (message: any) => {
            if(!message.data) return
            const response = JSON.parse(message.data)
            if(response.redirect) return onRoutingPush({ target: { href: response.redirect }})
            if(response.back) return onRoutingBack()

            const query = Object.keys(response)[0] // API이름 => fetchDeviceSystemForAppSet
            const resolve = 나의요청중인API들[query] // resolve111, resolve222, ...
            resolve({ data: response })
            delete 나의요청중인API들[query]
        }
        document.addEventListener("message", messageHandler) // 1. 안드로이드에서 수신 대기
        window.addEventListener("message", messageHandler) // 2. IOS에서 수신 대기

        return () => {
            document.removeEventListener("message", messageHandler)
            window.removeEventListener("message", messageHandler)
        }

    }, [onRoutingPush, onRoutingBack])

    return <>{children}</>
}