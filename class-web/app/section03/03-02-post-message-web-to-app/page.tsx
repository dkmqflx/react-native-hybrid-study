"use client";

// ReactNativeWebView는 React Native WebView 라이브러리가 웹뷰 환경에서 자동으로 제공하는 전역 객체
// 별도 설치가 필요 없으며, 웹뷰 환경에서만 사용 가능
//
// 동작 과정:
// 1. React Native WebView 라이브러리가 웹뷰에 window.ReactNativeWebView 객체를 자동 주입
// 2. 웹 페이지에서 window.ReactNativeWebView.postMessage()로 앱으로 메시지 전송
// 3. 앱의 onMessage 이벤트 핸들러에서 메시지 수신
//
// 환경별 동작:
// - 웹뷰 환경: ✅ 정상 동작
// - 일반 브라우저: ❌ undefined 에러 (안전한 사용을 위해 존재 여부 확인 권장)

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageWebToAppPage() {
  const onClickButton = () => {
    // 웹에서 앱으로 메시지를 전송하는 함수
    // window.ReactNativeWebView.postMessage(): 웹뷰에서 제공하는 API
    // 웹 페이지에서 React Native 앱으로 데이터를 전송할 수 있음

    // "banana"라는 문자열을 앱으로 전송
    // 앱의 onMessage 이벤트 핸들러에서 이 데이터를 받을 수 있음
    window.ReactNativeWebView.postMessage("banana");
  };

  return (
    <>
      <br />
      <br />
      <button onClick={onClickButton}>App아! 데이터 줄게!</button>
    </>
  );
}
