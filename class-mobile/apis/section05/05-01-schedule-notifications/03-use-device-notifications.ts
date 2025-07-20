import * as Notifications from "expo-notifications";

// 알림 수신 대기
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 알림메시지
    shouldPlaySound: true, // 알람소리 => content 에서 sound 설정해야됨
    shouldSetBadge: false,
  }),
});

export const useDeviceNotifications = (onResponse) => {
  // 알림 권한 요청
  const requestDeviceNotificationsForPermissionSet = async () => {
    await Notifications.requestPermissionsAsync();

    onResponse({
      requestDeviceNotificationsForPermissionSet: {
        message: "요청완료",
      },
    });
  };

  // 알림 스케줄 생성
  const createDeviceNotificationsForHelloSet = async (variables) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${variables.name}님 회원가입을 축하합니다!`,
        body: "앞으로의 여정을 함께 하게되어 반갑습니다!^^ 행복한 하루 되세요!",
        sound: "default", // ex) 바다소리.wav
      },
      trigger: null, // null: 곧바로 알람 생성해줘!
    });

    onResponse({
      createDeviceNotificationsForHelloSet: {
        message: "알람 등록 완료",
      },
    });
  };

  return {
    requestDeviceNotificationsForPermissionSet,
    createDeviceNotificationsForHelloSet,
  };
};
