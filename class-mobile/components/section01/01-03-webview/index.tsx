import { WebView } from "react-native-webview";

export default function WebviewPage() {
  return <WebView source={{ uri: "https://www.naver.com" }} />;
}

/**
 * npm 으로 설치를 하면 최신 버전이 설치되지만
 * npx expo 명령어로 로 설치를 해야지 expo sdk 버전과 호환이 된다.
 * https://docs.expo.dev/versions/latest/sdk/webview/
 */
