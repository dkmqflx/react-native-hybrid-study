"use client";

import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./contstants2";

const HeaderBase = ({
  children,
  hasLogo,
  hasBack,
  title,
}: {
  children: React.ReactNode;
  hasLogo: boolean;
  hasBack: boolean;
  title: string;
}) => {
  return (
    <header
      style={{
        display: "flex",
        width: "100vw",
        height: "3.125rem",
        backgroundColor: "yellow",
        gap: "0.3125rem",
      }}
    >
      {hasLogo && <div>로고</div>}
      {hasBack && <div>[ 뒤로가기버튼 ]</div>}
      {title && <div>{title}</div>}
      {children ? <>{children}</> : <></>}
    </header>
  );
};

// 글로벌 헤더는 모든 페이지에 적용되는 헤더
// layout.tsx에서 사용하는 헤더
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

// 로컬 헤더는 특정 페이지에 적용되는 헤더
// 페이지에서 import 해서 사용하는 헤더

export function Header({ children, ...rest }: { children: React.ReactNode }) {
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
