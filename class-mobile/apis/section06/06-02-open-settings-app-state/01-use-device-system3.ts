import Constants from "expo-constants";
import * as Device from "expo-device";
import { AppState, Linking, Platform } from "react-native";

export const useDeviceSystem3 = (onResponse) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const fetchDeviceSystemForAppSet = () => {
    onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion:
          (isAndroid && Constants.expoConfig?.android?.versionCode) ||
          (isIos && Constants.expoConfig?.ios?.buildNumber),
      },
    });
  };

  const fetchDeviceSystemForPlatformSet = () => {
    onResponse({
      fetchDeviceSystemForPlatformSet: {
        os: Platform.OS,
        osVersion: Device.osVersion, // IOS 10.3
        modelName: Device.modelName, // iPhone 7 Plus
      },
    });
  };

  // section06/06-01-open-settings => 셋팅화면 이동기능 추가
  // 세팅창으로 이동하고 나면 이동완료 메세지를 보낸다
  const openDeviceSystemForSettingSet = async () => {
    await Linking.openSettings();
    onResponse({
      openDeviceSystemForSettingSet: {
        message: "이동완료",
      },
    });
  };

  // 앱 상태 조회 함수 - 포그라운드/백그라운드 상태 확인
  //
  // 포그라운드(Foreground) vs 백그라운드(Background) 설명:
  // 1. 포그라운드: 앱이 화면에 보이고 사용자가 직접 조작하는 상태
  //    - 예: 앱을 열어서 사용 중일 때
  //    - AppState.currentState === "active"
  //
  // 2. 백그라운드: 앱이 화면에 보이지 않지만 메모리에 남아있는 상태
  //    - 예: 홈 버튼을 눌러서 다른 앱으로 이동했을 때
  //    - AppState.currentState === "background" 또는 "inactive"
  //
  // 3. 사용 사례:
  //    - 권한 변경 후 앱이 리프레시되면 포그라운드로 돌아옴
  //    - 푸시 알림 클릭 시 앱이 백그라운드에서 포그라운드로 전환
  const fetchDeviceSystemForAppStateSet = () => {
    const isForeground = AppState.currentState === "active";
    onResponse({
      fetchDeviceSystemForAppStateSet: {
        isForeground,
      },
    });
  };

  return {
    fetchDeviceSystemForAppSet,
    fetchDeviceSystemForPlatformSet,
    openDeviceSystemForSettingSet,
    fetchDeviceSystemForAppStateSet,
  };
};
