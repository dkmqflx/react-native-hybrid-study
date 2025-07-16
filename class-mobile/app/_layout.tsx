import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <></>;
  // 파일 수정

  return (
    <Stack>
      {/* 페이지 하나만 만들고 웹뷰를 넣어서 화면 전환 없이 페이지 이동 - 웹뷰는 간단히 말하면 iframe 태그를 사용하는 것 */}
      {/* 앱기능 - 카메라 설정, 푸쉬 알람등만 index에서 처리한다  */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
