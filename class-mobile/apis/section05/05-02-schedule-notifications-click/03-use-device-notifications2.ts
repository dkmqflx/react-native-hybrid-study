import * as Notifications from "expo-notifications";
import { useEffect } from "react";

/**
 * expo-notifications: React Native 앱에서 푸시 알림을 관리하는 라이브러리
 * 주요 기능:
 * - 알림 권한 요청 및 관리
 * - 로컬 알림 스케줄링 (즉시 또는 예약)
 * - 알림 클릭 이벤트 처리
 * - 알림 설정 (제목, 내용, 소리, 배지 등)
 */

// 알림 수신 대기 - 앱이 포그라운드 상태일 때 알림이 올 때의 동작 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 알림 팝업 표시 여부
    shouldPlaySound: true, // 알림 소리 재생 여부 (content에서 sound 설정 필요)
    shouldSetBadge: false, // 앱 아이콘에 배지 표시 여부
  }),
});

export const useDeviceNotifications2 = (onResponse) => {
  // 알림 권한 요청
  const requestDeviceNotificationsForPermissionSet = async () => {
    await Notifications.requestPermissionsAsync();

    onResponse({
      requestDeviceNotificationsForPermissionSet: {
        message: "요청완료",
      },
    });
  };

  // 알림 스케줄 생성 - 즉시 또는 예약된 알림을 생성
  const createDeviceNotificationsForHelloSet = async (variables) => {
    // 알림 스케줄 생성 (즉시 또는 예약)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${variables.name}님 회원가입을 축하합니다!`, // 알림 제목
        body: "앞으로의 여정을 함께 하게되어 반갑습니다!^^ 행복한 하루 되세요!", // 알림 내용
        sound: "default", // 알림 소리 (기본 소리 또는 커스텀 파일명)

        // 알림 클릭 시 전달할 데이터 (페이지 이동 등에 사용)
        data: { page: variables.page },
      },
      trigger: null, // null: 즉시 알림 생성, Date 객체: 특정 시간에 알림
    });

    // 알림 생성 완료 후 웹뷰로 응답 전송
    onResponse({
      createDeviceNotificationsForHelloSet: {
        message: "알람 등록 완료",
      },
    });
  };

  // 알림 클릭 이벤트 리스너 - 사용자가 알림을 클릭했을 때 실행
  useEffect(() => {
    // 알림 클릭 시 호출되는 리스너 등록
    Notifications.addNotificationResponseReceivedListener((response) => {
      // response 객체 구조:
      console.log(response);
      // {
      //   notification: {
      //     request: {
      //       content: {
      //         title: "홍길동님 회원가입을 축하합니다!",     // 알림 제목
      //         body: "앞으로의 여정을 함께 하게되어 반갑습니다!", // 알림 내용
      //         sound: "default",                           // 알림 소리
      //         data: { page: "/section05/05-02-schedule-notifications-click" } // 커스텀 데이터
      //       },
      //       trigger: null,  // 알림 트리거 정보
      //       identifier: "unique-notification-id"  // 알림 고유 ID
      //     },
      //     date: 2024-01-15T10:30:00.000Z  // 알림이 생성된 시간
      //   },
      //   actionIdentifier: "expo.modules.notifications.actions.DEFAULT"  // 액션 타입
      // }

      // 알림에 포함된 데이터 추출 (알림 생성 시 설정한 data)
      const notificationData = response.notification.request.content.data;

      // 알림 클릭 시 웹뷰로 페이지 이동 정보 전송
      // 웹뷰에서는 이 redirect 데이터를 받아서 router.push(redirect)로 페이지 이동 처리
      // 예: onResponse({ redirect: "/section05/05-02-schedule-notifications-click" })
      // 웹뷰 내부에서 if (response.redirect) return router.push(response.redirect); 실행
      onResponse({ redirect: notificationData.page });
    });
  }, []);

  return {
    requestDeviceNotificationsForPermissionSet,
    createDeviceNotificationsForHelloSet,
  };
};
