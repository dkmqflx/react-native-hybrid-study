import { useRef } from "react";
import { Button } from "react-native";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function PostMessageAppToWebPage() {
  // 웹뷰에 대한 참조를 생성하여 웹뷰의 메서드에 직접 접근할 수 있게 함
  // useRef를 사용하여 웹뷰 인스턴스를 저장
  const webviewRef = useRef<WebView>(null);

  const onPressButton = () => {
    // 앱에서 웹뷰로 메시지를 전송하는 함수
    // webviewRef.current?.postMessage(): React Native WebView에서 제공하는 메서드
    // 앱에서 웹뷰 내부의 JavaScript로 데이터를 전송할 수 있음

    // "apple"이라는 문자열을 웹뷰로 전송
    // 웹뷰 내부에서 window.addEventListener('message')로 이 데이터를 받을 수 있음
    webviewRef.current?.postMessage("apple");
  };

  return (
    <>
      <WebView
        ref={webviewRef}
        source={{
          uri: `${내컴퓨터접속주소}/section03/03-03-post-message-app-to-web`,
        }}
        onMessage={(event) => {
          // 웹뷰에서 앱으로 메시지를 받는 이벤트 핸들러
          // 웹 페이지에서 window.ReactNativeWebView.postMessage()로 전송된 메시지를 수신

          // 메시지 데이터가 없으면 함수 종료
          if (!event.nativeEvent.data) return;

          // 웹에서 전송한 데이터를 앱 콘솔에 출력
          // event.nativeEvent.data: 웹에서 전송한 메시지 내용
          console.log(`web에서 보내준 데이터: ${event.nativeEvent.data}`);
        }}
      />

      <Button onPress={onPressButton} title="Web아! 데이터 줄게!" />
    </>
  );
}
