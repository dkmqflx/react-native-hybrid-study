export default function RatioScalingPage() {
  // 1. 고정화면(PX 실습)
  // 웹에서 실행시켰을 때,  다른 기기에서 실행시키면 화면 크기에 따라 네모상자의 크기가 달라지지 않는다
  //   return (
  //     <div style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}>
  //       <div style={{ width: "300px", height: "400px", backgroundColor: "red" }}>
  //         네모상자
  //       </div>
  //     </div>
  //   );

  // 2. 비율늘리기(REM 실습)
  // 웹에서 실행시켰을 때, 다른 기기에서 실행시키면 화면 크기에 따라 네모상자의 크기가 달라진다
  // font-size에 따라서 네모상자의 크기가 달라짐
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}>
      <div
        style={{ width: "18.75rem", height: "25rem", backgroundColor: "red" }}
      >
        네모상자
      </div>
    </div>
  );
}

/**
 * 하이브리드 웹의 장점
 * 알맹이는 웹이므로 SEO 최적화 가능
 */
