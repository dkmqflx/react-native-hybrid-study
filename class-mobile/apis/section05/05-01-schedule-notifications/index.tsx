import { useDeviceSystem } from "./01-use-device-system"
import { useDeviceLocation } from "./02-use-device-location"
import { useDeviceNotifications } from "./03-use-device-notifications"

export const useApis = (webviewRef) => {

    const onResponse = (result) => {
        webviewRef.current?.postMessage(JSON.stringify(result))
    }

    const APIS = {
        ...useDeviceSystem(onResponse),
        ...useDeviceLocation(onResponse),
        ...useDeviceNotifications(onResponse)
    }

    const onRequest = (query, variables) => {
        APIS[query](variables)
    }

    return {
        onResponse,
        onRequest
    }
}