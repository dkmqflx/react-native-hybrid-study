import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// SafeAreaView: 노치 영역을 포함하는 전체 영역
// 기존에 react-native에는 여러 문제가 있어서 해당 라이브러리의 컴포넌트를 사용한다
// StatusBar: 상단 상태바(시간, 배터리 등 표시되는 영역)의 스타일(색상, 투명도 등)을 제어할 수 있는 컴포넌트입니다.

export default function ReactNativeTagsPage() {
  const onPressButton = () => {
    alert("Button clicked");
  };

  const onChangeText = (text: string) => {
    console.log(text);
  };

  const onScroll = () => {
    console.log("onScroll");
  };

  return (
    // flex: 1 은 화면 전체를 차지하도록 설정

    // edges: 안전 영역을 표시할 방향을 지정
    // top: 상단 안전 영역
    // bottom: 하단 안전 영역
    // left: 왼쪽 안전 영역
    // right: 오른쪽 안전 영역

    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }} edges={["top"]}>
      <StatusBar style="light" />

      {/* Button: 기본적으로 제공되는 버튼 컴포넌트, title은 버튼에 표시될
      텍스트, onPress는 클릭 시 실행될 함수 */}
      <Button title="Click me" onPress={onPressButton} />

      {/* TouchableOpacity: 터치 시 투명도가 변하는 터치 가능한 영역, onPress는
      클릭 시 실행될 함수 */}
      <TouchableOpacity onPress={onPressButton}>
        <Text>Hello React Native</Text>
      </TouchableOpacity>

      {/* TextInput: 텍스트 입력 필드, onChangeText는 입력값 변경 시 실행될 함수,
      placeholder는 힌트 텍스트, secureTextEntry는 비밀번호 입력 여부, style은
      스타일 지정 */}
      <TextInput
        onChangeText={onChangeText}
        placeholder="Enter your text"
        secureTextEntry={true}
        style={styles.input}
      />

      {/* View: 레이아웃을 위한 컨테이너, 스타일을 적용할 수 있음 */}
      <View style={styles.flatList}>
        {/* FlatList: 스크롤 가능한 리스트, data는 렌더링할 데이터 배열, renderItem은 각 아이템을 렌더링하는 함수, onScroll은 스크롤 시 실행될 함수 */}
        <FlatList
          data={[
            { id: 1, name: "Tag 1" },
            { id: 2, name: "Tag 2" },
            { id: 3, name: "Tag 3" },
            { id: 4, name: "Tag 4" },
            { id: 5, name: "Tag 5" },
            { id: 6, name: "Tag 6" },
            { id: 7, name: "Tag 7" },
            { id: 8, name: "Tag 8" },
            { id: 9, name: "Tag 9" },
            { id: 10, name: "Tag 10" },
          ]}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          onScroll={onScroll}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "blue",
  },

  flatList: {
    height: 100,
    backgroundColor: "yellow",
  },
});
