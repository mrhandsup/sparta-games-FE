import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAlarm } from "../../api/alarm";
import { TAlarmList, TApiResponse } from "../../types";
import { getTimeAgoInHours } from "../../util/getTimeAgoInHours";

import moreAlarm from "../../assets/common/arrow/triangleArrowBottom.svg";
import { useNavigate } from "react-router-dom";

type props = {
  modalClose: () => void;
  handleAlarmClick: (alarmId: number) => void;
};

const AlarmModal = ({ modalClose, handleAlarmClick }: props) => {
  const [alarms, setAlarms] = useState<TAlarmList[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null); // 다음 페이지 URL

  const navigate = useNavigate();

  const { data, isFetching } = useQuery<TApiResponse<TAlarmList[]>>({
    queryKey: ["alarm"],
    queryFn: () => getAlarm(),
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

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, [lockScroll, unlockScroll]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute top-10 right-0 flex gap-5 py-5 px-2 w-[360px] max-h-[630px] overflow-y-auto bg-gray-800 border border-solid border-primary-500 shadow-primary rounded-[20px]"
    >
      <div className="w-full px-6 overflow-y-auto">
        <h2 className="mb-4 text-xl text-white">
          알림 <span className="text-[19px]">{alarmCount}</span>
        </h2>

        <div className="flex flex-wrap gap-4">
          {alarms?.map((alarm, index) => (
            <div
              key={alarm.id}
              onClick={() => {
                handleAlarmClick(alarm.id);

                modalClose();
                navigate(`/game-detail?id=${alarm.content_id}`);
              }}
              className={`pb-3 w-full text-sm border-solid border-gray-700 cursor-pointer ${
                index !== alarms.length - 1 ? "border-b" : ""
              } ${alarm.is_read && "text-gray-400"} `}
            >
              <div className="flex justify-between items-center mb-1">
                <p
                  className={
                    alarm.is_read
                      ? "text-gray-400"
                      : alarm.message.includes("반려")
                      ? "text-error-default"
                      : "text-primary-500"
                  }
                >
                  {alarm.noti_type}
                </p>
                <span>{getTimeAgoInHours(alarm.create_dt)}</span>
              </div>
              <p className="font-Pretendard">{alarm.message}</p>
            </div>
          ))}
        </div>
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
  );
};

export default AlarmModal;
