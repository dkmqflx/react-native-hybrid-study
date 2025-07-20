import { useApis } from "@/apis/section07/07-02-picture-full-screen-pinch-zoom";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function PictureFullScreenPinchZoomPage() {
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
          uri: `${내컴퓨터접속주소}/section07/07-02-picture-full-screen-pinch-zoom`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
        textZoom={100}
        // 텍스트크기 강제 고정 => 브라우저 폰트크기 사용자 개별설정 막기
        // 사용자가 시스템 설정에서 폰트 크기를 크게 설정해도 웹뷰 내에서는 무시
        // 예: 사용자가 "큰 글씨" 모드로 설정해도 앱 내에서는 100% 크기로 고정
        // 목적: 앱의 디자인이 사용자 설정에 의해 깨지는 것을 방지

        // setBuiltInZoomControls={false}
        // 핀치줌 허용 여부(단, 안드로이드만 됨) => 따라서, 이거 대신 브라우저 viewport를 제어하자!
        // Android에서만 작동하는 WebView의 핀치 줌 제어
        // iOS에서는 작동하지 않음
        // 대안: 브라우저의 viewport 메타 태그로 제어 (크로스 플랫폼)
        // true가 되면 Android에서만 웹뷰 하단에 줌 컨트롤 버튼이 표시됨
        // 사용자가 + - 버튼으로 확대/축소 가능

        // style={{ backgroundColor: "black" }}
        // IOS는 핀치줌에서 축소시 웹뷰의 배경색(흰색)이 화면에 보이므로, 막고싶으면? "black"을 주자!
        // iOS에서만 발생하는 문제
        // 사용자가 핀치 줌으로 축소할 때 웹뷰 주변에 흰색 배경이 보임
        // 해결책: 웹뷰 배경색을 검은색으로 설정하면 흰색이 보이지 않음
        // 다만, 현재 코드에서는 minimum-scale=1.0, maximum-scale=1.0 이므로 축소는 되지 않음

        // 추가로, 무조건 웹뷰 배경이 검은색이 되면 좋지 않으므로,
        // backgroundColor를 별도로 두지 않다가
        // notchBackgroundColor 와 같이 색상을 변경하는 식으로 처리하면 좋다
      />
    </SafeAreaView>
  );
}
