import { useRef } from "react";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function PostMessageDeviceApiPage() {
  const webviewRef = useRef<WebView>(null);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${내컴퓨터접속주소}/section03/03-04-post-message-device-api`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;

        const request = JSON.parse(event.nativeEvent.data);
        console.log(request);

        switch (request.query) {
          case "fetchDeviceSystemForAppSet": {
            webviewRef.current?.postMessage(
              JSON.stringify({
                fetchDeviceSystemForAppSet: {
                  appVersion: "v1.0",
                },
              })
            );
            break;
          }

          case "fetchDeviceSystemForPlatformSet": {
            webviewRef.current?.postMessage(
              JSON.stringify({
                fetchDeviceSystemForPlatformSet: {
                  modelName: "iPhone 7 Plus",
                },
              })
            );
            break;
          }

          case "fetchDeviceLocationForLatLngSet": {
            webviewRef.current?.postMessage(
              JSON.stringify({
                fetchDeviceLocationForLatLngSet: {
                  lat: 37,
                  lng: 128,
                },
              })
            );
            break;
          }
        }
      }}
    />
  );
}
