import WebView from "react-native-webview";

export default function WebviewWithNextjsPage() {
  /*
    휴대폰에서는 localhost 대신 자신의 ip 주소를 사용해야 한다.
    왜 IP 주소를 사용해야 하는가?
    1. localhost는 같은 기기 내에서만 접근 가능하지만, IP 주소는 같은 네트워크 내의 모든 기기에서 접근 가능
    2. 실제 시나리오: 개발자 컴퓨터(192.168.0.85) ←→ 실제 모바일 기기(192.168.0.xx)
    3. 모바일 기기에서 localhost는 모바일 기기 자체를 의미하므로, 개발자 컴퓨터의 웹 서버에 접근할 수 없음
    4. Metro 서버(192.168.0.85:8081)와 Next.js 웹 서버(192.168.0.85:3000) 모두 같은 IP 주소 사용
    5. 따라서 WebView에서도 개발자 컴퓨터의 IP 주소로 접근해야 함

    즉, metro 서버가 가르키는 것은 ip 주소이다.
  */
  return (
    <WebView
      source={{
        uri: "http://192.168.0.85:3000/section01/01-04-webview-with-nextjs",
      }}
    />
  );
}
