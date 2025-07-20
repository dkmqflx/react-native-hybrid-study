import { useApis } from "@/apis/section05/05-01-schedule-notifications";
import { useRef } from "react";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function ScheduleNotificationsPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${내컴퓨터접속주소}/section05/05-01-schedule-notifications`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;

        const request = JSON.parse(event.nativeEvent.data);
        onRequest(request.query, request.variables);
      }}
    />
  );
}
