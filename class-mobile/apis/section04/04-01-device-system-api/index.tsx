// expo-constants: Expo 앱의 상수 정보를 제공하는 라이브러리
// - 앱 버전, 빌드 번호, 앱 이름, 번들 ID 등 앱의 기본 정보
// - 환경 변수, 설정값 등 앱 전체에서 사용할 수 있는 상수들
// - Constants.expoConfig, Constants.manifest 등으로 접근
import Constants from "expo-constants";

// expo-device: 디바이스 하드웨어 정보를 제공하는 라이브러리
// - 디바이스 모델명, 제조사, OS 버전, CPU 아키텍처 등
// - 디바이스 타입 (폰, 태블릿, 데스크톱 등)
// - 디바이스의 물리적 특성 (메모리, 배터리 상태 등)
import * as Device from "expo-device";
import { Platform } from "react-native";

export const useApis = (webviewRef) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query) => {
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
        // expoConfig를 사용하면 app.json에 있는 android, ios 정보를 가져올 수 있음
        onResponse({
          fetchDeviceSystemForAppSet: {
            appVersion:
              (isAndroid && Constants.expoConfig?.android?.versionCode) ||
              (isIos && Constants.expoConfig?.ios?.buildNumber),
          },
        });
        break;
      }

      case "fetchDeviceSystemForPlatformSet": {
        onResponse({
          fetchDeviceSystemForPlatformSet: {
            os: Platform.OS,
            osVersion: Device.osVersion, // IOS 10.3
            modelName: Device.modelName, // iPhone 7 Plus
          },
        });
        break;
      }

      case "fetchDeviceLocationForLatLngSet": {
        onResponse({ fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 } });
        break;
      }
    }
  };

  return {
    onResponse,
    onRequest,
  };
};
