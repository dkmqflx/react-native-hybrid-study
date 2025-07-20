import { useApis } from "@/apis/section07/07-01-picture-full-screen";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function PictureFullScreenPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  return (
    // 실제 프로덕트에는 SafeAreaView, StatusBar 필수다
    <SafeAreaView
      style={{ flex: 1, backgroundColor: layout.notchBackgroundColor }}
      edges={["top"]}
    >
      {/* 노치 부분을 실제로 없애는게 아니라 배경을 검은색으로 바꾼다 */}
      <StatusBar style="dark" />

      <WebView
        ref={webviewRef}
        source={{
          uri: `${내컴퓨터접속주소}/section07/07-01-picture-full-screen`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
      />
    </SafeAreaView>
  );
}
