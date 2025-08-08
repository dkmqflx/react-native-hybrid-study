import { usePathname, useRouter } from "next/navigation";
import { useDeviceSettingBackAndExit } from "../08-04-device-setting-back-and-exit/hook";

const 메인페이지목록 = [
  "/section08/08-04-android-back-and-exit",
  // ...
  // ...
];

export const useRoutingSettingBackAndExit = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { fetchApp } = useDeviceSettingBackAndExit();

  const onRoutingPush = (url) => {
    return router.push(url);
  };

  const onRoutingBack = () => {
    // 1. 메인페이지라면 ? => 종료요청(토스트메시지 보여줘)
    // 앱에 있는 함수를 실행하도록 한다
    if (메인페이지목록.includes(pathname)) {
      return fetchApp({ query: "exitDeviceRoutingForBackSet" });

      // 2. 그 외의 페이지라면? => 뒤로가기
    } else {
      return router.back();
    }
  };

  return {
    onRoutingPush,
    onRoutingBack,
  };
};
