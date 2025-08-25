import { useQuery } from "@tanstack/react-query";
import moreAlarm from "../../assets/common/arrow/triangleArrowBottom.svg";
import { getAlarm } from "../../api/alarm";
import { TAlarmList, TApiResponse } from "../../types";
import { getTimeAgoInHours } from "../../util/getTimeAgoInHours";
import { useEffect, useState } from "react";

type props = {
  onClickModalToggleHandler: () => void;
};

const AlarmModal = ({ onClickModalToggleHandler }: props) => {
  const [alarms, setAlarms] = useState<TAlarmList[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null); // 다음 페이지 URL

  const { data, isFetching } = useQuery<TApiResponse<TAlarmList[]>>({
    queryKey: ["alarm"],
    queryFn: () => getAlarm(), // 처음엔 기본 URL 호출
  });

  const alarmCount = data?.pagination?.count;

  useEffect(() => {
    if (data) {
      setAlarms(data.data);
      setNextUrl(data.pagination?.next ?? null);
    }
  }, [data]);

  const fetchNextPage = async () => {
    if (!nextUrl) return;

    try {
      const res = await getAlarm(nextUrl);
      setAlarms((prev) => [...prev, ...res.data]);
      setNextUrl(res.pagination?.next ?? null);
    } catch (err) {
      console.error("다음 알람 불러오기 실패:", err);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClickModalToggleHandler;
      }}
      className="absolute top-10 right-0 flex gap-5 py-5 px-2 w-[360px] h-[712px] overflow-y-auto bg-gray-800 border border-solid border-primary-500 shadow-primary rounded-[20px]"
    >
      <div className="w-full py-2 px-6">
        <h2 className="mb-6 text-xl text-white">
          알림 <span className="text-[19px]">{alarmCount}</span>
        </h2>

        <div className="flex flex-wrap gap-4">
          {alarms?.map((alarm, index) => (
            <div
              key={alarm.id}
              className={`pb-4 text-sm border-solid border-gray-700 cursor-pointer ${
                index !== alarms.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <p>{alarm.noti_type}</p>
                <span>{getTimeAgoInHours(alarm.create_dt)}</span>
              </div>
              <p className="font-Pretendard">{alarm.message}</p>
            </div>
          ))}

          {nextUrl && (
            <button
              onClick={fetchNextPage}
              disabled={isFetching}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-100 rounded-lg
              text-sm text-gray-200 hover:bg-gray-800 transition"
            >
              <span className="font-Pretendard">알림 더보기</span>
              <img src={moreAlarm} alt="알림 더보기" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
