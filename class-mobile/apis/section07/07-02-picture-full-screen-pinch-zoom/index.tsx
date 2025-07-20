// import { useDeviceSystem } from "./01-use-device-system"
// import { useDeviceSystem2 } from "./01-use-device-system2"
import { useDeviceSystem3 } from "./01-use-device-system3"
// import { useDeviceLocation } from "./02-use-device-location"
import { useDeviceLocation2 } from "./02-use-device-location2"
// import { useDeviceNotifications } from "./03-use-device-notifications"
import { useDeviceNotifications2 } from "./03-use-device-notifications2"
import { useDeviceLayout } from "./04-use-device-layout"

export const useApis = (webviewRef) => {

    const onResponse = (result) => {
        webviewRef.current?.postMessage(JSON.stringify(result))
    }

    const APIS = {
        ...useDeviceSystem3(onResponse),
        ...useDeviceLocation2(onResponse),
        ...useDeviceNotifications2(onResponse),
        ...useDeviceLayout(onResponse)
    }

    const onRequest = (query, variables) => {
        APIS[query](variables)
    }

    return {
        onResponse,
        onRequest,
        layout: APIS.layout
    }
}