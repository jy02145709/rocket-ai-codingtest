import React from "react";

const cellBaseStyles =
  "flex min-h-[70px] flex-col items-center justify-center border-l border-t border-gray-600 text-center";

interface DataCellProps {
  children: React.ReactNode;
  className?: string;
}
const DataCell: React.FC<DataCellProps> = ({ children, className = "" }) => (
  <div className={`${cellBaseStyles} bg-white ${className} p-1 sm:p-2`}>
    {children}
  </div>
);

interface CategoryHeaderProps {
  main: string;
  sub?: string;
  className?: string;
}
const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  main,
  sub,
  className = "",
}) => (
  <div
    className={`${cellBaseStyles} bg-[rgb(245,243,237)] text-sm font-bold text-black ${className}`}
  >
    <span>{main}</span>
    {sub && <span className="text-xs font-medium">({sub})</span>}
  </div>
);

interface TimeHeaderProps {
  children: React.ReactNode;
}
const TimeHeader: React.FC<TimeHeaderProps> = ({ children }) => (
  <div
    className={`${cellBaseStyles} border-t-0 bg-[rgb(245,243,237)] text-lg font-bold text-black`}
  >
    {children}
  </div>
);

interface CharBoxProps {
  mainChar: string;
  subText: string;
  bgColor: string;
}
const CharBox: React.FC<CharBoxProps> = ({ mainChar, subText, bgColor }) => (
  <div
    className={`flex flex-col items-center justify-center rounded-md text-white ${bgColor} w-12 h-12 sm:w-16 sm:h-16`}
  >
    <span className="font-serif font-bold text-2xl sm:text-3xl">
      {mainChar}
    </span>
    <span className="text-xs">{subText}</span>
  </div>
);

interface SajuRowData {
  category: { main: string; sub?: string };
  values: (string | { main: string; sub: string } | null)[];
}

interface SajuTableProps {
  userName?: string;
  sajuData?: {
    dateInfo: string;
    pillars: {
      hour: { gan: string; ji: string };
      day: { gan: string; ji: string };
      month: { gan: string; ji: string };
      year: { gan: string; ji: string };
    };
    details: SajuRowData[];
  };
}

const createDefaultData = () => {
  const now = new Date();
  const formattedCurrentDate = `${now.getFullYear()}년 ${
    now.getMonth() + 1
  }월 ${now.getDate()}일 ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  return {
    dateInfo: formattedCurrentDate,
    pillars: {
      year: { gan: "年", ji: "年" },
      month: { gan: "月", ji: "月" },
      day: { gan: "日", ji: "日" },
      hour: { gan: "時", ji: "時" },
    },
    details: [],
  };
};

const SajuTable: React.FC<SajuTableProps> = ({ userName = "OO", sajuData }) => {
  const data = sajuData || createDefaultData();
  const { dateInfo, pillars, details } = data;

  const { hour, day, month, year } = pillars || {
    hour: { gan: "", ji: "" },
    day: { gan: "", ji: "" },
    month: { gan: "", ji: "" },
    year: { gan: "", ji: "" },
  };

  const renderValue = (value: any) => {
    if (value === null) {
      return <span className="text-gray-400">(없음)</span>;
    }
    if (typeof value === "object" && value.main) {
      return (
        <>
          <span className="text-lg">{value.main}</span>
          <span className="text-xs">{value.sub}</span>
        </>
      );
    }
    if (value === "complex") {
      return (
        <div className="flex flex-col text-sm">
          <span>天乙(천을귀인)</span>
          <span>太極(태극귀인)</span>
          <span>文昌(문창귀인)</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto my-10 max-w-3xl rounded-lg border-2 border-[#BDB1A6] bg-[rgb(245,243,237)] p-4 sm:p-6 text-black shadow-lg">
      <div className="text-center">
        <div className="mb-2 flex items-center justify-between">
          <img
            src="l_cloud.png"
            alt="decorative pattern 1"
            className="h-auto w-12 sm:w-16"
          />
          <h1 className="text-2xl sm:text-3xl font-bold">{`${userName}님의 사주`}</h1>
          <img
            src="r_cloud.png"
            alt="decorative pattern 2"
            className="h-auto w-12 sm:w-16"
          />
        </div>
        <p className="mb-6 text-base sm:text-lg text-gray-500">{dateInfo}</p>
      </div>

      <div className="grid grid-cols-5 border-b border-r border-gray-600">
        <div></div>
        <TimeHeader>時</TimeHeader>
        <TimeHeader>日</TimeHeader>
        <TimeHeader>月</TimeHeader>
        <TimeHeader>年</TimeHeader>

        <CategoryHeader main="天干" sub="천간" className="border-l-0" />
        <DataCell>
          <CharBox mainChar={hour.gan} subText="陰水" bgColor="bg-black" />
        </DataCell>
        <DataCell>
          <CharBox mainChar={day.gan} subText="陰火" bgColor="bg-red-600" />
        </DataCell>
        <DataCell>
          <CharBox mainChar={month.gan} subText="陰水" bgColor="bg-black" />
        </DataCell>
        <DataCell>
          <CharBox mainChar={year.gan} subText="陰水" bgColor="bg-black" />
        </DataCell>

        <CategoryHeader main="地支" sub="지지" className="border-l-0" />
        <DataCell>
          <CharBox mainChar={hour.ji} subText="陽木" bgColor="bg-cyan-600" />
        </DataCell>
        <DataCell>
          <CharBox mainChar={day.ji} subText="陰火" bgColor="bg-red-600" />
        </DataCell>
        <DataCell>
          <CharBox mainChar={month.ji} subText="陰水" bgColor="bg-black" />
        </DataCell>
        <DataCell>
          <CharBox mainChar={year.ji} subText="陰金" bgColor="bg-gray-500" />
        </DataCell>

        {details.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <CategoryHeader {...row.category} className="border-l-0" />
            {row.values.map((value, valueIndex) => (
              <DataCell key={valueIndex}>{renderValue(value)}</DataCell>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SajuTable;
