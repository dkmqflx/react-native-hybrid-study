import { useEffect } from "react";
import { BackHandler } from "react-native"; // 뒤로가기 감지하기 위해서 가져온다

export const useDeviceRouting = (onResponse) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      onResponse({ back: true }); // 웹뷰한테 안드로이드 백버튼 눌렀다고 알려주기
      return true; // 안드로이드 백버튼 내장기능(기본기능) 무시하기
    });
  }, []);

  return {
    // 리턴하지 않고, 백버튼 감지 대기하기
  };
};
