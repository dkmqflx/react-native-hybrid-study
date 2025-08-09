import { useEffect, useState } from 'react'
import { BackHandler, ToastAndroid } from 'react-native'

export const useDeviceRouting2 = (onResponse) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const backHandler = () => {
            // 1. 처음 누른 상태라면? => onResponse 보내기
            if(count === 0) {
                onResponse({ back: true }) // 웹뷰한테 안드로이드 백버튼 눌렀다고 알려주기

            // 2. 이미 한 번 누른 상태라면? => 앱 종료시키기
            } else {
                BackHandler.exitApp()
            }
  
            return true // 안드로이드 백버튼 내장기능(기본기능) 무시하기
        }

        BackHandler.addEventListener("hardwareBackPress", backHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backHandler)
        }
    }, [count])

    // section08/08-04-android-back-and-exit => 안드로이드 백버튼과 종료기능 연결
    const exitDeviceRoutingForBackSet = () => {
        ToastAndroid.show("'뒤로' 버튼을 한 번 더 누르면, 앱이 종료됩니다.", ToastAndroid.SHORT)
        setCount(1)
        setTimeout(() => setCount(0), 2000) // 2초 뒤 원상복귀
    }

    return {
        exitDeviceRoutingForBackSet
    }

}