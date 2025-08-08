"use client";

import { useEffect } from "react";
import { useRoutingSettingBackAndExit } from "../08-04-routing-setting-back-and-exit/hook";

export const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForPlatformSet: resolve222
  // fetchDeviceLocationForLatLngSet: resolve333
};

export default function DeviceSettingBackAndExit({ children }) {
  const { onRoutingPush, onRoutingBack } = useRoutingSettingBackAndExit();

  useEffect(() => {
    const messageHandler = (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);
      if (response.redirect) return onRoutingPush(response.redirect);

      // 안드로이드 백버튼 눌렀다고 알려주기
      // backHandler 함수에서 count === 0이 실행되는 경우 아래 함수가 실행된다
      if (response.back) return onRoutingBack();

      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...
      resolve({ data: response });
      delete 나의요청중인API들[query];
    };

    // 공통되는 로직 리팩토링
    document.addEventListener("message", messageHandler); // 1. 안드로이드에서 수신 대기
    window.addEventListener("message", messageHandler); // 2. IOS에서 수신 대기

    return () => {
      document.removeEventListener("message", messageHandler);
      window.removeEventListener("message", messageHandler);
    };
  }, [onRoutingPush, onRoutingBack]);

  return <>{children}</>;
}
