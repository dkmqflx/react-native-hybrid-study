import { usePathname, useRouter } from 'next/navigation'
import { useDeviceSettingViewTransitionBack } from '../09-02-device-setting-view-transition-back/hook'

const 메인페이지목록 = [
    "/section08/08-04-android-back-and-exit",
    // ...
    // ...
]

export const useRoutingSettingViewTransitionBack = () => {
    const router = useRouter()
    const pathname = usePathname()

    const { fetchApp } = useDeviceSettingViewTransitionBack()

    const onRoutingPush = (event) => {
        event.preventDefault?.()

        if(document.startViewTransition){
            document.startViewTransition(() => {
                router.push(event.target.href)
            })

        // 뷰-트랜지션 지원되지 않는 버전? 기본이동 또는 애니메이션 직접 만들어서 제공하기
        } else {
            router.push(event.target.href)
        }

    }

    const onRoutingBack = () => {
        // 1. 메인페이지라면 ? => 종료요청(토스트메시지 보여줘)
        if(메인페이지목록.includes(pathname)) {
            return fetchApp({ query: "exitDeviceRoutingForBackSet" })
            
        // 2. 그 외의 페이지라면? => 뒤로가기
        } else {

            // section09/09-02-view-transition-back 수업에서 뒤로가기 애니메이션 추가
            if(document.startViewTransition) {
                document.documentElement.classList.add("뒤로가기")
                document.startViewTransition(() => {
                    router.back()
                }).finished.finally(() => {
                    document.documentElement.classList.remove("뒤로가기")
                })

            // 뷰-트랜지션 지원되지 않는 버전? 기본이동 또는 애니메이션 직접 만들어서 제공하기 
            } else {
                router.back()
            }
        }
    }

    return {
        onRoutingPush,
        onRoutingBack
    }

}