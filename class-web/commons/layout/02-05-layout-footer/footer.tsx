export function Footer({ children }) {
  /**
   * footer 위에 빈 div 태그를 두는 이유는
   * 1. 기본적으로 하단에 위치를 시키도록 하기 위해
   * 2. 컨텐츠가 많아지게 되면 컨텐츠 아래에 위치하도록 하기 위해
   * 즉, LayoutFooter 의 minHeight: "100vh" 를 사용하고,
   * flex: 1 을 사용하게 되면 남은 부분을 채우는 역할을 한다
   */

  /**
   * fragment 태그를 사용하는 이유는
   * LayoutFooter 에서 flex를 사용하고 있기 때문에 또 다른 div가 있거나 하면 제대로 작동하지 않을 수 있다
   */
  return (
    <>
      <div style={{ flex: 1 }} />

      <footer
        style={{
          width: "100vw",
          height: "3.125rem",
          backgroundColor: "skyblue",
        }}
      >
        {children}
      </footer>
    </>
  );
}
