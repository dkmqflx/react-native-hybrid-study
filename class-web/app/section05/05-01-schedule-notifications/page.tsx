"use client";

import { useDeviceSettingVariables } from "@/commons/settings/05-01-device-setting-variables/hook";
import { useEffect } from "react";

export default function ScheduleNotificationsPage() {
  const { fetchApp } = useDeviceSettingVariables();

  useEffect(() => {
    // 스케줄 알림생성API 요청하기!
    fetchApp({ query: "requestDeviceNotificationsForPermissionSet" });
    fetchApp({
      query: "createDeviceNotificationsForHelloSet",
      variables: { name: "영희" },
    });
  }, []);

  return (
    <>
      <br />
      <br />
      <div>처음으로 방문해 주셨군요! 회원가입을 환영합니다!</div>
    </>
  );
}
