import { HeaderGlobal } from "./header2"

export default function LayoutTransparent({ children }){
    return (
        <>
            <HeaderGlobal />
            <div>{children}</div>
        </>
    )
}