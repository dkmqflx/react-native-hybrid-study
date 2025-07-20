"use client"

import { useDeviceSetting } from "@/commons/settings/04-03-device-setting/hook"

export default function DeviceApiRefactoringPage() {
    const {fetchApp} = useDeviceSetting()

    const onClickSystemVersion = async () => {
        const result = await fetchApp({ query: "fetchDeviceSystemForAppSet" })
        alert(result.data.fetchDeviceSystemForAppSet.appVersion)
    }

    const onClickSystemPlatform = async () => {
        const result = await fetchApp({ query: "fetchDeviceSystemForPlatformSet" })
        alert(result.data.fetchDeviceSystemForPlatformSet.os)
        alert(result.data.fetchDeviceSystemForPlatformSet.osVersion)
        alert(result.data.fetchDeviceSystemForPlatformSet.modelName)
    }

    const onClickLocationLatLng = async () => {
        const result = await fetchApp({ query: "fetchDeviceLocationForLatLngSet" })
        alert(result.data.fetchDeviceLocationForLatLngSet.lat)
        alert(result.data.fetchDeviceLocationForLatLngSet.lng)
    }

    return (
        <>
            <br />
            <br />
            <button onClick={onClickSystemVersion}>App아! 내 핸드폰 버전정보 알려줘!</button>
            <button onClick={onClickSystemPlatform}>App아! 내 핸드폰 기종정보 알려줘!</button>
            <button onClick={onClickLocationLatLng}>App아! 내 핸드폰 위치정보 알려줘!</button>
        </>
    )
}