"use client";

import { useEffect } from "react";

export default function PostMessageAppToWebPage() {
  useEffect(() => {
    // 앱에서 웹뷰로 데이터를 전달받는 이벤트 리스너들
    // 플랫폼별로 다른 이벤트를 사용해야 함 (안드로이드 vs iOS)

    // 1. 안드로이드에서 수신 대기
    // 안드로이드에서는 document에 'message' 이벤트가 발생
    // 앱에서 webviewRef.current?.postMessage()로 전송한 데이터를 수신
    document.addEventListener("message", (message: any) => {
      alert(`App에서 보내준 데이터: 1 ${message.data}`);
    });

    // 2. iOS에서 수신 대기
    // iOS에서는 window에 'message' 이벤트가 발생
    // 앱에서 webviewRef.current?.postMessage()로 전송한 데이터를 수신
    window.addEventListener("message", (message: any) => {
      alert(`App에서 보내준 데이터:  2 ${message.data}`);
    });

    // 두 이벤트 리스너를 모두 등록하는 이유:
    // - 안드로이드와 iOS에서 서로 다른 이벤트를 사용하기 때문
    // - 크로스 플랫폼 호환성을 위해 두 플랫폼 모두 대응
    // - 앱에서 postMessage()로 전송한 데이터는 message.data에 포함됨
    //

    // 플랫폼별 차이점:
    // - 안드로이드: document.addEventListener("message", ...)
    // - iOS: window.addEventListener("message", ...)
    // - 두 플랫폼 모두 message.data로 앱에서 전송한 데이터에 접근 가능
  }, []);

  return (
    <>
      <br />
      <br />
      <div>저는 web입니다.</div>
    </>
  );
}
