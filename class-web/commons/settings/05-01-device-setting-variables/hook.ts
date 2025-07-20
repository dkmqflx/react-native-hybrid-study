import { 나의요청중인API들 } from ".";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export const useDeviceSettingVariables = () => {
  const fetchApp = async ({ query, variables = {} }) => {
    const result = await new Promise((resolve) => {
      나의요청중인API들[query] = resolve;
      //   variables 넘기기
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ query, variables })
      );
    });
    return result;
  };

  return {
    fetchApp,
  };
};
