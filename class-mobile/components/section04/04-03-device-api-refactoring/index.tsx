import { useApis } from "@/apis/section04/04-03-device-api-refactoring";
import { useRef } from "react";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function DeviceApiRefactoringPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${내컴퓨터접속주소}/section04/04-03-device-api-refactoring`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;

        const request = JSON.parse(event.nativeEvent.data);
        onRequest(request.query);
      }}
    />
  );
}
