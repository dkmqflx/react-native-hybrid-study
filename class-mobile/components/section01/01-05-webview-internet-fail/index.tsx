import WebView from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const 내컴퓨터접속주소 = "http://192.168.0.85:3000";

export default function WebviewInternetFailPage() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // internet:  연결 상태 확인
    NetInfo.addEventListener((internet) => {
      console.log("internet", internet);
      setIsConnected(internet.isConnected ?? false);
    });
  }, []);

  if (!isConnected)
    return (
      <View>
        <Text>인터넷 연결을 해주세요!</Text>
      </View>
    );

  return (
    <WebView
      source={{
        uri: `${내컴퓨터접속주소}/section01/01-05-webview-internet-fail`,
      }}
    />
  );
}
