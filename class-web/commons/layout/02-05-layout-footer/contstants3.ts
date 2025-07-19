export const HEADER_OPTIONS = (params) => ({
    GLOBAL: {
        "/section02/02-02-layout-header-global": { hasLogo: true, hasBack: false, title: "게시글수정" },
        "/section02/02-04-layout-header-transparent": { hasLogo: false, hasBack: true, title: "사진상세", isTransparent: true },
        "/section02/02-04-layout-header-untransparent": { hasLogo: false, hasBack: true, title: "게시글등록", isTransparent: false }
    },
    LOCAL: {
        [`/section02/02-03-layout-header-local/${params.id}`]: { hasLogo: true, hasBack: false, title: "" }
    }
})