import WebView from "react-native-webview";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function RatioScalingPage() {
  return (
    <WebView
      source={{
        uri: `${내컴퓨터접속주소}/section02/02-01-ratio-scaling`,
      }}
    />
  );
}
