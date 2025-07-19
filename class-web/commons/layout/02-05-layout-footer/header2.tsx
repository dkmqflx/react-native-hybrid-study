"use client"

import { useParams, usePathname } from "next/navigation"
import { HEADER_OPTIONS } from "./contstants3"

const HeaderBase = ({ children, hasLogo, hasBack, title, isTransparent }) => {
    return (
        <>
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
                    zIndex: 100
                }} 
            >
                {hasLogo && <div>로고</div>}
                {hasBack && <div>[ 뒤로가기버튼 ]</div>}
                {title && <div>{title}</div>}
                {children ? <>{children}</> : <></>}
            </header>

            {isTransparent ? <></> : <div style={{height: "3.125rem"}}></div>}
        </>
    )
}


export function HeaderGlobal() {
    const pathname = usePathname()
    const params = useParams()  
    const options = HEADER_OPTIONS(params).GLOBAL[pathname]

    return (
        <div style={{display: options ? "block" : "none" }}>
            <HeaderBase {...options} />
        </div>
        
    )
}

export function Header({ children, ...rest}) {
    const pathname = usePathname()
    const params = useParams()    
    const options = HEADER_OPTIONS(params).LOCAL[pathname]

    return (
        <div style={{ display: options ? "block" : "none" }}>
            <HeaderBase {...options} {...rest}>
                {children}
            </HeaderBase>
        </div>
    )
}