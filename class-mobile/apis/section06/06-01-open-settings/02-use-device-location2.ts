import * as Location from "expo-location";

export const useDeviceLocation2 = (onResponse) => {
  // 위치 정보 조회 함수 - 권한 요청 후 실제 위도/경도 좌표 반환
  // 1. 위치 권한을 요청하고 승인되면 현재 위치의 위도/경도를 반환
  // 2. 권한이 거부되면 기본값(37, 128)을 반환
  // 3. 실제 위치 기반 서비스(지도, 날씨 등)에 사용
  const fetchDeviceLocationForLatLngSet = () => {
    const 권한허락받고요청하기 = async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      if (result.status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        onResponse({
          fetchDeviceLocationForLatLngSet: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        });
      } else {
        onResponse({
          fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 },
        });
      }
    };
    권한허락받고요청하기();
  };

  // 위치 권한 상태 조회 함수 - 현재 권한 상태만 확인하고 반환
  // 1. 권한 요청하지 않고 현재 권한 상태만 조회
  // 2. 권한 상태: "granted", "denied", "undetermined" 중 하나 반환
  // 3. 권한 상태에 따른 UI 처리(권한 요청 버튼 표시/숨김 등)에 사용
  const fetchDeviceLocationForPermissionSet = async () => {
    const permission = await Location.getForegroundPermissionsAsync();
    onResponse({
      fetchDeviceLocationForPermissionSet: {
        status: permission.status,
      },
    });
  };

  return {
    fetchDeviceLocationForLatLngSet,
    fetchDeviceLocationForPermissionSet,
  };
};
