"use client"

import { useEffect } from "react"

export const 나의요청중인API들 = {
    // fetchDeviceSystemForAppSet: resolve111
    // fetchDeviceSystemForPlatformSet: resolve222
    // fetchDeviceLocationForLatLngSet: resolve333
}

export default function DeviceSetting({ children }){

    useEffect(() => {

        // 1. 안드로이드에서 수신 대기
        document.addEventListener("message", (message: any) => {
            const response = JSON.parse(message.data)
            const query = Object.keys(response)[0] // API이름 => fetchDeviceSystemForAppSet
            const resolve = 나의요청중인API들[query] // resolve111, resolve222, ...
            resolve({ data: response })
            delete 나의요청중인API들[query]

            // const resolve111 = 나의요청중인API들.fetchDeviceSystemForAppSet // resolve111
            // const resolve222 = 나의요청중인API들.fetchDeviceSystemForPlatformSet // resolve222
            // const resolve333 = 나의요청중인API들.fetchDeviceLocationForLatLngSet // resolve333
            // resolve111(message.data)
            // resolve222(message.data)
            // resolve333(message.data)
            // delete 나의요청중인API들.fetchDeviceSystemForAppSet
            // delete 나의요청중인API들.fetchDeviceSystemForPlatformSet
            // delete 나의요청중인API들.fetchDeviceLocationForLatLngSet
        })

        // 2. IOS에서 수신 대기
        window.addEventListener("message", (message: any) => {
            const response = JSON.parse(message.data)
            const query = Object.keys(response)[0] // API이름 => fetchDeviceSystemForAppSet
            const resolve = 나의요청중인API들[query] // resolve111, resolve222, ...
            resolve({ data: response })
            delete 나의요청중인API들[query]
        })

    }, [])

    return <>{children}</>
}