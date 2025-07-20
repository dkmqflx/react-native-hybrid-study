"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForPlatformSet: resolve222
  // fetchDeviceLocationForLatLngSet: resolve333
};

export default function DeviceSettingRedirect({ children }) {
  const router = useRouter();

  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);

      // 알림 클릭 시 모바일 앱에서 전송된 redirect 데이터 처리
      // 모바일 앱의 useDeviceNotifications2에서 onResponse({ redirect: notificationData.page })로 전송
      // 예: { redirect: "/section05/05-02-schedule-notifications-click" }
      if (response.redirect) return router.push(response.redirect);

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
      const response = JSON.parse(message.data);

      // 알림 클릭 시 모바일 앱에서 전송된 redirect 데이터 처리
      // 모바일 앱의 useDeviceNotifications2에서 onResponse({ redirect: notificationData.page })로 전송
      // 예: { redirect: "/section05/05-02-schedule-notifications-click" }
      if (response.redirect) return router.push(response.redirect);

      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...
      resolve({ data: response });
      delete 나의요청중인API들[query];
    });
  }, []);

  return <>{children}</>;
}
