"use client";

import { useEffect } from "react";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForPlatformSet: resolve222
  // fetchDeviceLocationForLatLngSet: resolve333
};

export default function PostMessageDeviceApiPromisePage() {
  const onClickSystemVersion = async () => {
    // [1단계] Promise를 사용해서 앱의 네이티브 API를 비동기적으로 호출
    const result = await new Promise((resolve111) => {
      // [2단계] resolve111은 Promise의 resolve 함수
      // 나의요청중인API들 객체에 resolve111을 저장해두고,
      // 나중에 앱에서 응답이 오면 이 함수를 호출해서 Promise를 완료시킴
      나의요청중인API들.fetchDeviceSystemForAppSet = resolve111;

      // [3단계] 앱에 메시지 전송 (앱의 네이티브 API 호출 요청)
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ query: "fetchDeviceSystemForAppSet" })
      );
      // [4단계] 여기서 Promise는 아직 완료되지 않음 (resolve111이 호출되지 않음)
      // resolve111는 (resolve, reject) => {} 형태
      // 따라서 resolve 또는 reject 함수가 호출되지 않으면 Promise는 완료되지 않음
    });

    // [8단계] Promise가 완료되면 result에 앱에서 보낸 데이터가 들어있음
    // result.data.fetchDeviceSystemForAppSet.appVersion 형태로 데이터 접근
    alert(result.data.fetchDeviceSystemForAppSet.appVersion);
  };

  const onClickSystemPlatform = async () => {
    const result = await new Promise((resolve222) => {
      나의요청중인API들.fetchDeviceSystemForPlatformSet = resolve222;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({ query: "fetchDeviceSystemForPlatformSet" })
      );
    });
    alert(result.data.fetchDeviceSystemForPlatformSet.modelName);
  };

  const onClickLocationLatLng = async () => {
    const result = await new Promise((resolve333) => {
      나의요청중인API들.fetchDeviceLocationForLatLngSet = resolve333;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({ query: "fetchDeviceLocationForLatLngSet" })
      );
    });
    alert(result.data.fetchDeviceLocationForLatLngSet.lat);
    alert(result.data.fetchDeviceLocationForLatLngSet.lng);
  };

  useEffect(() => {
    // [0단계] 컴포넌트 마운트 시 이벤트 리스너들을 미리 등록
    // 이때는 아직 나의요청중인API들 객체가 비어있음 (resolve 함수들이 등록되지 않음)

    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      // [6단계] 앱에서 응답이 오면 이 함수가 실행됨

      // message 객체 구조:
      // {
      //   data: '{"fetchDeviceSystemForAppSet":{"appVersion":"v1.0"}}', // 실제 데이터 (JSON 문자열)
      //   origin: "메시지 출처",
      //   source: "메시지 소스"
      // }

      // React Native WebView의 postMessage는 문자열만 전송 가능하므로
      // 앱에서 JSON.stringify()로 객체를 문자열로 변환해서 보냄
      // 웹뷰에서는 message.data로 문자열을 받아서 다시 JSON.parse()로 객체로 변환
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...

      // [7단계] 저장해둔 resolve 함수를 호출해서 Promise를 완료시킴
      // 즉, resolve를 useEffect에서 실행한다
      resolve({ data: response });

      // 사용 완료된 resolve 함수 삭제 (메모리 정리)
      delete 나의요청중인API들[query];

      // const resolve111 = 나의요청중인API들.fetchDeviceSystemForAppSet // resolve111
      // const resolve222 = 나의요청중인API들.fetchDeviceSystemForPlatformSet // resolve222
      // const resolve333 = 나의요청중인API들.fetchDeviceLocationForLatLngSet // resolve333
      // resolve111(message.data)
      // resolve222(message.data)
      // resolve333(message.data)
      // delete 나의요청중인API들.fetchDeviceSystemForAppSet
      // delete 나의요청중인API들.fetchDeviceSystemForPlatformSet
      // delete 나의요청중인API들.fetchDeviceLocationForLatLngSet
    });

    // 2. IOS에서 수신 대기
    window.addEventListener("message", (message: any) => {
      // [6단계] 앱에서 응답이 오면 이 함수가 실행됨 (iOS용)

      // message 객체 구조 (iOS도 동일):
      // {
      //   data: '{"fetchDeviceSystemForAppSet":{"appVersion":"v1.0"}}', // JSON 문자열
      //   origin: "메시지 출처",
      //   source: "메시지 소스"
      // }

      // 앱에서 보낸 JSON 문자열을 다시 객체로 파싱
      // 앱: 객체 → JSON.stringify() → 문자열 전송
      // 웹뷰: message.data (문자열) → JSON.parse() → 객체
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...

      // [7단계] 저장해둔 resolve 함수를 호출해서 Promise를 완료시킴
      resolve({ data: response });

      // 사용 완료된 resolve 함수 삭제 (메모리 정리)
      delete 나의요청중인API들[query];
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
