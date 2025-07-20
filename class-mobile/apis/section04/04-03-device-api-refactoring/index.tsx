import { useDeviceSystem } from "./01-use-device-system";
import { useDeviceLocation } from "./02-use-device-location";

/**
 * API 통합 관리 훅 - 디바이스 시스템 및 위치 API를 통합하여 관리
 *
 * 주요 기능:
 * 1. 디바이스 시스템 API (useDeviceSystem): 앱 버전, OS 정보 등
 * 2. 디바이스 위치 API (useDeviceLocation): GPS 좌표 정보
 * 3. 웹뷰와 네이티브 앱 간의 통신 관리
 *
 * 구조:
 * - APIS 객체: 모든 API 함수들을 하나의 객체로 통합
 * - onRequest: query에 따라 해당하는 API 함수 실행
 * - onResponse: API 결과를 웹뷰로 전송
 *
 * 사용 예시:
 * - onRequest("fetchDeviceSystemForAppSet") → 앱 버전 정보 반환
 * - onRequest("fetchDeviceSystemForPlatformSet") → OS 정보 반환
 * - onRequest("fetchDeviceLocationForLatLngSet") → 위치 좌표 반환
 */
export const useApis = (webviewRef) => {
  // 웹뷰로 응답을 전송하는 함수
  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  // 모든 API 함수들을 하나의 객체로 통합
  const APIS = {
    ...useDeviceSystem(onResponse), // 디바이스 시스템 관련 API
    ...useDeviceLocation(onResponse), // 디바이스 위치 관련 API
  };

  // query에 따라 해당하는 API 함수를 실행
  // 오브젝트 룩업 패턴
  // switch문은 위에서 아래로 읽지만 오브젝트 룩업 테이블 패턴은 한번에 찾기 때문에 속도가 더 빠르다는 장점이 있다
  // switch는 key가 중복되는 경우에 한번에 쳐리하는 경우에 유용하게 사용할 수 있다.
  const onRequest = (query) => {
    APIS[query]();
  };

  return {
    onResponse,
    onRequest,
  };
};
