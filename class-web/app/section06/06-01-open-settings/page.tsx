"use client";

import { webviewlog } from "@/commons/libraries/03-01-webview-log";
import { useDeviceSettingRedirect } from "@/commons/settings/06-01-device-setting-redirect/hook";

export default function OpenSettingsPage() {
  const { fetchApp } = useDeviceSettingRedirect();

  const onClickOpenSettings = async () => {
    await fetchApp({ query: "openDeviceSystemForSettingSet" });
    // * 주의: 권한을 낮추면 앱이 리프레시됨. ex) 항상허용 => 한번만허용 => 허용안함
    //
    // 권한 변경 시 앱 리프레시 현상 설명:
    // 1. Android: 권한 변경 시 시스템이 보안상 앱을 강제 재시작
    // 2. iOS: 권한 변경 시 앱이 백그라운드→포그라운드 전환되며 재시작
    // 3. 이는 정상적인 시스템 동작이므로 버그가 아님
    // 4. 개발 시 권한 변경 후 앱 상태 재확인이 필요
    // 즉, 처음 화면으로 이동하게 된다
  };

  const onClickLocationPermission = async () => {
    const result = await fetchApp({
      query: "fetchDeviceLocationForPermissionSet",
    });
    const status = result.data.fetchDeviceLocationForPermissionSet.status;
    webviewlog(status);
  };

  return (
    <>
      <br />
      <br />
      <button onClick={onClickOpenSettings}>[ 권한변경 ]</button>
      <br />
      <button onClick={onClickLocationPermission}>[ 권한조회 ]</button>
    </>
  );
}
