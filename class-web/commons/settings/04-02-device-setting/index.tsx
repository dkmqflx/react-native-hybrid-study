"use client";

import { useEffect } from "react";

export const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForPlatformSet: resolve222
  // fetchDeviceLocationForLatLngSet: resolve333
};

export default function DeviceSetting({ children }) {
  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...
      resolve({ data: response });
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
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...
      resolve({ data: response });
      delete 나의요청중인API들[query];
    });
  }, []);

  return <>{children}</>;
}

/**
 * "resolve is not a function" 에러 발생 원인
 * 버튼을 빠르게 연속 클릭하면:
 * 첫 번째 API 호출의 응답이 오기 전에 두 번째 API 호출이 발생
 * 같은 query로 여러 개의 resolve 함수가 등록됨
 * 첫 번째 응답이 와서 첫 번째 resolve 함수를 호출하고 삭제
 * 두 번째 resolve 함수는 여전히 등록되어 있지만, 첫 번째 응답이 두 번째 resolve를 호출하려고 시도
 */
