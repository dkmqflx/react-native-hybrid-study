"use client";

import { useEffect } from "react";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageDeviceApiPage() {
  const onClickSystemVersion = () => {
    // React Native WebView의 postMessage는 문자열만 전송 가능하기 때문에 객체나 배열을 전송하려면 JSON.stringify()로 문자열로 변환해야 함
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ query: "fetchDeviceSystemForAppSet" })
    );
  };

  const onClickSystemPlatform = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ query: "fetchDeviceSystemForPlatformSet" })
    );
  };

  const onClickLocationLatLng = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ query: "fetchDeviceLocationForLatLngSet" })
    );
  };

  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      console.log("message", message);
      alert(`App에서 보내준 데이터: ${message.data}`);
    });

    // 2. IOS에서 수신 대기
    window.addEventListener("message", (message: any) => {
      alert(`App에서 보내준 데이터: ${message.data}`);
    });
  }, []);

  return (
    <>
      <br />
      <br />
      <button onClick={onClickSystemVersion}>
        App아! 내 핸드폰 버전정보 알려줘!
      </button>
      <button onClick={onClickSystemPlatform}>
        App아! 내 핸드폰 기종정보 알려줘!
      </button>
      <button onClick={onClickLocationLatLng}>
        App아! 내 핸드폰 위치정보 알려줘!
      </button>
    </>
  );
}
