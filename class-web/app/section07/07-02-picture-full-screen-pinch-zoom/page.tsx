"use client";

import { useDeviceSettingRedirect } from "@/commons/settings/07-02-device-setting-redirect/hook";
import { useState } from "react";

// 핀치줌을 모바일에서도 할 수 있고, 웹에서도 할 수 있지만
// 모바일 단에는 잘 지원이 되지 않기 때문에 웹에서 진행
export default function PictureFullScreenPinchZoomPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { fetchApp } = useDeviceSettingRedirect();

  /**
   * 에뮬레이터에서는, command 클릭하면 줌 컨트롤 버튼이 표시됨
   */

  // 전체화면 모드 진입 - 핀치 줌 기능 활성화
  //
  // viewport 메타 태그 설정:
  // 1. maximum-scale=3.0: 최대 3배까지 확대 가능
  // 2. user-scalable=yes: 사용자가 핀치 줌(확대/축소) 가능
  // 3. 모바일 앱의 노치 영역 배경색을 검은색으로 변경하여 전체화면 효과
  const onClickFullScreen = async () => {
    const viewport = document.querySelector("meta[name='viewport']");
    viewport?.setAttribute(
      "content",
      `
            width=device-width,
            initial-scale=1.0,
            minimum-scale=1.0,
            maximum-scale=3.0,
            user-scalable=yes
        `
    );

    setIsFullScreen(true);
    await fetchApp({ query: "toggleDeviceLayoutForFullscreenSet" });
  };

  // 전체화면 모드 종료 - 핀치 줌 기능 비활성화
  //
  // viewport 메타 태그 설정:
  // 1. maximum-scale=1.0: 확대 불가능 (원본 크기만)
  // 2. user-scalable=no: 사용자가 핀치 줌 불가능
  // 3. 모바일 앱의 노치 영역 배경색을 흰색으로 복원
  const onClickClose = async () => {
    const viewport = document.querySelector("meta[name='viewport']");
    viewport?.setAttribute(
      "content",
      `
            width=device-width,
            initial-scale=1.0,
            minimum-scale=1.0,
            maximum-scale=1.0,
            user-scalable=no
        `
    );

    setIsFullScreen(false);
    await fetchApp({ query: "toggleDeviceLayoutForFullscreenSet" });
  };

  return (
    <div>
      {!isFullScreen ? (
        <img src="/images/07-01-dog.jpg" onClick={onClickFullScreen} />
      ) : (
        <div
          onClick={onClickClose}
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <img src="/images/07-01-dog.jpg" />
        </div>
      )}
    </div>
  );
}
