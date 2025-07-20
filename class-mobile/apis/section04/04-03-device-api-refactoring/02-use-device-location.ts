import * as Location from "expo-location";

export const useDeviceLocation = (onResponse) => {
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

  return {
    fetchDeviceLocationForLatLngSet,
  };
};
