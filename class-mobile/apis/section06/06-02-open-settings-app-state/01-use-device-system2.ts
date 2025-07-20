import Constants from 'expo-constants'
import * as Device from 'expo-device';
import { Linking, Platform } from 'react-native'

export const useDeviceSystem2 = (onResponse) => {
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

    return {
        fetchDeviceSystemForAppSet,
        fetchDeviceSystemForPlatformSet,
        openDeviceSystemForSettingSet
    }

}