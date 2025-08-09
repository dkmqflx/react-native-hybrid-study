"use client";

import { useEffect } from "react";
import { useRoutingSettingViewTransition } from "../09-01-routing-setting-view-transition/hook";

export const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForPlatformSet: resolve222
  // fetchDeviceLocationForLatLngSet: resolve333
};

export default function DeviceSettingViewTransition({ children }) {
  const { onRoutingPush, onRoutingBack } = useRoutingSettingViewTransition();

  useEffect(() => {
    const messageHandler = (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);

      // 아래처럼 onRoutingPush의 parameter를 수정한 이유는, Link태그에서 onClick을 통해 실행되는 onRoutingPush 함수에는 인자로 event가 전달되기 때문에
      // 기존의 onRoutingPush(url)을 사용할 수 없기 때문
      if (response.redirect)
        return onRoutingPush({ target: { href: response.redirect } });
      if (response.back) return onRoutingBack();

      const query = Object.keys(response)[0]; // API이름 => fetchDeviceSystemForAppSet
      const resolve = 나의요청중인API들[query]; // resolve111, resolve222, ...
      resolve({ data: response });
      delete 나의요청중인API들[query];
    };
    document.addEventListener("message", messageHandler); // 1. 안드로이드에서 수신 대기
    window.addEventListener("message", messageHandler); // 2. IOS에서 수신 대기

    return () => {
      document.removeEventListener("message", messageHandler);
      window.removeEventListener("message", messageHandler);
    };
  }, [onRoutingPush, onRoutingBack]);

  return <>{children}</>;
}
