import * as Location from 'expo-location'

export const useDeviceLocation2 = (onResponse) => {

    const fetchDeviceLocationForLatLngSet = () => {
        const 권한허락받고요청하기 = async () => {
            const result = await Location.requestForegroundPermissionsAsync()
            if(result.status === "granted") {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High
                })
                onResponse({ 
                    fetchDeviceLocationForLatLngSet: { 
                        lat: location.coords.latitude, 
                        lng: location.coords.longitude 
                    }
                })
            } else {
                onResponse({ 
                    fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 }
                })
            }
        }
        권한허락받고요청하기()
    }

    // section06/06-01-open-settings => 위치권한 조회기능 추가
    const fetchDeviceLocationForPermissionSet = async () => {
        const permission = await Location.getForegroundPermissionsAsync()
        onResponse({
            fetchDeviceLocationForPermissionSet: {
                status: permission.status
            }
        })
    }

    return {
        fetchDeviceLocationForLatLngSet,
        fetchDeviceLocationForPermissionSet
    }

}