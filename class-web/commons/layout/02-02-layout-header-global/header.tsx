"use client";

import { usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./contstants";

export default function HeaderGlobal() {
  const pathname = usePathname();

  const options =
    HEADER_OPTIONS.GLOBAL[pathname as keyof typeof HEADER_OPTIONS.GLOBAL];

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
      {options.hasLogo && <div>로고</div>}
      {options.hasBack && <div>[ 뒤로가기버튼 ]</div>}
      {options.title && <div>{options.title}</div>}
    </header>
  );
}
