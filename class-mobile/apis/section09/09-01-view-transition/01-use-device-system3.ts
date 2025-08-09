import Constants from 'expo-constants'
import * as Device from 'expo-device';
import { AppState, Linking, Platform } from 'react-native'

export const useDeviceSystem3 = (onResponse) => {
    const isAndroid = Platform.OS === "android"
    const isIos = Platform.OS === "ios"

    const fetchDeviceSystemForAppSet = () => {
        onResponse({ 
            fetchDeviceSystemForAppSet: { 
                appVersion: 
                    (isAndroid && Constants.expoConfig?.android?.versionCode) ||
                    (isIos     && Constants.expoConfig?.ios?.buildNumber)
            }
        })
    }

    const fetchDeviceSystemForPlatformSet = () => {
        onResponse({ 
            fetchDeviceSystemForPlatformSet: { 
                os: Platform.OS,
                osVersion: Device.osVersion, // IOS 10.3
                modelName: Device.modelName  // iPhone 7 Plus
            }
        })
    }

    // section06/06-01-open-settings => 셋팅화면 이동기능 추가
    const openDeviceSystemForSettingSet = async () => {
        await Linking.openSettings()
        onResponse({
            openDeviceSystemForSettingSet: {
                message: "이동완료"
            }
        })
    }

    // section06/06-02-open-settings-app-state => 앱상태(포그라운드/백그라운드) 조회기능 추가
    const fetchDeviceSystemForAppStateSet = () => {
        const isForeground = AppState.currentState === "active"
        onResponse({
            fetchDeviceSystemForAppStateSet: {
                isForeground
            }
        })
    }

    return {
        fetchDeviceSystemForAppSet,
        fetchDeviceSystemForPlatformSet,
        openDeviceSystemForSettingSet,
        fetchDeviceSystemForAppStateSet
    }

}