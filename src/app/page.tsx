import SajuTable from "./components/SajuTable";

export default function Home({
  searchParams,
}: {
  searchParams?: { name?: string };
}) {
  const userName = searchParams?.name || "OO";

  const dummySajuData = {
    dateInfo: "1980년 8월 27일 08:10",
    pillars: {
      year: { gan: "庚", ji: "申" },
      month: { gan: "甲", ji: "申" },
      day: { gan: "丁", ji: "巳" },
      hour: { gan: "庚", ji: "辰" },
    },
    details: [
      {
        category: { main: "十星", sub: "십성" },
        values: [
          { main: "傷官", sub: "(상관)" },
          { main: "比肩", sub: "(비견)" },
          { main: "傷官", sub: "(상관)" },
          { main: "傷官", sub: "(상관)" },
        ],
      },
      {
        category: { main: "十星", sub: "십성" },
        values: [
          { main: "比肩", sub: "(비견)" },
          { main: "劫財", sub: "(겁재)" },
          { main: "食神", sub: "(식신)" },
          { main: "偏財", sub: "(편재)" },
        ],
      },
      {
        category: { main: "十二運星", sub: "십이운성" },
        values: [
          { main: "死", sub: "(사)" },
          { main: "帝旺", sub: "(제왕)" },
          { main: "胎", sub: "(태)" },
          { main: "長生", sub: "(장생)" },
        ],
      },
      {
        category: { main: "十二神煞", sub: "십이신살" },
        values: [
          { main: "劫煞", sub: "(겁살)" },
          { main: "地煞", sub: "(지살)" },
          { main: "驛馬煞", sub: "(역마살)" },
          { main: "將星煞", sub: "(장성살)" },
        ],
      },
      {
        category: { main: "貴人", sub: "귀인" },
        values: [null, null, { main: "天乙", sub: "(천을귀인)" }, "complex"],
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[rgb(243,242,239)]">
      <div className="max-w-[448px] w-full mx-auto min-h-screen flex flex-col">
        <div className="relative w-full">
          <img
            src="/background.png"
            alt="통합된 배경"
            className="w-full h-auto object-contain"
          />

          <div className="absolute top-[32%] left-[1%] w-[70%] z-10">
            <p className="text-center max-[300px]:text-xs text-sm text-gray-800 font-bold">
              이제 본격적으로
              <br />
              {userName}님의 사주팔자를
              <br />
              분석해볼 차례네요.
            </p>
          </div>

          <div className="absolute top-[49.5%] left-[5%] w-[70%] z-10">
            <p className="text-center max-[300px]:text-xs text-sm text-gray-800 font-bold">
              제가 {userName}님의 사주를
              <br />
              보기쉽게 표로 정리했어요.
            </p>
          </div>

          <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-full px-4 z-20">
            <SajuTable sajuData={dummySajuData} userName={userName} />
          </div>
        </div>

        <div className="h-[30vh] sm:h-[20vh]"></div>
      </div>
    </div>
  );
}
