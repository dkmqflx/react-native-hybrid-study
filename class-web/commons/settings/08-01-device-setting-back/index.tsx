"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForPlatformSet: resolve222
  // fetchDeviceLocationForLatLngSet: resolve333
};

export default function DeviceSettingBack({ children }) {
  const router = useRouter();

  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);
      if (response.redirect) return router.push(response.redirect);

      // 안드로이드 백버튼 눌렀다고 알려주기
      if (response.back) return router.back();

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
      if (!message.data) return;

      if (response.redirect) return router.push(response.redirect);

      // IOS의 경우에는 필요 없지만 우선 코드 작성해놓고 추후에 위 안드로이드 코드와 비슷한 부분을 리팩토링 하기 위해 남겨둔 것
      if (response.back) return router.back();

      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...
      resolve({ data: response });
      delete 나의요청중인API들[query];
    });
  }, []);

  return <>{children}</>;
}
