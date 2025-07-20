import { useState } from "react";

// 디바이스 레이아웃 관리 훅 - 노치 영역 배경색 및 상태바 스타일 제어
//
// 노치(Notch)란?
// - iPhone X 이후 모델의 상단에 있는 카메라, 스피커, 센서가 있는 영역
// - 이 영역의 배경색을 조절하여 전체화면 모드나 특정 디자인 구현 가능
//
// 주요 기능:
// 1. 노치 영역 배경색 토글 (흰색 ↔ 검은색)
// 2. 상태바 스타일 제어 (다크/라이트 모드)
// 3. 전체화면 이미지 뷰어 등에서 사용
export const useDeviceLayout = (onResponse) => {
  const [layout, setLayout] = useState({
    notchBackgroundColor: "white", // 노치 영역 배경색: "white", "black", ...
    // notchStatusBarStyle: "dark" // 상태바 스타일: "dark", "light" (현재 미사용)
  });

  // 노치 영역 배경색 토글 함수 - 전체화면 모드에서 사용
  //
  // 사용 사례:
  // 1. 이미지 풀스크린 전 → 노치 영역 흰색으로
  // 2. 풀스크린 이미지일 때 → 노치 영역 검은색으로
  // 3. SafeAreaView의 backgroundColor와 연동하여 일관된 디자인 구현
  const toggleDeviceLayoutForFullscreenSet = () => {
    setLayout((prev) => ({
      notchBackgroundColor:
        prev.notchBackgroundColor === "white" ? "black" : "white",
      // notchStatusBarStyle: prev.notchStatusBarStyle === "dark" ? "light" : "dark" // 만약, 노치 배터리색과 배경색을 반전하고 싶다면 적용하기
    }));

    onResponse({
      toggleDeviceLayoutForFullscreenSet: {
        message: "변경완료",
      },
    });
  };

  return {
    toggleDeviceLayoutForFullscreenSet,
    layout,
  };
};
