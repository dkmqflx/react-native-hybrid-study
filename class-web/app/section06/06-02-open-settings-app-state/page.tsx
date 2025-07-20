"use client";

import { webviewlog } from "@/commons/libraries/03-01-webview-log";
import { useDeviceSettingRedirect } from "@/commons/settings/06-02-device-setting-redirect/hook";

export default function OpenSettingsAppStatePage() {
  const { fetchApp } = useDeviceSettingRedirect();

  const onClickOpenSettings = async () => {
    // 세팅창으로 이동하도록 하는 요청
    await fetchApp({ query: "openDeviceSystemForSettingSet" }); // * 주의: 권한을 낮추면 앱이 리프레시됨. ex) 항상허용 => 한번만허용 => 허용안함

    // 아래처럼 코드를 작성하는 이유는.
    // 예를들어 토글 버튼을 통해 설정을 변경하고 싶을 때, 직접 변경할 수 없고 설정창으로 이동해서 변경하도록 해야 한다
    // 그리고 변경하고 나서 다시 돌아왔을 때를 토글 버튼의 상태를 변경해줘야 한다

    // * 주의) 아래의 코드는 OS 및 버전에 따라, 작동 시점이 다를 수 있음
    //        CASE-1) 셋팅화면에 갔다가 돌아오면 아래코드가 실행되는 경우
    //        CASE-2) 셋팅화면에 갔지만, 아래코드는 이미 실행중인 경우
    //        따라서, 포그라운드/백그라운드를 활용하여 위 두가지 CASE를 모두 대응하자!

    // 즉, 세팅창으로 이동하고 나서 다시 포그라운드로 돌아왔는지를 확인하기 위해 setInterval을 사용한다
    // 1. 포그라운드로 돌아왔는지 아닌지 확인하기!

    // 인터벌을 통해 1초마다 포그라운드로 돌아왔는지 아닌지 확인하기!
    const 나의인터벌 = setInterval(async () => {
      const result = await fetchApp({
        query: "fetchDeviceSystemForAppStateSet",
      });
      const isForeground =
        result.data.fetchDeviceSystemForAppStateSet.isForeground;

      webviewlog(isForeground);

      if (!isForeground) return;

      // 다시 포그라운드로 돌아온 경우에 권한을 확인하고 토글 버튼의 상태를 변경해줘야 한다

      // 2. 셋팅화면에서 돌아왔다면? 변경된 권한(위치권한, 알람권한 등)을 재조회하기!
      const resultPermission = await fetchApp({
        query: "fetchDeviceLocationForPermissionSet",
      });
      const status =
        resultPermission.data.fetchDeviceLocationForPermissionSet.status;
      webviewlog(status);

      // 3. 다 끝났으면, 이제 그만 종료해줘!
      clearInterval(나의인터벌);
    }, 1000);
  };

  // const onClickLocationPermission = async () => {
  //     const result = await fetchApp({ query: "fetchDeviceLocationForPermissionSet" })
  //     const status = result.data.fetchDeviceLocationForPermissionSet.status
  //     webviewlog(status)
  // }

  return (
    <>
      <br />
      <br />
      <button onClick={onClickOpenSettings}>[ 권한변경 ]</button>
      <br />
      {/* <button onClick={onClickLocationPermission}>[ 권한조회 ]</button> */}
    </>
  );
}
