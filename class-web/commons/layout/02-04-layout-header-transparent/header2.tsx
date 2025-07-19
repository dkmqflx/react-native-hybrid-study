"use client";

import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./contstants3";

const HeaderBase = ({ children, hasLogo, hasBack, title, isTransparent }) => {
  return (
    <>
      {/* position: fixed 이기 때문에 위에 띄워져있다 */}
      <header
        style={{
          display: "flex",
          width: "100vw",
          height: "3.125rem",
          // backgroundColor: "yellow",
          gap: "0.3125rem",

          // 02-04-layout-header-transparent 수업에서 => 투명한헤더
          backgroundColor: isTransparent ? "transparent" : "yellow",
          position: "fixed",
          zIndex: 100,
        }}
      >
        {hasLogo && <div>로고</div>}
        {hasBack && <div>[ 뒤로가기버튼 ]</div>}
        {title && <div>{title}</div>}
        {children ? <>{children}</> : <></>}
      </header>

      {/* 투명한 헤더일 때는 높이를 0으로 설정하고, 투명하지 않은 헤더일 때는 높이를 3.125rem으로 설정 */}
      {isTransparent ? <></> : <div style={{ height: "3.125rem" }}></div>}
    </>
  );
};

export function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).GLOBAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

export function Header({ children, ...rest }) {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).LOCAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} {...rest}>
        {children}
      </HeaderBase>
    </div>
  );
}
