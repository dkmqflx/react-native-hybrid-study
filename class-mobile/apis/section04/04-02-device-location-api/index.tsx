import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";
// expo-location: React Native 앱에서 디바이스의 위치 정보(위도, 경도)를 가져오는 라이브러리
// 주요 기능:
// - requestForegroundPermissionsAsync(): 위치 권한 요청
// - getCurrentPositionAsync(): 현재 위치 좌표 가져오기
// - Accuracy: 위치 정확도 설정 (High, Medium, Low 등)
import * as Location from "expo-location";

export const useApis = (webviewRef) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query) => {
    console.log("query", query);
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
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
        // 위치 정보를 가져오는 함수
        const 권한허락받고요청하기 = async () => {
          // 1. 위치 권한 요청 (앱 사용 중에만 위치 접근 허용)
          const result = await Location.requestForegroundPermissionsAsync();

          if (result.status === "granted") {
            // 2. 권한이 허용된 경우: 현재 위치 좌표 가져오기
            const location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High, // 높은 정확도로 위치 측정
            });

            // 3. 위도(lat)와 경도(lng) 정보를 웹뷰로 전송
            onResponse({
              fetchDeviceLocationForLatLngSet: {
                lat: location.coords.latitude, // 위도
                lng: location.coords.longitude, // 경도
              },
            });
          } else {
            // 4. 권한이 거부된 경우: 기본값(한국 중심 좌표) 반환
            onResponse({
              fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 },
            });
          }
        };

        권한허락받고요청하기();
        break;
      }
    }
  };

  return {
    onResponse,
    onRequest,
  };
};
