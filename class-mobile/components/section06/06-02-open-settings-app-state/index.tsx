import { useApis } from "@/apis/section06/06-02-open-settings-app-state";
import { useRef } from "react";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function OpenSettingsAppStatePage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${내컴퓨터접속주소}/section06/06-02-open-settings-app-state`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;

        const request = JSON.parse(event.nativeEvent.data);
        onRequest(request.query, request.variables);
      }}
    />
  );
}
