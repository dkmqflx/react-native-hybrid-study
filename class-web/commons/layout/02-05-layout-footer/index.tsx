import { HeaderGlobal } from "./header2";

export default function LayoutFooter({ children }) {
  /**
   * minHeight: "100vh" 를 사용하면 컨텐츠가 많아지게 되면 컨텐츠 아래에 위치하도록 하기 위해
   */
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <HeaderGlobal />
        <>{children}</>
      </div>
    </>
  );
}
