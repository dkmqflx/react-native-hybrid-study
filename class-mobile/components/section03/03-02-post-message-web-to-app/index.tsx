import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function PostMessageWebToAppPage() {
  return (
    <WebView
      source={{
        uri: `${내컴퓨터접속주소}/section03/03-02-post-message-web-to-app`,
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
  );
}
