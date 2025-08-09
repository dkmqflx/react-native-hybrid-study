import { usePathname, useRouter } from "next/navigation";
import { useDeviceSettingViewTransition } from "../09-01-device-setting-view-transition/hook";

const 메인페이지목록 = [
  "/section08/08-04-android-back-and-exit",
  // ...
  // ...
];

export const useRoutingSettingViewTransition = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { fetchApp } = useDeviceSettingViewTransition();

  const onRoutingPush = (event) => {
    event.preventDefault?.();

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(event.target.href);
      });

      // 뷰-트랜지션 지원되지 않는 버전? 기본이동 또는 애니메이션 직접 만들어서 제공하기
      // Can I use 에서 지원하는 버전 확인해보자!
    } else {
      router.push(event.target.href);
    }
  };

  const onRoutingBack = () => {
    // 1. 메인페이지라면 ? => 종료요청(토스트메시지 보여줘)
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
