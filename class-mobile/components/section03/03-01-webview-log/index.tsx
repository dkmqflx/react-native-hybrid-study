import { Button } from "react-native";
import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function WebviewLogPage() {
  const onPressButton = () => {
    console.log("이것은 모바일 로그입니다.");
  };

  return (
    <>
      <WebView
        source={{
          uri: `${내컴퓨터접속주소}/section03/03-01-webview-log`,
        }}
      />

      <Button onPress={onPressButton} title="모바일버튼" />
    </>
  );
}
