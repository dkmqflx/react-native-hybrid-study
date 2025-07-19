import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function LayoutHeaderGlobalPage() {
  return (
    <WebView
      source={{
        uri: `${내컴퓨터접속주소}/section02/02-02-layout-header-global`,
      }}
    />
  );
}
