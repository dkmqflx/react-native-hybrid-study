"use client";

import { useDeviceSettingRedirect } from "@/commons/settings/07-01-device-setting-redirect/hook";
import { useState } from "react";

export default function PictureFullScreenPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { fetchApp } = useDeviceSettingRedirect();

  const onClickFullScreen = async () => {
    setIsFullScreen(true);
    await fetchApp({ query: "toggleDeviceLayoutForFullscreenSet" });
  };

  const onClickClose = async () => {
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
