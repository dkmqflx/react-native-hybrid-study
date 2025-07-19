"use client";

import { webviewlog } from "@/commons/libraries/03-01-webview-log";

export default function WebviewLogPage() {
  const onClickButton = () => {
    // 해당 로그는 브라우저 콘솔에서 확인 가능
    console.log("이것은 웹뷰입니다!");

    // 해당 로그는 모바일 콘솔에서 확인 가능
    webviewlog("이것은 웹뷰입니다!! => Next서버에서 확인 가능");
  };

  return (
    <>
      <br />
      <br />
      <button onClick={onClickButton}>웹뷰버튼</button>
    </>
  );
}
