import { useApis } from "@/apis/section09/09-01-view-transition";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.35.142:3000";

export default function ViewTransitionPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: layout.notchBackgroundColor }}
      edges={["top"]}
    >
      <StatusBar style="dark" />

      <WebView
        ref={webviewRef}
        source={{
          uri: `${내컴퓨터접속주소}/section09/09-01-view-transition`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
        textZoom={100} // 텍스트크기 강제 고정 => 브라우저 폰트크기 사용자 개별설정 막기
        // setBuiltInZoomControls={false} // 핀치줌 허용 여부(단, 안드로이드만 됨) => 따라서, 이거 대신 브라우저 viewport를 제어하자!
        // style={{ backgroundColor: "black" }} // IOS는 핀치줌에서 축소시 웹뷰의 배경색(흰색)이 화면에 보이므로, 막고싶으면? "black"을 주자!
      />
    </SafeAreaView>
  );
}
